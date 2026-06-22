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
            canExportMemory: true,
            historyDisabledApplies: true,
            copyShortcutEnabled: true,
        })
    })

    it('keeps single-item actions and enables bulk export on security finding detail pages', () => {
        getPageContextMock.mockReturnValue({
            kind: 'security-finding',
        })

        expect(getExportCapabilities()).toEqual({
            canExportText: true,
            canExportPng: true,
            canExportMarkdown: true,
            canExportHtml: true,
            canExportJson: true,
            canExportTavern: false,
            canExportOoba: false,
            canExportAll: true,
            canExportMemory: false,
            historyDisabledApplies: false,
            copyShortcutEnabled: true,
        })
    })

    it('disables bulk export on scan pages', () => {
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
            canExportMemory: false,
            historyDisabledApplies: false,
            copyShortcutEnabled: true,
        })
    })

    it('enables bulk export only on findings list pages', () => {
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
            canExportAll: true,
            canExportMemory: false,
            historyDisabledApplies: false,
            copyShortcutEnabled: false,
        })
    })
})
