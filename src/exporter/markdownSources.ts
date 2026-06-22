/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

import { shouldIncludeMessageForExport } from './messageClassifier'
import { resolveExportMessage } from './shared'
import type { Citation, ContentReference, ConversationNodeMessage, ConversationResult } from '../api'

interface MarkdownSource {
    title: string
    url: string
}

class MarkdownSourceCollector {
    private readonly sourcesByUrl = new Map<string, MarkdownSource>()

    add(title: string | undefined, url: string | undefined): void {
        const trimmedUrl = url?.trim()
        if (!trimmedUrl || this.sourcesByUrl.has(trimmedUrl)) return

        this.sourcesByUrl.set(trimmedUrl, {
            title: sourceTitle(title, trimmedUrl),
            url: trimmedUrl,
        })
    }

    values(): MarkdownSource[] {
        return [...this.sourcesByUrl.values()]
    }
}

function escapeMarkdownLinkText(input: string): string {
    return input.replaceAll('\\', '\\\\').replaceAll('[', '\\[').replaceAll(']', '\\]')
}

function escapeMarkdownUrl(input: string): string {
    return input.replaceAll('>', '%3E').replaceAll('\n', '')
}

function sourceTitle(title: string | undefined, fallbackUrl: string): string {
    const trimmed = title?.trim()
    return trimmed || fallbackUrl
}

function addContentReferenceSource(collector: MarkdownSourceCollector, ref: ContentReference): void {
    if (ref.type === 'grouped_webpages') {
        for (const item of ref.items ?? []) {
            collector.add(item.attribution || item.title, item.url)
            for (const supportingWebsite of item.supporting_websites ?? []) {
                collector.add(
                    supportingWebsite.attribution || supportingWebsite.title,
                    supportingWebsite.url,
                )
            }
        }
        return
    }

    collector.add(ref.title || ref.source_name || ref.attribution, ref.url)
}

function addCitationSource(collector: MarkdownSourceCollector, citation: Citation): void {
    collector.add(citation.metadata?.title, citation.metadata?.url)
}

function addBrowsingDisplaySources(
    collector: MarkdownSourceCollector,
    metadata: ConversationNodeMessage['metadata'],
): void {
    for (const source of metadata?._cite_metadata?.metadata_list ?? []) {
        collector.add(source.title, source.url)
    }
}

function addGeneratedFileSources(
    collector: MarkdownSourceCollector,
    metadata: ConversationNodeMessage['metadata'],
): void {
    for (const fileId of metadata?.exported_generated_file_ids ?? []) {
        const sourceRefs = [
            ...(metadata?.content_references_by_file?.[fileId] ?? []),
            ...(metadata?.n7jupd_crefs_by_file?.[fileId] ?? []),
        ]
        for (const ref of sourceRefs) {
            addContentReferenceSource(collector, ref)
        }
    }
}

export function collectMarkdownSourcesFromConversation(conversation: ConversationResult): MarkdownSource[] {
    const collector = new MarkdownSourceCollector()

    for (const { message } of conversation.conversationNodes) {
        const exportMessage = resolveExportMessage(message)
        if (!exportMessage?.content) continue
        if (!shouldIncludeMessageForExport(exportMessage)) continue

        for (const ref of exportMessage.metadata?.content_references ?? []) {
            addContentReferenceSource(collector, ref)
        }
        for (const citation of exportMessage.metadata?.citations ?? []) {
            addCitationSource(collector, citation)
        }
        addBrowsingDisplaySources(collector, exportMessage.metadata)
        addGeneratedFileSources(collector, exportMessage.metadata)
    }

    return collector.values()
}

export function renderMarkdownSources(sources: MarkdownSource[]): string {
    if (sources.length === 0) return ''

    const sourceList = sources
        .map((source, index) => {
            const title = escapeMarkdownLinkText(source.title)
            const url = escapeMarkdownUrl(source.url)
            return `${index + 1}. [${title}](<${url}>)`
        })
        .join('\n')

    return `## Sources\n\n${sourceList}`
}
