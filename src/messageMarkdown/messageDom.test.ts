/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

// @vitest-environment jsdom

import { beforeEach, describe, expect, it } from 'vitest'
import { buildPickerItemsForMessage, discoverMessageMarkdownCandidates } from './messageDom'

function setRect(element: Element, rect: Partial<DOMRect>): void {
    element.getBoundingClientRect = () => ({
        x: rect.x ?? 0,
        y: rect.y ?? 0,
        width: rect.width ?? 100,
        height: rect.height ?? 32,
        top: rect.top ?? rect.y ?? 0,
        right: rect.right ?? (rect.x ?? 0) + (rect.width ?? 100),
        bottom: rect.bottom ?? (rect.y ?? 0) + (rect.height ?? 32),
        left: rect.left ?? rect.x ?? 0,
        toJSON: () => '',
    } as DOMRect)
}

function installConversationDom(): void {
    document.body.innerHTML = `
        <main>
            <article data-testid="conversation-turn-1">
                <div data-message-id="message-1">
                    <p>One</p>
                    <pre><code>console.log("one")</code></pre>
                    <div class="actions"><button data-testid="copy-turn-action-button"></button></div>
                </div>
            </article>
            <article data-testid="conversation-turn-2">
                <div data-message-id="message-2">
                    <p>Two</p>
                    <pre><code>console.log("two")</code></pre>
                    <div class="actions"><button data-testid="copy-turn-action-button"></button></div>
                </div>
            </article>
            <article data-testid="conversation-turn-3">
                <div data-message-id="message-3">
                    <p>Three</p>
                    <div class="actions"><button data-testid="copy-turn-action-button"></button></div>
                </div>
            </article>
        </main>
    `

    const messages = Array.from(document.querySelectorAll('[data-message-id]'))
    messages.forEach((message, index) => {
        setRect(message, {
            top: index === 2 ? 900 : 40 + index * 120,
            bottom: index === 2 ? 980 : 120 + index * 120,
            width: 400,
            height: 80,
        })
    })

    document.querySelectorAll('[data-testid^="conversation-turn-"]').forEach((turn, index) => {
        setRect(turn, {
            top: index === 2 ? 900 : 40 + index * 120,
            bottom: index === 2 ? 980 : 132 + index * 120,
            width: 420,
            height: 92,
        })
    })

    document.querySelectorAll('[data-testid="copy-turn-action-button"]').forEach((action, index) => {
        setRect(action.parentElement ?? action, {
            top: 100 + index * 120,
            bottom: 132 + index * 120,
            width: 240,
            height: 32,
        })
    })

    document.querySelectorAll('pre').forEach((pre, index) => {
        setRect(pre, {
            top: 70 + index * 120,
            bottom: 104 + index * 120,
            width: 360,
            height: 34,
        })
    })
}

describe('message markdown DOM discovery', () => {
    beforeEach(() => {
        document.body.innerHTML = ''
        Object.defineProperty(window, 'innerWidth', { value: 800, configurable: true })
        Object.defineProperty(window, 'innerHeight', { value: 600, configurable: true })
    })

    it('builds clicked-message selection and visible unchecked neighbors', () => {
        installConversationDom()

        const candidates = discoverMessageMarkdownCandidates(document)
        const items = buildPickerItemsForMessage(candidates, 'message-1')

        expect(candidates.find(candidate => candidate.messageId === 'message-3')).toMatchObject({
            visible: false,
            blocks: [],
        })
        expect(candidates.find(candidate => candidate.messageId === 'message-3')?.mountTarget).not.toBeNull()
        expect(items.map(item => [item.messageId, item.selected])).toEqual([
            ['message-1', true],
            ['message-2', false],
        ])
        expect(items[0]?.children?.[0]?.block).toMatchObject({
            kind: 'code',
            sourceMessageId: 'message-1',
            sourceSegmentId: 'code:0',
            domFingerprint: 'console.log("one")',
        })
    })

    it('uses the ChatGPT turn index when message ids are absent', () => {
        installConversationDom()
        document.querySelectorAll('[data-message-id]').forEach(message => {
            message.removeAttribute('data-message-id')
        })

        const candidates = discoverMessageMarkdownCandidates(document)
        const items = buildPickerItemsForMessage(candidates, 'turn:1')

        expect(items.map(item => [item.messageId, item.selected])).toEqual([
            ['turn:1', true],
            ['turn:2', false],
        ])
        expect(items[0]?.children?.[0]?.block).toMatchObject({
            sourceMessageId: 'turn:1',
            domFingerprint: 'console.log("one")',
        })
    })

    it('keeps the clicked message in picker items even when it is offscreen', () => {
        installConversationDom()

        const candidates = discoverMessageMarkdownCandidates(document)
        const items = buildPickerItemsForMessage(candidates, 'message-3')

        expect(items.map(item => [item.messageId, item.selected])).toEqual([
            ['message-1', false],
            ['message-2', false],
            ['message-3', true],
        ])
    })

    it('mounts when ChatGPT renders action buttons outside the message content subtree', () => {
        installConversationDom()
        document.querySelectorAll('[data-testid="copy-turn-action-button"]').forEach(button => {
            const turn = button.closest('[data-testid^="conversation-turn-"]')
            turn?.append(button)
        })

        const candidates = discoverMessageMarkdownCandidates(document)

        expect(candidates.find(candidate => candidate.messageId === 'message-1')?.mountTarget).not.toBeNull()
    })

    it('falls back to the message element when there is no host action row', () => {
        installConversationDom()
        document.querySelectorAll('[data-testid="copy-turn-action-button"]').forEach(button => button.remove())

        const candidates = discoverMessageMarkdownCandidates(document)

        expect(candidates.find(candidate => candidate.messageId === 'message-1')?.mountTarget).toBe(
            document.querySelector('[data-message-id="message-1"]'),
        )
    })

    it('does not treat generic code copy buttons as turn action rows', () => {
        installConversationDom()
        document.querySelector('[data-testid="copy-turn-action-button"]')?.remove()
        const codeCopy = document.createElement('button')
        codeCopy.setAttribute('aria-label', 'Copy')
        codeCopy.textContent = 'Copy'
        document.querySelector('[data-message-id="message-1"] pre')?.append(codeCopy)

        const candidates = discoverMessageMarkdownCandidates(document)

        expect(candidates.find(candidate => candidate.messageId === 'message-1')?.mountTarget).toBe(
            document.querySelector('[data-message-id="message-1"]'),
        )
    })

    it('falls back to the message element when action-row geometry cannot support a trigger', () => {
        installConversationDom()
        const actionRow = document.querySelector('[data-testid="copy-turn-action-button"]')?.parentElement
        if (!actionRow) throw new Error('missing action row')
        setRect(actionRow, { top: 10, bottom: 12, width: 10, height: 2 })

        const candidates = discoverMessageMarkdownCandidates(document)

        expect(candidates.find(candidate => candidate.messageId === 'message-1')?.mountTarget).toBe(
            document.querySelector('[data-message-id="message-1"]'),
        )
    })

    it('omits hidden child blocks from picker items', () => {
        installConversationDom()
        const pre = document.querySelector('pre')
        pre?.setAttribute('hidden', '')

        const candidates = discoverMessageMarkdownCandidates(document)
        const items = buildPickerItemsForMessage(candidates, 'message-1')

        expect(items[0]?.children).toEqual([])
    })
})
