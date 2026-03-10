/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

export type PageKind =
    | 'conversation'
    | 'security-finding'
    | 'security-scan'
    | 'security-findings-list'
    | 'unsupported'

export interface PageContext {
    kind: PageKind
    chatId: string | null
    findingId: string | null
    repoId: string | null
    isSharePage: boolean
    isShareContinuePage: boolean
}

function createPageContext(overrides: Partial<PageContext>): PageContext {
    return {
        kind: 'unsupported',
        chatId: null,
        findingId: null,
        repoId: null,
        isSharePage: false,
        isShareContinuePage: false,
        ...overrides,
    }
}

export function getPageContext(
    pathname: string = window.location.pathname,
): PageContext {
    const shareContinueMatch = pathname.match(/^\/share\/([a-z0-9-]+)\/continue$/i)
    if (shareContinueMatch) {
        return createPageContext({
            kind: 'conversation',
            chatId: shareContinueMatch[1],
            isShareContinuePage: true,
        })
    }

    const shareMatch = pathname.match(/^\/share\/([a-z0-9-]+)$/i)
    if (shareMatch) {
        return createPageContext({
            kind: 'conversation',
            chatId: shareMatch[1],
            isSharePage: true,
        })
    }

    const conversationMatch = pathname.match(/^\/(?:c|g\/[a-z0-9-]+\/c)\/([a-z0-9-]+)/i)
    if (conversationMatch) {
        return createPageContext({
            kind: 'conversation',
            chatId: conversationMatch[1],
        })
    }

    const securityFindingMatch = pathname.match(/^\/codex\/security\/findings\/([a-z0-9]+)\/?$/i)
    if (securityFindingMatch) {
        return createPageContext({
            kind: 'security-finding',
            findingId: securityFindingMatch[1],
        })
    }

    const securityScanMatch = pathname.match(/^\/codex\/security\/scans\/([a-z0-9-]+)\/?$/i)
    if (securityScanMatch) {
        return createPageContext({
            kind: 'security-scan',
            repoId: securityScanMatch[1],
        })
    }

    if (/^\/codex\/security\/findings\/?$/i.test(pathname)) {
        return createPageContext({
            kind: 'security-findings-list',
        })
    }

    return createPageContext({})
}

export function isConversationPageContext(context: PageContext): boolean {
    return context.kind === 'conversation'
}

export function isSecurityExportPageContext(context: PageContext): boolean {
    return context.kind === 'security-finding' || context.kind === 'security-scan'
}
