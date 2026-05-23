/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

import { fetchConversation, getCurrentChatId, processConversation } from '../api'
import { conversationToMarkdownExcerpt } from '../exporter/markdownExcerpt'
import { copyToClipboard } from '../utils/clipboard'
import { standardizeLineBreaks } from '../utils/text'
import { hasSelection, normalizeSelection } from './selection'
import type { MessageMarkdownSelection } from './types'

export type CopyMessageMarkdownResult =
    | { ok: true, copiedText: string }
    | { ok: false, reason: 'empty-selection' | 'render' | 'clipboard' | 'exception', copiedText?: string, error?: unknown }

export async function copySelectedMessageMarkdown(
    selection: MessageMarkdownSelection,
): Promise<CopyMessageMarkdownResult> {
    try {
        const normalizedSelection = normalizeSelection(selection)
        if (!hasSelection(normalizedSelection)) {
            return { ok: false, reason: 'empty-selection' }
        }

        const chatId = await getCurrentChatId()
        const rawConversation = await fetchConversation(chatId, true)
        const conversation = processConversation(rawConversation, { mergeContinuations: false })
        const excerpt = conversationToMarkdownExcerpt(conversation, normalizedSelection)
        const copiedText = standardizeLineBreaks(excerpt.markdown)

        if (!copiedText || excerpt.rejectedBlocks.length > 0) {
            return { ok: false, reason: 'render', copiedText }
        }

        const copied = await copyToClipboard(copiedText)
        if (!copied) {
            return { ok: false, reason: 'clipboard', copiedText }
        }

        return { ok: true, copiedText }
    }
    catch (error) {
        return { ok: false, reason: 'exception', error }
    }
}
