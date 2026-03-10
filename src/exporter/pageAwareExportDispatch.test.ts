/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

import { beforeEach, describe, expect, it, vi } from 'vitest'

const {
    getPageContextMock,
    checkIfConversationStartedMock,
    getCurrentChatIdMock,
    fetchConversationMock,
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
    processConversation: processConversationMock,
}))

vi.mock('../utils/clipboard', () => ({
    copyToClipboard: copyToClipboardMock,
}))

vi.mock('../utils/download', async () => {
    const actual = await vi.importActual<typeof import('../utils/download')>('../utils/download')
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
import { exportToMarkdown } from './markdown'
import { exportToText } from './text'

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

    it('routes text export through the security document path on finding pages', async () => {
        getPageContextMock.mockReturnValue({
            kind: 'security-finding',
            findingId: 'finding-123',
            repoId: null,
            chatId: null,
            isSharePage: false,
            isShareContinuePage: false,
        })

        const success = await exportToText()

        expect(success).toBe(true)
        expect(loadCurrentSecurityDocumentMock).toHaveBeenCalledTimes(1)
        expect(copyToClipboardMock).toHaveBeenCalledWith('security text')
        expect(fetchConversationMock).not.toHaveBeenCalled()
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

        await expect(exportToText()).resolves.toBe(false)
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
