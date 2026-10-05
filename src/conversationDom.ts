/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

export const CONVERSATION_MESSAGE_SELECTOR = '[data-message-id], [data-chatgpt-search-message-ids]'

export function hasConversationMessages(root: ParentNode = document): boolean {
    return Boolean(root.querySelector('[data-testid^="conversation-turn-"], main [data-chatgpt-search-message-ids]'))
}

export function findConversationCaptureTarget(root: ParentNode = document): HTMLElement | null {
    const legacy = root.querySelector<HTMLElement>('#thread div:has(> [data-testid="conversation-turn-1"])')
    if (legacy) return legacy

    const turns = Array.from(root.querySelectorAll<HTMLElement>('main [data-turn-key]'))
    if (!turns.length) return null
    let target: HTMLElement | null = turns[0].parentElement
    while (target && !turns.every(turn => target?.contains(turn))) target = target.parentElement
    // Never capture the surrounding shell or composer when the turn structure drifts.
    if (!target || target.tagName === 'MAIN' || target.querySelector('textarea, [contenteditable="true"]')) return null
    return target
}
