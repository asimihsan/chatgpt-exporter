/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it } from 'vitest'
import {
    getMessageExportKind,
    hasRenderableToolAssets,
    isAnalysisCodeMessage,
    isAnalysisExecutionOutput,
    isPreambleMessage,
    isToolCallMessage,
    isToolResultMessage,
    MEMORY_SEARCH_RECIPIENT,
} from './messageClassifier'
import type { ConversationNodeMessage } from '../api'

function createMessage(overrides?: Partial<ConversationNodeMessage>): ConversationNodeMessage {
    return {
        id: 'message-id',
        author: { role: 'assistant', metadata: {} },
        content: { content_type: 'text', parts: ['hello'] },
        recipient: 'all',
        status: 'finished_successfully',
        weight: 1,
        metadata: {},
        ...overrides,
    }
}

const FORGEJO_RESOURCE = {
    resource_uri: '/asdk_app_abc/link_def/find_files',
    publish_status: 'private',
    app_name: 'Forgejo',
}

function connectorCall(text = '{"path":"/Forgejo/link_def/find_files","args":{"owner":"asim"}}'): ConversationNodeMessage {
    return createMessage({
        recipient: 'api_tool.call_tool',
        channel: 'commentary',
        content: { content_type: 'code', language: 'python3', text },
    })
}

function connectorResult(overrides?: Partial<ConversationNodeMessage>): ConversationNodeMessage {
    return createMessage({
        author: { role: 'tool', name: 'api_tool.call_tool', metadata: {} },
        channel: 'commentary',
        metadata: { invoked_resource: FORGEJO_RESOURCE, invoked_plugin: {} },
        content: {
            content_type: 'multimodal_text',
            parts: [
                'Resource uri: /response/turn0\nShowing 1 of 1 lines.',
                'Citation Marker: fileciteturn0file0\n',
                '[L1] {"call_id":"fmcp-1","files":[]}',
            ],
        },
        ...overrides,
    })
}

describe('python boundary is channel independent', () => {
    it('accepts python code with any channel and rejects connector code on commentary', () => {
        const base = { content: { content_type: 'code' as const, language: 'python', text: 'print(1)' } }
        expect(isAnalysisCodeMessage(createMessage({ ...base, recipient: 'python' }))).toBe(true)
        expect(isAnalysisCodeMessage(createMessage({ ...base, recipient: 'python', channel: null }))).toBe(true)
        expect(isAnalysisCodeMessage(createMessage({ ...base, recipient: 'python', channel: 'final' }))).toBe(true)
        expect(isAnalysisCodeMessage(connectorCall())).toBe(false)
    })

    it('accepts python output by author name only', () => {
        const output = (name: string, channel?: string) => createMessage({
            author: { role: 'tool', name, metadata: {} },
            channel,
            content: { content_type: 'execution_output', text: 'ok' },
        })
        expect(isAnalysisExecutionOutput(output('python'))).toBe(true)
        expect(isAnalysisExecutionOutput(output('python', 'final'))).toBe(true)
        expect(isAnalysisExecutionOutput(output('some_connector', 'commentary'))).toBe(false)
        expect(isToolResultMessage(output('some_connector', 'commentary'))).toBe(true)
    })
})

describe('isToolCallMessage', () => {
    it('matches connector, list_resources, memory and unknown recipients', () => {
        expect(isToolCallMessage(connectorCall())).toBe(true)
        expect(isToolCallMessage(createMessage({
            recipient: 'api_tool.list_resources',
            channel: 'commentary',
            content: { content_type: 'code', language: 'json', text: '{"paths":["Forgejo"]}' },
        }))).toBe(true)
        expect(isToolCallMessage(createMessage({
            recipient: MEMORY_SEARCH_RECIPIENT,
            content: { content_type: 'code', language: 'json', text: '{"query":"career"}' },
        }))).toBe(true)
        expect(isToolCallMessage(createMessage({
            recipient: 'browser',
            content: { content_type: 'code', language: 'unknown', text: 'search("x")' },
        }))).toBe(true)
    })

    it('rejects python code, user-facing code and non-code', () => {
        expect(isToolCallMessage(createMessage({
            recipient: 'python',
            content: { content_type: 'code', language: 'python', text: 'x' },
        }))).toBe(false)
        expect(isToolCallMessage(createMessage({
            recipient: 'all',
            content: { content_type: 'code', language: 'python', text: 'x' },
        }))).toBe(false)
        expect(isToolCallMessage(createMessage({ recipient: 'api_tool.call_tool' }))).toBe(false)
        expect(isToolCallMessage(undefined)).toBe(false)
    })
})

describe('isToolResultMessage', () => {
    it('matches populated, empty code, and empty text connector results', () => {
        expect(isToolResultMessage(connectorResult())).toBe(true)
        expect(isToolResultMessage(connectorResult({
            content: { content_type: 'code', language: 'json', text: '' },
        }))).toBe(true)
        expect(isToolResultMessage(createMessage({
            author: { role: 'tool', name: 'api_tool', metadata: {} },
            channel: 'commentary',
            content: { content_type: 'text', parts: [''] },
        }))).toBe(true)
    })

    it('handles absent, empty and partial invoked_resource', () => {
        expect(isToolResultMessage(connectorResult({ metadata: {} }))).toBe(true)
        expect(isToolResultMessage(connectorResult({
            author: { role: 'tool', name: 'other_tool', metadata: {} },
            metadata: { invoked_resource: {} },
        }))).toBe(true)
        expect(isToolResultMessage(connectorResult({
            author: { role: 'tool', name: 'other_tool', metadata: {} },
            metadata: { invoked_resource: { app_name: 'Forgejo' } },
        }))).toBe(true)
        expect(isToolResultMessage(connectorResult({
            author: { role: 'tool', name: 'other_tool', metadata: {} },
            metadata: {},
        }))).toBe(false)
    })

    it('never matches python output, thinking placeholders, or non-tool roles', () => {
        expect(isToolResultMessage(createMessage({
            author: { role: 'tool', name: 'python', metadata: {} },
            content: { content_type: 'execution_output', text: 'ok' },
        }))).toBe(false)
        const proThinking = createMessage({
            author: { role: 'tool', name: 'a8km123', metadata: {} },
            metadata: { initial_text: 'Reasoning', finished_text: 'Worked for 13m 58s' },
            content: { content_type: 'text', parts: [''] },
        })
        expect(isToolResultMessage(proThinking)).toBe(false)
        expect(getMessageExportKind(proThinking)).toBe('thinking')
        expect(getMessageExportKind({ ...proThinking, content: { content_type: 'text', parts: ['some reasoning'] } })).toBe('thinking')
        expect(isToolResultMessage(connectorCall())).toBe(false)
    })
})

describe('hasRenderableToolAssets', () => {
    it('is true only for image parts or execution output images', () => {
        expect(hasRenderableToolAssets(connectorResult())).toBe(false)
        expect(hasRenderableToolAssets(connectorResult({
            content: {
                content_type: 'multimodal_text',
                parts: [{ content_type: 'image_asset_pointer', asset_pointer: 'file-service://x', size_bytes: 1, width: 1, height: 1, fovea: 0 }],
            },
        }))).toBe(true)
        expect(hasRenderableToolAssets(createMessage({
            author: { role: 'tool', name: 'connector', metadata: {} },
            content: { content_type: 'execution_output', text: '' },
            metadata: {
                aggregate_result: {
                    code: '', end_time: 0, jupyter_messages: [], run_id: '', start_time: 0, status: 'success', update_time: 0,
                    messages: [{ image_url: 'file-service://img', message_type: 'image', sender: 'server', time: 0, width: 1, height: 1 }],
                },
            },
        }))).toBe(true)
        expect(hasRenderableToolAssets(undefined)).toBe(false)
    })
})

describe('getMessageExportKind', () => {
    it('assigns one kind per shape', () => {
        expect(getMessageExportKind(createMessage({ author: { role: 'user', metadata: {} } }))).toBe('user')
        expect(getMessageExportKind(createMessage({ channel: 'final' }))).toBe('assistant')
        const preamble = createMessage({ channel: 'commentary', metadata: { is_thinking_preamble_message: true } })
        expect(isPreambleMessage(preamble)).toBe(true)
        expect(getMessageExportKind(preamble)).toBe('preamble')
        expect(getMessageExportKind(createMessage({ content: { content_type: 'thoughts', thoughts: [] } }))).toBe('internal')
        expect(getMessageExportKind(createMessage({ content: { content_type: 'reasoning_recap', content: 'Worked for 1s' } }))).toBe('internal')
        expect(getMessageExportKind(createMessage({
            recipient: 'python',
            content: { content_type: 'code', language: 'python', text: 'x' },
        }))).toBe('analysis-code')
        expect(getMessageExportKind(createMessage({
            author: { role: 'tool', name: 'python', metadata: {} },
            content: { content_type: 'execution_output', text: 'ok' },
        }))).toBe('analysis-output')
        expect(getMessageExportKind(connectorCall())).toBe('tool-call')
        expect(getMessageExportKind(connectorResult())).toBe('tool-result')
        expect(getMessageExportKind(createMessage({ author: { role: 'system', metadata: {} } }))).toBe('other')
        expect(getMessageExportKind(undefined)).toBe('internal')
    })
})
