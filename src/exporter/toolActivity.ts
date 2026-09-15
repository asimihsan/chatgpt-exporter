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

/** Images the ChatGPT UI shows for a tool result (multimodal image parts or execution output images). */
export function getToolResultImages(message: ConversationNodeMessage): ToolActivityImage[] {
    const { content } = message
    if (content.content_type === 'multimodal_text') {
        return (content.parts ?? []).flatMap((part) => {
            if (typeof part === 'string' || part.content_type !== 'image_asset_pointer') return []
            return [{ url: part.asset_pointer, width: part.width, height: part.height }]
        })
    }
    if (content.content_type === 'execution_output') {
        return getExecutionOutputImages(message.metadata).map(image => ({ url: image.image_url, width: image.width, height: image.height }))
    }
    return []
}

function resultParts(message: ConversationNodeMessage): string[] {
    const { content } = message
    switch (content.content_type) {
        case 'multimodal_text':
            return (content.parts ?? []).filter((part): part is string => typeof part === 'string')
        case 'text':
            return content.parts ?? []
        case 'code':
            return [content.text || '']
        case 'execution_output':
            return [getExecutionOutputText(content)]
        default:
            return []
    }
}

/** Text of a tool result with connector boilerplate removed; null when nothing readable remains. */
export function renderToolResultPayload(message: ConversationNodeMessage): string | null {
    const lines = resultParts(message)
        .flatMap(part => stripUiTokens(part).split('\n'))
        .map(line => line.trimEnd())
        .filter(line => line && !RESULT_BOILERPLATE_LINE.test(line))

    const text = lines.join('\n').trim()
    return text ? text : null
}

/**
 * Sanitized text of a tool call or result. Sanitizing here, before any fence
 * or escaping is chosen, keeps later normalization from creating a closing fence.
 */
export function renderToolActivityPayload(message: ConversationNodeMessage): string | null {
    let payload: string | null
    switch (getMessageExportKind(message)) {
        case 'tool-call':
            payload = renderToolCallPayload(message)
            break
        case 'tool-result':
            payload = renderToolResultPayload(message)
            break
        default:
            return null
    }
    if (payload === null) return null
    const sanitized = sanitizeLLMText(payload).trim()
    return sanitized ? sanitized : null
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

interface ToolActivityParts {
    images: ToolActivityImage[]
    payload: string | null
}

function getToolActivityParts(message: ConversationNodeMessage): ToolActivityParts | null {
    const images = getMessageExportKind(message) === 'tool-result' ? getToolResultImages(message) : []
    const payload = renderToolActivityPayload(message)
    if (payload === null && images.length === 0) return null
    return { images, payload }
}

export function renderToolActivityMarkdown(message: ConversationNodeMessage): string | null {
    const parts = getToolActivityParts(message)
    if (!parts) return null
    const language = getMessageExportKind(message) === 'tool-call' ? 'json' : ''
    return [
        ...parts.images.map(image => `![image](${image.url})`),
        ...(parts.payload === null ? [] : [fenceMarkdown(parts.payload, language)]),
    ].join('\n')
}

function imageAttribute(name: string, value: number | undefined): string {
    return typeof value === 'number' ? ` ${name}="${value}"` : ''
}

export function renderToolActivityHtml(message: ConversationNodeMessage): string | null {
    const parts = getToolActivityParts(message)
    if (!parts) return null
    return [
        ...parts.images.map(image => `<img src="${escapeHtml(image.url)}"${imageAttribute('height', image.height)}${imageAttribute('width', image.width)} />`),
        ...(parts.payload === null ? [] : [`<pre class="tool-activity"><code>${escapeHtml(parts.payload)}</code></pre>`]),
    ].join('\n')
}

export function renderToolActivityText(message: ConversationNodeMessage): string | null {
    const parts = getToolActivityParts(message)
    if (!parts) return null
    return [
        ...parts.images.map(() => '[image]'),
        ...(parts.payload === null ? [] : [parts.payload]),
    ].join('\n')
}
