/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it, vi } from 'vitest'

const { getPageContextMock } = vi.hoisted(() => ({
    getPageContextMock: vi.fn(),
}))

vi.mock('../pageContext', () => ({
    getPageContext: getPageContextMock,
}))

import { getExportCapabilities } from './pageExport'

describe('getExportCapabilities', () => {
    it('returns the full action set for conversation pages', () => {
        getPageContextMock.mockReturnValue({
            kind: 'conversation',
            isSharePage: false,
            isShareContinuePage: false,
        })

        expect(getExportCapabilities()).toEqual({
            canExportText: true,
            canExportPng: true,
            canExportMarkdown: true,
            canExportHtml: true,
            canExportJson: true,
            canExportTavern: true,
            canExportOoba: true,
            canExportAll: true,
            historyDisabledApplies: true,
            copyShortcutEnabled: true,
        })
    })

    it('disables conversation-only actions on security detail pages', () => {
        getPageContextMock.mockReturnValue({
            kind: 'security-scan',
        })

        expect(getExportCapabilities()).toEqual({
            canExportText: true,
            canExportPng: true,
            canExportMarkdown: true,
            canExportHtml: true,
            canExportJson: true,
            canExportTavern: false,
            canExportOoba: false,
            canExportAll: false,
            historyDisabledApplies: false,
            copyShortcutEnabled: false,
        })
    })

    it('disables all exports on unsupported list pages', () => {
        getPageContextMock.mockReturnValue({
            kind: 'security-findings-list',
        })

        expect(getExportCapabilities()).toEqual({
            canExportText: false,
            canExportPng: false,
            canExportMarkdown: false,
            canExportHtml: false,
            canExportJson: false,
            canExportTavern: false,
            canExportOoba: false,
            canExportAll: false,
            historyDisabledApplies: false,
            copyShortcutEnabled: false,
        })
    })
})
