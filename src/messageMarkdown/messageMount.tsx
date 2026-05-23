/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

import { render } from 'preact'
import { discoverMessageMarkdownCandidates } from './messageDom'
import { MessageMarkdownPicker } from '../ui/MessageMarkdownPicker'

export interface MessageMarkdownMountRecord {
    container: HTMLElement
    messageId: string
    target: HTMLElement
}

export type MessageMarkdownMountMap = Map<HTMLElement, MessageMarkdownMountRecord>

export function mountMessageMarkdownButtons(
    mounts: MessageMarkdownMountMap,
    root: ParentNode = document,
): void {
    const candidates = discoverMessageMarkdownCandidates(root)

    for (const candidate of candidates) {
        if (!candidate.mountTarget) continue

        const existing = mounts.get(candidate.turnElement)
        if (existing) {
            if (
                existing.messageId === candidate.messageId
                && existing.target === candidate.mountTarget
                && existing.target.contains(existing.container)
            ) continue
            render(null, existing.container)
            existing.container.remove()
        }

        const container = document.createElement('span')
        container.dataset.ceMessageMarkdownRoot = 'true'
        candidate.mountTarget.append(container)

        render(
            <MessageMarkdownPicker
                clickedMessageId={candidate.messageId}
            />,
            container,
        )
        mounts.set(candidate.turnElement, {
            container,
            messageId: candidate.messageId,
            target: candidate.mountTarget,
        })
    }
}

export function cleanupMessageMarkdownMounts(mounts: MessageMarkdownMountMap): void {
    mounts.forEach((record, key) => {
        if (!key.isConnected || !record.target.isConnected || !record.container.isConnected || !record.target.contains(record.container)) {
            render(null, record.container)
            record.container.remove()
            mounts.delete(key)
        }
    })
}
