/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

import { getPageContext } from '../pageContext'
import type { PageContext } from '../pageContext'

export interface ExportCapabilities {
    canExportText: boolean
    canExportPng: boolean
    canExportMarkdown: boolean
    canExportHtml: boolean
    canExportJson: boolean
    canExportTavern: boolean
    canExportOoba: boolean
    canExportAll: boolean
    canExportMemory: boolean
    historyDisabledApplies: boolean
    copyShortcutEnabled: boolean
}

export function getExportCapabilities(context: PageContext = getPageContext()) : ExportCapabilities {

    switch (context.kind) {
        case 'conversation':
            return {
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
            }
        case 'security-finding':
            return {
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
            }
        case 'security-scan':
            return {
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
            }
        case 'security-findings-list':
            return {
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
            }
        case 'unsupported':
            return {
                canExportText: false,
                canExportPng: false,
                canExportMarkdown: false,
                canExportHtml: false,
                canExportJson: false,
                canExportTavern: false,
                canExportOoba: false,
                canExportAll: false,
                canExportMemory: false,
                historyDisabledApplies: false,
                copyShortcutEnabled: false,
            }
    }
}
