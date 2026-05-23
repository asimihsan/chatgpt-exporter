/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

import { resolveExportMessage } from './shared'
import { transformMessageContentForMarkdownExport, transformMessageForMarkdownExport } from './markdown'
import { getExportAuthorLabel } from './messageLabel'
import { normalizeBlockFingerprint } from '../messageMarkdown/fingerprint'
import type { ConversationNodeMessage, ConversationResult } from '../api'
import type { MessageMarkdownSelection, SelectableBlockDescriptor } from '../messageMarkdown/types'

export interface RejectedMarkdownBlock {
    block: SelectableBlockDescriptor
    reason: 'missing-message' | 'missing-content' | 'unsupported' | 'ambiguous'
}

export interface MarkdownExcerptResult {
    markdown: string
    rejectedBlocks: RejectedMarkdownBlock[]
}

interface RenderableBlock {
    id: string
    fingerprint: string
    markdown: string
}

interface RenderableBlockSet {
    blocks: RenderableBlock[]
    rejectionReason: RejectedMarkdownBlock['reason'] | null
}

const FENCED_CODE_BLOCK_REGEX = /```([^\n`]*)\n([\s\S]*?)\n```/g

export function conversationToMarkdownExcerpt(
    conversation: ConversationResult,
    selection: MessageMarkdownSelection,
): MarkdownExcerptResult {
    const selectedMessages = new Set(selection.messageIds)
    const blocksByMessage = groupBlocksByMessage(selection.blocks)
    const rejectedBlocks: RejectedMarkdownBlock[] = []
    const parts: string[] = []
    let turnIndex = 0

    for (const node of conversation.conversationNodes) {
        const message = resolveExportMessage(node.message)
        if (!message?.id) continue
        turnIndex += 1

        const selectionKeys = [message.id, `turn:${turnIndex}`]
        if (selectionKeys.some(key => selectedMessages.has(key))) {
            const rendered = transformMessageForMarkdownExport(message)
            if (rendered) parts.push(rendered)
            continue
        }

        const blocks = selectionKeys.flatMap(key => blocksByMessage.get(key) ?? [])
        if (!blocks?.length) continue

        const renderableBlocks = getRenderableBlockSet(message)
        const renderedBlocks = blocks
            .map(block => renderSelectedBlock(renderableBlocks, block, rejectedBlocks))
            .filter((block): block is string => Boolean(block))

        if (renderedBlocks.length > 0) {
            parts.push(`#### ${getExportAuthorLabel(message)}:\n${renderedBlocks.join('\n\n')}`)
        }
    }

    return {
        markdown: parts.join('\n\n'),
        rejectedBlocks,
    }
}

function groupBlocksByMessage(blocks: SelectableBlockDescriptor[]): Map<string, SelectableBlockDescriptor[]> {
    const grouped = new Map<string, SelectableBlockDescriptor[]>()
    for (const block of blocks) {
        const group = grouped.get(block.sourceMessageId) ?? []
        group.push(block)
        grouped.set(block.sourceMessageId, group)
    }
    return grouped
}

function renderSelectedBlock(
    renderableBlocks: RenderableBlockSet,
    block: SelectableBlockDescriptor,
    rejectedBlocks: RejectedMarkdownBlock[],
): string | null {
    if (renderableBlocks.rejectionReason) {
        rejectedBlocks.push({ block, reason: renderableBlocks.rejectionReason })
        return null
    }

    const matches = renderableBlocks.blocks.filter(candidate => blockMatches(candidate, block))
    if (matches.length === 0) {
        rejectedBlocks.push({ block, reason: 'missing-message' })
        return null
    }

    if (matches.length > 1) {
        rejectedBlocks.push({ block, reason: 'ambiguous' })
        return null
    }

    return matches[0]?.markdown ?? null
}

function getRenderableBlockSet(message: ConversationNodeMessage): RenderableBlockSet {
    const content = transformMessageContentForMarkdownExport(message)
    if (content === null) return { blocks: [], rejectionReason: 'missing-content' }

    const blocks = getRenderableBlocks(message, content)
    return {
        blocks,
        rejectionReason: blocks.length === 0 ? 'unsupported' : null,
    }
}

function getRenderableBlocks(message: ConversationNodeMessage, content: string): RenderableBlock[] {
    switch (message.content.content_type) {
        case 'text':
        case 'multimodal_text':
            return getFencedCodeBlocks(content)
        case 'code':
        case 'execution_output':
            return [{
                id: 'code:0',
                fingerprint: normalizeBlockFingerprint(getPlainBlockContent(content)),
                markdown: content,
            }]
        default:
            return []
    }
}

function getFencedCodeBlocks(content: string): RenderableBlock[] {
    const blocks: RenderableBlock[] = []
    let match: RegExpExecArray | null
    let index = 0
    while ((match = FENCED_CODE_BLOCK_REGEX.exec(content)) !== null) {
        const language = match[1] ?? ''
        const body = match[2] ?? ''
        blocks.push({
            id: `code:${index++}`,
            fingerprint: normalizeBlockFingerprint(body),
            markdown: `\`\`\`${language}\n${body}\n\`\`\``,
        })
    }
    return blocks
}

function blockMatches(candidate: RenderableBlock, block: SelectableBlockDescriptor): boolean {
    if (block.sourceSegmentId && candidate.id !== block.sourceSegmentId) return false
    return candidate.fingerprint === normalizeBlockFingerprint(block.domFingerprint)
}

function getPlainBlockContent(content: string): string {
    const fenced = getFencedCodeBlocks(content)
    if (fenced.length === 1) return fenced[0]?.fingerprint ?? content
    return content
}

export { normalizeBlockFingerprint }
