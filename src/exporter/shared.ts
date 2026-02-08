import type { ConversationNodeMessage } from '../api'

const SKIPPED_CONTENT_TYPES = new Set<ConversationNodeMessage['content']['content_type']>([
    'thoughts',
    'reasoning_recap',
    'model_editable_context',
])

const UI_TOKEN_REGEX = /\uE200([a-z0-9_]+)\uE202([\s\S]*?)\uE201/giu
const UNICODE_SPACE_REGEX = /[\u00A0\u202F\u2007\u2060]/gu
const UNICODE_HYPHEN_REGEX = /[\u2010-\u2015\u2212]/gu

/**
 * Removes ChatGPT UI control tokens embedded in text.
 * For citation tokens, keep the payload so content_references can still resolve links.
 */
export function stripUiTokens(input: string): string {
    return input.replace(UI_TOKEN_REGEX, (_match, tokenType: string, payload: string) => {
        return tokenType.toLowerCase() === 'cite' ? payload : ''
    })
}

export function normalizeReferenceText(input: string): string {
    return input
        .replaceAll(UNICODE_SPACE_REGEX, ' ')
        .replaceAll(UNICODE_HYPHEN_REGEX, '-')
}

export function getReferenceTokens(matchedText?: string): string[] {
    if (!matchedText) return []

    return Array.from(new Set([
        normalizeReferenceText(matchedText),
        normalizeReferenceText(stripUiTokens(matchedText)),
    ])).filter(Boolean)
}

export function replaceReferenceTokens(
    input: string,
    matchedText: string | undefined,
    replacement: string,
): string {
    const matchedTokens = getReferenceTokens(matchedText)
    let output = input
    for (const token of matchedTokens) {
        output = output.replaceAll(token, replacement)
    }
    return output
}

export function isSkippableContentType(contentType: ConversationNodeMessage['content']['content_type']): boolean {
    return SKIPPED_CONTENT_TYPES.has(contentType)
}

export function shouldSkipMessage(message?: ConversationNodeMessage): boolean {
    if (!message?.content) return true

    if (message.recipient !== 'all') return true

    if (message.metadata?.is_visually_hidden_from_conversation) return true

    return isSkippableContentType(message.content.content_type)
}
