/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it, vi } from 'vitest'
import { conversationToMarkdown } from './markdown'
import { conversationToMarkdownExcerpt } from './markdownExcerpt'
import type { ConversationNodeMessage, ConversationResult } from '../api'

vi.mock('../page', () => ({
    checkIfConversationStarted: () => true,
}))

vi.mock('../i18n', () => ({
    default: {
        t: (key: string) => key,
    },
}))

function createMessage(overrides?: Partial<ConversationNodeMessage>): ConversationNodeMessage {
    return {
        id: 'message-1',
        author: {
            role: 'assistant',
            metadata: {},
        },
        content: {
            content_type: 'text',
            parts: ['Hello'],
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
        title: 'Excerpt Source',
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

describe('conversationToMarkdownExcerpt', () => {
    it('renders one selected message without document framing', () => {
        const conversation = createConversation([
            createMessage({
                id: 'assistant-1',
                content: {
                    content_type: 'text',
                    parts: ['Hello **there**'],
                },
            }),
            createMessage({
                id: 'assistant-2',
                content: {
                    content_type: 'text',
                    parts: ['Do not copy me'],
                },
            }),
        ])

        const result = conversationToMarkdownExcerpt(conversation, {
            messageIds: ['assistant-1'],
            blocks: [],
        })

        expect(result.markdown).toContain('#### ChatGPT:')
        expect(result.markdown).toContain('Hello **there**')
        expect(result.markdown).not.toContain('# Excerpt Source')
        expect(result.markdown).not.toContain('Do not copy me')
        expect(result.rejectedBlocks).toEqual([])
    })

    it('resolves turn-index selections against exported message order', () => {
        const conversation = createConversation([
            createMessage({
                id: 'assistant-1',
                content: {
                    content_type: 'text',
                    parts: ['First exported turn'],
                },
            }),
            createMessage({
                id: 'assistant-2',
                content: {
                    content_type: 'text',
                    parts: ['Second exported turn'],
                },
            }),
        ])

        const result = conversationToMarkdownExcerpt(conversation, {
            messageIds: ['turn:2'],
            blocks: [],
        })

        expect(result.markdown).toContain('Second exported turn')
        expect(result.markdown).not.toContain('First exported turn')
        expect(result.rejectedBlocks).toEqual([])
    })

    it('renders a selected code block once with the parent role label', () => {
        const conversation = createConversation([
            createMessage({
                id: 'assistant-code',
                content: {
                    content_type: 'text',
                    parts: ['Intro\n\n```ts\nconsole.log("hi")\n```\n\nOutro'],
                },
            }),
        ])

        const result = conversationToMarkdownExcerpt(conversation, {
            messageIds: [],
            blocks: [{
                kind: 'code',
                sourceMessageId: 'assistant-code',
                sourceSegmentId: 'code:0',
                domFingerprint: 'console.log("hi")',
                renderMode: 'fenced-markdown',
            }],
        })

        expect(result.markdown).toBe('#### ChatGPT:\n```ts\nconsole.log("hi")\n```')
        expect(result.rejectedBlocks).toEqual([])
    })

    it('renders a selected whole-code message block using DOM block ids', () => {
        const conversation = createConversation([
            createMessage({
                id: 'assistant-code',
                content: {
                    content_type: 'code',
                    language: 'unknown',
                    text: 'console.log("hi")',
                },
            }),
        ])

        const result = conversationToMarkdownExcerpt(conversation, {
            messageIds: [],
            blocks: [{
                kind: 'code',
                sourceMessageId: 'assistant-code',
                sourceSegmentId: 'code:0',
                domFingerprint: 'console.log("hi")',
                renderMode: 'fenced-markdown',
            }],
        })

        expect(result.markdown).toBe('#### ChatGPT:\nCode:\n```\nconsole.log("hi")\n```')
        expect(result.rejectedBlocks).toEqual([])
    })

    it('rejects ambiguous block descriptors instead of widening output', () => {
        const conversation = createConversation([
            createMessage({
                id: 'assistant-code',
                content: {
                    content_type: 'text',
                    parts: ['```ts\nsame()\n```\n\n```ts\nsame()\n```'],
                },
            }),
        ])

        const result = conversationToMarkdownExcerpt(conversation, {
            messageIds: [],
            blocks: [{
                kind: 'code',
                sourceMessageId: 'assistant-code',
                domFingerprint: 'same()',
                renderMode: 'fenced-markdown',
            }],
        })

        expect(result.markdown).toBe('')
        expect(result.rejectedBlocks).toHaveLength(1)
        expect(result.rejectedBlocks[0]?.reason).toBe('ambiguous')
    })

    it('keeps whole-conversation markdown stable after renderer extraction', () => {
        const conversation = createConversation([
            createMessage({
                id: 'assistant-1',
                content: {
                    content_type: 'code',
                    language: 'unknown',
                    text: 'console.log("hi")',
                },
            }),
        ])

        expect(conversationToMarkdown(conversation)).toBe([
            '# Excerpt Source',
            '',
            '#### ChatGPT:',
            'Code:',
            '```',
            'console.log("hi")',
            '```',
        ].join('\n'))
    })
})
