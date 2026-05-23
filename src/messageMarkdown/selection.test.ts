/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it } from 'vitest'
import { hasSelection, normalizeSelection } from './selection'

describe('message markdown selection', () => {
    it('removes child blocks when their parent message is selected', () => {
        const selection = normalizeSelection({
            messageIds: ['message-1', 'message-1'],
            blocks: [{
                kind: 'code',
                sourceMessageId: 'message-1',
                sourceSegmentId: 'code:0',
                domFingerprint: 'console.log("hi")',
                renderMode: 'fenced-markdown',
            }],
        })

        expect(selection).toEqual({
            messageIds: ['message-1'],
            blocks: [],
        })
    })

    it('deduplicates repeated child block selections', () => {
        const block = {
            kind: 'code' as const,
            sourceMessageId: 'message-1',
            sourceSegmentId: 'code:0',
            domFingerprint: 'console.log("hi")',
            renderMode: 'fenced-markdown' as const,
        }

        expect(normalizeSelection({
            messageIds: [],
            blocks: [block, block],
        }).blocks).toEqual([block])
    })

    it('detects empty and non-empty selections', () => {
        expect(hasSelection({ messageIds: [], blocks: [] })).toBe(false)
        expect(hasSelection({ messageIds: ['message-1'], blocks: [] })).toBe(true)
    })
})
