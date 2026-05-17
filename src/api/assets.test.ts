/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

import { beforeEach, describe, expect, it, vi } from 'vitest'
import { replaceImageAssets } from './assets'
import type { ApiConversation, ConversationNodeMessage } from './types'

type TextMessageContent = Extract<ConversationNodeMessage['content'], { content_type: 'text' }>

const {
    fetchApiMock,
    getFileDownloadApiUrlMock,
    getLegacyFileDownloadApiUrlMock,
} = vi.hoisted(() => ({
    fetchApiMock: vi.fn(),
    getFileDownloadApiUrlMock: vi.fn((id: string, options?: { conversationId?: string }) => {
        return `download:${id}:${options?.conversationId ?? ''}`
    }),
    getLegacyFileDownloadApiUrlMock: vi.fn((id: string) => `legacy-download:${id}`),
}))

vi.mock('./http', () => ({
    fetchApi: fetchApiMock,
    getFileDownloadApiUrl: getFileDownloadApiUrlMock,
    getLegacyFileDownloadApiUrl: getLegacyFileDownloadApiUrlMock,
}))

function createFetchResponse(body: string, contentType: string): Response {
    return {
        ok: true,
        status: 200,
        statusText: 'OK',
        headers: {
            get: (name: string) => name.toLowerCase() === 'content-type' ? contentType : null,
        },
        text: async () => body,
        blob: async () => new Blob([body], { type: contentType }),
    } as Response
}

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

function createConversation(message: ConversationNodeMessage): ApiConversation {
    return {
        create_time: 1700000000,
        conversation_id: 'conversation-123',
        current_node: 'node-1',
        mapping: {
            'node-1': {
                id: 'node-1',
                parent: 'root',
                children: [],
                message,
            },
        },
        moderation_results: [],
        title: 'Generated file conversation',
        is_archived: false,
        update_time: 1700000100,
    }
}

function getTextContent(message: ConversationNodeMessage): TextMessageContent {
    expect(message.content.content_type).toBe('text')
    return message.content as TextMessageContent
}

describe('replaceImageAssets generated file handling', () => {
    beforeEach(() => {
        vi.clearAllMocks()
        vi.unstubAllGlobals()
    })

    it('inlines generated Markdown files and renders file source references', async () => {
        const fetchMock = vi.fn().mockResolvedValue(
            createFetchResponse('# Report\n\nFact 【source†L1-L2】', 'text/markdown'),
        )
        vi.stubGlobal('fetch', fetchMock)
        fetchApiMock.mockResolvedValue({
            status: 'success',
            download_url: 'https://download.test/report.md',
            metadata: {},
            file_name: 'report.md',
            creation_time: '2026-05-17 15:49:35.355630+00:00',
            mime_type: null,
            file_size_bytes: null,
        })

        const message = createMessage({
            content: {
                content_type: 'text',
                parts: ['Here is the report.\n\n{{file:file-report}}'],
            },
            metadata: {
                n7jupd_crefs: [
                    {
                        type: 'file',
                        file_id: 'file-report',
                        file_name: 'report.md',
                        matched_text: '{{file:file-report}}',
                        start_idx: 21,
                        end_idx: 41,
                    },
                ],
                content_references_by_file: {
                    'file-report': [
                        {
                            type: 'webpage_extended',
                            matched_text: '【source†L1-L2】',
                            start_idx: 15,
                            end_idx: 29,
                            title: 'Water Safety',
                            url: 'https://example.test/water',
                            attribution: 'example.test',
                            source_name: 'example.test',
                        },
                    ],
                },
            },
        })

        await replaceImageAssets(createConversation(message), { conversationId: 'conversation-123' })

        expect(getFileDownloadApiUrlMock).toHaveBeenCalledWith('file-report', { conversationId: 'conversation-123' })
        expect(fetchMock).toHaveBeenCalledWith('https://download.test/report.md')
        const content = getTextContent(message)
        expect(content.parts[0]).toContain('# Report')
        expect(content.parts[0]).toContain('Fact [[1]](<https://example.test/water>)')
        expect(content.parts[0]).toContain('### Sources for report.md')
        expect(content.parts[0]).toContain('1. [Water Safety](<https://example.test/water>)')
        expect(content.parts[0]).not.toContain('{{file:file-report}}')
    })

    it('leaves generated binary files as placeholders', async () => {
        const fetchMock = vi.fn().mockResolvedValue(createFetchResponse('binary', 'image/png'))
        vi.stubGlobal('fetch', fetchMock)
        fetchApiMock.mockResolvedValue({
            status: 'success',
            download_url: 'https://download.test/chart.png',
            metadata: {},
            file_name: 'chart.png',
            creation_time: null,
            mime_type: null,
            file_size_bytes: 1024,
        })

        const message = createMessage({
            content: {
                content_type: 'text',
                parts: ['{{file:file-chart}}'],
            },
            metadata: {
                n7jupd_crefs: [
                    {
                        type: 'file',
                        file_id: 'file-chart',
                        file_name: 'chart.png',
                        matched_text: '{{file:file-chart}}',
                        start_idx: 0,
                        end_idx: 19,
                    },
                ],
            },
        })

        await replaceImageAssets(createConversation(message), { conversationId: 'conversation-123' })

        expect(getTextContent(message).parts[0]).toBe('{{file:file-chart}}')
    })

    it('uses source spans when identical source markers point to different URLs', async () => {
        const body = 'First 【dup†L1】 and second 【dup†L1】'
        const fetchMock = vi.fn().mockResolvedValue(createFetchResponse(body, 'text/markdown'))
        vi.stubGlobal('fetch', fetchMock)
        fetchApiMock.mockResolvedValue({
            status: 'success',
            download_url: 'https://download.test/report.md',
            metadata: {},
            file_name: 'report.md',
            creation_time: null,
            mime_type: 'text/markdown',
            file_size_bytes: null,
        })

        const message = createMessage({
            content: {
                content_type: 'text',
                parts: ['{{file:file-report}}'],
            },
            metadata: {
                n7jupd_crefs: [
                    {
                        type: 'file',
                        file_id: 'file-report',
                        file_name: 'report.md',
                        matched_text: '{{file:file-report}}',
                        start_idx: 0,
                        end_idx: 20,
                    },
                ],
                content_references_by_file: {
                    'file-report': [
                        {
                            type: 'webpage_extended',
                            matched_text: '【dup†L1】',
                            start_idx: 6,
                            end_idx: 14,
                            title: 'First source',
                            url: 'https://example.test/first',
                        },
                        {
                            type: 'webpage_extended',
                            matched_text: '【dup†L1】',
                            start_idx: 26,
                            end_idx: 34,
                            title: 'Second source',
                            url: 'https://example.test/second',
                        },
                    ],
                },
            },
        })

        await replaceImageAssets(createConversation(message), { conversationId: 'conversation-123' })

        const content = getTextContent(message).parts[0]
        expect(content).toContain('First [[1]](<https://example.test/first>) and second [[2]](<https://example.test/second>)')
        expect(content).toContain('1. [First source](<https://example.test/first>)')
        expect(content).toContain('2. [Second source](<https://example.test/second>)')
    })
})
