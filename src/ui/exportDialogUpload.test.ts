/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it } from 'vitest'
import { parseLocalConversationsFromUpload } from './exportDialogUpload'

function buildValidConversationPayload() {
    return {
        id: 'conversation-1',
        title: 'Conversation Title',
        current_node: 'node-1',
        create_time: 1700000000,
        update_time: 1700000100,
        is_archived: false,
        mapping: {
            'node-1': {
                id: 'node-1',
                children: [],
            },
        },
        moderation_results: [],
    }
}

describe('export dialog upload parser', () => {
    it('returns null for invalid JSON', () => {
        expect(parseLocalConversationsFromUpload('not json')).toBeNull()
    })

    it('returns null for non-array payloads', () => {
        expect(parseLocalConversationsFromUpload(JSON.stringify({ id: 'x' }))).toBeNull()
    })

    it('returns null when any conversation shape is invalid', () => {
        const payload = [
            buildValidConversationPayload(),
            { id: 'missing-required-fields' },
        ]

        expect(parseLocalConversationsFromUpload(JSON.stringify(payload))).toBeNull()
    })

    it('returns parsed conversations for valid payload', () => {
        const payload = [buildValidConversationPayload()]
        expect(parseLocalConversationsFromUpload(JSON.stringify(payload))).toEqual(payload)
    })
})

