/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

// @vitest-environment jsdom

import { describe, expect, it } from 'vitest'
import { shouldKeepInjectedContainer } from './menuInjection'

describe('shouldKeepInjectedContainer', () => {
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

    it('drops security sidebar injections on non-exportable findings-list pages', () => {
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
        })).toBe(false)
    })
})
