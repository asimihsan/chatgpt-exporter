/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it, vi } from 'vitest'
import { apiUrl } from '../constants'
import {
    getConversationApiUrl,
    getConversationsApiUrl,
    getFileDownloadApiUrl,
    getProjectConversationsApiUrl,
    getProjectsApiUrl,
} from './http'

vi.mock('../page', () => ({
    getPageAccessToken: () => null,
}))

describe('http api url builders', () => {
    it('encodes path parameters for conversation and file routes', () => {
        expect(getConversationApiUrl('chat/id with spaces')).toBe(`${apiUrl}/conversation/chat%2Fid%20with%20spaces`)
        expect(getFileDownloadApiUrl('file/id')).toBe(`${apiUrl}/files/file%2Fid/download`)
    })

    it('adds query parameters for collection routes', () => {
        expect(getConversationsApiUrl(5, 20)).toBe(`${apiUrl}/conversations?offset=5&limit=20`)
        expect(getProjectsApiUrl()).toBe(`${apiUrl}/gizmos/snorlax/sidebar?conversations_per_gizmo=0`)
        expect(getProjectConversationsApiUrl('gizmo/id', 10, 50)).toBe(
            `${apiUrl}/gizmos/gizmo%2Fid/conversations?cursor=10&limit=50`,
        )
    })
})
