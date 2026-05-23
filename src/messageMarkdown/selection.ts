/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

import type { MessageMarkdownCopyItem, MessageMarkdownSelection } from './types'

export function buildInitialSelection(items: MessageMarkdownCopyItem[]): MessageMarkdownSelection {
    return normalizeSelection({
        messageIds: items
            .filter(item => item.kind === 'message' && item.selected)
            .map(item => item.messageId),
        blocks: items
            .flatMap(item => item.children ?? [])
            .filter(item => item.kind === 'block' && item.selected && item.block)
            .map(item => item.block!),
    })
}

export function normalizeSelection(selection: MessageMarkdownSelection): MessageMarkdownSelection {
    const messageIds = Array.from(new Set(selection.messageIds))
    const selectedMessages = new Set(messageIds)
    const seenBlocks = new Set<string>()
    const blocks = selection.blocks.filter((block) => {
        if (selectedMessages.has(block.sourceMessageId)) return false

        const key = [
            block.sourceMessageId,
            block.sourceSegmentId ?? '',
            block.kind,
            block.domFingerprint,
        ].join('\u0000')
        if (seenBlocks.has(key)) return false
        seenBlocks.add(key)
        return true
    })

    return { messageIds, blocks }
}

export function hasSelection(selection: MessageMarkdownSelection): boolean {
    return selection.messageIds.length > 0 || selection.blocks.length > 0
}
