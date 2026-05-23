/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

// @vitest-environment jsdom

import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mountMessageMarkdownButtons, cleanupMessageMarkdownMounts } from './messageMount'
import type { MessageMarkdownMountMap } from './messageMount'

vi.mock('../ui/MessageMarkdownPicker', () => ({
    MessageMarkdownPicker: ({ clickedMessageId }: { clickedMessageId: string }) => (
        <button aria-label="Copy message Markdown">{clickedMessageId}</button>
    ),
}))

function setRect(element: Element, rect: Partial<DOMRect>): void {
    element.getBoundingClientRect = () => ({
        x: rect.x ?? 0,
        y: rect.y ?? 0,
        width: rect.width ?? 240,
        height: rect.height ?? 32,
        top: rect.top ?? 0,
        right: rect.right ?? 240,
        bottom: rect.bottom ?? 32,
        left: rect.left ?? 0,
        toJSON: () => '',
    } as DOMRect)
}

function installDom(): void {
    document.body.innerHTML = `
        <main>
            <article data-testid="conversation-turn-1">
                <div data-message-id="message-1">
                    <p>Hello</p>
                    <div class="actions"><button data-testid="copy-turn-action-button">Copy</button></div>
                </div>
            </article>
        </main>
    `
    document.querySelectorAll<HTMLElement>('[data-message-id], .actions').forEach(element => setRect(element, {
        width: 240,
        height: 32,
        bottom: 80,
    }))
}

describe('message markdown mount lifecycle', () => {
    beforeEach(() => {
        document.body.innerHTML = ''
        Object.defineProperty(window, 'innerWidth', { value: 800, configurable: true })
        Object.defineProperty(window, 'innerHeight', { value: 600, configurable: true })
        vi.clearAllMocks()
    })

    it('mounts one trigger per supported action row and dedupes rerenders', () => {
        installDom()

        const mounts: MessageMarkdownMountMap = new Map()
        mountMessageMarkdownButtons(mounts)
        mountMessageMarkdownButtons(mounts)

        expect(document.querySelectorAll('[data-ce-message-markdown-root]')).toHaveLength(1)
        expect(document.querySelector('[aria-label="Copy message Markdown"]')).not.toBeNull()
    })

    it('does not rediscover its own fallback trigger as a host copy action', () => {
        installDom()
        document.querySelector('[data-testid="copy-turn-action-button"]')?.remove()

        const mounts: MessageMarkdownMountMap = new Map()
        mountMessageMarkdownButtons(mounts)
        mountMessageMarkdownButtons(mounts)

        expect(document.querySelectorAll('[data-ce-message-markdown-root]')).toHaveLength(1)
        expect(document.querySelectorAll('[aria-label="Copy message Markdown"]')).toHaveLength(1)
    })

    it('replaces the trigger when a multi-id turn changes its primary visible message', () => {
        document.body.innerHTML = `
            <main>
                <article data-testid="conversation-turn-1">
                    <div data-message-id="message-partial">
                        <p>Partial</p>
                        <div class="actions"><button data-testid="copy-turn-action-button">Copy</button></div>
                    </div>
                    <div data-message-id="message-final">
                        <p>Final</p>
                    </div>
                </article>
            </main>
        `
        const partial = document.querySelector('[data-message-id="message-partial"]')!
        const final = document.querySelector('[data-message-id="message-final"]')!
        const actionRow = document.querySelector('.actions')!
        setRect(partial, { top: 10, bottom: 80, width: 240, height: 70 })
        setRect(final, { top: 900, bottom: 980, width: 240, height: 80 })
        setRect(actionRow, { top: 70, bottom: 102, width: 240, height: 32 })

        const mounts: MessageMarkdownMountMap = new Map()
        mountMessageMarkdownButtons(mounts)
        expect(document.querySelector('[aria-label="Copy message Markdown"]')?.textContent).toBe('message-partial')

        setRect(partial, { top: -120, bottom: -40, width: 240, height: 80 })
        setRect(final, { top: 10, bottom: 90, width: 240, height: 80 })
        mountMessageMarkdownButtons(mounts)

        expect(document.querySelectorAll('[data-ce-message-markdown-root]')).toHaveLength(1)
        expect(document.querySelector('[aria-label="Copy message Markdown"]')?.textContent).toBe('message-final')
    })

    it('removes fallback triggers when the same turn later mounts into its action row', () => {
        document.body.innerHTML = `
            <main>
                <article data-testid="conversation-turn-1">
                    <div data-message-id="message-partial">
                        <p>Partial</p>
                        <div class="actions"><button data-testid="copy-turn-action-button">Copy</button></div>
                    </div>
                    <div data-message-id="message-final">
                        <p>Final</p>
                    </div>
                </article>
            </main>
        `
        const partial = document.querySelector('[data-message-id="message-partial"]')!
        const final = document.querySelector('[data-message-id="message-final"]')!
        const actionRow = document.querySelector('.actions')!
        setRect(partial, { top: 10, bottom: 90, width: 240, height: 80 })
        setRect(final, { top: 900, bottom: 980, width: 240, height: 80 })
        setRect(actionRow, { top: 70, bottom: 72, width: 10, height: 2 })

        const mounts: MessageMarkdownMountMap = new Map()
        mountMessageMarkdownButtons(mounts)
        expect(document.querySelector('[data-message-id="message-partial"] > [data-ce-message-markdown-root]')).not.toBeNull()
        expect(document.querySelector('[aria-label="Copy message Markdown"]')?.textContent).toBe('message-partial')

        setRect(partial, { top: -120, bottom: -40, width: 240, height: 80 })
        setRect(final, { top: 10, bottom: 90, width: 240, height: 80 })
        setRect(actionRow, { top: 70, bottom: 102, width: 240, height: 32 })
        mountMessageMarkdownButtons(mounts)

        expect(document.querySelectorAll('[data-ce-message-markdown-root]')).toHaveLength(1)
        expect(document.querySelector('[data-message-id="message-partial"] > [data-ce-message-markdown-root]')).toBeNull()
        expect(actionRow.querySelector('[data-ce-message-markdown-root]')).not.toBeNull()
        expect(document.querySelector('[aria-label="Copy message Markdown"]')?.textContent).toBe('message-final')
    })

    it('cleans up stale roots when host rows detach', () => {
        installDom()

        const mounts: MessageMarkdownMountMap = new Map()
        mountMessageMarkdownButtons(mounts)
        document.querySelector('main')?.replaceChildren()
        cleanupMessageMarkdownMounts(mounts)

        expect(document.querySelectorAll('[data-ce-message-markdown-root]')).toHaveLength(0)
        expect(mounts.size).toBe(0)
    })
})
