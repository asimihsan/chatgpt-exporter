/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it, vi } from 'vitest'
import { conversationToMarkdown } from './markdown'
import type { ConversationNodeMessage, ConversationResult } from '../api'

vi.mock('../page', () => ({
    checkIfConversationStarted: () => true,
    getUserAvatar: async () => '',
}))

vi.mock('../i18n', () => ({
    default: {
        t: (key: string) => key,
    },
}))

function createMessage(overrides?: Partial<ConversationNodeMessage>): ConversationNodeMessage {
    return {
        id: 'message-id',
        author: {
            role: 'assistant',
            metadata: {},
        },
        content: {
            content_type: 'text',
            parts: ['hello'],
        },
        recipient: 'all',
        status: 'finished_successfully',
        weight: 1,
        metadata: {},
        ...overrides,
    }
}

function createConversation(messages: ConversationNodeMessage[]): ConversationResult {
    return {
        id: 'conversation-id',
        title: 'Source Conversation',
        model: 'gpt-4o',
        modelSlug: 'gpt-4o',
        createTime: 0,
        updateTime: 0,
        conversationNodes: messages.map((message, index) => ({
            id: `node-${index}`,
            children: [],
            message,
        })),
    }
}

describe('conversation markdown sources', () => {
    it('omits the sources section when no sources are present', () => {
        const markdown = conversationToMarkdown(createConversation([createMessage()]))

        expect(markdown).not.toContain('## Sources')
    })

    it('renders a deduplicated document-level source bibliography', () => {
        const markdown = conversationToMarkdown(createConversation([
            createMessage({
                content: {
                    content_type: 'text',
                    parts: ['Grouped cite turn0search0 and legacy 【7†(Legacy)】'],
                },
                metadata: {
                    content_references: [
                        {
                            type: 'grouped_webpages',
                            matched_text: 'turn0search0',
                            start_idx: 13,
                            end_idx: 25,
                            items: [
                                {
                                    title: 'Primary [Doc]',
                                    attribution: 'Primary Site',
                                    url: 'https://example.test/primary',
                                    supporting_websites: [
                                        {
                                            title: 'Supporting > Doc',
                                            url: 'https://example.test/supporting?x=>',
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                    citations: [
                        {
                            start_ix: 0,
                            end_ix: 1,
                            citation_format_type: 'tether_og',
                            metadata: {
                                title: 'Legacy Source',
                                text: 'legacy',
                                type: 'webpage',
                                url: 'https://example.test/legacy',
                                extra: {
                                    cited_message_idx: 7,
                                    evidence_text: 'Legacy',
                                },
                            },
                        },
                    ],
                },
            }),
            createMessage({
                content: {
                    content_type: 'tether_browsing_display',
                    result: '',
                },
                metadata: {
                    _cite_metadata: {
                        citation_format: {
                            name: 'tether_og',
                        },
                        metadata_list: [
                            {
                                title: 'Browse Source',
                                url: 'https://example.test/browse',
                                text: 'browse',
                            },
                        ],
                    },
                },
            }),
            createMessage({
                metadata: {
                    exported_generated_file_ids: ['file-report'],
                    content_references_by_file: {
                        'file-report': [
                            {
                                type: 'webpage_extended',
                                matched_text: 'source',
                                start_idx: 0,
                                end_idx: 6,
                                title: 'File Source',
                                url: 'https://example.test/file',
                            },
                            {
                                type: 'webpage_extended',
                                matched_text: 'duplicate',
                                start_idx: 7,
                                end_idx: 16,
                                title: 'Duplicate File Source',
                                url: 'https://example.test/file',
                            },
                        ],
                    },
                },
            }),
        ]))

        expect(markdown).toContain('## Sources')
        expect(markdown).toContain('1. [Primary Site](<https://example.test/primary>)')
        expect(markdown).toContain('2. [Supporting > Doc](<https://example.test/supporting?x=%3E>)')
        expect(markdown).toContain('3. [Legacy Source](<https://example.test/legacy>)')
        expect(markdown).toContain('4. [Browse Source](<https://example.test/browse>)')
        expect(markdown).toContain('5. [File Source](<https://example.test/file>)')
        expect(markdown).not.toContain('Duplicate File Source')
    })

    it('does not collect generated-file sources for placeholders that were not inlined', () => {
        const markdown = conversationToMarkdown(createConversation([
            createMessage({
                content: {
                    content_type: 'text',
                    parts: ['Unsupported file {{file:file-chart}}'],
                },
                metadata: {
                    n7jupd_crefs: [
                        {
                            type: 'file',
                            file_id: 'file-chart',
                            matched_text: '{{file:file-chart}}',
                            start_idx: 17,
                            end_idx: 36,
                        },
                    ],
                    content_references_by_file: {
                        'file-chart': [
                            {
                                type: 'webpage_extended',
                                matched_text: 'source',
                                start_idx: 0,
                                end_idx: 6,
                                title: 'Hidden File Source',
                                url: 'https://example.test/hidden-file',
                            },
                        ],
                    },
                },
            }),
        ]))

        expect(markdown).toContain('{{file:file-chart}}')
        expect(markdown).not.toContain('## Sources')
        expect(markdown).not.toContain('Hidden File Source')
    })

    it('collects sources from deep research report messages', () => {
        const reportToken = '\uE200cite\uE202turn0search0\uE201'
        const toolMessage = createMessage({
            id: 'tool-widget-message',
            author: {
                role: 'tool',
                name: 'api_tool.call_tool',
                metadata: {},
            },
            content: {
                content_type: 'code',
                language: 'unknown',
                text: '{"session_id":"deep-research-session"}',
            },
            metadata: {
                chatgpt_sdk: {
                    html_asset_pointer: 'internal://deep-research',
                    widget_state: JSON.stringify({
                        status: 'completed',
                        report_message: createMessage({
                            id: 'report-message',
                            content: {
                                content_type: 'text',
                                parts: [`Report ${reportToken}`],
                            },
                            metadata: {
                                content_references: [
                                    {
                                        type: 'webpage_extended',
                                        matched_text: reportToken,
                                        start_idx: 7,
                                        end_idx: 7 + reportToken.length,
                                        title: 'Research Source',
                                        url: 'https://example.test/research',
                                    },
                                ],
                            },
                        }),
                    }),
                },
            },
        })

        const markdown = conversationToMarkdown(createConversation([toolMessage]))

        expect(markdown).toContain('Report')
        expect(markdown).toContain('## Sources')
        expect(markdown).toContain('1. [Research Source](<https://example.test/research>)')
        expect(markdown).not.toContain('deep-research-session')
    })
})
