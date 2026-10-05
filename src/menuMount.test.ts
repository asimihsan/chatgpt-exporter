/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

// @vitest-environment jsdom

import { beforeEach, describe, expect, it } from 'vitest'
import { findConversationSidebarMountTarget, findSecuritySidebarMountTarget, mountConversationSidebarMenu } from './menuMount'

describe('conversation sidebar mounting', () => {
    beforeEach(() => {
        document.body.innerHTML = ''
    })

    it('selects the localized conversation sidebar and excludes the app rail and unrelated navs', () => {
        document.body.innerHTML = `
            <nav data-app-navigation-rail="true"><button>Home</button></nav>
            <nav aria-label="Inicio"><div data-app-action-sidebar-scroll><a href="/c/123">Chat</a></div></nav>
            <nav><a href="/help">Help</a></nav>
        `
        const target = findConversationSidebarMountTarget()
        expect(target).toBe(document.querySelector('nav[aria-label="Inicio"]'))
        const container = document.createElement('div')
        expect(mountConversationSidebarMenu(target!, container)).toBe(true)
        expect(container.parentElement).toBe(target)
        expect(container.previousElementSibling?.hasAttribute('data-app-action-sidebar-scroll')).toBe(true)
        expect(container.style.position).toBe('')
        expect(container.style.bottom).toBe('')
        expect(container.classList.contains('ce-conversation-menu')).toBe(true)
    })

    it('marks the mount to prevent duplicate menus even across independent injection maps', () => {
        document.body.innerHTML = '<nav><div data-app-action-sidebar-scroll></div></nav>'
        const target = findConversationSidebarMountTarget()!
        expect(mountConversationSidebarMenu(target, document.createElement('div'))).toBe(true)
        expect(mountConversationSidebarMenu(target, document.createElement('div'))).toBe(false)
        expect(target.querySelectorAll('[data-ce-conversation-menu]')).toHaveLength(1)
    })

    it('rejects hidden sidebars and rails even if they contain scroll markers', () => {
        document.body.innerHTML = `
            <div hidden><nav><div data-app-action-sidebar-scroll></div></nav></div>
            <nav data-app-navigation-rail="true"><div data-app-action-sidebar-scroll></div></nav>
            <nav><div data-app-action-sidebar-scroll></div></nav>
        `
        expect(findConversationSidebarMountTarget()).toBe(document.body.lastElementChild)
        expect(mountConversationSidebarMenu(document.querySelector('nav')!, document.createElement('div'))).toBe(false)
    })

    it('supports the legacy conversation footer while preferring a modern sidebar', () => {
        document.body.innerHTML = '<nav><a href="/c/123">Chat</a><div class="sticky bottom-0"><button>Profile</button></div></nav>'
        const target = findConversationSidebarMountTarget()!
        const container = document.createElement('div')
        expect(mountConversationSidebarMenu(target, container)).toBe(true)
        expect(container.parentElement).toBe(target.lastElementChild)
        expect(container.nextElementSibling?.textContent).toBe('Profile')
        const modern = document.createElement('nav')
        modern.innerHTML = '<div data-app-action-sidebar-scroll></div>'
        document.body.append(modern)
        expect(findConversationSidebarMountTarget()).toBe(modern)
    })

    it('does not guess a mount in arbitrary navigation', () => {
        document.body.innerHTML = '<nav><a href="/c/123">Chat</a></nav><nav><div class="sticky bottom-0"></div></nav>'
        expect(findConversationSidebarMountTarget()).toBeNull()
    })
})

describe('findSecuritySidebarMountTarget', () => {
    beforeEach(() => {
        document.body.innerHTML = ''
    })

    it('uses the sidebar next to the resize separator', () => {
        document.body.innerHTML = `
            <div>
                <aside style="--codex-security-left-pane-width:484px">
                    <div data-testid="sidebar-content"></div>
                </aside>
                <div role="separator" aria-label="Resize repository pane"></div>
                <main></main>
            </div>
        `

        const target = findSecuritySidebarMountTarget()
        expect(target).toBe(document.querySelector('aside'))
    })

    it('falls back to a marked sidebar when the separator is unavailable', () => {
        document.body.innerHTML = `
            <aside style="--codex-security-left-pane-width:484px">
                <div data-testid="sidebar-content"></div>
            </aside>
        `

        const target = findSecuritySidebarMountTarget()
        expect(target).toBe(document.querySelector('aside'))
    })

    it('keeps the same stable target when exporter content is prepended later', () => {
        document.body.innerHTML = `
            <aside style="--codex-security-left-pane-width:484px"></aside>
            <div role="separator" aria-label="Resize repository pane"></div>
        `

        const aside = document.querySelector('aside')
        const firstTarget = findSecuritySidebarMountTarget()

        const exporterContainer = document.createElement('div')
        exporterContainer.setAttribute('data-testid', 'exporter-menu')
        aside?.prepend(exporterContainer)

        const secondTarget = findSecuritySidebarMountTarget()

        expect(firstTarget).toBe(aside)
        expect(secondTarget).toBe(aside)
    })

    it('returns null when the security sidebar markers are absent', () => {
        document.body.innerHTML = `
            <aside>
                <div data-testid="sidebar-content"></div>
            </aside>
            <div role="separator" aria-label="Resize repository pane"></div>
        `

        expect(findSecuritySidebarMountTarget()).toBeNull()
    })
})
