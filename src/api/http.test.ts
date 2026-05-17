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
    getLegacyFileDownloadApiUrl,
    getProjectConversationsApiUrl,
    getProjectsApiUrl,
    getSecurityFindingApiUrl,
    getSecurityFindingsApiUrl,
    getSecurityRepoApiUrl,
    getSecurityScanConfigurationApiUrl,
    getSecurityScanConfigurationsApiUrl,
    getSecurityScanConfigurationStatsApiUrl,
} from './http'

vi.mock('../page', () => ({
    getPageAccessToken: () => null,
}))

describe('http api url builders', () => {
    it('encodes path parameters for conversation and file routes', () => {
        expect(getConversationApiUrl('chat/id with spaces')).toBe(`${apiUrl}/conversation/chat%2Fid%20with%20spaces`)
        expect(getFileDownloadApiUrl('file/id')).toBe(`${apiUrl}/files/download/file%2Fid?post_id=&inline=false`)
        expect(getFileDownloadApiUrl('file/id', { conversationId: 'chat/id', inline: true })).toBe(
            `${apiUrl}/files/download/file%2Fid?post_id=&conversation_id=chat%2Fid&inline=true`,
        )
        expect(getLegacyFileDownloadApiUrl('file/id')).toBe(`${apiUrl}/files/file%2Fid/download`)
    })

    it('adds query parameters for collection routes', () => {
        expect(getConversationsApiUrl(5, 20)).toBe(`${apiUrl}/conversations?offset=5&limit=20`)
        expect(getProjectsApiUrl()).toBe(`${apiUrl}/gizmos/snorlax/sidebar?conversations_per_gizmo=0`)
        expect(getProjectConversationsApiUrl('gizmo/id', 10, 50)).toBe(
            `${apiUrl}/gizmos/gizmo%2Fid/conversations?cursor=10&limit=50`,
        )
    })

    it('builds Codex Security API urls with path and query parameters', () => {
        expect(getSecurityFindingApiUrl('finding/id')).toBe(`${apiUrl}/aardvark/scan-findings/finding%2Fid`)
        expect(getSecurityFindingsApiUrl({
            repo: 'https://github.com/example/repo',
            status: 'new,triaged',
            criticality: 'critical,high',
            limit: 20,
            cursor: 0,
        })).toBe(
            `${apiUrl}/aardvark/scan-findings?repo=https%3A%2F%2Fgithub.com%2Fexample%2Frepo&status=new%2Ctriaged&criticality=critical%2Chigh&limit=20&cursor=0`,
        )
        expect(getSecurityScanConfigurationApiUrl('scan:id')).toBe(`${apiUrl}/aardvark/scan_configurations/scan:id`)
        expect(getSecurityScanConfigurationStatsApiUrl('scan:id')).toBe(`${apiUrl}/aardvark/scan_configurations/scan:id/stats`)
        expect(getSecurityScanConfigurationApiUrl('scan:id with spaces')).toBe(`${apiUrl}/aardvark/scan_configurations/scan:id%20with%20spaces`)
        expect(getSecurityRepoApiUrl('github-123456789')).toBe(`${apiUrl}/wham/github/repositories/github-123456789`)
        expect(getSecurityScanConfigurationsApiUrl({ repoId: 'github-123456789', limit: 1 })).toBe(
            `${apiUrl}/aardvark/scan_configurations?repo_id=github-123456789&limit=1`,
        )
    })
})
