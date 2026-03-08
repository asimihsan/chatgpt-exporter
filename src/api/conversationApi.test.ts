/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { ApiConversation } from './types'

const {
    getChatIdFromUrlMock,
    getConversationFromSharePageMock,
    replaceImageAssetsMock,
    fetchApiMock,
    getConversationApiUrlMock,
} = vi.hoisted(() => ({
    getChatIdFromUrlMock: vi.fn<() => string | null>(),
    getConversationFromSharePageMock: vi.fn<() => ApiConversation | null>(),
    replaceImageAssetsMock: vi.fn<(conversation: ApiConversation) => Promise<void>>(),
    fetchApiMock: vi.fn(),
    getConversationApiUrlMock: vi.fn<(id: string) => string>(),
}))

vi.mock('../page', () => ({
    getChatIdFromUrl: getChatIdFromUrlMock,
    getConversationFromSharePage: getConversationFromSharePageMock,
}))

vi.mock('./assets', () => ({
    replaceImageAssets: replaceImageAssetsMock,
}))

vi.mock('./http', () => ({
    fetchApi: fetchApiMock,
    getConversationApiUrl: getConversationApiUrlMock,
    getConversationsApiUrl: vi.fn(),
    getProjectConversationsApiUrl: vi.fn(),
    getProjectsApiUrl: vi.fn(),
}))

import { fetchConversation, getCurrentChatId } from './conversationApi'

function createConversation(overrides: Partial<ApiConversation> = {}): ApiConversation {
    return {
        create_time: 1700000000,
        current_node: 'node-1',
        mapping: {},
        moderation_results: [],
        title: 'Shared conversation',
        is_archived: false,
        update_time: 1700000100,
        ...overrides,
    }
}

describe('conversationApi shared conversation handling', () => {
    beforeEach(() => {
        vi.clearAllMocks()
        getChatIdFromUrlMock.mockReturnValue(null)
        getConversationFromSharePageMock.mockReturnValue(null)
        getConversationApiUrlMock.mockImplementation(id => `https://chatgpt.com/backend-api/conversation/${id}`)
    })

    it('prefixes the current share id when the page embeds shared conversation data', async () => {
        getChatIdFromUrlMock.mockReturnValue('shared-123')
        getConversationFromSharePageMock.mockReturnValue(createConversation())

        await expect(getCurrentChatId()).resolves.toBe('__share__shared-123')
    })

    it('uses embedded share data when called with the current raw share id', async () => {
        const shareConversation = createConversation()
        getChatIdFromUrlMock.mockReturnValue('shared-123')
        getConversationFromSharePageMock.mockReturnValue(shareConversation)

        const result = await fetchConversation('shared-123', false)

        expect(result).toEqual({
            id: 'shared-123',
            ...shareConversation,
        })
        expect(fetchApiMock).not.toHaveBeenCalled()
        expect(replaceImageAssetsMock).not.toHaveBeenCalled()
    })

    it('uses embedded share data for continue routes that still expose the current share id', async () => {
        const shareConversation = createConversation()
        getChatIdFromUrlMock.mockReturnValue('shared-continue-123')
        getConversationFromSharePageMock.mockReturnValue(shareConversation)

        const result = await fetchConversation('shared-continue-123', false)

        expect(result).toEqual({
            id: 'shared-continue-123',
            ...shareConversation,
        })
        expect(fetchApiMock).not.toHaveBeenCalled()
    })

    it('replaces share assets only when requested', async () => {
        const shareConversation = createConversation()
        getChatIdFromUrlMock.mockReturnValue('shared-123')
        getConversationFromSharePageMock.mockReturnValue(shareConversation)

        await fetchConversation('__share__shared-123', true)

        expect(replaceImageAssetsMock).toHaveBeenCalledTimes(1)
        expect(replaceImageAssetsMock).toHaveBeenCalledWith(shareConversation)
    })

    it('throws a helpful error when shared conversation data is unavailable', async () => {
        await expect(fetchConversation('__share__shared-123', false))
            .rejects
            .toThrow('Shared conversation data was not found for id: shared-123')
        expect(fetchApiMock).not.toHaveBeenCalled()
    })

    it('falls back to the private conversation api for non-share ids', async () => {
        const apiConversation = createConversation({ title: 'Regular conversation' })
        fetchApiMock.mockResolvedValue(apiConversation)

        const result = await fetchConversation('regular-123', false)

        expect(getConversationApiUrlMock).toHaveBeenCalledWith('regular-123')
        expect(fetchApiMock).toHaveBeenCalledWith('https://chatgpt.com/backend-api/conversation/regular-123')
        expect(result).toEqual({
            id: 'regular-123',
            ...apiConversation,
        })
    })
})
