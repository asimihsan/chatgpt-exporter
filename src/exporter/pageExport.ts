/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

import { getPageContext } from '../pageContext'

export interface ExportCapabilities {
    canExportText: boolean
    canExportPng: boolean
    canExportMarkdown: boolean
    canExportHtml: boolean
    canExportJson: boolean
    canExportTavern: boolean
    canExportOoba: boolean
    canExportAll: boolean
    historyDisabledApplies: boolean
    copyShortcutEnabled: boolean
}

export function getExportCapabilities() : ExportCapabilities {
    const context = getPageContext()

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
                historyDisabledApplies: true,
                copyShortcutEnabled: true,
            }
        case 'security-finding':
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
                historyDisabledApplies: false,
                copyShortcutEnabled: false,
            }
        case 'security-findings-list':
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
                historyDisabledApplies: false,
                copyShortcutEnabled: false,
            }
    }
}
