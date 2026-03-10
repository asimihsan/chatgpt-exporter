/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

import { afterEach, describe, expect, it, vi } from 'vitest'

const { getPageContextMock } = vi.hoisted(() => ({
    getPageContextMock: vi.fn(),
}))

vi.mock('../api', () => ({
    fetchResolvedSecurityScanByRepoId: vi.fn(),
    fetchSecurityFinding: vi.fn(),
}))

vi.mock('../pageContext', () => ({
    getPageContext: getPageContextMock,
}))

import { normalizeSecurityFindingDocument } from '../security/normalizeFinding'
import { normalizeSecurityScanDocument } from '../security/normalizeScan'
import {
    getPreferredConfiguredScanIdFromCurrentPage,
    loadCurrentSecurityDocument,
    securityDocumentToHtml,
    securityDocumentToJson,
    securityDocumentToMarkdown,
    securityDocumentToText,
} from './securityDocument'
import { baseUrl } from '../constants'
import type { ApiSecurityFinding, ResolvedSecurityScanBundle } from '../api'
import type { ExportMeta } from '../ui/SettingContext'
import { fetchResolvedSecurityScanByRepoId } from '../api'

function createFinding(overrides: Partial<ApiSecurityFinding> = {}): ApiSecurityFinding {
    return {
        id: 'finding-id',
        hid: 'finding-123',
        repo_id: 'github-123456789',
        repo_url: 'https://github.com/example/example-repo',
        scan_id: 'scan-id',
        configured_scan_id: 'configured-scan-id',
        status: 'open',
        criticality: 'high',
        created_at: '2026-03-09T14:20:07.947627Z',
        updated_at: '2026-03-10T21:21:21.406463Z',
        commit_analysis: {
            reason: 'Finding title',
            description: 'Finding <script>alert(1)</script> description.',
            validation_str: 'Validate this finding.',
            relevant_lines: [
                {
                    path: 'src/server.ts',
                    start_line_number: 10,
                    end_line_number: 12,
                    comment: 'Potential issue',
                    content: 'if (userInput < 2) {\n  return true\n}',
                },
            ],
        },
        proposed_patch: {
            status: 'not_started',
            success: false,
            latest_task: {
                status: 'failed',
            },
        },
        ...overrides,
    } as ApiSecurityFinding
}

function createScanBundle(overrides: Partial<ResolvedSecurityScanBundle> = {}): ResolvedSecurityScanBundle {
    return {
        repoId: 'github-123456789',
        configuredScanId: 'configured-scan-id',
        scanConfiguration: {
            id: 'configured-scan-id',
            owner_id: 'user-1',
            owner: {
                name: 'User Example',
                email: 'user@host.com',
            },
            scan_input: {
                repo_id: 'github-123456789',
                repo_url: 'https://github.com/example/example-repo',
                lookback_days: 30,
                state: 'enabled',
                environment_id: 'env-1',
            },
            scan_type: 'continuous_scan',
            version: 4,
            created_at: '2026-03-07T14:20:07.947627Z',
            updated_at: '2026-03-09T21:21:21.406463Z',
        },
        scanStats: {
            config_id: 'configured-scan-id',
            current_step: 'scanning_commit',
            pending_commits: 1,
            finished_commits: 5,
            failed_commits: 0,
            critical_findings: 0,
            high_findings: 1,
            medium_findings: 2,
            low_findings: 3,
            updated_at: '2026-03-10T12:44:02.780837Z',
        },
        repository: {
            id: 'github-123456789',
            name: 'example-repo',
            repository_full_name: 'example/example-repo',
            clone_url: 'https://github.com/example/example-repo.git',
            default_branch: 'main',
        },
        parsedProjectOverview: {
            threat_model: '## Threats\n\n- Stored <b>unsafe</b> input\n- [click](javascript:alert(1))\n\n![probe](https://attacker.example/pixel)',
            focus_files_and_dirs: ['src/server.ts'],
        },
        ...overrides,
    }
}

describe('securityDocument renderers', () => {
    afterEach(() => {
        vi.unstubAllGlobals()
        vi.clearAllMocks()
    })

    it('renders finding documents to text and markdown', () => {
        const findingDocument = normalizeSecurityFindingDocument(createFinding({
            commit_analysis: {
                title: 'Device code flow allows client impersonation without secret',
                description: 'Finding description.',
                validation_str: 'Validate this finding.',
                relevant_lines: [
                    {
                        path: 'pkg/server/oauth2/http/handlers/devicecode.go',
                        start_line_number: 41,
                        end_line_number: 82,
                        comment: 'InitiateDeviceCode does not authenticate the client.',
                    },
                ],
                attack_path_adjustment_reason: 'The code clearly lacks client authentication in the device-code flow.',
                attack_path_analysis: {
                    attack_path: {
                        ascii: 'Attacker -> /v1/device-code/initiate -> User verifies -> /v1/device-code/poll -> Tokens',
                    },
                    likelihood: {
                        level: 'high',
                        why: 'Attack is plausible but not automatic.',
                    },
                    impact: {
                        level: 'high',
                        why: 'An attacker can mint partner tokens.',
                    },
                },
            },
        }))
        const metaList: ExportMeta[] = [
            { name: 'source', value: '{source}' },
            { name: 'model', value: '{model}' },
        ]

        const text = securityDocumentToText(findingDocument)
        const markdown = securityDocumentToMarkdown(findingDocument, metaList)

        expect(text).toContain('Title: Device code flow allows client impersonation without secret')
        expect(text).toContain('Summary:')
        expect(markdown).toContain('---')
        expect(markdown).toContain(`"source": "${baseUrl}/codex/security/findings/finding-123"`)
        expect(markdown).toContain('"model": ""')
        expect(markdown).toContain('# Device code flow allows client impersonation without secret')
        expect(markdown).toContain('## Summary')
        expect(markdown).toContain('## Validation')
        expect(markdown).toContain('## Evidence')
        expect(markdown).toContain('## Attack-path analysis')
        expect(markdown).toContain('### Path')
        expect(markdown).toContain('### Likelihood')
        expect(markdown).toContain('High - Attack is plausible but not automatic.')
        expect(markdown).toContain('### Impact')
        expect(markdown).toContain('High - An attacker can mint partner tokens.')
    })

    it('renders security html with escaped metadata and section content', () => {
        vi.stubGlobal('document', {
            documentElement: {
                lang: 'en',
                style: {
                    getPropertyValue: () => 'dark',
                },
            },
        })

        const scanDocument = normalizeSecurityScanDocument(createScanBundle())
        const metaList: ExportMeta[] = [
            { name: 'title', value: '<unsafe>' },
        ]

        const html = securityDocumentToHtml(scanDocument, metaList)

        expect(html).toContain('<html lang="en" data-theme="dark">')
        expect(html).toContain('&lt;unsafe&gt;')
        expect(html).toContain('&#x3C;b>unsafe&#x3C;/b>')
        expect(html).not.toContain('<b>unsafe</b>')
        expect(html).not.toContain('<script>alert(1)</script>')
        expect(html).not.toContain('href="javascript:alert(1)"')
        expect(html).toContain('href="#"')
        expect(html).not.toContain('<img')
    })

    it('serializes only the raw payload for security json export', () => {
        const scanDocument = normalizeSecurityScanDocument(createScanBundle())

        expect(JSON.parse(securityDocumentToJson(scanDocument))).toEqual(scanDocument.rawPayload)
        expect(securityDocumentToJson(scanDocument)).not.toContain('parsedProjectOverview')
    })

    it('extracts the preferred configured scan id from current-page resource URLs', () => {
        vi.stubGlobal('performance', {
            now: vi.fn(() => 15_000),
            getEntriesByType: vi.fn(() => [
                { name: 'https://chatgpt.com/backend-api/aardvark/scan_configurations/user-1:github-other/stats', startTime: 14_000 },
                { name: 'https://chatgpt.com/backend-api/aardvark/scan_configurations/user-1:github-123456789', startTime: 14_500 },
            ]),
        })

        expect(getPreferredConfiguredScanIdFromCurrentPage('github-123456789')).toBe('user-1:github-123456789')
    })

    it('prefers the most recent matching configured scan id from current-page resource URLs', () => {
        vi.stubGlobal('performance', {
            now: vi.fn(() => 15_000),
            getEntriesByType: vi.fn(() => [
                { name: 'https://chatgpt.com/backend-api/aardvark/scan_configurations/old-owner:github-123456789', startTime: 13_000 },
                { name: 'https://chatgpt.com/backend-api/aardvark/scan_configurations/new-owner:github-123456789/stats', startTime: 14_500 },
            ]),
        })

        expect(getPreferredConfiguredScanIdFromCurrentPage('github-123456789')).toBe('new-owner:github-123456789')
    })

    it('ignores stale configured scan ids from earlier resource history', () => {
        vi.stubGlobal('performance', {
            now: vi.fn(() => 60_000),
            getEntriesByType: vi.fn(() => [
                { name: 'https://chatgpt.com/backend-api/aardvark/scan_configurations/old-owner:github-123456789', startTime: 10_000 },
            ]),
        })

        expect(getPreferredConfiguredScanIdFromCurrentPage('github-123456789')).toBeNull()
    })

    it('passes the current-page preferred configured scan id into scan document loading', async () => {
        getPageContextMock.mockReturnValue({
            kind: 'security-scan',
            repoId: 'github-123456789',
            findingId: null,
            chatId: null,
            isSharePage: false,
            isShareContinuePage: false,
        })
        vi.stubGlobal('performance', {
            now: vi.fn(() => 15_000),
            getEntriesByType: vi.fn(() => [
                { name: 'https://chatgpt.com/backend-api/aardvark/scan_configurations/user-1:github-123456789/stats', startTime: 14_500 },
            ]),
        })
        vi.mocked(fetchResolvedSecurityScanByRepoId).mockResolvedValueOnce(createScanBundle())

        await loadCurrentSecurityDocument()

        expect(fetchResolvedSecurityScanByRepoId).toHaveBeenCalledWith('github-123456789', {
            preferredConfiguredScanId: 'user-1:github-123456789',
        })
    })

    it('quotes hostile metadata values in markdown frontmatter', () => {
        const findingDocument = normalizeSecurityFindingDocument(createFinding({
            commit_analysis: {
                reason: 'bad\nlayout: pwned',
                description: 'desc',
            },
        }))
        const markdown = securityDocumentToMarkdown(findingDocument, [
            { name: 'title', value: '{title}' },
        ])

        expect(markdown).toContain('"title": "bad\\nlayout: pwned"')
        expect(markdown).toContain('# bad layout: pwned')
    })

    it('escapes markdown-active title syntax in markdown exports', () => {
        const findingDocument = normalizeSecurityFindingDocument(createFinding({
            commit_analysis: {
                reason: '![probe](https://attacker.example/pixel)',
                description: 'desc',
            },
        }))

        const markdown = securityDocumentToMarkdown(findingDocument)

        expect(markdown).toContain('# \\!\\[probe\\]\\(https://attacker\\.example/pixel\\)')
        expect(markdown).not.toContain('# ![probe](https://attacker.example/pixel)')
    })
})
