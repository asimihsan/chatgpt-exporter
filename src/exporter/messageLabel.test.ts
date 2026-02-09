import { describe, expect, it } from 'vitest'
import { getExportAuthorLabel } from './messageLabel'
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

describe('getExportAuthorLabel', () => {
    it('keeps default labels for regular messages', () => {
        const assistant = createMessage()
        const user = createMessage({
            author: {
                role: 'user',
                metadata: {},
            },
        })
        const tool = createMessage({
            author: {
                role: 'tool',
                name: 'browser',
                metadata: {},
            },
        })

        expect(getExportAuthorLabel(assistant)).toBe('ChatGPT')
        expect(getExportAuthorLabel(user)).toBe('You')
        expect(getExportAuthorLabel(tool)).toBe('Plugin (browser)')
    })

    it('labels analysis code and execution output explicitly', () => {
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

        expect(getExportAuthorLabel(analysisCode)).toBe('ChatGPT (Analysis)')
        expect(getExportAuthorLabel(analysisOutput)).toBe('Python (Analysis)')
    })

    it('labels pro thinking content as thinking', () => {
        const thinking = createMessage({
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

        expect(getExportAuthorLabel(thinking)).toBe('ChatGPT (Thinking)')
    })
})
