/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

import { afterEach, describe, expect, it, vi } from 'vitest'
import { conversationToHtml } from './html'
import { conversationToMarkdown } from './markdown'
import { conversationToMarkdownExcerpt } from './markdownExcerpt'
import { collectMarkdownSourcesFromConversation } from './markdownSources'
import { shouldIncludeMessageForExport } from './messageClassifier'
import { transformMessageForTextExport } from './text'
import {
    fixtureCallToolCall,
    fixturePopulatedResult,
    fixtureToolActivityConversation,
    fixtureToolActivityMessages,
} from './toolActivityFixture'
import { KEY_INCLUDE_TOOL_ACTIVITY } from '../constants'
import { ScriptStorage } from '../utils/storage'
import type { ConversationNodeMessage } from '../api'

vi.mock('../page', () => ({
    checkIfConversationStarted: () => true,
    getUserAvatar: async () => '',
}))

vi.mock('../i18n', () => ({
    default: { t: (key: string) => key },
}))

const ON = { includeToolActivity: true }
const OFF = { includeToolActivity: false }

function headings(markdown: string): string[] {
    return Array.from(markdown.matchAll(/^#### (.+):$/gm), match => match[1])
}

function htmlLabels(html: string): string[] {
    return Array.from(html.matchAll(/<div class="author-label">([^<]+)<\/div>/g), match => match[1])
}

function imageResult(): ConversationNodeMessage {
    const result = fixturePopulatedResult('image-result', 'render_chart')
    return {
        ...result,
        content: {
            content_type: 'multimodal_text',
            parts: [
                'Resource uri: /response/turn3\nShowing 1 of 1 lines.',
                { content_type: 'image_asset_pointer', asset_pointer: 'file-service://chart', size_bytes: 10, width: 4, height: 3, fovea: 0 },
            ],
        },
    }
}

function deepResearchWidget(): ConversationNodeMessage {
    const report: ConversationNodeMessage = {
        id: 'report-1',
        author: { role: 'assistant', metadata: {} },
        content: { content_type: 'text', parts: ['# Deep Research Report'] },
        recipient: 'all',
        status: 'finished_successfully',
        weight: 1,
        metadata: {
            content_references: [{
                type: 'grouped_webpages',
                matched_text: '',
                alt: '',
                items: [{ title: 'Source A', url: 'https://example.com/a', attribution: 'example.com' }],
            }],
        } as ConversationNodeMessage['metadata'],
    }
    return {
        ...fixturePopulatedResult('widget-1', 'deep_research'),
        content: { content_type: 'code', language: 'unknown', text: '{"session_id":"abc"}' },
        metadata: {
            chatgpt_sdk: {
                html_asset_pointer: 'internal://deep-research',
                widget_state: JSON.stringify({ status: 'completed', report_message: report }),
            },
        },
    }
}

afterEach(() => {
    ScriptStorage.delete(KEY_INCLUDE_TOOL_ACTIVITY)
})

describe('classifier counts on the live-shaped fixture', () => {
    it('classifies calls and results by kind with and without the toggle', () => {
        const messages = fixtureToolActivityMessages()
        const includedOff = messages.filter(message => shouldIncludeMessageForExport(message, OFF)).map(message => message.id)
        const includedOn = messages.filter(message => shouldIncludeMessageForExport(message, ON)).map(message => message.id)

        expect(includedOff).toEqual(['user-1', 'preamble-1', 'pro-1', 'final-1'])
        expect(includedOn).toEqual([
            'user-1', 'preamble-1', 'memory-1', 'list-1',
            'call-1', 'result-1', 'call-2', 'result-empty-code', 'call-3', 'result-2', 'result-empty-text',
            'pro-1', 'final-1',
        ])
    })
})

describe('markdown export', () => {
    it('omits tool activity by default and keeps the visible conversation', () => {
        const markdown = conversationToMarkdown(fixtureToolActivityConversation())
        // 'ChatGPT (Thinking)' is the pre-existing Pro reasoning placeholder (plan-005), untouched here.
        expect(headings(markdown)).toEqual(['You', 'ChatGPT', 'ChatGPT (Thinking)', 'ChatGPT'])
        expect(markdown).toContain('Yes, apply.')
        expect(markdown).not.toContain('find_files')
        expect(markdown).not.toContain('Tool call')
    })

    it('includes labelled calls and results when the toggle is on, suppressing empty results', () => {
        ScriptStorage.set(KEY_INCLUDE_TOOL_ACTIVITY, true)
        const markdown = conversationToMarkdown(fixtureToolActivityConversation())
        expect(headings(markdown)).toEqual([
            'You',
            'ChatGPT',
            'Tool call (memory)',
            'Tool call (list_resources)',
            'Tool call (Forgejo · find_files)',
            'Tool result (Forgejo · find_files)',
            'Tool call (Forgejo · get_file)',
            'Tool call (Forgejo · find_files)',
            'Tool result (Forgejo · find_files)',
            'ChatGPT (Thinking)',
            'ChatGPT',
        ])
        expect(markdown).toContain('"query": "prior career constraints and backend stack"')
        expect(markdown).toContain('"paths": [')
        expect(markdown).toContain('"start_line": 1')
        expect(markdown).toContain('[L1] {"call_id":"fmcp-1"')
        expect(markdown).not.toContain('Resource uri:')
        expect(markdown).not.toContain('Citation Marker:')
        expect(markdown).not.toContain('Showing 1 of 1 lines.')
    })

    it('keeps image-bearing tool results visible regardless of the toggle', () => {
        const conversation = fixtureToolActivityConversation([fixtureCallToolCall('c', 'render_chart'), imageResult()])
        const off = conversationToMarkdown(conversation)
        expect(headings(off)).toEqual(['Tool result (Forgejo · render_chart)'])
        expect(off).toContain('![image](file-service://chart)')

        ScriptStorage.set(KEY_INCLUDE_TOOL_ACTIVITY, true)
        const on = conversationToMarkdown(conversation)
        expect(headings(on)).toEqual(['Tool call (Forgejo · render_chart)', 'Tool result (Forgejo · render_chart)'])
        expect(on).toContain('![image](file-service://chart)')
    })

    it('still unwraps deep research reports and collects their sources with the toggle off', () => {
        const conversation = fixtureToolActivityConversation([deepResearchWidget()])
        const markdown = conversationToMarkdown(conversation)
        expect(markdown).toContain('# Deep Research Report')
        expect(collectMarkdownSourcesFromConversation(conversation, OFF).map(source => source.url)).toEqual(['https://example.com/a'])
    })
})

describe('html and text export', () => {
    it('html omits tool activity by default and labels it when enabled', () => {
        const conversation = fixtureToolActivityConversation()
        const off = conversationToHtml(conversation, 'data:,avatar', undefined, { lang: 'en' })
        expect(htmlLabels(off)).toEqual(['ChatGPT (Thinking)'])
        expect(off).not.toContain('find_files')

        ScriptStorage.set(KEY_INCLUDE_TOOL_ACTIVITY, true)
        const on = conversationToHtml(conversation, 'data:,avatar', undefined, { lang: 'en' })
        expect(htmlLabels(on)).toEqual([
            'Tool call (memory)',
            'Tool call (list_resources)',
            'Tool call (Forgejo · find_files)',
            'Tool result (Forgejo · find_files)',
            'Tool call (Forgejo · get_file)',
            'Tool call (Forgejo · find_files)',
            'Tool result (Forgejo · find_files)',
            'ChatGPT (Thinking)',
        ])
        expect(on).toContain('<pre class="tool-activity"><code>[L1] {&quot;call_id&quot;:&quot;fmcp-1&quot;')
    })

    it('text export follows the option per message', () => {
        const call = fixtureCallToolCall()
        expect(transformMessageForTextExport(call)).toBeNull()
        expect(transformMessageForTextExport(call, ON)).toBe('Tool call (Forgejo · find_files):\n{\n  "owner": "someone",\n  "name": "repo",\n  "contains": "role"\n}')
    })
})

describe('markdown excerpt', () => {
    it('whole-message selection respects the option', () => {
        const conversation = fixtureToolActivityConversation()
        const selection = { messageIds: ['call-1', 'result-1', 'final-1'], blocks: [] }
        expect(headings(conversationToMarkdownExcerpt(conversation, selection, OFF).markdown)).toEqual(['ChatGPT'])
        expect(headings(conversationToMarkdownExcerpt(conversation, selection, ON).markdown)).toEqual([
            'Tool call (Forgejo · find_files)',
            'Tool result (Forgejo · find_files)',
            'ChatGPT',
        ])
    })

    it('block selection respects the option', () => {
        const conversation = fixtureToolActivityConversation()
        const block = {
            kind: 'code' as const,
            sourceMessageId: 'call-1',
            sourceSegmentId: 'code:0',
            domFingerprint: '{\n  "owner": "someone",\n  "name": "repo",\n  "contains": "role"\n}',
            renderMode: 'fenced-markdown' as const,
        }
        const off = conversationToMarkdownExcerpt(conversation, { messageIds: [], blocks: [block] }, OFF)
        expect(off.markdown).toBe('')
        expect(off.rejectedBlocks.map(rejected => rejected.reason)).toEqual(['missing-content'])

        const on = conversationToMarkdownExcerpt(conversation, { messageIds: [], blocks: [block] }, ON)
        expect(on.markdown).toContain('#### Tool call (Forgejo · find_files):')
        expect(on.markdown).toContain('"owner": "someone"')
    })
})
