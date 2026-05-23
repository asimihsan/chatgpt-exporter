/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

// @vitest-environment jsdom

import { render } from 'preact'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { MessageMarkdownPicker } from './MessageMarkdownPicker'

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}))

vi.mock('../messageMarkdown/copyMessageMarkdown', () => ({
    copySelectedMessageMarkdown: vi.fn(),
}))

function setRect(element: Element, rect: Partial<DOMRect>): void {
    element.getBoundingClientRect = () => ({
        x: rect.x ?? rect.left ?? 0,
        y: rect.y ?? rect.top ?? 0,
        width: rect.width ?? 240,
        height: rect.height ?? 32,
        top: rect.top ?? 0,
        right: rect.right ?? (rect.left ?? 0) + (rect.width ?? 240),
        bottom: rect.bottom ?? (rect.top ?? 0) + (rect.height ?? 32),
        left: rect.left ?? 0,
        toJSON: () => '',
    } as DOMRect)
}

function installConversationDom(): void {
    document.body.innerHTML = `
        <main>
            <article data-testid="conversation-turn-1">
                <div data-message-id="message-1">
                    <p>One</p>
                    <div class="actions"><button data-testid="copy-turn-action-button"></button></div>
                </div>
            </article>
            <article data-testid="conversation-turn-2">
                <div data-message-id="message-2">
                    <p>Two</p>
                    <div class="actions"><button data-testid="copy-turn-action-button"></button></div>
                </div>
            </article>
        </main>
        <div id="component-root"></div>
    `
    document.querySelectorAll('[data-message-id]').forEach((element, index) => {
        setRect(element, {
            top: 20 + index * 70,
            bottom: 70 + index * 70,
            width: 240,
            height: 50,
        })
    })
    document.querySelectorAll('.actions').forEach((element, index) => {
        setRect(element, {
            top: 58 + index * 70,
            bottom: 90 + index * 70,
            width: 240,
            height: 32,
        })
    })
}

describe('MessageMarkdownPicker', () => {
    beforeEach(() => {
        Object.defineProperty(window, 'innerWidth', { value: 320, configurable: true })
        Object.defineProperty(window, 'innerHeight', { value: 180, configurable: true })
        window.requestAnimationFrame = (callback: FrameRequestCallback) => {
            callback(0)
            return 0
        }
        installConversationDom()
    })

    afterEach(() => {
        render(null, document.querySelector('#component-root') as HTMLElement)
        document.body.innerHTML = ''
        vi.restoreAllMocks()
    })

    it('builds picker items when opened and clamps the panel into the viewport', async () => {
        const root = document.querySelector('#component-root') as HTMLElement
        render(<MessageMarkdownPicker clickedMessageId="message-2" />, root)
        const trigger = root.querySelector('button[aria-label="Copy message Markdown"]') as HTMLButtonElement
        setRect(trigger, {
            top: 4,
            bottom: 36,
            left: 280,
            right: 312,
            width: 32,
            height: 32,
        })

        trigger.click()
        await new Promise(resolve => window.setTimeout(resolve, 0))
        const panel = document.querySelector('.ce-message-markdown-panel') as HTMLElement
        setRect(panel, {
            top: 0,
            bottom: 220,
            left: 0,
            right: 340,
            width: 340,
            height: 220,
        })

        expect([...document.querySelectorAll('.ce-message-markdown-row span')].map(span => span.textContent)).toEqual([
            'Visible message',
            'Current message',
        ])
        expect([...document.querySelectorAll('input')].map(input => input.checked)).toEqual([false, true])
        expect(Number.parseFloat(panel.style.left)).toBeGreaterThanOrEqual(12)
        expect(Number.parseFloat(panel.style.top)).toBeGreaterThanOrEqual(12)
    })
})
