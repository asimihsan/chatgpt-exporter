/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

function hasSecuritySidebarMarker(element: HTMLElement): boolean {
    return element.style.getPropertyValue('--codex-security-left-pane-width') !== ''
        || element.getAttribute('style')?.includes('--codex-security-left-pane-width') === true
}

function isLikelySecuritySidebar(element: Element | null): element is HTMLElement {
    return element instanceof HTMLElement
        && element.tagName === 'ASIDE'
        && hasSecuritySidebarMarker(element)
}

export function findSecuritySidebarMountTarget(root: ParentNode = document): HTMLElement | null {
    const separator = root.querySelector('[role="separator"][aria-label="Resize repository pane"]')
    const siblingSidebar = separator?.previousElementSibling ?? null
    if (isLikelySecuritySidebar(siblingSidebar)) {
        return siblingSidebar
    }

    const allSidebars = Array.from(root.querySelectorAll('aside'))
    const markedSidebar = allSidebars.find(isLikelySecuritySidebar)
    if (markedSidebar) {
        return markedSidebar
    }

    return null
}
