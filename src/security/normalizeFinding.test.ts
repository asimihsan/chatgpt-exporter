/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it } from 'vitest'
import type { ApiSecurityFinding } from '../api'
import { normalizeSecurityFindingDocument } from './normalizeFinding'

function createFinding(overrides: Partial<ApiSecurityFinding> = {}): ApiSecurityFinding {
    return {
        id: 'finding-id',
        hid: '17b5fd57ec1c8191833dd8b866a0bd9e',
        repo_id: 'github-123456789',
        repo_url: 'https://github.com/example/example-repo',
        scan_id: 'scan-id',
        configured_scan_id: 'configured-scan-id',
        criticality: 'high',
        status: 'new',
        created_at: '2026-03-10T04:04:42.167439Z',
        updated_at: '2026-03-10T04:34:37.933915Z',
        commit_analysis: {
            title: 'CI workflow grants AWS OIDC role on pull_request builds',
            description: 'Finding description.',
            reason: 'Finding reason',
            bugs_found_or_fixed: 'Introduced a new issue.',
            validation_str: 'Validated through workflow review.',
            relevant_lines: [
                {
                    path: '/workspace/example-repo/.github/workflows/ci.yml',
                    start_line_number: 3,
                    end_line_number: 9,
                    comment: 'Merge-group trigger was enabled.',
                },
            ],
        },
        proposed_patch: {
            status: 'finished',
            success: false,
            latest_task: {
                status: 'patch_generation_failed',
            },
        },
        ...overrides,
    }
}

describe('normalizeSecurityFindingDocument', () => {
    it('normalizes finding metadata and ordered sections', () => {
        const document = normalizeSecurityFindingDocument(createFinding({
            commit_analysis: {
                title: 'Device code flow allows client impersonation without secret',
                description: 'Introduced device-code endpoints that mint tokens without client_secret enforcement.',
                validation_str: 'Validated through workflow review.',
                validation_rubric: '- [x] Verify PollDeviceCode mints access/refresh tokens after verification without any client_secret check (devicecode.go:257-418).',
                validation_artifact: {
                    file_name: 'devicecode_impersonation.tar.gz',
                    description: 'Conceptual PoC archive.',
                    size_bytes: 1295,
                    download_url: 'https://example.invalid/devicecode_impersonation.tar.gz',
                },
                relevant_lines: [
                    {
                        path: '/workspace/example-repo/.github/workflows/ci.yml',
                        start_line_number: 3,
                        end_line_number: 9,
                        comment: 'Merge-group trigger was enabled.',
                    },
                ],
                attack_path_adjustment_reason: 'The device-code flow lacks client authentication while confidential clients exist.',
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
                    assumptions: ['A user completes device verification.'],
                    controls: ['PKCE verification in PollDeviceCode'],
                    blindspots: ['Production ACLs were not verified.'],
                    recommendations: ['Reject missing client authentication for confidential clients.'],
                },
            },
        }))

        expect(document.kind).toBe('security-finding')
        expect(document.title).toBe('Device code flow allows client impersonation without secret')
        expect(document.metadata.findingId).toBe('17b5fd57ec1c8191833dd8b866a0bd9e')
        expect(document.sections.map(section => section.id)).toEqual([
            'summary',
            'validation',
            'evidence',
            'attack-path',
            'proposed-patch',
        ])
        expect(document.sections[0].title).toBe('Summary')
        expect(document.sections[0].content).toContain('Introduced device-code endpoints')
        expect(document.sections[0].content).toContain('### Repository')
        expect(document.sections[0].content).toContain('### Severity')
        expect(document.sections[0].content).toContain('high')
        expect(document.sections[0].content).toContain('### Status')
        expect(document.sections[0].content).toContain('new')
        expect(document.sections[1].content).toContain('### Checklist')
        expect(document.sections[1].content).toContain('- [x] Verify PollDeviceCode mints access/refresh tokens')
        expect(document.sections[1].content).toContain('Artifact: devicecode_impersonation.tar.gz')
        expect(document.sections[1].content).toContain('Download URL: https://example.invalid/devicecode_impersonation.tar.gz')
        expect(document.sections[2].content).toContain('`/workspace/example-repo/.github/workflows/ci.yml:3-9`')
        expect(document.sections[3].title).toBe('Attack-path analysis')
        expect(document.sections[3].content).toContain('### Path')
        expect(document.sections[3].content).toContain('### Likelihood')
        expect(document.sections[3].content).toContain('High - Attack is plausible but not automatic.')
        expect(document.sections[3].content).toContain('### Impact')
        expect(document.sections[3].content).toContain('High - An attacker can mint partner tokens.')
        expect(document.sections[3].content).toContain('### Recommendations')
    })

    it('degrades cleanly when optional fields are absent', () => {
        const document = normalizeSecurityFindingDocument(createFinding({
            criticality: null,
            configured_scan_id: null,
            commit_analysis: {
                description: 'Only a description remains.',
            },
            proposed_patch: null,
        }))

        expect(document.title).toBe('Only a description remains.')
        expect(document.sections.map(section => section.id)).toEqual(['summary'])
    })

    it('omits the summary section when no summary fields are available', () => {
        const document = normalizeSecurityFindingDocument(createFinding({
            criticality: null,
            status: null,
            commit_analysis: {},
            proposed_patch: null,
        }))

        expect(document.sections).toEqual([
            {
                id: 'summary',
                title: 'Summary',
                format: 'markdown',
                content: '### Repository\n\n[example/example-repo](https://github.com/example/example-repo)',
            },
        ])
    })

    it('keeps a summary section when only reason and finding metadata remain', () => {
        const document = normalizeSecurityFindingDocument(createFinding({
            commit_analysis: {
                reason: 'Reason only',
            },
            proposed_patch: null,
        }))

        expect(document.sections.map(section => section.id)).toContain('summary')
        expect(document.sections[0].content).toContain('### Reason')
        expect(document.sections[0].content).toContain('Reason only')
        expect(document.sections[0].content).toContain('### Severity')
        expect(document.sections[0].content).toContain('high')
        expect(document.sections[0].content).toContain('### Status')
        expect(document.sections[0].content).toContain('new')
    })

    it('drops whitespace-only finding scalars from the summary section', () => {
        const document = normalizeSecurityFindingDocument(createFinding({
            criticality: '   ',
            status: '   ',
            commit_analysis: {
                description: 'Only descriptive text remains.',
            },
        }))

        expect(document.sections[0].content).toBe('Only descriptive text remains.\n\n### Repository\n\n[example/example-repo](https://github.com/example/example-repo)')
    })

    it('formats commit and repository details from finding payload metadata', () => {
        const document = normalizeSecurityFindingDocument(createFinding({
            repo_url: 'https://github.com/example/example-repo',
            commit_analysis: {
                description: 'Finding description.',
                commit_hash: '17d1314fc1bd936f554dad20f2e261860727718c',
                repo_url: 'https://github.com/example/example-repo',
                author: '\'example-author\'',
                author_date: '2025-10-21 10:11:07 -0700',
            },
            proposed_patch: null,
        }))

        expect(document.sections[0].content).toContain('### Commit')
        expect(document.sections[0].content).toContain('[`17d1314`](https://github.com/example/example-repo/commit/17d1314fc1bd936f554dad20f2e261860727718c) 2025-10-21 10:11:07 -0700')
        expect(document.sections[0].content).toContain('by example-author')
        expect(document.sections[0].content).toContain('### Repository')
        expect(document.sections[0].content).toContain('[example/example-repo](https://github.com/example/example-repo)')
    })

    it('keeps repository details when commit-specific metadata is absent', () => {
        const document = normalizeSecurityFindingDocument(createFinding({
            repo_url: 'https://github.com/example/example-repo',
            commit_analysis: {
                description: 'Finding description.',
            },
            proposed_patch: null,
        }))

        expect(document.sections[0].content).not.toContain('### Commit')
        expect(document.sections[0].content).toContain('### Repository')
        expect(document.sections[0].content).toContain('[example/example-repo](https://github.com/example/example-repo)')
    })

    it('falls back to top-level repo_url when commit_analysis repo_url is absent', () => {
        const document = normalizeSecurityFindingDocument(createFinding({
            repo_url: 'https://github.com/example/example-repo',
            commit_analysis: {
                description: 'Finding description.',
                commit_hash: '17d1314fc1bd936f554dad20f2e261860727718c',
            },
            proposed_patch: null,
        }))

        expect(document.sections[0].content).toContain('### Repository')
        expect(document.sections[0].content).toContain('[example/example-repo](https://github.com/example/example-repo)')
    })

    it('trims finding-derived strings in title and metadata', () => {
        const document = normalizeSecurityFindingDocument(createFinding({
            criticality: ' high ',
            status: ' new ',
            commit_analysis: {
                reason: ' Finding reason ',
                description: ' Description with padding. ',
            },
        }))

        expect(document.title).toBe('Finding reason')
        expect(document.metadata.title).toBe('Finding reason')
        expect(document.metadata.criticality).toBe('high')
        expect(document.metadata.status).toBe('new')
        expect(document.sections[0].content).toContain('Description with padding.')
        expect(document.sections[0].content).toContain('### Severity')
        expect(document.sections[0].content).toContain('### Status')
    })

    it('falls back to legacy top-level attack_path strings', () => {
        const document = normalizeSecurityFindingDocument(createFinding({
            attack_path: 'Attacker reaches token exfiltration path.',
            commit_analysis: {
                description: 'Finding description.',
            },
        }))

        const attackPathSection = document.sections.find(section => section.id === 'attack-path')
        expect(attackPathSection?.title).toBe('Attack-path analysis')
        expect(attackPathSection?.content).toBe('Attacker reaches token exfiltration path.')
    })

    it('does not duplicate narrative-only attack-path payloads', () => {
        const document = normalizeSecurityFindingDocument(createFinding({
            commit_analysis: {
                description: 'Finding description.',
                attack_path_analysis: {
                    narrative: 'Narrative only attack path.',
                },
            },
        }))

        const attackPathSection = document.sections.find(section => section.id === 'attack-path')
        expect(attackPathSection?.content).toBe('Narrative only attack path.')
    })
})
