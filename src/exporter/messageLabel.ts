/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

import { getMessageExportKind } from './messageClassifier'
import { formatToolActivityLabel } from './toolActivity'
import type { ConversationNodeMessage } from '../api'

export function getExportAuthorLabel(message: ConversationNodeMessage): string {
    switch (getMessageExportKind(message)) {
        case 'thinking':
            return 'ChatGPT (Thinking)'
        case 'analysis-code':
            return 'ChatGPT (Analysis)'
        case 'analysis-output':
            return 'Python (Analysis)'
        case 'tool-call':
        case 'tool-result':
            return formatToolActivityLabel(message)
        default:
            break
    }

    switch (message.author.role) {
        case 'assistant':
            return 'ChatGPT'
        case 'user':
            return 'You'
        case 'tool':
            return `Plugin${message.author.name ? ` (${message.author.name})` : ''}`
        default:
            return message.author.role
    }
}

/** Labels worth showing inline in HTML, where user/assistant turns are identified by avatar. */
export function getVisibleHtmlLabel(message: ConversationNodeMessage): string | null {
    switch (getMessageExportKind(message)) {
        case 'user':
        case 'assistant':
        case 'preamble':
            return null
        default:
            return getExportAuthorLabel(message)
    }
}
