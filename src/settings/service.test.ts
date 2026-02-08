import { beforeEach, describe, expect, it } from 'vitest'
import {
    KEY_COPY_TEXT_SHORTCUT,
    KEY_COPY_TEXT_SHORTCUT_ENABLED,
    KEY_EXPORT_ALL_LIMIT,
    KEY_FILENAME_FORMAT,
    KEY_META_ENABLED,
    KEY_META_LIST,
    KEY_TIMESTAMP_24H,
    KEY_TIMESTAMP_ENABLED,
    KEY_TIMESTAMP_HTML,
    KEY_TIMESTAMP_MARKDOWN,
} from '../constants'
import { ScriptStorage } from '../utils/storage'
import { DEFAULT_EXPORTER_SETTINGS } from './types'
import {
    getSettings,
    reloadSettingsFromStorage,
    resetSettings,
    saveSettings,
    setSetting,
} from './service'

const SETTING_KEYS = [
    KEY_FILENAME_FORMAT,
    KEY_TIMESTAMP_ENABLED,
    KEY_TIMESTAMP_24H,
    KEY_TIMESTAMP_HTML,
    KEY_TIMESTAMP_MARKDOWN,
    KEY_META_ENABLED,
    KEY_META_LIST,
    KEY_EXPORT_ALL_LIMIT,
    KEY_COPY_TEXT_SHORTCUT_ENABLED,
    KEY_COPY_TEXT_SHORTCUT,
]

function clearSettingsStorage(): void {
    SETTING_KEYS.forEach((key) => {
        ScriptStorage.delete(key)
    })
}

describe('settings service', () => {
    beforeEach(() => {
        clearSettingsStorage()
        resetSettings()
    })

    it('loads defaults and sanitizes malformed persisted values', () => {
        ScriptStorage.set(KEY_FILENAME_FORMAT, 123)
        ScriptStorage.set(KEY_TIMESTAMP_ENABLED, 'nope')
        ScriptStorage.set(KEY_META_LIST, [{ name: 'ok', value: '{title}' }, { value: '{source}' }])
        ScriptStorage.set(KEY_EXPORT_ALL_LIMIT, 55)
        ScriptStorage.set(KEY_COPY_TEXT_SHORTCUT_ENABLED, 'nope')
        ScriptStorage.set(KEY_COPY_TEXT_SHORTCUT, 'Ctrl+?')

        const settings = reloadSettingsFromStorage()

        expect(settings.format).toBe(DEFAULT_EXPORTER_SETTINGS.format)
        expect(settings.enableTimestamp).toBe(DEFAULT_EXPORTER_SETTINGS.enableTimestamp)
        expect(settings.exportMetaList).toEqual([{ name: 'ok', value: '{title}' }])
        expect(settings.exportAllLimit).toBe(100)
        expect(settings.enableCopyTextShortcut).toBe(DEFAULT_EXPORTER_SETTINGS.enableCopyTextShortcut)
        expect(settings.copyTextShortcut).toBe(DEFAULT_EXPORTER_SETTINGS.copyTextShortcut)
    })

    it('persists updates and normalizes range-based values', () => {
        const updated = saveSettings({
            format: 'Conversation-{title}',
            exportAllLimit: 20301,
            enableTimestamp: true,
            timeStamp24H: true,
            enableCopyTextShortcut: false,
            copyTextShortcut: 'ctrl + shift + alt + m',
        })

        expect(updated.format).toBe('Conversation-{title}')
        expect(updated.exportAllLimit).toBe(20000)
        expect(updated.enableTimestamp).toBe(true)
        expect(updated.timeStamp24H).toBe(true)
        expect(updated.enableCopyTextShortcut).toBe(false)
        expect(updated.copyTextShortcut).toBe('Mod+Shift+Alt+M')

        const persisted = getSettings()
        expect(persisted).toEqual(updated)
    })

    it('supports single-key updates and full reset', () => {
        const afterSet = setSetting('enableMeta', true)
        expect(afterSet.enableMeta).toBe(true)

        const reset = resetSettings()
        expect(reset).toEqual(DEFAULT_EXPORTER_SETTINGS)
    })

    it('normalizes single-key shortcut updates and persists them', () => {
        const withInvalidShortcut = setSetting('copyTextShortcut', 'ctrl+shift+9')
        expect(withInvalidShortcut.copyTextShortcut).toBe(DEFAULT_EXPORTER_SETTINGS.copyTextShortcut)

        const withDisabledShortcut = setSetting('enableCopyTextShortcut', false)
        expect(withDisabledShortcut.enableCopyTextShortcut).toBe(false)

        const reloaded = reloadSettingsFromStorage()
        expect(reloaded.copyTextShortcut).toBe(DEFAULT_EXPORTER_SETTINGS.copyTextShortcut)
        expect(reloaded.enableCopyTextShortcut).toBe(false)
    })

    it('keeps disabled shortcut state even when shortcut combo sanitizes to default', () => {
        const updated = saveSettings({
            enableCopyTextShortcut: false,
            copyTextShortcut: 'Ctrl+E',
        })

        expect(updated.enableCopyTextShortcut).toBe(false)
        expect(updated.copyTextShortcut).toBe(DEFAULT_EXPORTER_SETTINGS.copyTextShortcut)
    })
})
