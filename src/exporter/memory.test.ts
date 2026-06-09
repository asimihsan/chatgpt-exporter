/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

// @vitest-environment jsdom

import { describe, expect, it, vi } from 'vitest'
import { parseSummarySse } from '../api/memoryApi'
import { baseUrl } from '../constants'
import { memoryToJson, memoryToMarkdown } from './memory'
import type * as ConstantsModule from '../constants'
import type { ApiMemoryEntry, MemoryExport } from '../api'

vi.mock('vite-plugin-monkey/dist/client', () => ({
    unsafeWindow: globalThis.window,
}))

vi.mock('../constants', async () => {
    const actual = await vi.importActual('../constants') as typeof ConstantsModule
    return {
        ...actual,
        baseUrl: 'https://chatgpt.com',
        apiUrl: 'https://chatgpt.com/backend-api',
    }
})

const STARTED = 'event: started\ndata: {"generatedAtIso": "2026-06-09T13:04:52.606708+00:00", "sourceChecksum": "abc123"}'

const SECTION_TYPES = 'event: section_types\ndata: {"generatedAtIso": "2026-06-09T13:04:52.606708+00:00", "sections": [{"id": "overview", "title": "Overview"}, {"id": "career", "title": "Career & Engineering"}]}'

const SECTION_OVERVIEW = 'event: section\ndata: {"section": {"id": "overview", "title": "Overview", "description": "You are a software engineer."}}'

const SECTION_CAREER = 'event: section\ndata: {"section": {"id": "career", "title": "Career & Engineering", "description": "You lead a Platform team."}}'

const DONE = 'event: done\ndata: {"emptyStateMessage": "ChatGPT doesn\'t know much about you yet.", "generatedAtIso": "2026-06-09T13:04:52.606708+00:00", "sourceChecksum": "abc123", "sections": [{"id": "overview", "title": "Overview", "description": "You are a software engineer."}, {"id": "career", "title": "Career & Engineering", "description": "You lead a Platform team."}]}'

const TERMINATOR = 'data: [DONE]'

function joinSse(...events: string[]): string {
    return `${events.join('\n\n')}\n\n`
}

describe('parseSummarySse', () => {
    it('prefers the complete done event', () => {
        const result = parseSummarySse(joinSse(STARTED, SECTION_TYPES, SECTION_OVERVIEW, SECTION_CAREER, DONE, TERMINATOR))

        expect(result.generatedAtIso).toBe('2026-06-09T13:04:52.606708+00:00')
        expect(result.sourceChecksum).toBe('abc123')
        expect(result.emptyStateMessage).toBe('ChatGPT doesn\'t know much about you yet.')
        expect(result.sections).toEqual([
            { id: 'overview', title: 'Overview', description: 'You are a software engineer.' },
            { id: 'career', title: 'Career & Engineering', description: 'You lead a Platform team.' },
        ])
    })

    it('falls back to accumulated section events when done is absent', () => {
        const result = parseSummarySse(joinSse(STARTED, SECTION_TYPES, SECTION_OVERVIEW, SECTION_CAREER))

        expect(result.sections).toEqual([
            { id: 'overview', title: 'Overview', description: 'You are a software engineer.' },
            { id: 'career', title: 'Career & Engineering', description: 'You lead a Platform team.' },
        ])
    })

    it('falls back to section_types titles when only the table of contents is present', () => {
        const result = parseSummarySse(joinSse(STARTED, SECTION_TYPES))

        expect(result.sections).toEqual([
            { id: 'overview', title: 'Overview', description: '' },
            { id: 'career', title: 'Career & Engineering', description: '' },
        ])
    })

    it('returns no sections for an empty stream', () => {
        const result = parseSummarySse('')
        expect(result.sections).toEqual([])
    })
})

const SAVED_MEMORY: ApiMemoryEntry = {
    id: '70d5b62d',
    content: 'Changed their ASSA ABLOY 401(k) employee contribution to 3% pre-tax.',
    updated_at: '2026-05-17',
    conversation_id: '6a09aac8-6ce4-83ea-9278-fa221e67166c',
    status: 'warm',
}

const SAVED_MEMORY_NO_SOURCE: ApiMemoryEntry = {
    id: 'noconv',
    content: 'A memory without a source conversation.',
}

const EXPORT: MemoryExport = {
    summary: {
        generatedAtIso: '2026-06-09T13:04:52.606708+00:00',
        sourceChecksum: 'abc123',
        emptyStateMessage: null,
        sections: [
            { id: 'overview', title: 'Overview', description: 'You are a software engineer.' },
        ],
    },
    savedMemories: [SAVED_MEMORY, SAVED_MEMORY_NO_SOURCE],
}

describe('memoryToMarkdown', () => {
    const markdown = memoryToMarkdown(EXPORT)

    it('renders the heading, generated date and sections', () => {
        expect(markdown).toContain('# Memory summary')
        expect(markdown).toContain('_Generated 2026-06-09_')
        expect(markdown).toContain('## Overview')
        expect(markdown).toContain('You are a software engineer.')
    })

    it('separates saved memories with a divider', () => {
        expect(markdown).toContain('\n---\n')
        expect(markdown).toContain('## Saved memories')
    })

    it('renders a saved entry with date and source link', () => {
        expect(markdown).toContain(`- ${SAVED_MEMORY.content} _(updated 2026-05-17 — [source](${baseUrl}/c/${SAVED_MEMORY.conversation_id}))_`)
    })

    it('renders a sourceless entry as plain content', () => {
        expect(markdown).toContain(`- ${SAVED_MEMORY_NO_SOURCE.content}\n`)
        expect(markdown).not.toContain(`- ${SAVED_MEMORY_NO_SOURCE.content} _(`)
    })

    it('omits the saved memories section when there are none', () => {
        const md = memoryToMarkdown({ summary: EXPORT.summary, savedMemories: [] })
        expect(md).not.toContain('## Saved memories')
        expect(md).not.toContain('---')
    })
})

describe('memoryToJson', () => {
    it('separates the summary from the raw saved memories', () => {
        const parsed = JSON.parse(memoryToJson(EXPORT))

        expect(parsed.generatedAtIso).toBe('2026-06-09T13:04:52.606708+00:00')
        expect(parsed.sourceChecksum).toBe('abc123')
        expect(parsed.summary.sections).toHaveLength(1)
        expect(parsed.savedMemories).toHaveLength(2)
        // raw entries keep their original fields
        expect(parsed.savedMemories[0].conversation_id).toBe(SAVED_MEMORY.conversation_id)
    })
})
