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
            attack_path: 'Attacker modifies the workflow and exfiltrates the token.',
        }))

        expect(document.kind).toBe('security-finding')
        expect(document.title).toBe('Finding reason')
        expect(document.metadata.findingId).toBe('17b5fd57ec1c8191833dd8b866a0bd9e')
        expect(document.sections.map(section => section.id)).toEqual([
            'summary',
            'validation',
            'evidence',
            'attack-path',
            'proposed-patch',
        ])
        expect(document.sections[0].content).toContain('Severity: high')
        expect(document.sections[2].content).toContain('`/workspace/example-repo/.github/workflows/ci.yml:3-9`')
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

        expect(document.sections).toEqual([])
    })

    it('drops whitespace-only finding scalars from the summary section', () => {
        const document = normalizeSecurityFindingDocument(createFinding({
            criticality: '   ',
            status: '   ',
            commit_analysis: {
                description: 'Only descriptive text remains.',
            },
        }))

        expect(document.sections[0].content).toBe('Only descriptive text remains.')
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
        expect(document.sections[0].content).toContain('Severity: high')
        expect(document.sections[0].content).toContain('Status: new')
    })
})
