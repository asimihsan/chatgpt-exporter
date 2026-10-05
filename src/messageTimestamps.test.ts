/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest'
import { appendMessageTimestamps } from './messageTimestamps'
import type { ConversationNode } from './api'

function node(id: string, createTime: number): ConversationNode {
    return {
        id, children: [],
        message: {
            id, create_time: createTime, author: { role: 'assistant', metadata: {} },
            content: { content_type: 'text', parts: ['Response'] },
            recipient: 'all', status: 'finished_successfully', weight: 1, metadata: {},
        },
    }
}

afterEach(() => { document.body.innerHTML = '' })

describe('message timestamps', () => {
    it('matches IDs rather than reasoning/tool API positions and dedupes rerenders', () => {
        document.body.innerHTML = '<main><div data-chatgpt-search-message-ids="answer answer"></div><div data-message-id="question"></div></main>'
        const nodes = [node('hidden-reasoning', 1), node('question', 100), node('answer', 200)]
        expect(appendMessageTimestamps(nodes)).toBe(2)
        expect(document.querySelector('[data-chatgpt-search-message-ids] time')?.getAttribute('datetime')).toBe(new Date(200000).toISOString())
        expect(appendMessageTimestamps(nodes)).toBe(0)
        expect(document.querySelectorAll('time')).toHaveLength(2)
    })
    it('dedupes nested metadata into the innermost content element', () => {
        document.body.innerHTML = '<main><div data-chatgpt-search-message-ids="answer"><div id="content" data-chatgpt-search-message-ids="answer answer"></div></div></main>'
        expect(appendMessageTimestamps([node('answer', 200)])).toBe(1)
        expect(document.querySelectorAll('time')).toHaveLength(1)
        expect(document.querySelector('time')?.parentElement?.id).toBe('content')
    })
    it('does not guess timestamps for unmapped messages', () => {
        document.body.innerHTML = '<main><div data-chatgpt-search-message-ids="unknown"></div></main>'
        expect(appendMessageTimestamps([node('hidden', 10)])).toBe(0)
    })
})
