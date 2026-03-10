/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

import type {
    ApiSecurityFinding,
    ApiSecurityGithubRepository,
    ApiSecurityParsedProjectOverview,
    ApiSecurityScanConfiguration,
    ApiSecurityScanStats,
} from '../api'

export type SecurityDocumentKind = 'security-finding' | 'security-scan'

export interface SecurityDocumentSection {
    id: string
    title: string
    content: string
    format: 'markdown'
}

export interface SecurityDocumentMetadata {
    title: string
    sourceUrl: string
    createTime: number
    updateTime: number
    findingId?: string
    repoId?: string
    repoUrl?: string
    configuredScanId?: string
    status?: string | null
    criticality?: string | null
}

export interface SecurityDocument<TRawPayload> {
    kind: SecurityDocumentKind
    title: string
    sourceUrl: string
    metadata: SecurityDocumentMetadata
    sections: SecurityDocumentSection[]
    rawPayload: TRawPayload
}

export interface SecurityFindingRawPayload {
    finding: ApiSecurityFinding
}

export interface SecurityScanRawPayload {
    repoId: string
    configuredScanId: string
    scanConfiguration: ApiSecurityScanConfiguration
    scanStats: ApiSecurityScanStats
    repository: ApiSecurityGithubRepository
}

export type SecurityFindingDocument = SecurityDocument<SecurityFindingRawPayload>
export type SecurityScanDocument = SecurityDocument<SecurityScanRawPayload> & {
    parsedProjectOverview: ApiSecurityParsedProjectOverview | null
}
