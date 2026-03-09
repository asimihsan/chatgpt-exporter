/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

import type { ConversationNodeMessage } from '../api'
import { isInternalContentType, shouldSkipAsInternal } from './messageClassifier'

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

function parseWidgetState(widgetState: unknown): Record<string, unknown> | null {
    if (!widgetState) return null

    if (typeof widgetState === 'string') {
        try {
            const parsed = JSON.parse(widgetState) as unknown
            if (parsed && typeof parsed === 'object') {
                return parsed as Record<string, unknown>
            }
        }
        catch {
            return null
        }
    }

    if (typeof widgetState === 'object') {
        return widgetState as Record<string, unknown>
    }

    return null
}

function isDeepResearchWidgetMessage(message?: ConversationNodeMessage): boolean {
    const chatgptSdk = message?.metadata?.chatgpt_sdk
    return chatgptSdk?.html_asset_pointer === 'internal://deep-research'
        || chatgptSdk?.resolved_pineapple_uri === 'connectors://connector_openai_deep_research'
}

function isConversationNodeMessageLike(value: unknown): value is ConversationNodeMessage {
    if (!value || typeof value !== 'object') return false

    const candidate = value as Partial<ConversationNodeMessage>
    return typeof candidate.id === 'string'
        && typeof candidate.status === 'string'
        && typeof candidate.weight === 'number'
        && !!candidate.author
        && typeof candidate.author.role === 'string'
        && !!candidate.content
        && typeof candidate.content.content_type === 'string'
        && typeof candidate.recipient === 'string'
}

export function extractDeepResearchReportMessage(message?: ConversationNodeMessage): ConversationNodeMessage | null {
    if (!isDeepResearchWidgetMessage(message)) return null

    const widgetState = parseWidgetState(message?.metadata?.chatgpt_sdk?.widget_state)
    const reportMessage = widgetState?.report_message

    if (!isConversationNodeMessageLike(reportMessage)) return null
    if (reportMessage.author.role !== 'assistant') return null
    if (reportMessage.recipient !== 'all') return null

    return reportMessage
}

export function resolveExportMessage(message?: ConversationNodeMessage): ConversationNodeMessage | null {
    if (!message?.content) return null

    return extractDeepResearchReportMessage(message) ?? message
}

export function isSkippableContentType(contentType: ConversationNodeMessage['content']['content_type']): boolean {
    return isInternalContentType(contentType)
}

export function shouldSkipMessage(message?: ConversationNodeMessage): boolean {
    if (!message?.content) return true

    if (message.recipient !== 'all') return true

    return shouldSkipAsInternal(message)
}
