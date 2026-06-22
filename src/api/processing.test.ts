/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it, vi } from 'vitest'
import { processConversation } from './processing'
import { conversationToMarkdown } from '../exporter/markdown'
import type { ApiConversationWithId, ConversationNodeMessage } from './types'

vi.mock('../page', () => ({
    checkIfConversationStarted: () => true,
    getUserAvatar: async () => '',
}))

vi.mock('../i18n', () => ({
    default: {
        t: (key: string) => key,
    },
}))

function createAssistantMessage(
    id: string,
    parts: string[],
    overrides: Partial<ConversationNodeMessage> = {},
): ConversationNodeMessage {
    return {
        id,
        author: {
            role: 'assistant',
            metadata: {},
        },
        content: {
            content_type: 'text',
            parts,
        },
        recipient: 'all',
        status: 'finished_successfully',
        weight: 1,
        metadata: {},
        ...overrides,
    }
}

describe('processConversation', () => {
    it('preserves generated-file source metadata when merging assistant continuation nodes', () => {
        const conversation: ApiConversationWithId = {
            id: 'conversation-id',
            title: 'Continuation sources',
            create_time: 0,
            update_time: 0,
            current_node: 'node-2',
            moderation_results: [],
            is_archived: false,
            mapping: {
                root: {
                    id: 'root',
                    children: ['node-1'],
                },
                'node-1': {
                    id: 'node-1',
                    parent: 'root',
                    children: ['node-2'],
                    message: createAssistantMessage('message-1', ['First response. ']),
                },
                'node-2': {
                    id: 'node-2',
                    parent: 'node-1',
                    children: [],
                    message: createAssistantMessage('message-2', ['# Report\n\nFact [[1]](<https://example.test/file>)'], {
                        metadata: {
                            exported_generated_file_ids: ['file-report'],
                            content_references_by_file: {
                                'file-report': [
                                    {
                                        type: 'webpage_extended',
                                        matched_text: 'source',
                                        start_idx: 0,
                                        end_idx: 6,
                                        title: 'Continuation File Source',
                                        url: 'https://example.test/file',
                                    },
                                ],
                            },
                        },
                    }),
                },
            },
        }

        const processed = processConversation(conversation)
        const markdown = conversationToMarkdown(processed)

        expect(processed.conversationNodes).toHaveLength(1)
        expect(markdown).toContain('First response. # Report')
        expect(markdown).toContain('## Sources')
        expect(markdown).toContain('1. [Continuation File Source](<https://example.test/file>)')
    })
})
