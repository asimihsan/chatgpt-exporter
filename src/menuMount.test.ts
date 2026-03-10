/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

// @vitest-environment jsdom

import { beforeEach, describe, expect, it } from 'vitest'
import { findSecuritySidebarMountTarget } from './menuMount'

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
