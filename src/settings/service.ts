/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

import {
    KEY_COPY_TEXT_SHORTCUT,
    KEY_COPY_TEXT_SHORTCUT_ENABLED,
    KEY_EXPORT_ALL_LIMIT,
    KEY_FILENAME_FORMAT,
    KEY_LANGUAGE,
    KEY_META_ENABLED,
    KEY_META_LIST,
    KEY_TIMESTAMP_24H,
    KEY_TIMESTAMP_ENABLED,
    KEY_TIMESTAMP_HTML,
    KEY_TIMESTAMP_MARKDOWN,
} from '../constants'
import { normalizeCopyTextShortcut } from '../shortcuts/exportCopyShortcutHelpers'
import { ScriptStorage } from '../utils/storage'
import {
    DEFAULT_EXPORT_ALL_LIMIT,
    DEFAULT_EXPORTER_SETTINGS,
    DEFAULT_EXPORT_META_LIST,
} from './types'
import type { ExportMeta, ExporterSettings } from './types'

type SettingsListener = (settings: ExporterSettings) => void

const listeners = new Set<SettingsListener>()

function cloneExportMetaList(exportMetaList: ExportMeta[]): ExportMeta[] {
    return exportMetaList.map(meta => ({ ...meta }))
}

function cloneSettings(settings: ExporterSettings): ExporterSettings {
    return {
        ...settings,
        exportMetaList: cloneExportMetaList(settings.exportMetaList),
    }
}

function sanitizeBoolean(value: unknown, fallback: boolean): boolean {
    return typeof value === 'boolean' ? value : fallback
}

function sanitizeString(value: unknown, fallback: string): string {
    return typeof value === 'string' ? value : fallback
}

function sanitizeExportAllLimit(value: unknown): number {
    if (typeof value !== 'number' || !Number.isFinite(value)) {
        return DEFAULT_EXPORT_ALL_LIMIT
    }

    const clamped = Math.min(20000, Math.max(100, value))
    return Math.round(clamped / 100) * 100
}

function sanitizeCopyTextShortcut(value: unknown): string {
    return normalizeCopyTextShortcut(value, DEFAULT_EXPORTER_SETTINGS.copyTextShortcut)
}

function sanitizeExportMetaList(value: unknown): ExportMeta[] {
    if (!Array.isArray(value)) {
        return cloneExportMetaList(DEFAULT_EXPORT_META_LIST)
    }

    const sanitized = value
        .filter((item): item is ExportMeta => {
            if (!item || typeof item !== 'object') return false
            const maybeItem = item as Partial<ExportMeta>
            return typeof maybeItem.name === 'string' && typeof maybeItem.value === 'string'
        })
        .map(item => ({
            name: item.name.trim(),
            value: item.value.trim(),
        }))

    return sanitized.length > 0
        ? sanitized
        : cloneExportMetaList(DEFAULT_EXPORT_META_LIST)
}

type SettingsInput = Partial<Record<keyof ExporterSettings, unknown>>

function sanitizeSettings(input: SettingsInput): ExporterSettings {
    return {
        format: sanitizeString(input.format, DEFAULT_EXPORTER_SETTINGS.format),
        enableTimestamp: sanitizeBoolean(input.enableTimestamp, DEFAULT_EXPORTER_SETTINGS.enableTimestamp),
        timeStamp24H: sanitizeBoolean(input.timeStamp24H, DEFAULT_EXPORTER_SETTINGS.timeStamp24H),
        enableTimestampHTML: sanitizeBoolean(input.enableTimestampHTML, DEFAULT_EXPORTER_SETTINGS.enableTimestampHTML),
        enableTimestampMarkdown: sanitizeBoolean(input.enableTimestampMarkdown, DEFAULT_EXPORTER_SETTINGS.enableTimestampMarkdown),
        enableMeta: sanitizeBoolean(input.enableMeta, DEFAULT_EXPORTER_SETTINGS.enableMeta),
        exportMetaList: sanitizeExportMetaList(input.exportMetaList),
        exportAllLimit: sanitizeExportAllLimit(input.exportAllLimit),
        enableCopyTextShortcut: sanitizeBoolean(input.enableCopyTextShortcut, DEFAULT_EXPORTER_SETTINGS.enableCopyTextShortcut),
        copyTextShortcut: sanitizeCopyTextShortcut(input.copyTextShortcut),
    }
}

function readStoredSettings(): ExporterSettings {
    return sanitizeSettings({
        format: ScriptStorage.get<string>(KEY_FILENAME_FORMAT),
        enableTimestamp: ScriptStorage.get<boolean>(KEY_TIMESTAMP_ENABLED),
        timeStamp24H: ScriptStorage.get<boolean>(KEY_TIMESTAMP_24H),
        enableTimestampHTML: ScriptStorage.get<boolean>(KEY_TIMESTAMP_HTML),
        enableTimestampMarkdown: ScriptStorage.get<boolean>(KEY_TIMESTAMP_MARKDOWN),
        enableMeta: ScriptStorage.get<boolean>(KEY_META_ENABLED),
        exportMetaList: ScriptStorage.get<ExportMeta[]>(KEY_META_LIST),
        exportAllLimit: ScriptStorage.get<number>(KEY_EXPORT_ALL_LIMIT),
        enableCopyTextShortcut: ScriptStorage.get<boolean>(KEY_COPY_TEXT_SHORTCUT_ENABLED),
        copyTextShortcut: ScriptStorage.get<string>(KEY_COPY_TEXT_SHORTCUT),
    })
}

function writeStoredSettings(settings: ExporterSettings): void {
    ScriptStorage.set(KEY_FILENAME_FORMAT, settings.format)
    ScriptStorage.set(KEY_TIMESTAMP_ENABLED, settings.enableTimestamp)
    ScriptStorage.set(KEY_TIMESTAMP_24H, settings.timeStamp24H)
    ScriptStorage.set(KEY_TIMESTAMP_HTML, settings.enableTimestampHTML)
    ScriptStorage.set(KEY_TIMESTAMP_MARKDOWN, settings.enableTimestampMarkdown)
    ScriptStorage.set(KEY_META_ENABLED, settings.enableMeta)
    ScriptStorage.set(KEY_META_LIST, settings.exportMetaList)
    ScriptStorage.set(KEY_EXPORT_ALL_LIMIT, settings.exportAllLimit)
    ScriptStorage.set(KEY_COPY_TEXT_SHORTCUT_ENABLED, settings.enableCopyTextShortcut)
    ScriptStorage.set(KEY_COPY_TEXT_SHORTCUT, settings.copyTextShortcut)
}

function notifyListeners(settings: ExporterSettings): void {
    const snapshot = cloneSettings(settings)
    listeners.forEach((listener) => {
        listener(snapshot)
    })
}

let cachedSettings: ExporterSettings | null = null

export function getSettings(): ExporterSettings {
    if (!cachedSettings) {
        cachedSettings = readStoredSettings()
    }

    return cloneSettings(cachedSettings)
}

export function reloadSettingsFromStorage(): ExporterSettings {
    const nextSettings = readStoredSettings()
    cachedSettings = nextSettings
    applyTimestampFormatPreference(nextSettings)
    notifyListeners(nextSettings)
    return cloneSettings(nextSettings)
}

export function saveSettings(nextSettings: Partial<ExporterSettings>): ExporterSettings {
    const merged = sanitizeSettings({
        ...getSettings(),
        ...nextSettings,
    })

    writeStoredSettings(merged)
    cachedSettings = merged
    applyTimestampFormatPreference(merged)
    notifyListeners(merged)

    return cloneSettings(merged)
}

export function setSetting<K extends keyof ExporterSettings>(key: K, value: ExporterSettings[K]): ExporterSettings {
    return saveSettings({ [key]: value } as Pick<ExporterSettings, K>)
}

export function resetSettings(): ExporterSettings {
    const defaults = cloneSettings(DEFAULT_EXPORTER_SETTINGS)
    writeStoredSettings(defaults)
    cachedSettings = defaults
    applyTimestampFormatPreference(defaults)
    notifyListeners(defaults)
    return cloneSettings(defaults)
}

export function subscribeSettings(listener: SettingsListener): () => void {
    listeners.add(listener)

    return () => {
        listeners.delete(listener)
    }
}

export function getStoredLanguage(): string | null {
    const language = ScriptStorage.get<string>(KEY_LANGUAGE)
    return typeof language === 'string' && language ? language : null
}

export function setStoredLanguage(language: string): void {
    ScriptStorage.set(KEY_LANGUAGE, language)
}

export function applyTimestampFormatPreference(settings = getSettings()): void {
    if (typeof document !== 'object' || !document.body) return

    if (settings.enableTimestamp) {
        document.body.setAttribute('data-time-format', settings.timeStamp24H ? '24' : '12')
    }
    else {
        document.body.removeAttribute('data-time-format')
    }
}
