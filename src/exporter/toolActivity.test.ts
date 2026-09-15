/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it, vi } from 'vitest'
import { conversationToHtml } from './html'
import { transformMessageContentForMarkdownExport, transformMessageForMarkdownExport } from './markdown'
import { getExportAuthorLabel, getVisibleHtmlLabel } from './messageLabel'
import { transformMessageForTextExport } from './text'
import {
    fenceMarkdown,
    formatToolActivityLabel,
    getToolActivityDescriptor,
    renderToolActivityHtml,
    renderToolCallPayload,
    renderToolResultPayload,
} from './toolActivity'
import {
    fixtureCallToolCall,
    fixtureEmptyCodeResult,
    fixtureEmptyTextResult,
    fixtureListResourcesCall,
    fixtureMemoryQuery,
    fixturePopulatedResult,
    fixturePreamble,
    fixtureProThinkingPlaceholder,
    fixtureToolActivityConversation,
    fixtureTruncatedResult,
} from './toolActivityFixture'
import type { ConversationNodeMessage } from '../api'

vi.mock('../page', () => ({
    checkIfConversationStarted: () => true,
    getUserAvatar: async () => '',
}))

vi.mock('../i18n', () => ({
    default: { t: (key: string) => key },
}))

function withMetadata(message: ConversationNodeMessage, metadata: ConversationNodeMessage['metadata']): ConversationNodeMessage {
    return { ...message, metadata }
}

describe('getToolActivityDescriptor', () => {
    it('reads app and tool from call paths and result resources', () => {
        expect(getToolActivityDescriptor(fixtureCallToolCall())).toEqual({ appName: 'Forgejo', toolName: 'find_files' })
        expect(getToolActivityDescriptor(fixturePopulatedResult())).toEqual({ appName: 'Forgejo', toolName: 'find_files' })
        expect(getToolActivityDescriptor(fixtureListResourcesCall())).toEqual({ toolName: 'list_resources' })
        expect(getToolActivityDescriptor(fixtureMemoryQuery())).toEqual({ appName: 'memory' })
        expect(getToolActivityDescriptor(fixturePreamble())).toEqual({})
    })

    it('tolerates absent, empty, and partial invoked_resource on results', () => {
        const result = fixturePopulatedResult()
        expect(getToolActivityDescriptor(withMetadata(result, {}))).toEqual({ appName: undefined, toolName: 'call_tool' })
        expect(getToolActivityDescriptor(withMetadata(result, { invoked_resource: {} }))).toEqual({ appName: undefined, toolName: 'call_tool' })
        expect(getToolActivityDescriptor(withMetadata(result, { invoked_resource: { app_name: 'Forgejo' } }))).toEqual({ appName: 'Forgejo', toolName: 'call_tool' })
        expect(getToolActivityDescriptor(withMetadata(result, { invoked_resource: { resource_uri: '/x/y/get_file' } }))).toEqual({ appName: undefined, toolName: 'get_file' })
    })

    it('falls back to the recipient for unparseable or pathless calls', () => {
        const call = fixtureCallToolCall()
        const unparseable = { ...call, content: { content_type: 'code' as const, language: 'python3', text: 'not json' } }
        expect(getToolActivityDescriptor(unparseable)).toEqual({ toolName: 'call_tool' })
        const browser = { ...call, recipient: 'browser', content: { content_type: 'code' as const, language: 'unknown', text: 'search("x")' } }
        expect(getToolActivityDescriptor(browser)).toEqual({ toolName: 'browser' })
    })
})

describe('labels', () => {
    it('formats call and result labels with app and tool names', () => {
        expect(formatToolActivityLabel(fixtureCallToolCall())).toBe('Tool call (Forgejo · find_files)')
        expect(formatToolActivityLabel(fixturePopulatedResult())).toBe('Tool result (Forgejo · find_files)')
        expect(formatToolActivityLabel(fixtureMemoryQuery())).toBe('Tool call (memory)')
        expect(formatToolActivityLabel(fixtureListResourcesCall())).toBe('Tool call (list_resources)')
        expect(getExportAuthorLabel(fixtureCallToolCall())).toBe('Tool call (Forgejo · find_files)')
        expect(getExportAuthorLabel(fixturePopulatedResult())).toBe('Tool result (Forgejo · find_files)')
    })

    it('shows HTML labels only for non-conversational kinds', () => {
        expect(getVisibleHtmlLabel(fixturePreamble())).toBeNull()
        expect(getVisibleHtmlLabel(fixtureCallToolCall())).toBe('Tool call (Forgejo · find_files)')
        expect(getVisibleHtmlLabel(fixtureProThinkingPlaceholder('pro', ['thinking…']))).toBe('ChatGPT (Thinking)')
    })
})

describe('payload rendering', () => {
    it('renders args, whole payloads, and raw text for calls', () => {
        expect(renderToolCallPayload(fixtureCallToolCall('c', 'find_files', { owner: 'someone' }))).toBe('{\n  "owner": "someone"\n}')
        expect(renderToolCallPayload(fixtureMemoryQuery())).toBe('{\n  "query": "prior career constraints and backend stack"\n}')
        expect(renderToolCallPayload(fixtureListResourcesCall())).toBe('{\n  "paths": [\n    "Forgejo"\n  ]\n}')
        const raw = { ...fixtureCallToolCall(), content: { content_type: 'code' as const, language: 'python3', text: 'search("x")' } }
        expect(renderToolCallPayload(raw)).toBe('search("x")')
    })

    it('strips connector boilerplate from results and keeps payload lines', () => {
        expect(renderToolResultPayload(fixturePopulatedResult())).toBe('[L1] {"call_id":"fmcp-1","files":[{"kind":"file","path":"README.md","size":12}]}')
        expect(renderToolResultPayload(fixtureTruncatedResult())).toBe(
            'Response output was truncated at a line boundary to fit the tool response budget.\n[L1] {"advice":"showing the first 500 matches, so narrow the filter","capped":true}',
        )
    })

    it('returns null for empty results', () => {
        expect(renderToolResultPayload(fixtureEmptyCodeResult())).toBeNull()
        expect(renderToolResultPayload(fixtureEmptyTextResult())).toBeNull()
    })

    it('fences with more backticks than the payload contains', () => {
        expect(fenceMarkdown('plain', 'json')).toBe('```json\nplain\n```')
        expect(fenceMarkdown('has ``` inside')).toBe('````\nhas ``` inside\n````')
    })

    it('escapes HTML in tool payloads', () => {
        const hostile = fixturePopulatedResult('r', 'find_files', '<script>alert(1)</script> & "quotes" \'single\'')
        const html = renderToolActivityHtml(hostile)
        expect(html).toContain('[L1] &lt;script&gt;alert(1)&lt;/script&gt; &amp; &quot;quotes&quot; &#039;single&#039;')
        expect(html).not.toContain('<script>')
        expect(html).toMatch(/^<pre class="tool-activity"><code>/)
    })
})

describe('exporter integration (current inclusion rules)', () => {
    it('renders a populated result as a fenced block in markdown and suppresses empty results', () => {
        const rendered = transformMessageForMarkdownExport(fixturePopulatedResult())
        expect(rendered).toBe('#### Tool result (Forgejo · find_files):\n```\n[L1] {"call_id":"fmcp-1","files":[{"kind":"file","path":"README.md","size":12}]}\n```')
        expect(transformMessageContentForMarkdownExport(fixtureEmptyCodeResult())).toBeNull()
        expect(transformMessageContentForMarkdownExport(fixtureEmptyTextResult())).toBeNull()
    })

    it('renders text export with the label and raw payload', () => {
        expect(transformMessageForTextExport(fixturePopulatedResult())).toBe('Tool result (Forgejo · find_files):\n[L1] {"call_id":"fmcp-1","files":[{"kind":"file","path":"README.md","size":12}]}')
        expect(transformMessageForTextExport(fixtureEmptyCodeResult())).toBeNull()
    })

    it('renders html with an escaped visible label and escaped payload', () => {
        const hostile = fixturePopulatedResult('r', 'find_files', '{"html":"<img src=x onerror=alert(1)>"}')
        const html = conversationToHtml(fixtureToolActivityConversation([hostile]), 'data:,avatar', undefined, { lang: 'en' })
        expect(html).toContain('<div class="author-label">Tool result (Forgejo · find_files)</div>')
        expect(html).toContain('&lt;img src=x onerror=alert(1)&gt;')
        expect(html).not.toContain('<img src=x onerror=alert(1)>')
    })
})
