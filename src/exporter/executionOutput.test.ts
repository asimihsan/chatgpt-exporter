import { describe, expect, it } from 'vitest'
import { getExecutionOutputImages, getExecutionOutputText } from './executionOutput'
import type { ConversationNodeMessage } from '../api'

function createExecutionOutputMessage(
    overrides?: Partial<ConversationNodeMessage>,
): ConversationNodeMessage {
    return {
        id: 'message-id',
        author: {
            role: 'tool',
            name: 'python',
            metadata: {},
        },
        content: {
            content_type: 'execution_output',
            text: 'result',
        },
        recipient: 'all',
        status: 'finished_successfully',
        weight: 1,
        metadata: {},
        ...overrides,
    }
}

describe('getExecutionOutputImages', () => {
    it('returns image rows from aggregate_result.messages', () => {
        const message = createExecutionOutputMessage({
            metadata: {
                aggregate_result: {
                    code: 'print(1)',
                    end_time: 0,
                    jupyter_messages: [],
                    messages: [
                        {
                            image_url: 'https://example.com/image.png',
                            message_type: 'image',
                            sender: 'server',
                            time: 1,
                            width: 100,
                            height: 200,
                        },
                    ],
                    run_id: 'run-1',
                    start_time: 0,
                    status: 'success',
                    update_time: 1,
                },
            },
        })

        const images = getExecutionOutputImages(message.metadata)
        expect(images).toMatchObject([
            {
                image_url: 'https://example.com/image.png',
                width: 100,
                height: 200,
            },
        ])
    })

    it('returns empty array when aggregate messages have no image rows', () => {
        const message = createExecutionOutputMessage({
            metadata: {
                aggregate_result: {
                    code: 'print(1)',
                    end_time: 0,
                    jupyter_messages: [],
                    messages: [],
                    run_id: 'run-1',
                    start_time: 0,
                    status: 'success',
                    update_time: 1,
                },
            },
        })

        expect(getExecutionOutputImages(message.metadata)).toEqual([])
    })
})

describe('getExecutionOutputText', () => {
    it('returns sanitized execution output text for fallback rendering', () => {
        const content: Extract<ConversationNodeMessage['content'], { content_type: 'execution_output' }> = {
            content_type: 'execution_output',
            text: 'A \uE200navlist\uE202internal\uE201 B',
        }

        expect(getExecutionOutputText(content)).toBe('A  B')
    })
})
