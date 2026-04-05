/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it, vi } from 'vitest'
import {
    DEFAULT_SECURITY_FINDINGS_STATUS,
    getSecurityFindingsFilterSummary,
    getSecurityFindingsListFilters,
    resolveSecurityFindingsListFilters,
} from './findingsListFilters'

const { fetchSecurityFindingMock } = vi.hoisted(() => ({
    fetchSecurityFindingMock: vi.fn(),
}))

vi.mock('../api', () => ({
    fetchSecurityFinding: fetchSecurityFindingMock,
}))

describe('findingsListFilters', () => {
    it('maps findings route query parameters to list API filters', () => {
        expect(getSecurityFindingsListFilters('?sev=critical,high&repo=https%3A%2F%2Fgithub.com%2Fexample%2Frepo&author=user%40example.com')).toEqual({
            criticality: 'critical,high',
            repo: 'https://github.com/example/repo',
            author: 'user@example.com',
            status: DEFAULT_SECURITY_FINDINGS_STATUS,
        })
    })

    it('preserves explicit status and criticality query parameters', () => {
        expect(getSecurityFindingsListFilters('?status=resolved&criticality=low')).toEqual({
            status: 'resolved',
            criticality: 'low',
        })
    })

    it('resolves a finding detail page back to its repo when no repo filter is present', async () => {
        fetchSecurityFindingMock.mockResolvedValueOnce({
            repo_url: 'https://github.com/example/repo',
        })

        await expect(resolveSecurityFindingsListFilters({
            kind: 'security-finding',
            chatId: null,
            findingId: 'finding-123',
            repoId: null,
            isSharePage: false,
            isShareContinuePage: false,
        }, '?sev=critical,high')).resolves.toEqual({
            repo: 'https://github.com/example/repo',
            criticality: 'critical,high',
            status: DEFAULT_SECURITY_FINDINGS_STATUS,
        })
    })

    it('builds a human-readable filter summary', () => {
        expect(getSecurityFindingsFilterSummary({
            repo: 'https://github.com/example/repo',
            criticality: 'critical,high',
            status: 'new,in_progress',
            author: 'user@example.com',
        })).toEqual([
            { label: 'Repository', value: 'https://github.com/example/repo' },
            { label: 'Severity', value: 'Critical, High' },
            { label: 'Status', value: 'New, In Progress' },
            { label: 'Author', value: 'user@example.com' },
        ])
    })
})
