/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it } from 'vitest'
import type { ResolvedSecurityScanBundle } from '../api'
import { normalizeSecurityScanDocument } from './normalizeScan'

function createBundle(overrides: Partial<ResolvedSecurityScanBundle> = {}): ResolvedSecurityScanBundle {
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
                lookback_days: 60,
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
            pending_commits: 0,
            finished_commits: 500,
            failed_commits: 0,
            critical_findings: 0,
            high_findings: 4,
            medium_findings: 20,
            low_findings: 48,
            updated_at: '2026-03-10T12:44:02.780837Z',
        },
        repository: {
            id: 'github-123456789',
            name: 'example-repo',
            repository_full_name: 'example/example-repo',
            clone_url: 'https://github.com/example/example-repo.git',
            default_branch: 'master',
        },
        parsedProjectOverview: {
            threat_model: '## 1. Overview',
            focus_files_and_dirs: [
                { path: 'pkg/server', focus_reason: 'Core API handlers' },
                'cmd',
            ],
        },
        ...overrides,
    }
}

describe('normalizeSecurityScanDocument', () => {
    it('normalizes scan metadata and ordered sections', () => {
        const document = normalizeSecurityScanDocument(createBundle())

        expect(document.kind).toBe('security-scan')
        expect(document.title).toBe('example/example-repo')
        expect(document.metadata.repoId).toBe('github-123456789')
        expect(document.metadata.status).toBe('scanning_commit')
        expect(document.sections.map(section => section.id)).toEqual([
            'status',
            'repository',
            'scanned-commits',
            'threat-model',
            'focus-files',
        ])
        expect(document.sections[0].content).toContain('High findings: 4')
        expect(document.sections[4].content).toContain('pkg/server: Core API handlers')
        expect(document.rawPayload).toEqual({
            repoId: 'github-123456789',
            configuredScanId: 'configured-scan-id',
            scanConfiguration: expect.any(Object),
            scanStats: expect.any(Object),
            repository: expect.any(Object),
        })
        expect(document.parsedProjectOverview).toEqual({
            threat_model: '## 1. Overview',
            focus_files_and_dirs: [
                { path: 'pkg/server', focus_reason: 'Core API handlers' },
                'cmd',
            ],
        })
    })

    it('degrades cleanly when threat model and focus files are absent', () => {
        const document = normalizeSecurityScanDocument(createBundle({
            parsedProjectOverview: null,
        }))

        expect(document.sections.map(section => section.id)).toEqual([
            'status',
            'repository',
            'scanned-commits',
        ])
    })

    it('drops whitespace-only threat-model and focus-file entries', () => {
        const document = normalizeSecurityScanDocument(createBundle({
            parsedProjectOverview: {
                threat_model: '   ',
                focus_files_and_dirs: ['   ', { path: '  ', focus_reason: '  ' }],
            },
        }))

        expect(document.sections.map(section => section.id)).toEqual([
            'status',
            'repository',
            'scanned-commits',
        ])
    })

    it('drops whitespace-only optional repository scalars from metadata and sections', () => {
        const document = normalizeSecurityScanDocument(createBundle({
            scanConfiguration: {
                ...createBundle().scanConfiguration,
                scan_input: {
                    ...createBundle().scanConfiguration.scan_input,
                    repo_url: '   ',
                    environment_id: '   ',
                    state: '   ',
                },
            },
            repository: {
                ...createBundle().repository,
                clone_url: '   ',
                default_branch: '   ',
            },
        }))

        expect(document.metadata.repoUrl).toBeUndefined()
        expect(document.sections[1].content).not.toContain('Clone URL:')
        expect(document.sections[1].content).not.toContain('Default branch:')
        expect(document.sections[1].content).not.toContain('Environment:')
        expect(document.sections[1].content).not.toContain('State:')
    })
})
