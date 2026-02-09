/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it } from 'vitest'
import { replaceReferenceTokens, shouldSkipMessage, stripUiTokens } from './shared'
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
