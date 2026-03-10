/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

export interface ApiSecurityFinding {
    id: string
    hid: string
    repo_id: string
    repo_url: string
    scan_id: string
    configured_scan_id?: string | null
    criticality?: string | null
    status?: string | null
    created_at?: string | null
    updated_at?: string | null
    [key: string]: unknown
}

export interface ApiSecurityScanConfigurationsResponse {
    items: ApiSecurityScanConfiguration[]
    next_cursor: string | null
}

export interface ApiSecurityScanConfigurationOwner {
    name: string
    email: string
}

export interface ApiSecurityScanInput {
    environment_id?: string | null
    repo_id: string
    repo_url?: string | null
    scan_type?: string | null
    lookback_days?: number | null
    state?: string | null
    project_overview?: string | null
    [key: string]: unknown
}

export interface ApiSecurityScanConfiguration {
    id: string
    workspace_id?: string | null
    owner_id: string
    owner: ApiSecurityScanConfigurationOwner
    scan_input: ApiSecurityScanInput
    scan_type: string
    version: number
    created_at: string
    updated_at: string
    [key: string]: unknown
}

export interface ApiSecurityParsedProjectOverview {
    threat_model?: string
    focus_files_and_dirs?: Array<string | {
        path: string
        focus_reason?: string
        [key: string]: unknown
    }>
    [key: string]: unknown
}

export interface ApiSecurityScanStats {
    config_id: string
    current_step: string
    pending_commits: number
    finished_commits: number
    failed_commits: number
    critical_findings: number
    high_findings: number
    medium_findings: number
    low_findings: number
    updated_at: string
    [key: string]: unknown
}

export interface ApiSecurityGithubRepository {
    id: string
    name: string
    repository_full_name: string
    clone_url: string
    default_branch?: string | null
    visibility?: string | null
    owner?: {
        login: string
        id: number
        type: string
        avatar_url?: string
        url?: string
        [key: string]: unknown
    }
    permissions?: {
        admin?: boolean
        push?: boolean
        pull?: boolean
        [key: string]: unknown
    }
    [key: string]: unknown
}

export interface ResolvedSecurityScanSelection {
    configuredScanId: string
    source: 'preferred' | 'list'
}

export interface ResolvedSecurityScanBundle {
    repoId: string
    configuredScanId: string
    scanConfiguration: ApiSecurityScanConfiguration
    scanStats: ApiSecurityScanStats
    repository: ApiSecurityGithubRepository
    parsedProjectOverview: ApiSecurityParsedProjectOverview | null
}
