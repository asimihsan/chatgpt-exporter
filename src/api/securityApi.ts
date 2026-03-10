/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

import {
    ApiHttpError,
    fetchApi,
    getSecurityFindingApiUrl,
    getSecurityRepoApiUrl,
    getSecurityScanConfigurationApiUrl,
    getSecurityScanConfigurationsApiUrl,
    getSecurityScanConfigurationStatsApiUrl,
} from './http'
import type {
    ApiSecurityFinding,
    ApiSecurityGithubRepository,
    ApiSecurityParsedProjectOverview,
    ApiSecurityScanConfiguration,
    ApiSecurityScanConfigurationsResponse,
    ApiSecurityScanStats,
    ResolvedSecurityScanBundle,
    ResolvedSecurityScanSelection,
} from './securityTypes'

export async function fetchSecurityFinding(findingId: string): Promise<ApiSecurityFinding> {
    return fetchApi<ApiSecurityFinding>(getSecurityFindingApiUrl(findingId))
}

export async function fetchSecurityScanConfigurations(
    params: {
        repoId?: string
        limit?: number
        cursor?: number | string
    } = {},
): Promise<ApiSecurityScanConfigurationsResponse> {
    return fetchApi<ApiSecurityScanConfigurationsResponse>(getSecurityScanConfigurationsApiUrl(params))
}

export async function fetchSecurityScan(configuredScanId: string): Promise<ApiSecurityScanConfiguration> {
    return fetchApi<ApiSecurityScanConfiguration>(getSecurityScanConfigurationApiUrl(configuredScanId))
}

export async function fetchSecurityScanStats(configuredScanId: string): Promise<ApiSecurityScanStats> {
    return fetchApi<ApiSecurityScanStats>(getSecurityScanConfigurationStatsApiUrl(configuredScanId))
}

export async function fetchSecurityRepo(repoId: string): Promise<ApiSecurityGithubRepository> {
    return fetchApi<ApiSecurityGithubRepository>(getSecurityRepoApiUrl(repoId))
}

export function parseSecurityProjectOverview(
    projectOverview: unknown,
): ApiSecurityParsedProjectOverview | null {
    if (typeof projectOverview !== 'string' || projectOverview.trim() === '') {
        return null
    }

    try {
        const parsed = JSON.parse(projectOverview) as unknown
        if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
            return null
        }

        const value = parsed as Record<string, unknown>
        const {
            threat_model: _rawThreatModel,
            focus_files_and_dirs: _rawFocusFilesAndDirs,
            ...rest
        } = value
        const threatModel = typeof value.threat_model === 'string' && value.threat_model.trim() !== ''
            ? value.threat_model.trim()
            : undefined
        const focusFilesAndDirs = Array.isArray(value.focus_files_and_dirs)
            ? value.focus_files_and_dirs.filter((item): item is string | { path: string, focus_reason?: string } => {
                if (typeof item === 'string') return item.trim() !== ''
                if (!item || typeof item !== 'object' || Array.isArray(item)) return false

                const record = item as Record<string, unknown>
                return typeof record.path === 'string'
                    && record.path.trim() !== ''
                    && (record.focus_reason === undefined || typeof record.focus_reason === 'string')
            }).map((item) => {
                if (typeof item === 'string') {
                    return item.trim()
                }

                return {
                    ...item,
                    path: item.path.trim(),
                    ...(typeof item.focus_reason === 'string' && item.focus_reason.trim() !== ''
                        ? { focus_reason: item.focus_reason.trim() }
                        : {}),
                }
            })
            : undefined
        const sanitizedFocusFilesAndDirs = focusFilesAndDirs && focusFilesAndDirs.length > 0
            ? focusFilesAndDirs
            : undefined

        return {
            ...rest,
            ...(threatModel ? { threat_model: threatModel } : {}),
            ...(sanitizedFocusFilesAndDirs ? { focus_files_and_dirs: sanitizedFocusFilesAndDirs } : {}),
        }
    }
    catch {
        return null
    }
}

export async function resolveSecurityScanSelection(
    repoId: string,
    options: {
        preferredConfiguredScanId?: string | null
        limit?: number
    } = {},
): Promise<ResolvedSecurityScanSelection> {
    const { preferredConfiguredScanId = null, limit = 100 } = options

    if (preferredConfiguredScanId) {
        try {
            const preferredScan = await fetchSecurityScan(preferredConfiguredScanId)
            if (preferredScan.scan_input.repo_id !== repoId) {
                throw new Error(`Preferred scan ${preferredConfiguredScanId} does not belong to repo ${repoId}.`)
            }

            return {
                configuredScanId: preferredScan.id,
                source: 'preferred',
            }
        }
        catch (error) {
            if (!isRecoverablePreferredScanLookupError(error)) {
                throw error
            }
        }
    }

    const response = await fetchSecurityScanConfigurations({ repoId, limit })
    const matchingScans = response.items.filter(scan => scan.scan_input.repo_id === repoId)

    if (response.next_cursor !== null) {
        throw new Error(`Multiple scan configurations exist for repo ${repoId}; pagination was required.`)
    }
    if (matchingScans.length === 0) {
        throw new Error(`No scan configuration found for repo ${repoId}.`)
    }
    if (matchingScans.length > 1) {
        throw new Error(`Multiple scan configurations found for repo ${repoId}.`)
    }

    return {
        configuredScanId: matchingScans[0].id,
        source: 'list',
    }
}

function isRecoverablePreferredScanLookupError(error: unknown): boolean {
    return error instanceof ApiHttpError
        && (error.status === 403 || error.status === 404)
}

export async function fetchResolvedSecurityScanByRepoId(
    repoId: string,
    options: {
        preferredConfiguredScanId?: string | null
        limit?: number
    } = {},
): Promise<ResolvedSecurityScanBundle> {
    const selection = await resolveSecurityScanSelection(repoId, options)
    const [scanConfiguration, scanStats, repository] = await Promise.all([
        fetchSecurityScan(selection.configuredScanId),
        fetchSecurityScanStats(selection.configuredScanId),
        fetchSecurityRepo(repoId),
    ])

    return {
        repoId,
        configuredScanId: selection.configuredScanId,
        scanConfiguration,
        scanStats,
        repository,
        parsedProjectOverview: parseSecurityProjectOverview(scanConfiguration.scan_input.project_overview),
    }
}
