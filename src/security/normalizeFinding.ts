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
    return getString(commitAnalysis?.title)
        ?? getString(commitAnalysis?.reason)
        ?? getString(commitAnalysis?.description)?.split('. ')[0]
        ?? `Finding ${finding.hid}`
}

function buildSourceUrl(finding: ApiSecurityFinding): string {
    return `${baseUrl}/codex/security/findings/${encodeURIComponent(finding.hid)}`
}

function buildSummarySection(finding: ApiSecurityFinding): SecurityDocumentSection | null {
    const commitAnalysis = asRecord(finding.commit_analysis)
    const description = getString(commitAnalysis?.description)
    const reason = getString(commitAnalysis?.reason)
    const bugsFoundOrFixed = getString(commitAnalysis?.bugs_found_or_fixed)
    const criticality = getString(finding.criticality)
    const status = getString(finding.status)
    const lines = [
        description,
        reason && (reason !== getTitle(finding) || !description) ? `### Reason\n\n${reason}` : null,
        bugsFoundOrFixed ? `### Change impact\n\n${bugsFoundOrFixed}` : null,
        criticality ? `### Severity\n\n${criticality}` : null,
        status ? `### Status\n\n${status}` : null,
    ].filter((value): value is string => Boolean(value))

    if (lines.length === 0) return null

    return {
        id: 'summary',
        title: 'Summary',
        format: 'markdown',
        content: lines.join('\n\n'),
    }
}

function asStringList(value: unknown): string[] {
    if (!Array.isArray(value)) return []

    return value
        .map(item => getString(item))
        .filter((item): item is string => Boolean(item))
}

function buildMarkdownList(items: string[]): string | null {
    if (items.length === 0) return null
    return items.map(item => `- ${item}`).join('\n')
}

function getStructuredLevelSummary(value: unknown): string | null {
    if (typeof value === 'string' && value.trim() !== '') {
        return value.trim()
    }

    const record = asRecord(value)
    if (!record) return null

    const level = getString(record.level)
    const why = getString(record.why)
    if (level && why) {
        return `${level[0].toUpperCase()}${level.slice(1)} - ${why}`
    }
    if (level) {
        return `${level[0].toUpperCase()}${level.slice(1)}`
    }
    if (why) {
        return why
    }

    return null
}

function getValidationArtifactSummary(value: unknown): string | null {
    const record = asRecord(value)
    if (!record) return getString(value)

    const fileName = getString(record.file_name)
    const description = getString(record.description)
    const downloadUrl = getString(record.download_url)
    const sizeBytes = typeof record.size_bytes === 'number' ? record.size_bytes : null

    const lines = [
        fileName ? `Artifact: ${fileName}` : null,
        description ? `Description: ${description}` : null,
        sizeBytes !== null ? `Size: ${sizeBytes} bytes` : null,
        downloadUrl ? `Download URL: ${downloadUrl}` : null,
    ].filter((line): line is string => Boolean(line))

    return lines.length > 0 ? lines.join('\n') : null
}

function buildValidationSection(finding: ApiSecurityFinding): SecurityDocumentSection | null {
    const commitAnalysis = asRecord(finding.commit_analysis)
    const validation = getString(commitAnalysis?.validation_report)
        ?? getString(commitAnalysis?.validation_str)
    const validationRubric = getString(commitAnalysis?.validation_rubric)
    const validationArtifact = getValidationArtifactSummary(commitAnalysis?.validation_artifact)

    const parts = [
        validation,
        validationRubric ? `### Checklist\n\n${validationRubric}` : null,
        validationArtifact ? `Validation artifact: ${validationArtifact}` : null,
    ].filter((value): value is string => Boolean(value))

    if (parts.length === 0) return null

    return {
        id: 'validation',
        title: 'Validation',
        format: 'markdown',
        content: parts.join('\n\n'),
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
    const commitAnalysis = asRecord(finding.commit_analysis)
    const attackPathAnalysis = asRecord(commitAnalysis?.attack_path_analysis)
    const attackPath = asRecord(attackPathAnalysis?.attack_path)
    const legacyAttackPath = getString((finding as Record<string, unknown>).attack_path)
    const narrative = getString(attackPathAnalysis?.narrative)
    const summary = getString(commitAnalysis?.attack_path_adjustment_reason)
        ?? getString(attackPathAnalysis?.adjustment_reason)
        ?? narrative
    const assumptions = asStringList(attackPathAnalysis?.assumptions)
    const controls = asStringList(attackPathAnalysis?.controls)
    const blindspots = asStringList(attackPathAnalysis?.blindspots)

    const parts = [
        legacyAttackPath ?? summary,
        getString(attackPath?.ascii)
            ? `### Path\n\n\`\`\`text\n${getString(attackPath?.ascii)}\n\`\`\``
            : null,
        narrative && narrative !== summary
            ? `### Narrative\n\n${narrative}`
            : null,
        getStructuredLevelSummary(attackPathAnalysis?.likelihood)
            ? `### Likelihood\n\n${getStructuredLevelSummary(attackPathAnalysis?.likelihood)}`
            : null,
        getStructuredLevelSummary(attackPathAnalysis?.impact)
            ? `### Impact\n\n${getStructuredLevelSummary(attackPathAnalysis?.impact)}`
            : null,
        buildMarkdownList(assumptions)
            ? `### Assumptions\n\n${buildMarkdownList(assumptions)}`
            : null,
        buildMarkdownList(controls)
            ? `### Controls\n\n${buildMarkdownList(controls)}`
            : null,
        buildMarkdownList(blindspots)
            ? `### Blindspots\n\n${buildMarkdownList(blindspots)}`
            : null,
        buildMarkdownList(asStringList(attackPathAnalysis?.recommendations))
            ? `### Recommendations\n\n${buildMarkdownList(asStringList(attackPathAnalysis?.recommendations))}`
            : null,
    ].filter((value): value is string => Boolean(value))

    if (parts.length === 0) return null

    return {
        id: 'attack-path',
        title: 'Attack-path analysis',
        format: 'markdown',
        content: parts.join('\n\n'),
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
