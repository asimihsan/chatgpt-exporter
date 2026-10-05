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

    it('uses the last visible message id when ChatGPT renders continuation ids in one turn', () => {
        installConversationDom()
        const turn = document.querySelector('[data-testid="conversation-turn-1"]')
        const firstMessage = document.querySelector('[data-message-id="message-1"]')
        if (!turn || !firstMessage) throw new Error('missing fixture elements')

        firstMessage.insertAdjacentHTML('afterend', `
            <div data-message-id="message-1-final">
                <p>Final response</p>
                <pre><code>console.log("final")</code></pre>
            </div>
        `)
        const finalMessage = document.querySelector('[data-message-id="message-1-final"]')
        if (!finalMessage) throw new Error('missing final message')
        setRect(finalMessage, {
            top: 40,
            bottom: 160,
            width: 400,
            height: 120,
        })
        setRect(finalMessage.querySelector('pre')!, {
            top: 80,
            bottom: 120,
            width: 360,
            height: 40,
        })

        const candidates = discoverMessageMarkdownCandidates(document)
        const items = buildPickerItemsForMessage(candidates, 'message-1-final')

        expect(candidates[0]).toMatchObject({
            messageId: 'message-1-final',
            messageElement: finalMessage,
        })
        expect(items[0]?.children?.[0]?.block).toMatchObject({
            sourceMessageId: 'message-1-final',
            domFingerprint: 'console.log("final")',
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

    it('discovers modern message ids and measured sibling controls through contents wrappers', () => {
        const userId = '11111111-1111-4111-8111-111111111111'
        const assistantId = '22222222-2222-4222-8222-222222222222'
        document.body.innerHTML = `
            <main><div class="group">
                <div class="user" data-chatgpt-search-message-ids="${userId}">
                    <p>User</p><div class="turn-action-controls"><div class="row">
                        <span class="contents"><button aria-label="Copy message"></button></span>
                    </div></div>
                </div>
                <div class="assistant">
                    <div data-content-search-unit-key="fallback-turn-0:2:assistant"
                        data-chatgpt-search-message-ids="${assistantId} ${assistantId}">
                        <p>Assistant</p><pre><button data-testid="code-copy-button" aria-label="Copy"></button></pre>
                    </div>
                    <div class="turn-action-controls"><div class="row">
                        <span class="contents"><button aria-label="Copy"></button></span>
                    </div></div>
                </div>
            </div></main>`
        document.querySelectorAll('[data-chatgpt-search-message-ids], .row').forEach(element => setRect(element, {
            width: 240, height: 32,
        }))
        document.querySelectorAll('.contents').forEach(element => setRect(element, { width: 0, height: 0 }))

        const candidates = discoverMessageMarkdownCandidates()

        expect(candidates.map(candidate => candidate.messageId)).toEqual([userId, assistantId])
        expect(candidates[0]?.mountTarget).toBe(document.querySelector('.user .row'))
        expect(candidates[1]?.mountTarget).toBe(document.querySelector('.assistant .row'))
    })

    it('dedupes nested modern metadata and selects the last valid unique message id', () => {
        const firstId = '11111111-1111-4111-8111-111111111111'
        const lastId = '22222222-2222-4222-8222-222222222222'
        document.body.innerHTML = `<main>
            <div data-chatgpt-search-message-ids="${firstId} ${lastId} ${lastId} invalid">
                <div data-content-search-unit-key="unit" data-chatgpt-search-message-ids="${lastId}">Content</div>
            </div>
            <div data-chatgpt-search-message-ids="fallback-turn-0:2:assistant">No stable id</div>
        </main>`
        document.querySelectorAll('[data-chatgpt-search-message-ids]').forEach(element => setRect(element, {}))

        const candidates = discoverMessageMarkdownCandidates()

        expect(candidates).toHaveLength(1)
        expect(candidates[0]?.messageId).toBe(lastId)
        expect(candidates[0]?.messageElement).toBe(document.querySelector('[data-content-search-unit-key]'))
    })

    it('uses external assistant controls inside a shared modern turn without choosing user controls', () => {
        const userId = '11111111-1111-4111-8111-111111111111'
        const assistantId = '22222222-2222-4222-8222-222222222222'
        document.body.innerHTML = `<main><div data-content-search-turn-key="fallback-turn-0"><div class="group">
            <div><div data-chatgpt-search-message-ids="${userId}">
                User<div class="turn-action-controls user-row"><button aria-label="Copy message"></button></div>
            </div><div><div data-chatgpt-search-message-ids="${assistantId}" data-content-search-unit-key="assistant">Assistant</div></div></div>
            <div class="turn-action-controls assistant-row"><div class="row"><span class="contents"><button aria-label="Copy"></button></span></div></div>
        </div></div></main>`
        document.querySelectorAll('[data-chatgpt-search-message-ids], .row, .user-row').forEach(element => setRect(element, {}))
        document.querySelectorAll('.contents').forEach(element => setRect(element, { width: 0, height: 0 }))

        const candidates = discoverMessageMarkdownCandidates()

        expect(candidates[0]?.mountTarget).toBe(document.querySelector('.user-row'))
        expect(candidates[1]?.mountTarget).toBe(document.querySelector('.assistant-row .row'))
    })

    it('keeps modern messages from borrowing a neighboring action row or a code copy action', () => {
        const firstId = '11111111-1111-4111-8111-111111111111'
        const secondId = '22222222-2222-4222-8222-222222222222'
        document.body.innerHTML = `<main><div>
            <div class="first" data-chatgpt-search-message-ids="${firstId}">
                <pre><button data-testid="copy-code" aria-label="Copy">Copy code</button></pre>
            </div>
            <div data-chatgpt-search-message-ids="${secondId}">
                <div class="turn-action-controls"><button aria-label="Copy">Copy message</button></div>
            </div>
        </div></main>`
        document.querySelectorAll('[data-chatgpt-search-message-ids], .turn-action-controls, pre').forEach(element => setRect(element, {}))

        const candidates = discoverMessageMarkdownCandidates()

        expect(candidates[0]?.mountTarget).toBe(document.querySelector('.first'))
        expect(candidates[1]?.mountTarget).toBe(document.querySelector('.turn-action-controls'))
    })

    it('discovers modern messages alongside legacy turns without duplicate ids', () => {
        installConversationDom()
        const id = '11111111-1111-4111-8111-111111111111'
        document.querySelector('[data-message-id="message-1"]')?.setAttribute('data-chatgpt-search-message-ids', id)
        const modern = document.createElement('div')
        modern.setAttribute('data-chatgpt-search-message-ids', id)
        document.querySelector('main')?.append(modern)
        setRect(modern, {})

        expect(discoverMessageMarkdownCandidates().map(candidate => candidate.messageId)).toEqual([
            'message-1', 'message-2', 'message-3', id,
        ])
    })
    it('does not mount a user picker in external assistant controls when user actions are absent', () => {
        const userId = '11111111-1111-4111-8111-111111111111'
        const assistantId = '22222222-2222-4222-8222-222222222222'
        document.body.innerHTML = `<main><div data-content-search-turn-key="turn">
            <div id="user" data-chatgpt-search-message-ids="${userId}">User</div>
            <div data-chatgpt-search-message-ids="${assistantId}">Assistant</div>
            <div class="turn-action-controls"><button aria-label="Copy"></button></div>
        </div></main>`
        document.querySelectorAll('[data-chatgpt-search-message-ids], .turn-action-controls').forEach(element => setRect(element, {}))
        const candidates = discoverMessageMarkdownCandidates()
        expect(candidates[0]?.mountTarget).toBe(document.getElementById('user'))
        expect(candidates[1]?.mountTarget).toBe(document.querySelector('.turn-action-controls'))
    })

})
