import { describe, expect, it } from 'vitest'
import { isEditableTarget, isMacPlatform, matchesExportCopyShortcut } from './exportCopyShortcutHelpers'

function buildKeyEvent(overrides: Partial<{
    key: string
    shiftKey: boolean
    metaKey: boolean
    ctrlKey: boolean
}> = {}) {
    return {
        key: 'e',
        shiftKey: true,
        metaKey: false,
        ctrlKey: false,
        ...overrides,
    }
}

describe('export copy shortcut helpers', () => {
    it('detects mac-like platforms', () => {
        expect(isMacPlatform('MacIntel')).toBe(true)
        expect(isMacPlatform('iPhone')).toBe(true)
        expect(isMacPlatform('Win32')).toBe(false)
        expect(isMacPlatform(undefined)).toBe(false)
    })

    it('matches Mod+Shift+E for mac and Ctrl+Shift+E for non-mac', () => {
        expect(matchesExportCopyShortcut(buildKeyEvent({ metaKey: true }), true)).toBe(true)
        expect(matchesExportCopyShortcut(buildKeyEvent({ metaKey: true, ctrlKey: true }), true)).toBe(false)
        expect(matchesExportCopyShortcut(buildKeyEvent({ ctrlKey: true }), false)).toBe(true)
        expect(matchesExportCopyShortcut(buildKeyEvent({ metaKey: true }), false)).toBe(false)
    })

    it('rejects partial or mismatched key combinations', () => {
        expect(matchesExportCopyShortcut(buildKeyEvent({ shiftKey: false, ctrlKey: true }), false)).toBe(false)
        expect(matchesExportCopyShortcut(buildKeyEvent({ key: 'x', ctrlKey: true }), false)).toBe(false)
    })

    it('treats targets with editable ancestors as editable', () => {
        const target = {
            closest: () => ({ tagName: 'input' }),
        } as unknown as EventTarget

        expect(isEditableTarget(target)).toBe(true)
    })

    it('treats targets with no editable ancestor as non-editable', () => {
        const target = {
            closest: () => null,
        } as unknown as EventTarget

        expect(isEditableTarget(target)).toBe(false)
    })

    it('treats missing/invalid targets as non-editable', () => {
        expect(isEditableTarget(null)).toBe(false)
        expect(isEditableTarget({} as EventTarget)).toBe(false)
    })
})
