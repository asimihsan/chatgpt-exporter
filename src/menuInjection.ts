/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

import type { PageContext } from './pageContext'

export type InjectionKind = 'conversation-nav' | 'share-wrapper' | 'security-sidebar' | 'memory-modal'

export interface InjectionRecord {
    container: HTMLElement
    kind: InjectionKind
}

export function shouldKeepInjectedContainer(
    target: HTMLElement,
    record: InjectionRecord,
    pageContext: PageContext,
): boolean {
    if (!target.isConnected || !record.container.isConnected || !target.contains(record.container)) {
        return false
    }

    switch (record.kind) {
        case 'conversation-nav':
            return pageContext.kind === 'conversation'
                && !pageContext.isSharePage
                && !pageContext.isShareContinuePage
        case 'share-wrapper':
            return pageContext.isSharePage
        case 'security-sidebar':
            return pageContext.kind === 'security-finding'
                || pageContext.kind === 'security-scan'
                || pageContext.kind === 'security-findings-list'
        // The memory summary modal floats over any page, so its lifetime is
        // governed purely by whether its mount target is still in the DOM
        // (handled by the connectivity check above), not the page kind.
        case 'memory-modal':
            return true
    }
}
