/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { ApiConversationWithId, ConversationResult } from '../api'

const {
    getCurrentChatIdMock,
    fetchConversationMock,
    processConversationMock,
    copyToClipboardMock,
} = vi.hoisted(() => ({
    getCurrentChatIdMock: vi.fn(),
    fetchConversationMock: vi.fn(),
    processConversationMock: vi.fn(),
    copyToClipboardMock: vi.fn(),
}))

vi.mock('../api', () => ({
    getCurrentChatId: getCurrentChatIdMock,
    fetchConversation: fetchConversationMock,
    processConversation: processConversationMock,
}))

vi.mock('../utils/clipboard', () => ({
    copyToClipboard: copyToClipboardMock,
}))

vi.mock('../page', () => ({
    checkIfConversationStarted: () => true,
}))

vi.mock('../i18n', () => ({
    default: {
        t: (key: string) => key,
    },
}))

import { copySelectedMessageMarkdown } from './copyMessageMarkdown'

function createConversation(): ConversationResult {
    return {
        id: 'chat-1',
        title: 'Copy Test',
        model: 'gpt-4o',
        modelSlug: 'gpt-4o',
        createTime: 0,
        updateTime: 0,
        conversationNodes: [
            {
                id: 'node-2',
                children: [],
                message: {
                    id: 'message-2',
                    author: { role: 'assistant', metadata: {} },
                    content: { content_type: 'text', parts: ['Second'] },
                    recipient: 'all',
                    status: 'finished_successfully',
                    weight: 1,
                    metadata: {},
                },
            },
            {
                id: 'node-1',
                children: [],
                message: {
                    id: 'message-1',
                    author: { role: 'user', metadata: {} },
                    content: { content_type: 'text', parts: ['First'] },
                    recipient: 'all',
                    status: 'finished_successfully',
                    weight: 1,
                    metadata: {},
                },
            },
        ],
    }
}

describe('copySelectedMessageMarkdown', () => {
    beforeEach(() => {
        vi.clearAllMocks()
        getCurrentChatIdMock.mockResolvedValue('chat-1')
        fetchConversationMock.mockResolvedValue({ id: 'chat-1' } as ApiConversationWithId)
        processConversationMock.mockReturnValue(createConversation())
        copyToClipboardMock.mockResolvedValue(true)
    })

    it('fetches the current conversation with assets and copies selected messages in conversation order', async () => {
        const result = await copySelectedMessageMarkdown({
            messageIds: ['message-1', 'message-2'],
            blocks: [],
        })

        expect(result).toEqual({ ok: true, copiedText: expect.any(String) })
        expect(fetchConversationMock).toHaveBeenCalledWith('chat-1', true)
        expect(processConversationMock).toHaveBeenCalledWith(
            { id: 'chat-1' },
            { mergeContinuations: false },
        )
        const copied = copyToClipboardMock.mock.calls[0]?.[0] as string
        expect(copied).toContain('#### ChatGPT:\nSecond')
        expect(copied).toContain('#### You:\nFirst')
        expect(copied.indexOf('Second')).toBeLessThan(copied.indexOf('First'))
    })

    it('returns failure without clearing selection when clipboard rejects', async () => {
        copyToClipboardMock.mockResolvedValue(false)

        const result = await copySelectedMessageMarkdown({
            messageIds: ['message-1'],
            blocks: [],
        })

        expect(result).toEqual({
            ok: false,
            reason: 'clipboard',
            copiedText: expect.any(String),
        })
    })
})
