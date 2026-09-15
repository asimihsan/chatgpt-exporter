/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

import { getExecutionOutputImages, getExecutionOutputText } from './executionOutput'
import { getMessageExportKind, MEMORY_SEARCH_RECIPIENT } from './messageClassifier'
import { stripUiTokens } from './shared'
import { sanitizeLLMText } from './textSanitizer'
import { escapeHtml } from '../utils/text'
import type { ConversationNodeMessage } from '../api'

export interface ToolActivityDescriptor {
    appName?: string
    toolName?: string
}

export interface ToolActivityImage {
    url: string
    width?: number
    height?: number
}

const CONNECTOR_RECIPIENT_PREFIX = 'api_tool.'

/** Lines a connector result carries for the model's benefit, not the reader's. */
const RESULT_BOILERPLATE_LINE = /^(?:Resource uri: |Showing \d+ of \d+ lines\.|Citation Marker:)/u

function parseJsonObject(text: string | undefined): Record<string, unknown> | null {
    if (!text) return null
    try {
        const parsed = JSON.parse(text) as unknown
        if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
            return parsed as Record<string, unknown>
        }
    }
    catch {
        return null
    }
    return null
}

function pathSegments(path: string | undefined): string[] {
    if (typeof path !== 'string') return []
    return path.split('/').filter(Boolean)
}

function lastSegment(path: string | undefined): string | undefined {
    const segments = pathSegments(path)
    return segments[segments.length - 1]
}

function stripConnectorPrefix(name: string | undefined): string | undefined {
    if (!name) return undefined
    return name.startsWith(CONNECTOR_RECIPIENT_PREFIX) ? name.slice(CONNECTOR_RECIPIENT_PREFIX.length) : name
}

function describeToolCall(message: ConversationNodeMessage): ToolActivityDescriptor {
    if (message.recipient === MEMORY_SEARCH_RECIPIENT) return { appName: 'memory' }

    const payload = message.content.content_type === 'code' ? parseJsonObject(message.content.text) : null
    const segments = pathSegments(typeof payload?.path === 'string' ? payload.path : undefined)
    if (segments.length >= 2) {
        return { appName: segments[0], toolName: segments[segments.length - 1] }
    }
    if (segments.length === 1) {
        return { toolName: segments[0] }
    }
    return { toolName: stripConnectorPrefix(message.recipient) }
}

function describeToolResult(message: ConversationNodeMessage): ToolActivityDescriptor {
    const resource = message.metadata?.invoked_resource
    const appName = typeof resource?.app_name === 'string' && resource.app_name ? resource.app_name : undefined
    const toolName = lastSegment(typeof resource?.resource_uri === 'string' ? resource.resource_uri : undefined)
        ?? stripConnectorPrefix(message.author.name)
    return { appName, toolName }
}

export function getToolActivityDescriptor(message: ConversationNodeMessage): ToolActivityDescriptor {
    switch (getMessageExportKind(message)) {
        case 'tool-call':
            return describeToolCall(message)
        case 'tool-result':
            return describeToolResult(message)
        default:
            return {}
    }
}

export function formatToolActivityLabel(message: ConversationNodeMessage): string {
    const kind = getMessageExportKind(message)
    const base = kind === 'tool-result' ? 'Tool result' : 'Tool call'
    const { appName, toolName } = getToolActivityDescriptor(message)
    const detail = [appName, toolName].filter(Boolean).join(' · ')
    return detail ? `${base} (${detail})` : base
}

/**
 * Text of a tool call: the `args` object when the payload has one
 * (`api_tool.call_tool`), otherwise the whole parsed payload (`{query}` memory
 * search, `{paths}` list_resources), otherwise the raw text.
 */
export function renderToolCallPayload(message: ConversationNodeMessage): string | null {
    if (message.content.content_type !== 'code') return null
    const raw = stripUiTokens(message.content.text || '')
    const payload = parseJsonObject(raw)
    if (!payload) return raw || null

    const body = payload.args && typeof payload.args === 'object' ? payload.args : payload
    return JSON.stringify(body, null, 2)
}

/** One ordered piece of a tool result: text or an image, as the ChatGPT UI orders them. */
export type ToolActivitySegment =
    | { kind: 'text', text: string }
    | { kind: 'image', image: ToolActivityImage }

function imageSegment(image: ToolActivityImage): ToolActivitySegment {
    return { kind: 'image', image }
}

function textSegment(text: string): ToolActivitySegment {
    return { kind: 'text', text }
}

/** Raw text and image pieces of a tool result in source order, before cleaning. */
function rawResultSegments(message: ConversationNodeMessage): ToolActivitySegment[] {
    const { content } = message
    switch (content.content_type) {
        case 'multimodal_text':
            return (content.parts ?? []).flatMap((part) => {
                if (typeof part === 'string') return [textSegment(part)]
                if (part.content_type === 'image_asset_pointer') {
                    return [imageSegment({ url: part.asset_pointer, width: part.width, height: part.height })]
                }
                return []
            })
        case 'text':
            return (content.parts ?? []).map(textSegment)
        case 'code':
            return [textSegment(content.text || '')]
        case 'execution_output':
            return [
                ...getExecutionOutputImages(message.metadata).map(image => imageSegment({ url: image.image_url, width: image.width, height: image.height })),
                textSegment(getExecutionOutputText(content)),
            ]
        default:
            return []
    }
}

/** Connector boilerplate removed, UI tokens stripped, text sanitized; empty when nothing readable remains. */
function cleanResultText(text: string): string {
    const lines = stripUiTokens(text)
        .split('\n')
        .map(line => line.trimEnd())
        .filter(line => line && !RESULT_BOILERPLATE_LINE.test(line))
    return sanitizeLLMText(lines.join('\n')).trim()
}

/**
 * Ordered, cleaned segments of a tool result. Adjacent text parts merge into
 * one segment so the common no-image result renders as a single block; text
 * is sanitized here, before any fence or escaping is chosen, so later
 * normalization cannot open a fence.
 */
export function getToolResultSegments(message: ConversationNodeMessage): ToolActivitySegment[] {
    const segments: ToolActivitySegment[] = []
    for (const raw of rawResultSegments(message)) {
        if (raw.kind === 'image') {
            segments.push(raw)
            continue
        }
        const text = cleanResultText(raw.text)
        if (!text) continue
        const previous = segments[segments.length - 1]
        if (previous?.kind === 'text') {
            previous.text = `${previous.text}\n${text}`
        }
        else {
            segments.push(textSegment(text))
        }
    }
    return segments
}

/** Text of a tool result with connector boilerplate removed; null when nothing readable remains. */
export function renderToolResultPayload(message: ConversationNodeMessage): string | null {
    const text = getToolResultSegments(message)
        .flatMap(segment => segment.kind === 'text' ? [segment.text] : [])
        .join('\n')
    return text ? text : null
}

/** Sanitized text of a tool call, or of a tool result with images omitted. */
export function renderToolActivityPayload(message: ConversationNodeMessage): string | null {
    switch (getMessageExportKind(message)) {
        case 'tool-call': {
            const payload = renderToolCallPayload(message)
            if (payload === null) return null
            const sanitized = sanitizeLLMText(payload).trim()
            return sanitized ? sanitized : null
        }
        case 'tool-result':
            return renderToolResultPayload(message)
        default:
            return null
    }
}

function longestBacktickRun(text: string): number {
    let longest = 0
    for (const match of text.matchAll(/`+/g)) {
        if (match[0].length > longest) longest = match[0].length
    }
    return longest
}

/** A code fence longer than any backtick run inside the payload, so embedded fences cannot close it. */
export function fenceMarkdown(text: string, language = ''): string {
    const fence = '`'.repeat(Math.max(2, longestBacktickRun(text)) + 1)
    return `${fence}${language}\n${text}\n${fence}`
}

function getToolActivitySegments(message: ConversationNodeMessage): ToolActivitySegment[] {
    switch (getMessageExportKind(message)) {
        case 'tool-call': {
            const payload = renderToolActivityPayload(message)
            return payload === null ? [] : [textSegment(payload)]
        }
        case 'tool-result':
            return getToolResultSegments(message)
        default:
            return []
    }
}

function renderSegments(message: ConversationNodeMessage, render: (segment: ToolActivitySegment) => string): string | null {
    const segments = getToolActivitySegments(message)
    if (segments.length === 0) return null
    return segments.map(render).join('\n')
}

export function renderToolActivityMarkdown(message: ConversationNodeMessage): string | null {
    const language = getMessageExportKind(message) === 'tool-call' ? 'json' : ''
    return renderSegments(message, segment => (
        segment.kind === 'image' ? `![image](${segment.image.url})` : fenceMarkdown(segment.text, language)
    ))
}

function imageAttribute(name: string, value: number | undefined): string {
    return typeof value === 'number' ? ` ${name}="${value}"` : ''
}

export function renderToolActivityHtml(message: ConversationNodeMessage): string | null {
    return renderSegments(message, segment => (
        segment.kind === 'image'
            ? `<img src="${escapeHtml(segment.image.url)}"${imageAttribute('height', segment.image.height)}${imageAttribute('width', segment.image.width)} />`
            : `<pre class="tool-activity"><code>${escapeHtml(segment.text)}</code></pre>`
    ))
}

export function renderToolActivityText(message: ConversationNodeMessage): string | null {
    return renderSegments(message, segment => (segment.kind === 'image' ? '[image]' : segment.text))
}
