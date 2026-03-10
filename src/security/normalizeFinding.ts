/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

import { baseUrl } from '../constants'
import type { ApiSecurityFinding } from '../api'
import type { SecurityDocumentSection, SecurityFindingDocument } from './model'

function toUnixSeconds(value: string | null | undefined): number {
    if (!value) return Math.floor(Date.now() / 1000)

    const parsed = Date.parse(value)
    if (Number.isNaN(parsed)) {
        return Math.floor(Date.now() / 1000)
    }

    return Math.floor(parsed / 1000)
}

function asRecord(value: unknown): Record<string, unknown> | null {
    if (!value || typeof value !== 'object' || Array.isArray(value)) return null
    return value as Record<string, unknown>
}

function getString(value: unknown): string | null {
    return typeof value === 'string' && value.trim() !== '' ? value.trim() : null
}

function getTitle(finding: ApiSecurityFinding): string {
    const commitAnalysis = asRecord(finding.commit_analysis)
    return getString(commitAnalysis?.reason)
        ?? getString(commitAnalysis?.description)?.split('. ')[0]
        ?? `Finding ${finding.hid}`
}

function buildSourceUrl(finding: ApiSecurityFinding): string {
    return `${baseUrl}/codex/security/findings/${encodeURIComponent(finding.hid)}`
}

function buildSummarySection(finding: ApiSecurityFinding): SecurityDocumentSection | null {
    const commitAnalysis = asRecord(finding.commit_analysis)
    const lines = [
        getString(commitAnalysis?.description),
        getString(commitAnalysis?.reason) ? `Reason: ${getString(commitAnalysis?.reason)}` : null,
        getString(commitAnalysis?.bugs_found_or_fixed) ? `Change impact: ${getString(commitAnalysis?.bugs_found_or_fixed)}` : null,
        getString(finding.criticality) ? `Severity: ${getString(finding.criticality)}` : null,
        getString(finding.status) ? `Status: ${getString(finding.status)}` : null,
    ].filter((value): value is string => Boolean(value))

    if (lines.length === 0) return null

    return {
        id: 'summary',
        title: 'Summary',
        format: 'markdown',
        content: lines.join('\n\n'),
    }
}

function buildValidationSection(finding: ApiSecurityFinding): SecurityDocumentSection | null {
    const commitAnalysis = asRecord(finding.commit_analysis)
    const validation = getString(commitAnalysis?.validation_str)
    if (!validation) return null

    return {
        id: 'validation',
        title: 'Validation',
        format: 'markdown',
        content: validation,
    }
}

function buildEvidenceSection(finding: ApiSecurityFinding): SecurityDocumentSection | null {
    const commitAnalysis = asRecord(finding.commit_analysis)
    const relevantLines = Array.isArray(commitAnalysis?.relevant_lines)
        ? commitAnalysis.relevant_lines
        : []

    const evidenceBlocks = relevantLines
        .map((line, index) => {
            const record = asRecord(line)
            if (!record) return null

            const path = getString(record.path) ?? getString(record.file_path) ?? `evidence-${index + 1}`
            const lineRange = typeof record.start_line_number === 'number' && typeof record.end_line_number === 'number'
                ? `:${record.start_line_number}-${record.end_line_number}`
                : ''
            const comment = getString(record.comment)
            const content = getString(record.content)

            return [
                `- \`${path}${lineRange}\``,
                comment ? `  ${comment}` : null,
                content ? `\n\`\`\`\n${content}\n\`\`\`` : null,
            ].filter((value): value is string => Boolean(value)).join('\n')
        })
        .filter((value): value is string => Boolean(value))

    if (evidenceBlocks.length === 0) return null

    return {
        id: 'evidence',
        title: 'Evidence',
        format: 'markdown',
        content: evidenceBlocks.join('\n\n'),
    }
}

function buildAttackPathSection(finding: ApiSecurityFinding): SecurityDocumentSection | null {
    const attackPath = getString((finding as Record<string, unknown>).attack_path)
    if (!attackPath) return null

    return {
        id: 'attack-path',
        title: 'Attack Path',
        format: 'markdown',
        content: attackPath,
    }
}

function buildProposedPatchSection(finding: ApiSecurityFinding): SecurityDocumentSection | null {
    const proposedPatch = asRecord(finding.proposed_patch)
    if (!proposedPatch) return null

    const latestTask = asRecord(proposedPatch.latest_task)
    const lines = [
        getString(proposedPatch.status) ? `Patch status: ${getString(proposedPatch.status)}` : null,
        typeof proposedPatch.success === 'boolean' ? `Patch success: ${String(proposedPatch.success)}` : null,
        getString(latestTask?.status) ? `Latest task status: ${getString(latestTask?.status)}` : null,
        getString(latestTask?.patch_generation_failure_reason) ? `Failure reason: ${getString(latestTask?.patch_generation_failure_reason)}` : null,
        getString(latestTask?.patch_generation_failure_message) ? `Failure message: ${getString(latestTask?.patch_generation_failure_message)}` : null,
    ].filter((value): value is string => Boolean(value))

    if (lines.length === 0) return null

    return {
        id: 'proposed-patch',
        title: 'Proposed Patch',
        format: 'markdown',
        content: lines.join('\n'),
    }
}

export function normalizeSecurityFindingDocument(finding: ApiSecurityFinding): SecurityFindingDocument {
    const title = getTitle(finding)
    const sourceUrl = buildSourceUrl(finding)

    const sections = [
        buildSummarySection(finding),
        buildValidationSection(finding),
        buildEvidenceSection(finding),
        buildAttackPathSection(finding),
        buildProposedPatchSection(finding),
    ].filter((value): value is SecurityDocumentSection => Boolean(value))

    return {
        kind: 'security-finding',
        title,
        sourceUrl,
        metadata: {
            title,
            sourceUrl,
            createTime: toUnixSeconds(finding.created_at),
            updateTime: toUnixSeconds(finding.updated_at),
            findingId: finding.hid,
            repoId: finding.repo_id,
            repoUrl: finding.repo_url,
            configuredScanId: finding.configured_scan_id ?? undefined,
            status: getString(finding.status) ?? undefined,
            criticality: getString(finding.criticality) ?? undefined,
        },
        sections,
        rawPayload: {
            finding,
        },
    }
}
