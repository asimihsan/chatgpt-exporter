/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

import { beforeEach, describe, expect, it, vi } from 'vitest'
import type * as DownloadModule from '../utils/download'

const {
    getPageContextMock,
    checkIfConversationStartedMock,
    getCurrentChatIdMock,
    fetchConversationMock,
    inlineGeneratedTextFilesMock,
    processConversationMock,
    copyToClipboardMock,
    downloadFileMock,
    loadCurrentSecurityDocumentMock,
    getSecurityUnsupportedMessageMock,
    securityDocumentToTextMock,
    securityDocumentToMarkdownMock,
    securityDocumentToHtmlMock,
    securityDocumentToJsonMock,
    getSecurityFileNameOptionsMock,
} = vi.hoisted(() => ({
    getPageContextMock: vi.fn(),
    checkIfConversationStartedMock: vi.fn(),
    getCurrentChatIdMock: vi.fn(),
    fetchConversationMock: vi.fn(),
    inlineGeneratedTextFilesMock: vi.fn(),
    processConversationMock: vi.fn(),
    copyToClipboardMock: vi.fn(),
    downloadFileMock: vi.fn(),
    loadCurrentSecurityDocumentMock: vi.fn(),
    getSecurityUnsupportedMessageMock: vi.fn(),
    securityDocumentToTextMock: vi.fn(),
    securityDocumentToMarkdownMock: vi.fn(),
    securityDocumentToHtmlMock: vi.fn(),
    securityDocumentToJsonMock: vi.fn(),
    getSecurityFileNameOptionsMock: vi.fn(),
}))

vi.mock('../pageContext', () => ({
    getPageContext: getPageContextMock,
}))

vi.mock('../page', () => ({
    checkIfConversationStarted: checkIfConversationStartedMock,
    getUserAvatar: vi.fn(async () => 'data:,avatar'),
}))

vi.mock('../api', () => ({
    getCurrentChatId: getCurrentChatIdMock,
    fetchConversation: fetchConversationMock,
    inlineGeneratedTextFiles: inlineGeneratedTextFilesMock,
    processConversation: processConversationMock,
}))

vi.mock('../utils/clipboard', () => ({
    copyToClipboard: copyToClipboardMock,
}))

vi.mock('../utils/download', async () => {
    const actual = await vi.importActual<typeof DownloadModule>('../utils/download')
    return {
        ...actual,
        downloadFile: downloadFileMock,
    }
})

vi.mock('./securityDocument', () => ({
    loadCurrentSecurityDocument: loadCurrentSecurityDocumentMock,
    getSecurityUnsupportedMessage: getSecurityUnsupportedMessageMock,
    securityDocumentToText: securityDocumentToTextMock,
    securityDocumentToMarkdown: securityDocumentToMarkdownMock,
    securityDocumentToHtml: securityDocumentToHtmlMock,
    securityDocumentToJson: securityDocumentToJsonMock,
    getSecurityFileNameOptions: getSecurityFileNameOptionsMock,
}))

vi.mock('../i18n', () => ({
    default: {
        t: (key: string) => key,
    },
}))

import { exportToHtml } from './html'
import { exportToJson, exportToOoba, exportToTavern } from './json'
import { copyMarkdownToClipboard, exportToMarkdown } from './markdown'

describe('page-aware exporter dispatch', () => {
    beforeEach(() => {
        vi.clearAllMocks()
        vi.stubGlobal('alert', vi.fn())

        checkIfConversationStartedMock.mockReturnValue(true)
        getCurrentChatIdMock.mockResolvedValue('chat-123')
        fetchConversationMock.mockResolvedValue({ id: 'chat-123' })
        processConversationMock.mockReturnValue({
            title: 'Conversation Title',
            createTime: 1_700_000_000,
            updateTime: 1_700_000_100,
            conversationNodes: [],
        })
        loadCurrentSecurityDocumentMock.mockResolvedValue({
            title: 'Security Title',
            metadata: {
                title: 'Security Title',
                createTime: 1_700_000_000,
                updateTime: 1_700_000_100,
            },
            rawPayload: {
                finding: { hid: 'finding-123' },
            },
        })
        getSecurityUnsupportedMessageMock.mockReturnValue('security unsupported')
        getSecurityFileNameOptionsMock.mockReturnValue({
            title: 'Security Title',
            createTime: 1_700_000_000,
            updateTime: 1_700_000_100,
        })
        securityDocumentToTextMock.mockReturnValue('security text')
        securityDocumentToMarkdownMock.mockReturnValue('# security markdown')
        securityDocumentToHtmlMock.mockReturnValue('<html>security</html>')
        securityDocumentToJsonMock.mockReturnValue('{"finding":{"hid":"finding-123"}}')
    })

    it('copies Markdown through the security document path on finding pages', async () => {
        getPageContextMock.mockReturnValue({
            kind: 'security-finding',
            findingId: 'finding-123',
            repoId: null,
            chatId: null,
            isSharePage: false,
            isShareContinuePage: false,
        })

        const success = await copyMarkdownToClipboard([
            { name: 'source', value: '{source}' },
        ])

        expect(success).toBe(true)
        expect(loadCurrentSecurityDocumentMock).toHaveBeenCalledTimes(1)
        expect(securityDocumentToMarkdownMock).toHaveBeenCalledWith(
            expect.any(Object),
            [{ name: 'source', value: '{source}' }],
        )
        expect(copyToClipboardMock).toHaveBeenCalledWith('# security markdown')
        expect(fetchConversationMock).not.toHaveBeenCalled()
    })

    it('copies conversation Markdown with sources to the clipboard', async () => {
        getPageContextMock.mockReturnValue({
            kind: 'conversation',
            findingId: null,
            repoId: null,
            chatId: 'shared-123',
            isSharePage: true,
            isShareContinuePage: false,
        })
        getCurrentChatIdMock.mockResolvedValue('__share__shared-123')
        fetchConversationMock.mockResolvedValue({
            id: 'shared-123',
            mapping: {},
        })
        processConversationMock.mockReturnValue({
            id: 'shared-123',
            title: 'Conversation Title',
            model: 'gpt-4o',
            modelSlug: 'gpt-4o',
            createTime: 1_700_000_000,
            updateTime: 1_700_000_100,
            conversationNodes: [
                {
                    id: 'node-1',
                    children: [],
                    message: {
                        id: 'message-1',
                        author: {
                            role: 'assistant',
                            metadata: {},
                        },
                        content: {
                            content_type: 'text',
                            parts: ['Here is a source turn0search0'],
                        },
                        recipient: 'all',
                        status: 'finished_successfully',
                        weight: 1,
                        metadata: {
                            content_references: [
                                {
                                    type: 'webpage',
                                    matched_text: 'turn0search0',
                                    start_idx: 17,
                                    end_idx: 28,
                                    title: 'Example Source',
                                    url: 'https://example.test/source',
                                },
                            ],
                        },
                    },
                },
            ],
        })

        const success = await copyMarkdownToClipboard([
            { name: 'title', value: '{title}' },
        ])

        expect(success).toBe(true)
        expect(fetchConversationMock).toHaveBeenCalledWith('__share__shared-123', true)
        expect(copyToClipboardMock).toHaveBeenCalledWith(expect.stringContaining('# Conversation Title'))
        expect(copyToClipboardMock).toHaveBeenCalledWith(expect.stringContaining('title: Conversation Title'))
        expect(copyToClipboardMock).toHaveBeenCalledWith(expect.stringContaining('## Sources'))
        expect(copyToClipboardMock).toHaveBeenCalledWith(expect.stringContaining('[Example Source](<https://example.test/source>)'))
        expect(inlineGeneratedTextFilesMock).not.toHaveBeenCalled()
    })

    it('routes markdown export through the security document path and metadata filename tokens', async () => {
        getPageContextMock.mockReturnValue({
            kind: 'security-scan',
            findingId: null,
            repoId: 'github-123',
            chatId: null,
            isSharePage: false,
            isShareContinuePage: false,
        })

        const success = await exportToMarkdown('{title}-{create_time}', [])

        expect(success).toBe(true)
        expect(loadCurrentSecurityDocumentMock).toHaveBeenCalledTimes(1)
        expect(securityDocumentToMarkdownMock).toHaveBeenCalledTimes(1)
        expect(downloadFileMock.mock.calls[0]?.[0]).toBe('Security_Title-2023-11-14T22:13:20.000Z.md')
        expect(fetchConversationMock).not.toHaveBeenCalled()
    })

    it('routes html export through the security document path', async () => {
        getPageContextMock.mockReturnValue({
            kind: 'security-finding',
            findingId: 'finding-123',
            repoId: null,
            chatId: null,
            isSharePage: false,
            isShareContinuePage: false,
        })

        const success = await exportToHtml('{title}', [])

        expect(success).toBe(true)
        expect(securityDocumentToHtmlMock).toHaveBeenCalledTimes(1)
        expect(downloadFileMock.mock.calls[0]?.[0]).toBe('Security_Title.html')
        expect(fetchConversationMock).not.toHaveBeenCalled()
    })

    it('routes json export through the security raw payload path', async () => {
        getPageContextMock.mockReturnValue({
            kind: 'security-scan',
            findingId: null,
            repoId: 'github-123',
            chatId: null,
            isSharePage: false,
            isShareContinuePage: false,
        })

        const success = await exportToJson('{title}')

        expect(success).toBe(true)
        expect(securityDocumentToJsonMock).toHaveBeenCalledTimes(1)
        expect(downloadFileMock).toHaveBeenCalledWith(
            'Security_Title.json',
            'application/json',
            '{"finding":{"hid":"finding-123"}}',
        )
    })

    it('fails closed on findings-list pages for current-page exporters', async () => {
        checkIfConversationStartedMock.mockReturnValue(false)
        getPageContextMock.mockReturnValue({
            kind: 'security-findings-list',
            findingId: null,
            repoId: null,
            chatId: null,
            isSharePage: false,
            isShareContinuePage: false,
        })

        await expect(copyMarkdownToClipboard()).resolves.toBe(false)
        await expect(exportToMarkdown('{title}', [])).resolves.toBe(false)
        await expect(exportToHtml('{title}', [])).resolves.toBe(false)
        await expect(exportToJson('{title}')).resolves.toBe(false)

        expect(alert).toHaveBeenNthCalledWith(1, 'security unsupported')
        expect(alert).toHaveBeenNthCalledWith(2, 'security unsupported')
        expect(alert).toHaveBeenNthCalledWith(3, 'security unsupported')
        expect(alert).toHaveBeenNthCalledWith(4, 'security unsupported')
        expect(downloadFileMock).not.toHaveBeenCalled()
        expect(copyToClipboardMock).not.toHaveBeenCalled()
    })

    it('keeps Tavern and Ooba exports conversation-only', async () => {
        getPageContextMock.mockReturnValue({
            kind: 'security-finding',
            findingId: 'finding-123',
            repoId: null,
            chatId: null,
            isSharePage: false,
            isShareContinuePage: false,
        })

        await expect(exportToTavern('{title}')).resolves.toBe(false)
        await expect(exportToOoba('{title}')).resolves.toBe(false)

        expect(alert).toHaveBeenCalledWith('security unsupported')
        expect(downloadFileMock).not.toHaveBeenCalled()
    })
})
