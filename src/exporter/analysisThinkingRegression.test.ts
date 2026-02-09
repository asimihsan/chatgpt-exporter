import { describe, expect, it } from 'vitest'
import { getExecutionOutputImages, getExecutionOutputText } from './executionOutput'
import { shouldIncludeMessageForExport } from './messageClassifier'
import { getExportAuthorLabel } from './messageLabel'
import { shouldSkipMessage } from './shared'
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

describe('analysis and thinking regression coverage', () => {
    it('includes analysis code despite generic recipient skip rule', () => {
        const analysisCode = createMessage({
            id: '44218f8c-a128-47bf-bf7e-979841484220',
            author: {
                role: 'assistant',
                metadata: {},
            },
            recipient: 'python',
            channel: 'commentary',
            content: {
                content_type: 'code',
                language: 'unknown',
                text: 'print(1)',
            },
        })

        // Shared skip helper remains conservative for chat-only output.
        expect(shouldSkipMessage(analysisCode)).toBe(true)
        // Classifier gate now explicitly includes analysis code.
        expect(shouldIncludeMessageForExport(analysisCode)).toBe(true)
        expect(getExportAuthorLabel(analysisCode)).toBe('ChatGPT (Analysis)')
    })

    it('includes pro thinking tool text and labels it as thinking', () => {
        const proThinking = createMessage({
            id: '5b084d47-435a-4c7c-bb65-f945bc065b57',
            author: {
                role: 'tool',
                name: 'a8km123',
                metadata: {},
            },
            content: {
                content_type: 'text',
                parts: ['Planning for simulation...'],
            },
            metadata: {
                initial_text: 'Reasoning',
                finished_text: 'Reasoned for 33m 31s',
                async_task_type: 'pro_mode',
                finished_duration_sec: 2011,
            },
        })

        expect(shouldSkipMessage(proThinking)).toBe(false)
        expect(shouldIncludeMessageForExport(proThinking)).toBe(true)
        expect(getExportAuthorLabel(proThinking)).toBe('ChatGPT (Thinking)')
    })

    it('keeps non-thinking tool text excluded', () => {
        const toolText = createMessage({
            author: {
                role: 'tool',
                name: 'browser',
                metadata: {},
            },
            content: {
                content_type: 'text',
                parts: ['intermediate tool output'],
            },
        })

        expect(shouldSkipMessage(toolText)).toBe(false)
        expect(shouldIncludeMessageForExport(toolText)).toBe(false)
        expect(getExportAuthorLabel(toolText)).toBe('Plugin (browser)')
    })

    it('falls back to execution text when analysis output has no image rows', () => {
        const executionContent: Extract<ConversationNodeMessage['content'], { content_type: 'execution_output' }> = {
            content_type: 'execution_output',
            text: 'Value: \uE200navlist\uE202ignore\uE201 42',
        }
        const output = createMessage({
            author: {
                role: 'tool',
                name: 'python',
                metadata: {},
            },
            channel: 'commentary',
            content: executionContent,
            metadata: {
                aggregate_result: {
                    code: 'print(42)',
                    end_time: 0,
                    jupyter_messages: [],
                    messages: [],
                    run_id: 'run-1',
                    start_time: 0,
                    status: 'success',
                    update_time: 0,
                },
            },
        })

        expect(shouldIncludeMessageForExport(output)).toBe(true)
        expect(getExecutionOutputImages(output.metadata)).toEqual([])
        expect(getExecutionOutputText(executionContent)).toBe('Value:  42')
        expect(getExportAuthorLabel(output)).toBe('Python (Analysis)')
    })
})
