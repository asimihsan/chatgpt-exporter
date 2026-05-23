/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

import { normalizeBlockFingerprint } from './fingerprint'
import type { MessageMarkdownCopyItem, SelectableBlockDescriptor } from './types'

export interface MessageMarkdownCandidate {
    messageId: string
    messageElement: HTMLElement
    mountTarget: HTMLElement | null
    visible: boolean
    blocks: SelectableBlockDescriptor[]
}

interface ViewportBounds {
    width: number
    height: number
}

const TURN_SELECTOR = 'main [data-testid^="conversation-turn-"], [data-testid^="conversation-turn-"]'
const MESSAGE_SELECTOR = '[data-message-id]'
const ACTION_BUTTON_SELECTOR = [
    '[data-testid="copy-turn-action-button"]',
    'button[aria-label="Copy message" i]',
    'button[aria-label="Copy response" i]',
].join(', ')
const BLOCK_SELECTOR = 'pre'
const MIN_TRIGGER_TARGET_PX = 28
const MIN_ROW_WIDTH_PX = 32

export function discoverMessageMarkdownCandidates(root: ParentNode = document): MessageMarkdownCandidate[] {
    const viewport = getViewportBounds()
    return Array.from(root.querySelectorAll<HTMLElement>(TURN_SELECTOR))
        .map(turn => buildCandidate(turn, viewport))
        .filter((candidate): candidate is MessageMarkdownCandidate => Boolean(candidate))
}

export function buildPickerItemsForMessage(
    candidates: MessageMarkdownCandidate[],
    clickedMessageId: string,
): MessageMarkdownCopyItem[] {
    return candidates
        .filter(candidate => candidate.visible || candidate.messageId === clickedMessageId)
        .map(candidate => ({
            id: `message:${candidate.messageId}`,
            kind: 'message',
            label: candidate.messageId === clickedMessageId ? 'Current message' : 'Visible message',
            messageId: candidate.messageId,
            selected: candidate.messageId === clickedMessageId,
            children: candidate.blocks.map((block, index) => ({
                id: `block:${block.sourceMessageId}:${block.sourceSegmentId ?? index}`,
                kind: 'block',
                label: getBlockLabel(block, index),
                messageId: block.sourceMessageId,
                selected: false,
                block,
            })),
        }))
}

function buildCandidate(turn: HTMLElement, viewport: ViewportBounds): MessageMarkdownCandidate | null {
    const messageElement = turn.querySelector<HTMLElement>(MESSAGE_SELECTOR) ?? turn
    const messageId = getMessageId(turn, messageElement)
    if (!messageId) return null

    const actionButton = findActionButton(messageElement) ?? findActionButton(turn)
    const actionRow = actionButton?.parentElement ?? null
    const mountTarget = getMountTarget(messageElement, actionRow)
    const visible = isElementVisibleInViewport(messageElement, viewport)

    return {
        messageId,
        messageElement,
        mountTarget,
        visible,
        blocks: visible ? collectVisibleBlocks(messageElement, messageId, viewport) : [],
    }
}

function getMountTarget(messageElement: HTMLElement, actionRow: HTMLElement | null): HTMLElement | null {
    if (actionRow && isMountGeometrySupported(actionRow)) return actionRow
    if (isMountGeometrySupported(messageElement)) return messageElement
    return null
}

function getMessageId(turn: HTMLElement, messageElement: HTMLElement): string | null {
    const explicitId = messageElement.dataset.messageId
    if (explicitId) return explicitId

    const turnId = turn.dataset.testid?.match(/^conversation-turn-(\d+)$/)?.[1]
    return turnId ? `turn:${turnId}` : null
}

function findActionButton(messageElement: HTMLElement): HTMLElement | null {
    const direct = findHostActionButton(messageElement, ACTION_BUTTON_SELECTOR)
    if (direct) return direct

    return findHostActionButton(messageElement, '[data-testid*="copy" i]')
}

function findHostActionButton(root: HTMLElement, selector: string): HTMLElement | null {
    const candidates = Array.from(root.querySelectorAll<HTMLElement>(selector))
    return candidates.find(candidate => !candidate.closest('[data-ce-message-markdown-root]')) ?? null
}

export function isMountGeometrySupported(actionRow: HTMLElement): boolean {
    if (!isElementRenderable(actionRow)) return false

    const rect = actionRow.getBoundingClientRect()
    if (rect.width < MIN_ROW_WIDTH_PX) return false
    if (rect.height < MIN_TRIGGER_TARGET_PX) return false

    return true
}

function collectVisibleBlocks(
    messageElement: HTMLElement,
    messageId: string,
    viewport: ViewportBounds,
): SelectableBlockDescriptor[] {
    return Array.from(messageElement.querySelectorAll<HTMLElement>(BLOCK_SELECTOR))
        .filter(block => isElementVisibleInViewport(block, viewport))
        .map((block, index): SelectableBlockDescriptor => ({
            kind: 'code',
            sourceMessageId: messageId,
            sourceSegmentId: `code:${index}`,
            domFingerprint: normalizeBlockFingerprint(block.textContent ?? ''),
            renderMode: 'fenced-markdown',
        }))
        .filter(block => block.domFingerprint.length > 0)
}

function isElementVisibleInViewport(element: HTMLElement, viewport: ViewportBounds): boolean {
    if (!isElementRenderable(element)) return false

    const rect = element.getBoundingClientRect()
    if (rect.width <= 0 || rect.height <= 0) return false
    return rect.bottom > 0
        && rect.right > 0
        && rect.top < viewport.height
        && rect.left < viewport.width
}

function isElementRenderable(element: HTMLElement): boolean {
    if (!element.isConnected) return false
    if (element.hidden) return false
    if (element.closest('[hidden], [aria-hidden="true"]')) return false

    const style = window.getComputedStyle(element)
    return style.display !== 'none' && style.visibility !== 'hidden'
}

function getViewportBounds(): ViewportBounds {
    return {
        width: window.innerWidth || document.documentElement.clientWidth || 0,
        height: window.innerHeight || document.documentElement.clientHeight || 0,
    }
}

function getBlockLabel(block: SelectableBlockDescriptor, index: number): string {
    switch (block.kind) {
        case 'code':
            return `Code block ${index + 1}`
        case 'output':
            return `Output block ${index + 1}`
        case 'source':
            return `Source block ${index + 1}`
    }
}
