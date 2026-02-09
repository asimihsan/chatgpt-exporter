import type { ConversationNodeMessage } from '../api'

const INTERNAL_CONTENT_TYPES = new Set<ConversationNodeMessage['content']['content_type']>([
    'thoughts',
    'reasoning_recap',
    'model_editable_context',
])

const THINKING_CONTENT_TYPES = new Set<ConversationNodeMessage['content']['content_type']>([
    'thoughts',
    'reasoning_recap',
])

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

export function isAnalysisCodeMessage(message?: ConversationNodeMessage): boolean {
    if (!message?.content) return false
    if (message.author.role !== 'assistant') return false
    if (message.content.content_type !== 'code') return false

    return message.recipient === 'python' || message.channel === 'commentary'
}

export function isAnalysisExecutionOutput(message?: ConversationNodeMessage): boolean {
    if (!message?.content) return false
    if (message.author.role !== 'tool') return false
    if (message.content.content_type !== 'execution_output') return false

    return message.author.name === 'python' || message.channel === 'commentary'
}

export function isThinkingMessage(message?: ConversationNodeMessage): boolean {
    if (!message?.content) return false

    if (THINKING_CONTENT_TYPES.has(message.content.content_type)) return true

    if (message.author.role !== 'tool') return false
    if (message.content.content_type !== 'text') return false

    return isProThinkingMeta(message)
}
