/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ApiHttpError } from './http'
import type {
    ApiSecurityGithubRepository,
    ApiSecurityScanConfiguration,
    ApiSecurityScanStats,
} from './securityTypes'

const {
    ApiHttpErrorMock,
    fetchApiMock,
    getSecurityFindingApiUrlMock,
    getSecurityRepoApiUrlMock,
    getSecurityScanConfigurationApiUrlMock,
    getSecurityScanConfigurationsApiUrlMock,
    getSecurityScanConfigurationStatsApiUrlMock,
} = vi.hoisted(() => ({
    ApiHttpErrorMock: class ApiHttpError extends Error {
        status: number
        statusText: string
        url: string

        constructor(url: string, response: { status: number, statusText: string }) {
            super(`${response.status} ${response.statusText}`.trim())
            this.name = 'ApiHttpError'
            this.status = response.status
            this.statusText = response.statusText
            this.url = url
        }
    },
    fetchApiMock: vi.fn(),
    getSecurityFindingApiUrlMock: vi.fn((id: string) => `finding:${id}`),
    getSecurityRepoApiUrlMock: vi.fn((id: string) => `repo:${id}`),
    getSecurityScanConfigurationApiUrlMock: vi.fn((id: string) => `scan:${id}`),
    getSecurityScanConfigurationsApiUrlMock: vi.fn((params: unknown) => `scan-configurations:${JSON.stringify(params)}`),
    getSecurityScanConfigurationStatsApiUrlMock: vi.fn((id: string) => `scan-stats:${id}`),
}))

vi.mock('./http', () => ({
    ApiHttpError: ApiHttpErrorMock,
    fetchApi: fetchApiMock,
    getSecurityFindingApiUrl: getSecurityFindingApiUrlMock,
    getSecurityRepoApiUrl: getSecurityRepoApiUrlMock,
    getSecurityScanConfigurationApiUrl: getSecurityScanConfigurationApiUrlMock,
    getSecurityScanConfigurationsApiUrl: getSecurityScanConfigurationsApiUrlMock,
    getSecurityScanConfigurationStatsApiUrl: getSecurityScanConfigurationStatsApiUrlMock,
}))

import {
    fetchResolvedSecurityScanByRepoId,
    parseSecurityProjectOverview,
    resolveSecurityScanSelection,
} from './securityApi'

function createScanConfiguration(
    overrides: Partial<ApiSecurityScanConfiguration> = {},
): ApiSecurityScanConfiguration {
    return {
        id: 'scan-config-1',
        owner_id: 'user-1',
        owner: {
            name: 'User Example',
            email: 'user@host.com',
        },
        scan_input: {
            repo_id: 'github-123456789',
            repo_url: 'https://github.com/example/example-repo',
            project_overview: null,
        },
        scan_type: 'continuous_scan',
        version: 4,
        created_at: '2026-03-07T14:20:07.947627Z',
        updated_at: '2026-03-09T21:21:21.406463Z',
        ...overrides,
    }
}

function createScanStats(
    overrides: Partial<ApiSecurityScanStats> = {},
): ApiSecurityScanStats {
    return {
        config_id: 'scan-config-1',
        current_step: 'scanning_commit',
        pending_commits: 0,
        finished_commits: 500,
        failed_commits: 0,
        critical_findings: 0,
        high_findings: 4,
        medium_findings: 20,
        low_findings: 48,
        updated_at: '2026-03-10T12:44:02.780837Z',
        ...overrides,
    }
}

function createRepository(
    overrides: Partial<ApiSecurityGithubRepository> = {},
): ApiSecurityGithubRepository {
    return {
        id: 'github-123456789',
        name: 'example-repo',
        repository_full_name: 'example/example-repo',
        clone_url: 'https://github.com/example/example-repo.git',
        default_branch: 'master',
        ...overrides,
    }
}

describe('securityApi', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('parses project overview JSON safely', () => {
        expect(parseSecurityProjectOverview(JSON.stringify({
            threat_model: '## 1. Overview',
            focus_files_and_dirs: ['pkg/server', 'cmd'],
            extra: true,
        }))).toEqual({
            threat_model: '## 1. Overview',
            focus_files_and_dirs: ['pkg/server', 'cmd'],
            extra: true,
        })
    })

    it('returns null for malformed project overview JSON', () => {
        expect(parseSecurityProjectOverview('{bad json')).toBeNull()
        expect(parseSecurityProjectOverview(null)).toBeNull()
    })

    it('drops malformed reserved project overview fields while preserving unrelated extras', () => {
        expect(parseSecurityProjectOverview(JSON.stringify({
            threat_model: {},
            focus_files_and_dirs: 'src',
            extra: true,
        }))).toEqual({
            extra: true,
        })
    })

    it('drops whitespace-only reserved project overview fields entirely', () => {
        expect(parseSecurityProjectOverview(JSON.stringify({
            threat_model: '   ',
            focus_files_and_dirs: ['   ', { path: '  ', focus_reason: '  ' }],
            extra: true,
        }))).toEqual({
            extra: true,
        })
    })

    it('prefers a validated configured scan id when provided', async () => {
        fetchApiMock.mockResolvedValueOnce(createScanConfiguration({
            id: 'preferred-scan',
            scan_input: {
                repo_id: 'github-123456789',
                repo_url: 'https://github.com/example/example-repo',
            },
        }))

        await expect(resolveSecurityScanSelection('github-123456789', {
            preferredConfiguredScanId: 'preferred-scan',
        })).resolves.toEqual({
            configuredScanId: 'preferred-scan',
            source: 'preferred',
        })
    })

    it('fails closed when a preferred configured scan id belongs to a different repo', async () => {
        fetchApiMock.mockResolvedValueOnce(createScanConfiguration({
            id: 'preferred-scan',
            scan_input: {
                repo_id: 'github-other',
                repo_url: 'https://github.com/example/other',
            },
        }))

        await expect(resolveSecurityScanSelection('github-123456789', {
            preferredConfiguredScanId: 'preferred-scan',
        }))
            .rejects
            .toThrow('Preferred scan preferred-scan does not belong to repo github-123456789.')
    })

    it('falls back to repo list resolution when a preferred configured scan id returns 403', async () => {
        fetchApiMock
            .mockRejectedValueOnce(new ApiHttpError('scan:preferred-scan', {
                status: 403,
                statusText: 'Forbidden',
            }))
            .mockResolvedValueOnce({
                items: [createScanConfiguration({ id: 'scan-1' })],
                next_cursor: null,
            })

        await expect(resolveSecurityScanSelection('github-123456789', {
            preferredConfiguredScanId: 'preferred-scan',
        })).resolves.toEqual({
            configuredScanId: 'scan-1',
            source: 'list',
        })
    })

    it('falls back to repo list resolution when a preferred configured scan id returns 404', async () => {
        fetchApiMock
            .mockRejectedValueOnce(new ApiHttpError('scan:preferred-scan', {
                status: 404,
                statusText: 'Not Found',
            }))
            .mockResolvedValueOnce({
                items: [createScanConfiguration({ id: 'scan-1' })],
                next_cursor: null,
            })

        await expect(resolveSecurityScanSelection('github-123456789', {
            preferredConfiguredScanId: 'preferred-scan',
        })).resolves.toEqual({
            configuredScanId: 'scan-1',
            source: 'list',
        })
    })

    it('fails closed when a preferred configured scan id returns a non-recoverable error', async () => {
        fetchApiMock.mockRejectedValueOnce(new ApiHttpError('scan:preferred-scan', {
            status: 500,
            statusText: 'Internal Server Error',
        }))

        await expect(resolveSecurityScanSelection('github-123456789', {
            preferredConfiguredScanId: 'preferred-scan',
        }))
            .rejects
            .toThrow('500 Internal Server Error')
    })

    it('fails closed when no scan configuration matches the repo', async () => {
        fetchApiMock.mockResolvedValueOnce({
            items: [],
            next_cursor: null,
        })

        await expect(resolveSecurityScanSelection('github-123456789'))
            .rejects
            .toThrow('No scan configuration found for repo github-123456789.')
    })

    it('fails closed when multiple scan configurations match the repo', async () => {
        fetchApiMock.mockResolvedValueOnce({
            items: [
                createScanConfiguration({ id: 'scan-1' }),
                createScanConfiguration({ id: 'scan-2' }),
            ],
            next_cursor: null,
        })

        await expect(resolveSecurityScanSelection('github-123456789'))
            .rejects
            .toThrow('Multiple scan configurations found for repo github-123456789.')
    })

    it('fails closed when scan configuration pagination is required', async () => {
        fetchApiMock.mockResolvedValueOnce({
            items: [createScanConfiguration({ id: 'scan-1' })],
            next_cursor: 'next-page',
        })

        await expect(resolveSecurityScanSelection('github-123456789'))
            .rejects
            .toThrow('Multiple scan configurations exist for repo github-123456789; pagination was required.')
    })

    it('composes a resolved scan bundle and parses project overview', async () => {
        fetchApiMock
            .mockResolvedValueOnce({
                items: [createScanConfiguration({ id: 'scan-1' })],
                next_cursor: null,
            })
            .mockResolvedValueOnce(createScanConfiguration({
                id: 'scan-1',
                scan_input: {
                    repo_id: 'github-123456789',
                    repo_url: 'https://github.com/example/example-repo',
                    project_overview: JSON.stringify({
                        threat_model: '## 1. Overview',
                        focus_files_and_dirs: ['pkg/server'],
                    }),
                },
            }))
            .mockResolvedValueOnce(createScanStats({ config_id: 'scan-1' }))
            .mockResolvedValueOnce(createRepository())

        await expect(fetchResolvedSecurityScanByRepoId('github-123456789')).resolves.toEqual({
            repoId: 'github-123456789',
            configuredScanId: 'scan-1',
            scanConfiguration: expect.objectContaining({ id: 'scan-1' }),
            scanStats: expect.objectContaining({ config_id: 'scan-1' }),
            repository: expect.objectContaining({ id: 'github-123456789' }),
            parsedProjectOverview: {
                threat_model: '## 1. Overview',
                focus_files_and_dirs: ['pkg/server'],
            },
        })
    })
})
