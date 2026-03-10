/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

import { beforeEach, describe, expect, it, vi } from 'vitest'
import { JSDOM } from 'jsdom'
import type * as PageContextModule from '../pageContext'
import type * as DownloadModule from '../utils/download'
import type * as UtilsModule from '../utils/utils'

const {
    getPageContextMock,
    html2canvasMock,
    checkIfConversationStartedMock,
    getChatIdFromUrlMock,
    downloadUrlMock,
    getSecurityUnsupportedMessageMock,
    getSecurityFileNameOptionsMock,
    loadCurrentSecurityDocumentMock,
} = vi.hoisted(() => ({
    getPageContextMock: vi.fn(),
    html2canvasMock: vi.fn(),
    checkIfConversationStartedMock: vi.fn(),
    getChatIdFromUrlMock: vi.fn(),
    downloadUrlMock: vi.fn(),
    getSecurityUnsupportedMessageMock: vi.fn(),
    getSecurityFileNameOptionsMock: vi.fn(),
    loadCurrentSecurityDocumentMock: vi.fn(),
}))

vi.mock('html2canvas', () => ({
    default: html2canvasMock,
}))

vi.mock('../pageContext', async () => {
    const actual = await vi.importActual<typeof PageContextModule>('../pageContext')
    return {
        ...actual,
        getPageContext: getPageContextMock,
    }
})

vi.mock('../page', () => ({
    checkIfConversationStarted: checkIfConversationStartedMock,
    getChatIdFromUrl: getChatIdFromUrlMock,
}))

vi.mock('../utils/download', async () => {
    const actual = await vi.importActual<typeof DownloadModule>('../utils/download')
    return {
        ...actual,
        downloadUrl: downloadUrlMock,
    }
})

vi.mock('./securityDocument', () => ({
    getSecurityUnsupportedMessage: getSecurityUnsupportedMessageMock,
    getSecurityFileNameOptions: getSecurityFileNameOptionsMock,
    loadCurrentSecurityDocument: loadCurrentSecurityDocumentMock,
}))

vi.mock('../i18n', () => ({
    default: {
        t: (key: string) => key,
    },
}))

vi.mock('../utils/utils', async () => {
    const actual = await vi.importActual<typeof UtilsModule>('../utils/utils')
    return {
        ...actual,
        sleep: vi.fn(async () => {}),
    }
})

import { exportToPng, getSecurityDetailPane, resolvePngCaptureSpec } from './image'

function setElementMetrics(element: HTMLElement, { scrollWidth = 640, scrollHeight = 1200 }: { scrollWidth?: number, scrollHeight?: number } = {}) {
    Object.defineProperty(element, 'scrollWidth', {
        value: scrollWidth,
        configurable: true,
    })
    Object.defineProperty(element, 'scrollHeight', {
        value: scrollHeight,
        configurable: true,
    })
}

function createCanvas() {
    return {
        getContext: vi.fn(() => ({ imageSmoothingEnabled: true })),
        toDataURL: vi.fn(() => 'data:image/png;base64,abc123'),
    } as unknown as HTMLCanvasElement
}

describe('image exporter', () => {
    beforeEach(() => {
        vi.clearAllMocks()
        const dom = new JSDOM('<!doctype html><html><head></head><body></body></html>')
        vi.stubGlobal('document', dom.window.document)
        vi.stubGlobal('window', dom.window)
        vi.stubGlobal('HTMLElement', dom.window.HTMLElement)
        vi.stubGlobal('Element', dom.window.Element)
        checkIfConversationStartedMock.mockReturnValue(true)
        getChatIdFromUrlMock.mockReturnValue('chat-123')
        getSecurityUnsupportedMessageMock.mockReturnValue('unsupported')
        getSecurityFileNameOptionsMock.mockReturnValue({
            title: 'Metadata Title',
            createTime: 1_700_000_000,
            updateTime: 1_700_000_100,
        })
        loadCurrentSecurityDocumentMock.mockResolvedValue({
            metadata: {
                title: 'Metadata Title',
                createTime: 1_700_000_000,
                updateTime: 1_700_000_100,
            },
        })
        html2canvasMock.mockResolvedValue(createCanvas())
        vi.stubGlobal('alert', vi.fn())
        Object.defineProperty(window, 'devicePixelRatio', { value: 1, configurable: true })
        Object.defineProperty(window, 'scrollX', { value: 0, configurable: true })
        Object.defineProperty(window, 'scrollY', { value: 0, configurable: true })
        Object.defineProperty(window, 'URL', {
            value: {
                revokeObjectURL: vi.fn(),
            },
            configurable: true,
        })
    })

    it('resolves the security detail pane from the left-rail separator layout', () => {
        document.body.innerHTML = `
            <aside style="--codex-security-left-pane-width: 484px"></aside>
            <div role="separator" aria-label="Resize repository pane"></div>
            <div id="detail-pane"><h1>Finding Title</h1></div>
        `

        const detailPane = getSecurityDetailPane()

        expect(detailPane?.id).toBe('detail-pane')
    })

    it('resolves PNG capture spec for security pages using the detail pane title', () => {
        document.body.innerHTML = `
            <h1>Shell Title</h1>
            <aside style="--codex-security-left-pane-width: 484px"></aside>
            <div role="separator" aria-label="Resize repository pane"></div>
            <div id="detail-pane"><h1>Security Scan Title</h1></div>
        `
        const detailPane = document.getElementById('detail-pane')!
        setElementMetrics(detailPane)
        getPageContextMock.mockReturnValue({
            kind: 'security-scan',
            repoId: 'github-123',
            findingId: null,
            chatId: null,
            isSharePage: false,
            isShareContinuePage: false,
        })

        const captureSpec = resolvePngCaptureSpec()

        expect(captureSpec).toEqual({
            mode: 'security',
            element: detailPane,
            fileNameOptions: {
                title: 'Security Scan Title',
            },
        })
    })

    it('exports the security detail pane to PNG', async () => {
        document.body.innerHTML = `
            <aside style="--codex-security-left-pane-width: 484px"></aside>
            <div role="separator" aria-label="Resize repository pane"></div>
            <div id="detail-pane"><h1>Finding Export Title</h1><section>content</section></div>
        `
        const detailPane = document.getElementById('detail-pane')!
        setElementMetrics(detailPane, { scrollWidth: 900, scrollHeight: 1800 })
        getPageContextMock.mockReturnValue({
            kind: 'security-finding',
            repoId: null,
            findingId: 'finding-123',
            chatId: null,
            isSharePage: false,
            isShareContinuePage: false,
        })

        const success = await exportToPng('{title}-{create_time}')

        expect(success).toBe(true)
        expect(html2canvasMock).toHaveBeenCalledTimes(1)
        expect(html2canvasMock.mock.calls[0]?.[0]).toBe(detailPane)
        expect(downloadUrlMock).toHaveBeenCalledTimes(1)
        expect(downloadUrlMock.mock.calls[0]?.[0]).toBe('Metadata_Title-2023-11-14T22:13:20.000Z.png')
        expect(downloadUrlMock.mock.calls[0]?.[1]).toContain('data:application/octet-stream')
    })

    it('falls back to pane title when security metadata reload fails after capture', async () => {
        document.body.innerHTML = `
            <aside style="--codex-security-left-pane-width: 484px"></aside>
            <div role="separator" aria-label="Resize repository pane"></div>
            <div id="detail-pane"><h1>Fallback Pane Title</h1><section>content</section></div>
        `
        const detailPane = document.getElementById('detail-pane')!
        setElementMetrics(detailPane, { scrollWidth: 900, scrollHeight: 1800 })
        getPageContextMock.mockReturnValue({
            kind: 'security-scan',
            repoId: 'github-123',
            findingId: null,
            chatId: null,
            isSharePage: false,
            isShareContinuePage: false,
        })
        loadCurrentSecurityDocumentMock.mockRejectedValueOnce(new Error('scan resolution failed'))
        vi.spyOn(console, 'warn').mockImplementation(() => {})

        const success = await exportToPng('{title}-{create_time}')

        expect(success).toBe(true)
        expect(downloadUrlMock).toHaveBeenCalledTimes(1)
        expect(downloadUrlMock.mock.calls[0]?.[0]).toMatch(/^Fallback_Pane_Title-.*\.png$/)
    })

    it('alerts unsupported on non-exportable security list pages', async () => {
        getPageContextMock.mockReturnValue({
            kind: 'security-findings-list',
            repoId: null,
            findingId: null,
            chatId: null,
            isSharePage: false,
            isShareContinuePage: false,
        })

        const success = await exportToPng('{title}')

        expect(success).toBe(false)
        expect(alert).toHaveBeenCalledWith('unsupported')
        expect(html2canvasMock).not.toHaveBeenCalled()
    })

    it('exports the conversation thread to PNG using the chat id filename token', async () => {
        document.body.innerHTML = `
            <div id="thread">
                <div id="conversation-root">
                    <div data-testid="conversation-turn-1"></div>
                    <div data-testid="conversation-turn-2"></div>
                </div>
            </div>
        `
        const conversationRoot = document.getElementById('conversation-root')!
        setElementMetrics(conversationRoot, { scrollWidth: 700, scrollHeight: 900 })
        getPageContextMock.mockReturnValue({
            kind: 'conversation',
            repoId: null,
            findingId: null,
            chatId: 'chat-123',
            isSharePage: false,
            isShareContinuePage: false,
        })

        const success = await exportToPng('{chat_id}')

        expect(success).toBe(true)
        expect(html2canvasMock.mock.calls[0]?.[0]).toBe(conversationRoot)
        expect(downloadUrlMock.mock.calls[0]?.[0]).toBe('chat-123.png')
    })

    it('blocks conversation PNG export when no conversation has started', async () => {
        checkIfConversationStartedMock.mockReturnValue(false)
        getPageContextMock.mockReturnValue({
            kind: 'conversation',
            repoId: null,
            findingId: null,
            chatId: 'chat-123',
            isSharePage: false,
            isShareContinuePage: false,
        })

        const success = await exportToPng('{chat_id}')

        expect(success).toBe(false)
        expect(alert).toHaveBeenCalledWith('Please start a conversation first')
        expect(html2canvasMock).not.toHaveBeenCalled()
    })
})
