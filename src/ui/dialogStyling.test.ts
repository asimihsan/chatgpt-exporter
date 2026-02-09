/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { EXPORT_DIALOG_CLASS_NAMES } from './dialogClassNames'

const repoRoot = fileURLToPath(new URL('../..', import.meta.url))

function readRepoFile(relativePath: string): string {
    return readFileSync(resolve(repoRoot, relativePath), 'utf8')
}

describe('dialog styling namespace hardening', () => {
    it('uses namespaced dialog class constants', () => {
        expect(EXPORT_DIALOG_CLASS_NAMES.overlay).toBe('ce-dialog-overlay')
        expect(EXPORT_DIALOG_CLASS_NAMES.content).toBe('ce-dialog-content')
        expect(EXPORT_DIALOG_CLASS_NAMES.title).toBe('ce-dialog-title')
    })

    it('does not use legacy generic dialog classes in menu/export dialog modules', () => {
        const menuSource = readRepoFile('src/ui/Menu.tsx')
        const exportDialogSource = readRepoFile('src/ui/ExportDialog.tsx')

        expect(menuSource).not.toContain('className="DialogOverlay"')
        expect(menuSource).not.toContain('className="DialogContent"')
        expect(menuSource).not.toContain('className="DialogTitle"')

        expect(exportDialogSource).not.toContain('className="DialogOverlay"')
        expect(exportDialogSource).not.toContain('className="DialogContent"')
        expect(exportDialogSource).not.toContain('className="DialogTitle"')
    })

    it('defines namespaced overlay/content/title selectors in Dialog.css', () => {
        const dialogCssSource = readRepoFile('src/ui/Dialog.css')

        expect(dialogCssSource).toContain('.ce-dialog-overlay')
        expect(dialogCssSource).toContain('.ce-dialog-content')
        expect(dialogCssSource).toContain('.ce-dialog-title')

        expect(dialogCssSource).not.toContain('.DialogOverlay')
        expect(dialogCssSource).not.toContain('.DialogContent')
        expect(dialogCssSource).not.toContain('.DialogTitle')
    })
})
