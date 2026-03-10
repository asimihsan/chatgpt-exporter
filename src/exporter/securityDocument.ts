/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

import templateHtml from '../template.html?raw'
import {
    fetchResolvedSecurityScanByRepoId,
    fetchSecurityFinding,
} from '../api'
import { baseUrl } from '../constants'
import { getPageContext } from '../pageContext'
import { normalizeSecurityFindingDocument } from '../security/normalizeFinding'
import { normalizeSecurityScanDocument } from '../security/normalizeScan'
import { fromMarkdown, toHtml } from '../utils/markdown'
import { dateStr, getColorScheme, timestamp, unixTimestampToISOString } from '../utils/utils'
import type { SecurityDocument } from '../security/model'
import type { ExportMeta } from '../ui/SettingContext'

function escapeHtml(input: string): string {
    return input
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll('\'', '&#039;')
}

function escapeSecurityMarkdownSource(input: string): string {
    return input
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
}

function isUnsafeUrl(url: string): boolean {
    const normalized = url
        .replaceAll(/&#(?:x3a|58|X3A|X58);/g, ':')
        .replaceAll(/[\u0000-\u001F\u007F\s]+/g, '')
        .toLowerCase()

    return normalized.startsWith('javascript:')
        || normalized.startsWith('vbscript:')
        || normalized.startsWith('data:text/html')
}

function sanitizeRenderedSecurityHtml(input: string): string {
    const withoutRemoteImages = input.replace(/<img\b[^>]*>/gi, '')

    return withoutRemoteImages.replace(/\s(href|src)=("([^"]*)"|'([^']*)')/gi, (match, attribute, _quotedValue, doubleQuotedValue, singleQuotedValue) => {
        const value = typeof doubleQuotedValue === 'string' ? doubleQuotedValue : singleQuotedValue
        if (!value || !isUnsafeUrl(value)) return match
        return ` ${attribute}="#"`
    })
}

export function getPreferredConfiguredScanIdFromCurrentPage(repoId: string): string | null {
    if (typeof globalThis.performance?.getEntriesByType !== 'function') {
        return null
    }

    const now = typeof globalThis.performance.now === 'function'
        ? globalThis.performance.now()
        : null
    const entries = globalThis.performance.getEntriesByType('resource')
    for (let index = entries.length - 1; index >= 0; index -= 1) {
        const entry = entries[index]
        if (!('name' in entry) || typeof entry.name !== 'string') continue
        if (now !== null && typeof entry.startTime === 'number' && now - entry.startTime > 30_000) continue

        const match = entry.name.match(/\/backend-api\/aardvark\/scan_configurations\/([^/?#]+)(?:\/stats)?(?:[?#].*)?$/i)
        if (!match) continue

        const configuredScanId = decodeURIComponent(match[1])
        if (configuredScanId.endsWith(`:${repoId}`) || configuredScanId === repoId) {
            return configuredScanId
        }
    }

    return null
}

function resolveSecurityMetaValue(value: string, document: SecurityDocument<unknown>): string {
    return value
        .replace('{title}', document.metadata.title)
        .replace('{date}', dateStr())
        .replace('{timestamp}', timestamp())
        .replace('{source}', document.metadata.sourceUrl)
        .replace('{create_time}', unixTimestampToISOString(document.metadata.createTime))
        .replace('{update_time}', unixTimestampToISOString(document.metadata.updateTime))
        .replace('{chat_id}', '')
        .replace('{model}', '')
        .replace('{model_name}', '')
        .replace('{mode_name}', '')
}

function escapeYamlDoubleQuotedScalar(input: string): string {
    return input
        .replaceAll('\\', '\\\\')
        .replaceAll('"', '\\"')
        .replaceAll('\r', '\\r')
        .replaceAll('\n', '\\n')
}

function normalizeSingleLineText(input: string): string {
    return input.replaceAll(/[\r\n]+/g, ' ').trim()
}

function escapeMarkdownInlineText(input: string): string {
    return input.replaceAll(/([\\`*_{}\[\]()#+\-!.>])/g, '\\$1')
}

function buildSecurityFrontMatter(document: SecurityDocument<unknown>, metaList?: ExportMeta[]): string {
    const entries = metaList
        ?.filter(item => !!item.name)
        .map(item => `"${escapeYamlDoubleQuotedScalar(item.name)}": "${escapeYamlDoubleQuotedScalar(resolveSecurityMetaValue(item.value, document))}"`)
        ?? []

    return entries.length > 0
        ? `---\n${entries.join('\n')}\n---\n\n`
        : ''
}

function buildSecurityDetailsHtml(document: SecurityDocument<unknown>, metaList?: ExportMeta[]): string {
    const entries = metaList
        ?.filter(item => !!item.name)
        .map(item => [item.name, resolveSecurityMetaValue(item.value, document)] as const)
        ?? []

    return entries.length > 0
        ? `<details>
    <summary>Metadata</summary>
    <div class="metadata_container">
        ${entries.map(([key, value]) => `<div class="metadata_item"><div>${escapeHtml(key)}</div><div>${escapeHtml(value)}</div></div>`).join('\n')}
    </div>
</details>`
        : ''
}

function buildSecuritySectionsMarkdown(document: SecurityDocument<unknown>): string {
    return document.sections
        .map(section => `## ${section.title}\n\n${section.content}`)
        .join('\n\n')
}

export async function loadCurrentSecurityDocument() {
    const context = getPageContext()

    switch (context.kind) {
        case 'security-finding': {
            const finding = await fetchSecurityFinding(context.findingId!)
            return normalizeSecurityFindingDocument(finding)
        }
        case 'security-scan': {
            const preferredConfiguredScanId = getPreferredConfiguredScanIdFromCurrentPage(context.repoId!)
            const bundle = await fetchResolvedSecurityScanByRepoId(context.repoId!, { preferredConfiguredScanId })
            return normalizeSecurityScanDocument(bundle)
        }
        default:
            return null
    }
}

export function securityDocumentToText(document: SecurityDocument<unknown>): string {
    const sections = document.sections
        .map(section => `${section.title}:\n${section.content}`)
        .join('\n\n')

    return `Title: ${normalizeSingleLineText(document.title)}\nSource: ${document.sourceUrl}\n\n${sections}`.trim()
}

export function securityDocumentToMarkdown(document: SecurityDocument<unknown>, metaList?: ExportMeta[]): string {
    const frontMatter = buildSecurityFrontMatter(document, metaList)
    const content = buildSecuritySectionsMarkdown(document)
    return `${frontMatter}# ${escapeMarkdownInlineText(normalizeSingleLineText(document.title))}\n\n${content}`.trim()
}

export function securityDocumentToHtml(document: SecurityDocument<unknown>, metaList?: ExportMeta[]): string {
    const detailsHtml = buildSecurityDetailsHtml(document, metaList)
    const sectionsHtml = document.sections
        .map(section => {
            const contentHtml = sanitizeRenderedSecurityHtml(toHtml(fromMarkdown(escapeSecurityMarkdownSource(section.content))))
            return `<section id="${escapeHtml(section.id)}"><h2>${escapeHtml(section.title)}</h2>${contentHtml}</section>`
        })
        .join('\n')
    const lang = globalThis.document?.documentElement.lang || 'en'
    const theme = getColorScheme() || 'light'
    const escapedTitle = escapeHtml(normalizeSingleLineText(document.title))
    const escapedSourceUrl = escapeHtml(document.sourceUrl)

    return templateHtml
        .replaceAll('{{title}}', escapedTitle)
        .replaceAll('{{date}}', dateStr())
        .replaceAll('{{time}}', new Date().toISOString())
        .replaceAll('{{source}}', escapedSourceUrl)
        .replaceAll('{{lang}}', escapeHtml(lang))
        .replaceAll('{{theme}}', escapeHtml(theme))
        .replaceAll('{{avatar}}', 'data:,')
        .replaceAll('{{details}}', detailsHtml)
        .replaceAll('{{content}}', `<article class="conversation-item"><div class="conversation-content-wrapper"><div class="conversation-content"><h1>${escapedTitle}</h1>${sectionsHtml}</div></div></article>`)
}

export function getSecurityFileNameOptions(document: SecurityDocument<unknown>) {
    return {
        title: document.metadata.title,
        createTime: document.metadata.createTime,
        updateTime: document.metadata.updateTime,
    }
}

export function securityDocumentToJson(document: SecurityDocument<unknown>): string {
    return JSON.stringify(document.rawPayload)
}

export function getSecurityUnsupportedMessage(): string {
    const context = getPageContext()
    if (context.kind === 'security-findings-list') {
        return 'Security findings list export is not supported yet.'
    }

    return `Export is not supported on ${baseUrl}${location.pathname}.`
}
