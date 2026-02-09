/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it, vi } from 'vitest'
import { conversationToHtml } from './html'
import { conversationToMarkdown } from './markdown'
import { transformMessageForTextExport } from './text'
import type { ConversationNodeMessage, ConversationResult } from '../api'

vi.mock('../page', () => ({
    checkIfConversationStarted: () => true,
    getUserAvatar: async () => '',
}))

vi.mock('../i18n', () => ({
    default: {
        t: (key: string) => key,
    },
}))

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

function createConversation(messages: ConversationNodeMessage[]): ConversationResult {
    return {
        id: 'conversation-id',
        title: 'Sanitization Conversation',
        model: 'gpt-4o',
        modelSlug: 'gpt-4o',
        createTime: 0,
        updateTime: 0,
        conversationNodes: messages.map((message, index) => ({
            id: `node-${index}`,
            children: [],
            message,
        })),
    }
}

describe('text-like exporter sanitization integration', () => {
    it('sanitizes text export output while preserving citation replacement flow', () => {
        const token = '\uE200cite\uE202turn0search0\uE201'
        const message = createMessage({
            content: {
                content_type: 'text',
                parts: [`See ${token} — it’s…\u200B`],
            },
            metadata: {
                content_references: [
                    {
                        type: 'alt_text',
                        matched_text: token,
                        start_idx: 0,
                        end_idx: token.length,
                        alt: '“Doc”',
                    },
                ],
            },
        })

        const output = transformMessageForTextExport(message)

        expect(output).toContain('See "Doc" - it\'s...')
        expect(output).not.toContain(token)
        expect(output).not.toContain('\u200B')
    })

    it('sanitizes markdown output for text and code content', () => {
        const token = '\uE200cite\uE202turn0search1\uE201'
        const conversation = createConversation([
            createMessage({
                content: {
                    content_type: 'text',
                    parts: [`Result ${token} — it’s…`],
                },
                metadata: {
                    content_references: [
                        {
                            type: 'alt_text',
                            matched_text: token,
                            start_idx: 0,
                            end_idx: token.length,
                            alt: '“Doc”',
                        },
                    ],
                },
            }),
            createMessage({
                content: {
                    content_type: 'code',
                    language: 'unknown',
                    text: 'console.log(“hi”)\u200B',
                },
            }),
        ])

        const markdown = conversationToMarkdown(conversation)

        expect(markdown).toContain('Result "Doc" - it\'s...')
        expect(markdown).toContain('console.log("hi")')
        expect(markdown).not.toContain(token)
        expect(markdown).not.toContain('\u200B')
    })

    it('sanitizes html output for text and code content', () => {
        const token = '\uE200cite\uE202turn0search2\uE201'
        const conversation = createConversation([
            createMessage({
                content: {
                    content_type: 'text',
                    parts: [`See ${token} — it’s…\u200B`],
                },
                metadata: {
                    content_references: [
                        {
                            type: 'alt_text',
                            matched_text: token,
                            start_idx: 0,
                            end_idx: token.length,
                            alt: '“Doc”',
                        },
                    ],
                },
            }),
            createMessage({
                content: {
                    content_type: 'code',
                    language: 'unknown',
                    text: 'console.log(“hi”)\u200B',
                },
            }),
        ])

        const html = conversationToHtml(conversation, 'data:,avatar', undefined, { lang: 'en' })

        expect(html).toMatch(/See\s+"Doc"\s+-\s+it(?:'|&#x27;)s\.\.\./)
        expect(html).toContain('console.log("hi")')
        expect(html).not.toContain(token)
        expect(html).not.toContain('\u200B')
    })
})
