/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

import { fetchSecurityFinding } from '../api'
import type { ApiSecurityFindingsListParams } from '../api'
import type { PageContext } from '../pageContext'

export const DEFAULT_SECURITY_FINDINGS_STATUS = 'new,triaged,in_progress'

export interface SecurityFindingsListFilters extends ApiSecurityFindingsListParams {
    limit?: number
    cursor?: number | string
}

export interface SecurityFindingsFilterSummaryItem {
    label: string
    value: string
}

function getFirstValue(params: URLSearchParams, key: string): string | undefined {
    const value = params.get(key)?.trim()
    return value ? value : undefined
}

function toTitleCase(value: string): string {
    return value
        .split(/[_-]/)
        .filter(Boolean)
        .map(part => part[0].toUpperCase() + part.slice(1))
        .join(' ')
}

function summarizeCsv(value: string): string {
    return value
        .split(',')
        .map(part => part.trim())
        .filter(Boolean)
        .map(toTitleCase)
        .join(', ')
}

export function getSecurityFindingsListFilters(
    search: string = window.location.search,
): SecurityFindingsListFilters {
    const params = new URLSearchParams(search)
    const repo = getFirstValue(params, 'repo')
    const author = getFirstValue(params, 'author')
    const status = getFirstValue(params, 'status') ?? DEFAULT_SECURITY_FINDINGS_STATUS
    const criticality = getFirstValue(params, 'criticality') ?? getFirstValue(params, 'sev')

    return {
        ...(repo ? { repo } : {}),
        ...(author ? { author } : {}),
        ...(status ? { status } : {}),
        ...(criticality ? { criticality } : {}),
    }
}

export async function resolveSecurityFindingsListFilters(
    pageContext: PageContext,
    search: string = window.location.search,
): Promise<SecurityFindingsListFilters> {
    const filters = getSecurityFindingsListFilters(search)
    if (filters.repo || pageContext.kind !== 'security-finding' || !pageContext.findingId) {
        return filters
    }

    const finding = await fetchSecurityFinding(pageContext.findingId)
    return {
        ...filters,
        ...(finding.repo_url ? { repo: finding.repo_url } : {}),
    }
}

export function getSecurityFindingsFilterSummary(
    filters: SecurityFindingsListFilters,
): SecurityFindingsFilterSummaryItem[] {
    const summary: SecurityFindingsFilterSummaryItem[] = []

    if (filters.repo) {
        summary.push({
            label: 'Repository',
            value: filters.repo
                .split(',')
                .map(value => value.trim())
                .filter(Boolean)
                .join(', '),
        })
    }
    if (filters.criticality) {
        summary.push({
            label: 'Severity',
            value: summarizeCsv(filters.criticality),
        })
    }
    if (filters.status) {
        summary.push({
            label: 'Status',
            value: summarizeCsv(filters.status),
        })
    }
    if (filters.author) {
        summary.push({
            label: 'Author',
            value: filters.author,
        })
    }

    return summary
}
