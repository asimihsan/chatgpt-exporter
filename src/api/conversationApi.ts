/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

import { getChatIdFromUrl, getConversationFromSharePage, isSharePage } from '../page'
import { replaceImageAssets } from './assets'
import {
    fetchApi,
    getConversationApiUrl,
    getConversationsApiUrl,
    getProjectConversationsApiUrl,
    getProjectsApiUrl,
} from './http'
import type {
    ApiConversation,
    ApiConversationItem,
    ApiConversations,
    ApiConversationWithId,
    ApiGizmo,
    ApiProjectInfo,
} from './types'

export async function getCurrentChatId(): Promise<string> {
    if (isSharePage()) {
        return `__share__${getChatIdFromUrl()}`
    }

    const chatId = getChatIdFromUrl()
    if (chatId) return chatId

    const conversations = await fetchConversations()
    if (conversations && conversations.items.length > 0) {
        return conversations.items[0].id
    }

    throw new Error('No chat id found.')
}

export async function fetchConversation(chatId: string, shouldReplaceAssets: boolean): Promise<ApiConversationWithId> {
    if (chatId.startsWith('__share__')) {
        const id = chatId.replace('__share__', '')
        const shareConversation = getConversationFromSharePage() as ApiConversation
        await replaceImageAssets(shareConversation)

        return {
            id,
            ...shareConversation,
        }
    }

    const url = getConversationApiUrl(chatId)
    const conversation = await fetchApi<ApiConversation>(url)

    if (shouldReplaceAssets) {
        await replaceImageAssets(conversation)
    }

    return {
        id: chatId,
        ...conversation,
    }
}

export async function fetchProjects(): Promise<ApiProjectInfo[]> {
    const url = getProjectsApiUrl()
    const { items } = await fetchApi<{ items: ApiGizmo[] }>(url)
    return items.map(gizmo => (gizmo.gizmo.gizmo))
}

async function fetchConversations(offset = 0, limit = 20, project: string | null = null): Promise<ApiConversations> {
    if (project) {
        return fetchProjectConversations(project, offset, limit)
    }
    const url = getConversationsApiUrl(offset, limit)
    return fetchApi(url)
}

async function fetchProjectConversations(project: string, offset = 0, limit = 20): Promise<ApiConversations> {
    const url = getProjectConversationsApiUrl(project, offset, limit)
    const { items } = await fetchApi<{ items: ApiConversationItem[]; cursor: number | null }>(url)
    return {
        has_missing_conversations: false,
        items,
        limit,
        offset,
        total: null,
    }
}

export async function fetchAllConversations(project: string | null = null, maxConversations = 1000): Promise<ApiConversationItem[]> {
    const conversations: ApiConversationItem[] = []
    const limit = project === null ? 100 : 50 // gizmos api uses a smaller limit
    let offset = 0
    while (true) {
        try {
            const result = project === null
                ? await fetchConversations(offset, limit)
                : await fetchProjectConversations(project, offset, limit)
            if (!result.items) {
                // Handle potential API errors or empty responses
                console.warn('fetchAllConversations received no items at offset:', offset)
                break
            }
            conversations.push(...result.items)
            if (result.items.length === 0) break
            // Stop if we've reached the total reported by the API OR the user-defined limit
            if (result.total !== null && offset + limit >= result.total) break
            if (conversations.length >= maxConversations) break
            offset += limit
        }
        catch (error) {
            console.error('Error fetching conversations batch:', error)
            break
        }
    }
    // Ensure we don't return more than the requested limit if the last batch pushed us over
    return conversations.slice(0, maxConversations)
}

export async function archiveConversation(chatId: string): Promise<boolean> {
    const url = getConversationApiUrl(chatId)
    const { success } = await fetchApi<{ success: boolean }>(url, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_archived: true }),
    })
    return success
}

export async function deleteConversation(chatId: string): Promise<boolean> {
    const url = getConversationApiUrl(chatId)
    const { success } = await fetchApi<{ success: boolean }>(url, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_visible: false }),
    })
    return success
}
