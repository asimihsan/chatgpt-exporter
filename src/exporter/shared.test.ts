/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it } from 'vitest'
import { extractDeepResearchReportMessage, replaceReferenceTokens, resolveExportMessage, shouldSkipMessage, stripUiTokens } from './shared'
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

describe('stripUiTokens', () => {
    it('keeps cite payload for content reference replacement and removes other UI tokens', () => {
        const input = 'A \uE200cite\uE202turn1view0\uE201 B \uE200navlist\uE202anything\uE201 C'
        const output = stripUiTokens(input)
        expect(output).toBe('A turn1view0 B  C')
    })
})

describe('replaceReferenceTokens', () => {
    it('replaces both raw cite token and stripped cite payload variants', () => {
        const rawToken = '\uE200cite\uE202turn1view4\uE201'
        const input = `raw=${rawToken}; clean=turn1view4`
        const output = replaceReferenceTokens(input, rawToken, '(Mozilla Add-ons)')

        expect(output).toBe('raw=(Mozilla Add-ons); clean=(Mozilla Add-ons)')
    })
})

describe('deep research report extraction', () => {
    it('surfaces report_message from chatgpt_sdk.widget_state for export', () => {
        const reportMessage = createMessage({
            id: 'report-message',
            content: {
                content_type: 'text',
                parts: ['# Deep Research Report'],
            },
        })
        const toolMessage = createMessage({
            author: {
                role: 'tool',
                name: 'api_tool.call_tool',
                metadata: {},
            },
            content: {
                content_type: 'code',
                language: 'unknown',
                text: '{"session_id":"abc"}',
            },
            metadata: {
                chatgpt_sdk: {
                    html_asset_pointer: 'internal://deep-research',
                    widget_state: JSON.stringify({
                        status: 'completed',
                        report_message: reportMessage,
                    }),
                },
            },
        })

        expect(extractDeepResearchReportMessage(toolMessage)).toEqual(reportMessage)
        expect(resolveExportMessage(toolMessage)).toEqual(reportMessage)
    })

    it('does not unwrap report_message for non deep research widgets', () => {
        const toolMessage = createMessage({
            author: {
                role: 'tool',
                name: 'api_tool.call_tool',
                metadata: {},
            },
            content: {
                content_type: 'code',
                language: 'unknown',
                text: '{"session_id":"abc"}',
            },
            metadata: {
                chatgpt_sdk: {
                    html_asset_pointer: 'internal://some-other-widget',
                    widget_state: JSON.stringify({
                        status: 'completed',
                        report_message: createMessage({
                            id: 'report-message',
                            content: {
                                content_type: 'text',
                                parts: ['# Other Widget Report'],
                            },
                        }),
                    }),
                },
            },
        })

        expect(extractDeepResearchReportMessage(toolMessage)).toBeNull()
        expect(resolveExportMessage(toolMessage)).toEqual(toolMessage)
    })
})

describe('shouldSkipMessage', () => {
    it('skips internal reasoning messages and visually hidden messages', () => {
        const thoughts = createMessage({
            content: {
                content_type: 'thoughts',
                thoughts: [],
            },
        })
        const reasoningRecap = createMessage({
            content: {
                content_type: 'reasoning_recap',
                content: 'summary',
            },
        })
        const modelEditableContext = createMessage({
            content: {
                content_type: 'model_editable_context',
                model_set_context: 'context',
            },
        })
        const hiddenText = createMessage({
            metadata: {
                is_visually_hidden_from_conversation: true,
            },
        })

        expect(shouldSkipMessage(thoughts)).toBe(true)
        expect(shouldSkipMessage(reasoningRecap)).toBe(true)
        expect(shouldSkipMessage(modelEditableContext)).toBe(true)
        expect(shouldSkipMessage(hiddenText)).toBe(true)
    })

    it('skips non-chat recipients and keeps normal chat messages', () => {
        const toolRecipient = createMessage({
            recipient: 'python',
        })
        const regularMessage = createMessage()

        expect(shouldSkipMessage(toolRecipient)).toBe(true)
        expect(shouldSkipMessage(regularMessage)).toBe(false)
    })
})
