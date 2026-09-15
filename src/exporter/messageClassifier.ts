/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

import type { ConversationNodeMessage } from '../api'
import { getExecutionOutputImages } from './executionOutput'

const INTERNAL_CONTENT_TYPES = new Set<ConversationNodeMessage['content']['content_type']>([
    'thoughts',
    'reasoning_recap',
    'model_editable_context',
])

const THINKING_CONTENT_TYPES = new Set<ConversationNodeMessage['content']['content_type']>([
    'thoughts',
    'reasoning_recap',
])

const TOOL_RESULT_CONTENT_TYPES = new Set<ConversationNodeMessage['content']['content_type']>([
    'multimodal_text',
    'text',
    'code',
    'execution_output',
])

const PYTHON_RECIPIENT = 'python'
const CONNECTOR_AUTHOR_PREFIX = 'api_tool'
export const MEMORY_SEARCH_RECIPIENT = 'q7dr546'

export type MessageExportKind =
    | 'user'
    | 'assistant'
    | 'preamble'
    | 'thinking'
    | 'analysis-code'
    | 'analysis-output'
    | 'tool-call'
    | 'tool-result'
    | 'internal'
    | 'other'

export interface MessageInclusionOptions {
    /** Include app/connector tool calls and their text-only results. Default false. */
    includeToolActivity?: boolean
}

function isProThinkingMeta(message: ConversationNodeMessage): boolean {
    const initialText = message.metadata?.initial_text?.toLowerCase() || ''
    const finishedText = message.metadata?.finished_text?.toLowerCase() || ''

    return message.metadata?.async_task_type === 'pro_mode'
        || initialText.includes('reason')
        || finishedText.startsWith('reasoned for')
}

export function isInternalContentType(contentType: ConversationNodeMessage['content']['content_type']): boolean {
    return INTERNAL_CONTENT_TYPES.has(contentType)
}

export function shouldSkipAsInternal(message?: ConversationNodeMessage): boolean {
    if (!message?.content) return true

    if (message.metadata?.is_visually_hidden_from_conversation) return true

    return isInternalContentType(message.content.content_type)
}

/** Assistant code sent to the Python code interpreter. Channel is irrelevant. */
export function isAnalysisCodeMessage(message?: ConversationNodeMessage): boolean {
    if (!message?.content) return false
    if (message.author.role !== 'assistant') return false
    if (message.content.content_type !== 'code') return false

    return message.recipient === PYTHON_RECIPIENT
}

/** Python code interpreter output. Channel is irrelevant. */
export function isAnalysisExecutionOutput(message?: ConversationNodeMessage): boolean {
    if (!message?.content) return false
    if (message.author.role !== 'tool') return false
    if (message.content.content_type !== 'execution_output') return false

    return message.author.name === PYTHON_RECIPIENT
}

export function isThinkingMessage(message?: ConversationNodeMessage): boolean {
    if (!message?.content) return false

    if (THINKING_CONTENT_TYPES.has(message.content.content_type)) return true

    if (message.author.role !== 'tool') return false
    if (message.content.content_type !== 'text') return false

    return isProThinkingMeta(message)
}

export function isPreambleMessage(message?: ConversationNodeMessage): boolean {
    if (!message?.content) return false
    if (message.author.role !== 'assistant') return false
    if (message.content.content_type !== 'text') return false

    return message.metadata?.is_thinking_preamble_message === true
}

/**
 * Assistant code addressed to anything other than the user or the Python
 * interpreter: app/connector calls (`api_tool.call_tool`, `api_tool.list_resources`),
 * memory search (`q7dr546`), and unknown connector recipients.
 */
export function isToolCallMessage(message?: ConversationNodeMessage): boolean {
    if (!message?.content) return false
    if (message.author.role !== 'assistant') return false
    if (message.content.content_type !== 'code') return false

    return message.recipient !== 'all' && message.recipient !== PYTHON_RECIPIENT
}

function isConnectorAuthor(message: ConversationNodeMessage): boolean {
    return message.author.name?.startsWith(CONNECTOR_AUTHOR_PREFIX) ?? false
}

/** Output returned by an app/connector tool (never Python, never thinking). */
export function isToolResultMessage(message?: ConversationNodeMessage): boolean {
    if (!message?.content) return false
    if (message.author.role !== 'tool') return false
    if (!TOOL_RESULT_CONTENT_TYPES.has(message.content.content_type)) return false
    if (isThinkingMessage(message)) return false

    if (message.metadata?.invoked_resource) return true
    if (isConnectorAuthor(message)) return true

    return message.content.content_type === 'execution_output'
        && message.author.name !== PYTHON_RECIPIENT
}

function hasExecutionOutputImage(message: ConversationNodeMessage): boolean {
    if (message.content.content_type !== 'execution_output') return false
    return getExecutionOutputImages(message.metadata).length > 0
}

function hasMultimodalImage(message: ConversationNodeMessage): boolean {
    if (message.content.content_type !== 'multimodal_text') return false
    return message.content.parts?.some(part => typeof part !== 'string' && part.content_type === 'image_asset_pointer') ?? false
}

/** True when a tool result carries an image the ChatGPT UI would show inline. */
export function hasRenderableToolAssets(message?: ConversationNodeMessage): boolean {
    if (!message?.content) return false
    return hasMultimodalImage(message) || hasExecutionOutputImage(message)
}

/** Tool activity that has no image the UI would show, so it renders as an escaped text payload. */
export function isTextOnlyToolActivity(message?: ConversationNodeMessage): boolean {
    const kind = getMessageExportKind(message)
    if (kind === 'tool-call') return true
    return kind === 'tool-result' && !hasRenderableToolAssets(message)
}

export function getMessageExportKind(message?: ConversationNodeMessage): MessageExportKind {
    if (!message?.content) return 'internal'
    if (shouldSkipAsInternal(message)) return 'internal'
    if (isThinkingMessage(message)) return 'thinking'
    if (isAnalysisCodeMessage(message)) return 'analysis-code'
    if (isAnalysisExecutionOutput(message)) return 'analysis-output'
    if (isToolCallMessage(message)) return 'tool-call'
    if (isToolResultMessage(message)) return 'tool-result'
    if (isPreambleMessage(message)) return 'preamble'
    if (message.author.role === 'user') return 'user'
    if (message.author.role === 'assistant') return 'assistant'
    return 'other'
}

function isThinkingToolTextMessage(message: ConversationNodeMessage): boolean {
    return isThinkingMessage(message)
        && message.author.role === 'tool'
        && message.content.content_type === 'text'
}

export function shouldIncludeMessageForExport(message?: ConversationNodeMessage): boolean {
    if (!message?.content) return false
    if (shouldSkipAsInternal(message)) return false

    if (isAnalysisCodeMessage(message)) return true
    if (isAnalysisExecutionOutput(message)) return true
    if (isThinkingToolTextMessage(message)) return true

    if (message.recipient !== 'all') return false
    if (message.author.role !== 'tool') return true

    return message.content.content_type === 'multimodal_text'
        || hasExecutionOutputImage(message)
}
