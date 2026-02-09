/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

import { GM, GM_registerMenuCommand } from 'vite-plugin-monkey/dist/client'
import i18n from '../i18n'
import { openSettingsPanel } from './panel'

let registered = false

export function registerSettingsMenuCommand(): void {
    if (registered) return

    const label = i18n.t('Exporter Settings')

    if (typeof GM_registerMenuCommand === 'function') {
        GM_registerMenuCommand(label, () => {
            openSettingsPanel()
        })
        registered = true
        return
    }

    if (GM && typeof GM.registerMenuCommand === 'function') {
        void GM.registerMenuCommand(label, () => {
            openSettingsPanel()
        })
        registered = true
    }
}
