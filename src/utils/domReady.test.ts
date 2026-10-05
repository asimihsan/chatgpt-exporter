/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

// @vitest-environment jsdom
import { describe, expect, it, vi } from 'vitest'
import { onDomAvailable } from './domReady'

describe('early userscript startup', () => {
    it('starts with a usable DOM even while the document is still loading', () => {
        const doc = document.implementation.createHTMLDocument()
        Object.defineProperty(doc, 'readyState', { value: 'loading' })
        const callback = vi.fn()
        onDomAvailable(callback, doc)
        expect(callback).toHaveBeenCalledOnce()
    })
    it('waits for head and body and starts exactly once', async () => {
        const doc = document.implementation.createHTMLDocument()
        doc.head.remove()
        doc.body.remove()
        const callback = vi.fn()
        onDomAvailable(callback, doc)
        doc.documentElement.append(doc.createElement('head'))
        await Promise.resolve()
        expect(callback).not.toHaveBeenCalled()
        doc.documentElement.append(doc.createElement('body'))
        await Promise.resolve()
        expect(callback).toHaveBeenCalledOnce()
        doc.body.append(doc.createElement('div'))
        await Promise.resolve()
        expect(callback).toHaveBeenCalledOnce()
    })
})
