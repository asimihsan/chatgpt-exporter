import { describe, expect, it } from 'vitest'
import {
    isAnalysisCodeMessage,
    isAnalysisExecutionOutput,
    isThinkingMessage,
    shouldIncludeMessageForExport,
    shouldSkipAsInternal,
} from './messageClassifier'
import type { ConversationNodeMessage } from '../api'

function createMessage(overrides?: Partial<ConversationNodeMessage>): ConversationNodeMessage {
    return {
        id: 'message-id',
        author: {
            role: 'assistant',
            metadata: {},
        },
        content: {
            content_type: 'text',
            parts: ['hello'],
        },
        recipient: 'all',
        status: 'finished_successfully',
        weight: 1,
        metadata: {},
        ...overrides,
    }
}

describe('shouldSkipAsInternal', () => {
    it('skips internal or hidden message payloads', () => {
        const thoughts = createMessage({
            content: {
                content_type: 'thoughts',
                thoughts: [],
            },
        })
        const hiddenText = createMessage({
            metadata: {
                is_visually_hidden_from_conversation: true,
            },
        })

        expect(shouldSkipAsInternal(undefined)).toBe(true)
        expect(shouldSkipAsInternal(thoughts)).toBe(true)
        expect(shouldSkipAsInternal(hiddenText)).toBe(true)
        expect(shouldSkipAsInternal(createMessage())).toBe(false)
    })
})

describe('isAnalysisCodeMessage', () => {
    it('identifies assistant code sent to python', () => {
        const analysisCode = createMessage({
            author: { role: 'assistant', metadata: {} },
            recipient: 'python',
            channel: 'commentary',
            content: {
                content_type: 'code',
                language: 'unknown',
                text: 'print("hi")',
            },
        })

        const normalCode = createMessage({
            author: { role: 'assistant', metadata: {} },
            recipient: 'all',
            content: {
                content_type: 'code',
                language: 'unknown',
                text: 'print("hi")',
            },
        })

        expect(isAnalysisCodeMessage(analysisCode)).toBe(true)
        expect(isAnalysisCodeMessage(normalCode)).toBe(false)
    })
})

describe('isAnalysisExecutionOutput', () => {
    it('identifies python tool execution output on analysis channel', () => {
        const pythonOutput = createMessage({
            author: { role: 'tool', name: 'python', metadata: {} },
            content: {
                content_type: 'execution_output',
                text: 'result',
            },
            channel: 'commentary',
        })
        const regularToolText = createMessage({
            author: { role: 'tool', name: 'browser', metadata: {} },
            content: {
                content_type: 'text',
                parts: ['not output'],
            },
        })

        expect(isAnalysisExecutionOutput(pythonOutput)).toBe(true)
        expect(isAnalysisExecutionOutput(regularToolText)).toBe(false)
    })
})

describe('isThinkingMessage', () => {
    it('identifies thoughts content and pro thinking tool text', () => {
        const hiddenThoughts = createMessage({
            content: {
                content_type: 'thoughts',
                thoughts: [],
            },
        })
        const proThinkingToolText = createMessage({
            author: {
                role: 'tool',
                name: 'a8km123',
                metadata: {},
            },
            content: {
                content_type: 'text',
                parts: ['Planning...'],
            },
            metadata: {
                initial_text: 'Reasoning',
                finished_text: 'Reasoned for 33m 31s',
                async_task_type: 'pro_mode',
            },
        })
        const regularAssistantText = createMessage()

        expect(isThinkingMessage(hiddenThoughts)).toBe(true)
        expect(isThinkingMessage(proThinkingToolText)).toBe(true)
        expect(isThinkingMessage(regularAssistantText)).toBe(false)
    })
})

describe('shouldIncludeMessageForExport', () => {
    it('includes analysis code, analysis output, thinking tool text, and regular chat text', () => {
        const analysisCode = createMessage({
            author: { role: 'assistant', metadata: {} },
            recipient: 'python',
            channel: 'commentary',
            content: {
                content_type: 'code',
                language: 'unknown',
                text: 'print("hi")',
            },
        })
        const analysisOutput = createMessage({
            author: { role: 'tool', name: 'python', metadata: {} },
            channel: 'commentary',
            content: {
                content_type: 'execution_output',
                text: 'result',
            },
        })
        const proThinkingToolText = createMessage({
            author: {
                role: 'tool',
                name: 'a8km123',
                metadata: {},
            },
            content: {
                content_type: 'text',
                parts: ['Planning...'],
            },
            metadata: {
                initial_text: 'Reasoning',
                finished_text: 'Reasoned for 33m 31s',
                async_task_type: 'pro_mode',
            },
        })
        const regularChat = createMessage()

        expect(shouldIncludeMessageForExport(analysisCode)).toBe(true)
        expect(shouldIncludeMessageForExport(analysisOutput)).toBe(true)
        expect(shouldIncludeMessageForExport(proThinkingToolText)).toBe(true)
        expect(shouldIncludeMessageForExport(regularChat)).toBe(true)
    })

    it('excludes non-analysis non-thinking tool intermediates', () => {
        const toolText = createMessage({
            author: { role: 'tool', name: 'browser', metadata: {} },
            content: {
                content_type: 'text',
                parts: ['intermediate'],
            },
        })
        const toolExecutionNoImage = createMessage({
            author: { role: 'tool', name: 'browser', metadata: {} },
            channel: null,
            content: {
                content_type: 'execution_output',
                text: 'plain result',
            },
            metadata: {
                aggregate_result: {
                    code: 'print(1)',
                    end_time: 0,
                    jupyter_messages: [],
                    messages: [],
                    run_id: '1',
                    start_time: 0,
                    status: 'success',
                    update_time: 0,
                },
            },
        })

        expect(shouldIncludeMessageForExport(toolText)).toBe(false)
        expect(shouldIncludeMessageForExport(toolExecutionNoImage)).toBe(false)
    })
})
