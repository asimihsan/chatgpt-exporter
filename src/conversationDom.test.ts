/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest'
import { findConversationCaptureTarget, hasConversationMessages } from './conversationDom'

afterEach(() => { document.body.innerHTML = '' })

describe('conversation DOM compatibility', () => {
    it('recognizes populated modern chats without legacy turn attributes', () => {
        document.body.innerHTML = '<main><div data-chatgpt-search-message-ids="a a">Response</div></main>'
        expect(hasConversationMessages()).toBe(true)
    })
    it('ignores message metadata outside the conversation surface', () => {
        document.body.innerHTML = '<aside data-chatgpt-search-message-ids="a"></aside><main></main>'
        expect(hasConversationMessages()).toBe(false)
    })
    it('retains legacy detection', () => {
        document.body.innerHTML = '<div data-testid="conversation-turn-1"></div>'
        expect(hasConversationMessages()).toBe(true)
    })
    it('captures the common modern turn container without the composer', () => {
        document.body.innerHTML = '<main><div id="turns"><div data-turn-key="a"></div><div data-turn-key="b"></div></div><textarea></textarea></main>'
        expect(findConversationCaptureTarget()?.id).toBe('turns')
    })
    it('fails closed when a common turn container includes the composer', () => {
        document.body.innerHTML = '<main><div><div data-turn-key="a"></div><textarea></textarea></div></main>'
        expect(findConversationCaptureTarget()).toBeNull()
    })
    it('retains the legacy screenshot target', () => {
        document.body.innerHTML = '<div id="thread"><div id="turns"><div data-testid="conversation-turn-1"></div></div></div>'
        expect(findConversationCaptureTarget()?.id).toBe('turns')
    })
})
