/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

export const CONVERSATION_MENU_SELECTOR = '[data-ce-conversation-menu]'

function isAvailableNav(nav: HTMLElement): boolean {
    return !nav.matches('[data-app-navigation-rail="true"]')
        && !nav.closest('[hidden], [aria-hidden="true"], [inert]')
}

/** Select the conversation list, rather than the separate app navigation rail. */
export function findConversationSidebarMountTarget(root: ParentNode = document): HTMLElement | null {
    const navs = Array.from(root.querySelectorAll<HTMLElement>('nav')).filter(isAvailableNav)
    const modernSidebar = navs.find(nav => nav.querySelector('[data-app-action-sidebar-scroll]'))
    if (modernSidebar) return modernSidebar

    // Older ChatGPT sidebars have conversation links and a sticky footer.
    // Avoid treating an unrelated navigation bar as a conversation sidebar.
    return navs.find(nav => nav.querySelector('a[href^="/c/"]')
        && nav.querySelector(':scope > div.sticky.bottom-0')) ?? null
}

export function mountConversationSidebarMenu(target: HTMLElement, container: HTMLElement): boolean {
    if (target !== findConversationSidebarMountTarget() || target.querySelector(CONVERSATION_MENU_SELECTOR)) {
        return false
    }

    container.setAttribute('data-ce-conversation-menu', '')
    container.classList.add('ce-conversation-menu')
    const legacyFooter = target.querySelector(':scope > div.sticky.bottom-0')
    if (!target.querySelector('[data-app-action-sidebar-scroll]') && legacyFooter) {
        legacyFooter.prepend(container)
    }
    else {
        // Modern sidebars are flex columns: the scroll region shrinks to leave
        // room for this footer instead of being covered by a sticky overlay.
        target.append(container)
    }
    return true
}

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
