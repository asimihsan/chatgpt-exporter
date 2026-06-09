/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

import { fetchMemoryExport } from '../api'
import { baseUrl } from '../constants'
import { downloadFile, getFileNameWithFormat } from '../utils/download'
import type { ApiMemoryEntry, MemoryExport } from '../api'

const FILE_NAME_FORMAT = 'chatgpt-memory-summary-{date}'

/** Renders the ISO generation timestamp as a `YYYY-MM-DD` date, if present. */
function formatGeneratedDate(generatedAtIso: string | null): string | null {
    if (!generatedAtIso) return null
    const match = generatedAtIso.match(/^\d{4}-\d{2}-\d{2}/)
    return match ? match[0] : generatedAtIso
}

/** Builds the trailing `_(updated … — [source](…))_` annotation for an entry. */
function formatEntryMeta(entry: ApiMemoryEntry): string {
    const parts: string[] = []
    if (entry.updated_at) parts.push(`updated ${entry.updated_at}`)
    if (entry.conversation_id) parts.push(`[source](${baseUrl}/c/${entry.conversation_id})`)
    if (parts.length === 0) return ''
    return ` _(${parts.join(' — ')})_`
}

export function memoryToMarkdown(data: MemoryExport): string {
    const { summary, savedMemories } = data
    const lines: string[] = ['# Memory summary']

    const generatedDate = formatGeneratedDate(summary.generatedAtIso)
    if (generatedDate) lines.push('', `_Generated ${generatedDate}_`)

    for (const section of summary.sections) {
        lines.push('', `## ${section.title}`, '', section.description)
    }

    if (savedMemories.length > 0) {
        lines.push('', '---', '', '## Saved memories', '')
        for (const entry of savedMemories) {
            lines.push(`- ${entry.content}${formatEntryMeta(entry)}`)
        }
    }

    return `${lines.join('\n')}\n`
}

export function memoryToJson(data: MemoryExport): string {
    const payload = {
        generatedAtIso: data.summary.generatedAtIso,
        sourceChecksum: data.summary.sourceChecksum,
        summary: { sections: data.summary.sections },
        savedMemories: data.savedMemories,
    }
    return JSON.stringify(payload, null, 2)
}

function isEmpty(data: MemoryExport): boolean {
    return data.summary.sections.length === 0 && data.savedMemories.length === 0
}

async function loadMemoryExport(): Promise<MemoryExport | null> {
    const data = await fetchMemoryExport()
    if (isEmpty(data)) {
        alert(data.summary.emptyStateMessage ?? 'No memory summary is available to export.')
        return null
    }
    return data
}

export async function exportMemoryToMarkdown(): Promise<boolean> {
    const data = await loadMemoryExport()
    if (!data) return false

    const fileName = getFileNameWithFormat(FILE_NAME_FORMAT, 'md')
    downloadFile(fileName, 'text/markdown', memoryToMarkdown(data))
    return true
}

export async function exportMemoryToJson(): Promise<boolean> {
    const data = await loadMemoryExport()
    if (!data) return false

    const fileName = getFileNameWithFormat(FILE_NAME_FORMAT, 'json')
    downloadFile(fileName, 'application/json', memoryToJson(data))
    return true
}
