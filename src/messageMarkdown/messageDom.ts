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
    turnElement: HTMLElement
    visible: boolean
    blocks: SelectableBlockDescriptor[]
}

interface ViewportBounds {
    width: number
    height: number
}

const TURN_SELECTOR = 'main [data-testid^="conversation-turn-"], [data-testid^="conversation-turn-"]'
const MESSAGE_SELECTOR = '[data-message-id]'
const SEARCH_MESSAGE_SELECTOR = '[data-chatgpt-search-message-ids]'
const ACTION_BUTTON_SELECTOR = [
    '[data-testid="copy-turn-action-button"]',
    'button[aria-label="Copy message" i]',
    'button[aria-label="Copy response" i]',
    '.turn-action-controls button[aria-label="Copy" i]',
].join(', ')
const BLOCK_SELECTOR = 'pre'
const MIN_TRIGGER_TARGET_PX = 28
const MIN_ROW_WIDTH_PX = 32

export function discoverMessageMarkdownCandidates(root: ParentNode = document): MessageMarkdownCandidate[] {
    const viewport = getViewportBounds()
    const legacy = Array.from(root.querySelectorAll<HTMLElement>(TURN_SELECTOR))
        .map(turn => buildCandidate(turn, viewport))
        .filter((candidate): candidate is MessageMarkdownCandidate => Boolean(candidate))
    const candidates = new Map(legacy.map(candidate => [candidate.messageId, candidate]))
    const modernElements = Array.from(root.querySelectorAll<HTMLElement>(SEARCH_MESSAGE_SELECTOR))
        .sort((left, right) => Number(left.hasAttribute('data-content-search-unit-key'))
            - Number(right.hasAttribute('data-content-search-unit-key')))
    for (const messageElement of modernElements) {
        const messageId = getSearchMessageId(messageElement)
        if (!messageId || messageElement.closest(TURN_SELECTOR)) continue
        const scope = getModernMessageScope(messageElement, messageId)
        const actionButton = findActionButton(messageElement, messageId) ?? findActionButton(scope, messageId)
        const visible = isElementVisibleInViewport(messageElement, viewport)
        candidates.set(messageId, {
            messageId,
            messageElement,
            turnElement: messageElement,
            mountTarget: getMountTarget(messageElement, getActionRow(actionButton, scope)),
            visible,
            blocks: visible ? collectVisibleBlocks(messageElement, messageId, viewport) : [],
        })
    }
    return Array.from(candidates.values())
}

function getSearchMessageId(element: HTMLElement): string | null {
    const ids = element.getAttribute('data-chatgpt-search-message-ids')?.trim().split(/\s+/) ?? []
    return Array.from(new Set(ids.filter(id => /^[a-f\d]{8}-(?:[a-f\d]{4}-){3}[a-f\d]{12}$/i.test(id)))).at(-1) ?? null
}

function getModernMessageScope(message: HTMLElement, messageId: string): HTMLElement {
    const turn = message.closest<HTMLElement>('[data-content-search-turn-key], [data-turn-key]')
    if (turn) return turn
    let scope = message
    while (scope.parentElement && !scope.parentElement.matches('main, body, html')) {
        const parent = scope.parentElement
        const units = Array.from(parent.querySelectorAll<HTMLElement>(SEARCH_MESSAGE_SELECTOR))
        if (units.some(unit => getSearchMessageId(unit) !== messageId)) break
        scope = parent
        if (findActionButton(scope)) break
    }
    return scope
}

function getActionRow(button: HTMLElement | null, scope: HTMLElement): HTMLElement | null {
    let row = button?.parentElement ?? null
    while (row && scope.contains(row)) {
        if (isMountGeometrySupported(row)) return row
        if (row === scope) break
        row = row.parentElement
    }
    return null
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
    const messageElement = getPrimaryMessageElement(turn, viewport)
    const messageId = getMessageId(turn, messageElement)
    if (!messageId) return null

    const actionButton = findActionButton(messageElement) ?? findActionButton(turn)
    const actionRow = getActionRow(actionButton, turn)
    const mountTarget = getMountTarget(messageElement, actionRow)
    const visible = isElementVisibleInViewport(messageElement, viewport)

    return {
        messageId,
        messageElement,
        mountTarget,
        turnElement: turn,
        visible,
        blocks: visible ? collectVisibleBlocks(messageElement, messageId, viewport) : [],
    }
}

function getPrimaryMessageElement(turn: HTMLElement, viewport: ViewportBounds): HTMLElement {
    const messageElements = Array.from(turn.querySelectorAll<HTMLElement>(MESSAGE_SELECTOR))
    return messageElements.findLast(message => isElementVisibleInViewport(message, viewport))
        ?? messageElements.at(-1)
        ?? turn
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

function findActionButton(messageElement: HTMLElement, messageId?: string): HTMLElement | null {
    const direct = findHostActionButton(messageElement, ACTION_BUTTON_SELECTOR, messageId)
    if (direct) return direct

    return findHostActionButton(messageElement, '[data-testid*="copy" i]', messageId)
}

function findHostActionButton(root: HTMLElement, selector: string, messageId?: string): HTMLElement | null {
    const candidates = Array.from(root.querySelectorAll<HTMLElement>(selector))
    return candidates.find(candidate => {
        if (candidate.closest('[data-ce-message-markdown-root], pre')) return false
        const owner = candidate.closest<HTMLElement>(SEARCH_MESSAGE_SELECTOR)
        if (!messageId) return true
        if (owner) return getSearchMessageId(owner) === messageId
        // External turn controls belong to the final message, never an earlier user unit.
        const finalUnit = Array.from(root.querySelectorAll<HTMLElement>(SEARCH_MESSAGE_SELECTOR)).at(-1)
        return finalUnit !== undefined && getSearchMessageId(finalUnit) === messageId
    }) ?? null
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
