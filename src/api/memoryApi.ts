/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

import { fetchApi, fetchApiRaw, getMemoriesApiUrl, getMemorySummaryStreamApiUrl } from './http'
import type { ApiMemoriesResponse, ApiMemorySummarySection, MemoryExport, MemorySummary } from './types'

interface SseEvent {
    event: string | null
    data: string
}

/**
 * Splits a Server-Sent Events payload into `{ event, data }` records.
 *
 * Events are separated by blank lines; `data:` lines within an event are
 * concatenated with newlines per the SSE spec. The terminal `data: [DONE]`
 * sentinel is included as an event with `data === '[DONE]'`.
 */
function splitSseEvents(text: string): SseEvent[] {
    const blocks = text.replace(/\r\n/g, '\n').split(/\n\n+/)
    const events: SseEvent[] = []

    for (const block of blocks) {
        const trimmed = block.trim()
        if (!trimmed) continue

        let event: string | null = null
        const dataLines: string[] = []
        for (const line of trimmed.split('\n')) {
            if (line.startsWith('event:')) {
                event = line.slice('event:'.length).trim()
            }
            else if (line.startsWith('data:')) {
                dataLines.push(line.slice('data:'.length).trim())
            }
        }

        if (dataLines.length === 0) continue
        events.push({ event, data: dataLines.join('\n') })
    }

    return events
}

function tryParse<T>(data: string): T | null {
    try {
        return JSON.parse(data) as T
    }
    catch {
        return null
    }
}

/**
 * Parses the memory summary SSE stream into a {@link MemorySummary}.
 *
 * The stream ends with a `done` event that already carries the complete set of
 * sections, so that is preferred. We fall back to the incremental `section`
 * events, then to the `section_types` table-of-contents (titles only), so the
 * export still produces something useful if the terminal event is missing.
 */
export function parseSummarySse(text: string): MemorySummary {
    const events = splitSseEvents(text)

    let generatedAtIso: string | null = null
    let sourceChecksum: string | null = null
    let emptyStateMessage: string | null = null
    let doneSections: ApiMemorySummarySection[] | null = null
    const streamedSections: ApiMemorySummarySection[] = []
    let sectionTypes: ApiMemorySummarySection[] = []

    for (const { event, data } of events) {
        if (data === '[DONE]') continue
        const payload = tryParse<Record<string, any>>(data)
        if (!payload) continue

        if (payload.generatedAtIso) generatedAtIso = payload.generatedAtIso
        if (payload.sourceChecksum) sourceChecksum = payload.sourceChecksum

        switch (event) {
            case 'done':
                if (payload.emptyStateMessage) emptyStateMessage = payload.emptyStateMessage
                if (Array.isArray(payload.sections)) doneSections = payload.sections
                break
            case 'section':
                if (payload.section?.id) streamedSections.push(payload.section)
                break
            case 'section_types':
                if (Array.isArray(payload.sections)) {
                    sectionTypes = payload.sections.map((s: any) => ({
                        id: s.id,
                        title: s.title,
                        description: '',
                    }))
                }
                break
        }
    }

    const sections = doneSections?.length
        ? doneSections
        : streamedSections.length
            ? streamedSections
            : sectionTypes

    return { generatedAtIso, sourceChecksum, emptyStateMessage, sections }
}

/** Fetches and parses the "Memory summary" profile via the SSE endpoint. */
export async function fetchMemorySummary(): Promise<MemorySummary> {
    const response = await fetchApiRaw(getMemorySummaryStreamApiUrl(), {
        method: 'POST',
        headers: { Accept: 'text/event-stream' },
    })
    const text = await response.text()
    return parseSummarySse(text)
}

/** Fetches the raw saved-memory entries (the "Saved memories" list). */
export async function fetchSavedMemories(): Promise<ApiMemoriesResponse['memories']> {
    const response = await fetchApi<ApiMemoriesResponse>(getMemoriesApiUrl())
    return Array.isArray(response.memories) ? response.memories : []
}

/**
 * Fetches the full memory export payload: the generated summary plus the raw
 * saved-memory entries. The summary is the primary artifact, so a failure to
 * load the saved entries degrades gracefully to an empty list rather than
 * failing the whole export.
 */
export async function fetchMemoryExport(): Promise<MemoryExport> {
    const [summary, savedMemories] = await Promise.all([
        fetchMemorySummary(),
        fetchSavedMemories().catch(() => []),
    ])
    return { summary, savedMemories }
}
