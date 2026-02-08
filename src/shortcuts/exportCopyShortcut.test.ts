import { describe, expect, it } from 'vitest'
import {
    DEFAULT_COPY_TEXT_SHORTCUT,
    isEditableContext,
    isEditableTarget,
    isMacPlatform,
    matchesExportCopyShortcut,
    normalizeCopyTextShortcut,
} from './exportCopyShortcutHelpers'

function buildKeyEvent(overrides: Partial<{
    key: string
    shiftKey: boolean
    metaKey: boolean
    ctrlKey: boolean
    altKey: boolean
}> = {}) {
    return {
        key: 'e',
        shiftKey: true,
        metaKey: false,
        ctrlKey: false,
        altKey: false,
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
        expect(matchesExportCopyShortcut(buildKeyEvent({ ctrlKey: true, altKey: true }), false)).toBe(false)
    })

    it('supports normalized custom shortcut combos with optional Alt', () => {
        const shortcut = normalizeCopyTextShortcut('mod+shift+alt+m')
        expect(shortcut).toBe('Mod+Shift+Alt+M')
        expect(matchesExportCopyShortcut(buildKeyEvent({ key: 'm', ctrlKey: true, altKey: true }), false, shortcut)).toBe(true)
        expect(matchesExportCopyShortcut(buildKeyEvent({ key: 'm', ctrlKey: true, altKey: false }), false, shortcut)).toBe(false)
    })

    it('normalizes invalid combos back to default shortcut', () => {
        expect(normalizeCopyTextShortcut('Ctrl+E')).toBe(DEFAULT_COPY_TEXT_SHORTCUT)
        expect(normalizeCopyTextShortcut('Ctrl+Shift+9')).toBe(DEFAULT_COPY_TEXT_SHORTCUT)
        expect(normalizeCopyTextShortcut(777)).toBe(DEFAULT_COPY_TEXT_SHORTCUT)
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

    it('treats active editable element as editable context even when event target is not editable', () => {
        const target = { closest: () => null } as unknown as EventTarget
        const activeElement = { closest: () => ({ tagName: 'textarea' }) } as unknown as Element

        expect(isEditableContext(target, activeElement)).toBe(true)
    })

    it('treats non-editable target and active element as non-editable context', () => {
        const target = { closest: () => null } as unknown as EventTarget
        const activeElement = { closest: () => null } as unknown as Element

        expect(isEditableContext(target, activeElement)).toBe(false)
    })
})
