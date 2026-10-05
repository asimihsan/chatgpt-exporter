/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

// @vitest-environment jsdom

import { beforeEach, describe, expect, it } from 'vitest'
import { shouldKeepInjectedContainer } from './menuInjection'
import type { PageContext } from './pageContext'

describe('shouldKeepInjectedContainer', () => {
    beforeEach(() => {
        document.body.innerHTML = ''
    })

    it('drops a conversation mount if its sidebar loses the conversation marker', () => {
        document.body.innerHTML = '<nav><div data-app-action-sidebar-scroll></div></nav>'
        const target = document.querySelector('nav')!
        const container = document.createElement('div')
        target.append(container)
        const context: PageContext = {
            kind: 'conversation', chatId: '123', findingId: null, repoId: null,
            isSharePage: false, isShareContinuePage: false,
        }
        const record = { container, kind: 'conversation-nav' as const }
        expect(shouldKeepInjectedContainer(target, record, context)).toBe(true)
        target.firstElementChild?.remove()
        expect(shouldKeepInjectedContainer(target, record, context)).toBe(false)
    })

    it('drops an old rail mount and a legacy mount displaced by a modern sidebar', () => {
        document.body.innerHTML = `
            <nav data-app-navigation-rail="true"></nav>
            <nav><a href="/c/123">Chat</a><div class="sticky bottom-0"></div></nav>
            <nav><div data-app-action-sidebar-scroll></div></nav>
        `
        const context: PageContext = {
            kind: 'conversation', chatId: '123', findingId: null, repoId: null,
            isSharePage: false, isShareContinuePage: false,
        }
        for (const target of Array.from(document.querySelectorAll('nav')).slice(0, 2)) {
            const container = document.createElement('div')
            target.append(container)
            expect(shouldKeepInjectedContainer(target, { container, kind: 'conversation-nav' }, context)).toBe(false)
        }
    })

    it('drops stale records when the injected container is detached during a sidebar rerender', () => {
        const target = document.createElement('aside')
        const container = document.createElement('div')
        document.body.append(target)
        target.append(container)

        expect(shouldKeepInjectedContainer(target, {
            container,
            kind: 'security-sidebar',
        }, {
            kind: 'security-scan',
            chatId: null,
            findingId: null,
            repoId: 'github-123456789',
            isSharePage: false,
            isShareContinuePage: false,
        })).toBe(true)

        target.innerHTML = '<div>rerendered</div>'

        expect(shouldKeepInjectedContainer(target, {
            container,
            kind: 'security-sidebar',
        }, {
            kind: 'security-scan',
            chatId: null,
            findingId: null,
            repoId: 'github-123456789',
            isSharePage: false,
            isShareContinuePage: false,
        })).toBe(false)
    })

    it('keeps security sidebar injections on findings-list pages', () => {
        const target = document.createElement('aside')
        const container = document.createElement('div')
        document.body.append(target)
        target.append(container)

        expect(shouldKeepInjectedContainer(target, {
            container,
            kind: 'security-sidebar',
        }, {
            kind: 'security-findings-list',
            chatId: null,
            findingId: null,
            repoId: null,
            isSharePage: false,
            isShareContinuePage: false,
        })).toBe(true)
    })
})
