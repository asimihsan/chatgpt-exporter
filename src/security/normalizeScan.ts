/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

import { baseUrl } from '../constants'
import type { ResolvedSecurityScanBundle } from '../api'
import type { SecurityDocumentSection, SecurityScanDocument } from './model'

function toUnixSeconds(value: string | null | undefined): number {
    if (!value) return Math.floor(Date.now() / 1000)

    const parsed = Date.parse(value)
    if (Number.isNaN(parsed)) {
        return Math.floor(Date.now() / 1000)
    }

    return Math.floor(parsed / 1000)
}

function nonEmptyLines(lines: Array<string | null | undefined>): string {
    return lines.filter((value): value is string => typeof value === 'string' && value.trim() !== '').join('\n')
}

function getOptionalString(value: unknown): string | null {
    return typeof value === 'string' && value.trim() !== '' ? value.trim() : null
}

function buildStatusSection(bundle: ResolvedSecurityScanBundle): SecurityDocumentSection {
    const { scanStats } = bundle

    return {
        id: 'status',
        title: 'Status And Findings',
        format: 'markdown',
        content: nonEmptyLines([
            `Status: ${scanStats.current_step}`,
            `Critical findings: ${scanStats.critical_findings}`,
            `High findings: ${scanStats.high_findings}`,
            `Medium findings: ${scanStats.medium_findings}`,
            `Low findings: ${scanStats.low_findings}`,
        ]),
    }
}

function buildRepositorySection(bundle: ResolvedSecurityScanBundle): SecurityDocumentSection {
    const { scanConfiguration, repository } = bundle

    return {
        id: 'repository',
        title: 'Repository',
        format: 'markdown',
        content: nonEmptyLines([
            `Owner: ${scanConfiguration.owner.name} <${scanConfiguration.owner.email}>`,
            `Repository: ${repository.repository_full_name}`,
            getOptionalString(repository.clone_url) ? `Clone URL: ${getOptionalString(repository.clone_url)}` : null,
            getOptionalString(repository.default_branch) ? `Default branch: ${getOptionalString(repository.default_branch)}` : null,
            getOptionalString(scanConfiguration.scan_input.environment_id) ? `Environment: ${getOptionalString(scanConfiguration.scan_input.environment_id)}` : null,
            getOptionalString(scanConfiguration.scan_input.state) ? `State: ${getOptionalString(scanConfiguration.scan_input.state)}` : null,
        ]),
    }
}

function buildScannedCommitsSection(bundle: ResolvedSecurityScanBundle): SecurityDocumentSection {
    const { scanConfiguration, scanStats } = bundle

    return {
        id: 'scanned-commits',
        title: 'Scanned Commits',
        format: 'markdown',
        content: nonEmptyLines([
            `Finished commits: ${scanStats.finished_commits}`,
            `Pending commits: ${scanStats.pending_commits}`,
            `Failed commits: ${scanStats.failed_commits}`,
            typeof scanConfiguration.scan_input.lookback_days === 'number'
                ? `Lookback days: ${scanConfiguration.scan_input.lookback_days}`
                : null,
        ]),
    }
}

function buildThreatModelSection(bundle: ResolvedSecurityScanBundle): SecurityDocumentSection | null {
    const threatModel = bundle.parsedProjectOverview?.threat_model
    if (!threatModel || threatModel.trim() === '') return null

    return {
        id: 'threat-model',
        title: 'Threat Model',
        format: 'markdown',
        content: threatModel.trim(),
    }
}

function buildFocusFilesSection(bundle: ResolvedSecurityScanBundle): SecurityDocumentSection | null {
    const focusFiles = bundle.parsedProjectOverview?.focus_files_and_dirs
    if (!focusFiles || focusFiles.length === 0) return null

    const lines = focusFiles.map((item) => {
        if (typeof item === 'string') {
            const path = item.trim()
            return path === '' ? null : `- ${path}`
        }

        if (item && typeof item === 'object' && 'path' in item && typeof item.path === 'string') {
            const path = item.path.trim()
            if (path === '') return null
            const reason = 'focus_reason' in item && typeof item.focus_reason === 'string'
                && item.focus_reason.trim() !== ''
                ? `: ${item.focus_reason.trim()}`
                : ''
            return `- ${path}${reason}`
        }

        return null
    }).filter((value): value is string => Boolean(value))

    if (lines.length === 0) return null

    return {
        id: 'focus-files',
        title: 'Focus Files And Directories',
        format: 'markdown',
        content: lines.join('\n'),
    }
}

export function normalizeSecurityScanDocument(bundle: ResolvedSecurityScanBundle): SecurityScanDocument {
    const title = bundle.repository.repository_full_name || bundle.repoId
    const sourceUrl = `${baseUrl}/codex/security/scans/${encodeURIComponent(bundle.repoId)}`

    const sections = [
        buildStatusSection(bundle),
        buildRepositorySection(bundle),
        buildScannedCommitsSection(bundle),
        buildThreatModelSection(bundle),
        buildFocusFilesSection(bundle),
    ].filter((value): value is SecurityDocumentSection => Boolean(value))

    return {
        kind: 'security-scan',
        title,
        sourceUrl,
        metadata: {
            title,
            sourceUrl,
            createTime: toUnixSeconds(bundle.scanConfiguration.created_at),
            updateTime: toUnixSeconds(bundle.scanStats.updated_at || bundle.scanConfiguration.updated_at),
            repoId: bundle.repoId,
            repoUrl: getOptionalString(bundle.scanConfiguration.scan_input.repo_url) ?? undefined,
            configuredScanId: bundle.configuredScanId,
            status: bundle.scanStats.current_step,
        },
        sections,
        rawPayload: {
            repoId: bundle.repoId,
            configuredScanId: bundle.configuredScanId,
            scanConfiguration: bundle.scanConfiguration,
            scanStats: bundle.scanStats,
            repository: bundle.repository,
        },
        parsedProjectOverview: bundle.parsedProjectOverview,
    }
}
