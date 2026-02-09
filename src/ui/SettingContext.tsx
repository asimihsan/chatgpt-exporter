/**
 * Copyright 2022-Present Pionxzh
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0 AND MIT
 */

import { createContext, useContext } from 'preact/compat'
import { useCallback, useEffect, useMemo, useState } from 'preact/hooks'
import {
    applyTimestampFormatPreference,
    getSettings,
    resetSettings,
    saveSettings,
    subscribeSettings,
} from '../settings/service'
import {
    DEFAULT_EXPORTER_SETTINGS,
    DEFAULT_EXPORT_META_LIST,
} from '../settings/types'
import type { FC } from 'preact/compat'
import type { ExportMeta, ExporterSettings } from '../settings/types'

interface SettingContextValue extends ExporterSettings {
    setFormat: (value: string) => void
    setEnableTimestamp: (value: boolean) => void
    setTimeStamp24H: (value: boolean) => void
    setEnableTimestampHTML: (value: boolean) => void
    setEnableTimestampMarkdown: (value: boolean) => void
    setEnableMeta: (value: boolean) => void
    setExportMetaList: (value: ExportMeta[]) => void
    setExportAllLimit: (value: number) => void
    resetDefault: () => void
}

const defaultContextValue: SettingContextValue = {
    ...DEFAULT_EXPORTER_SETTINGS,
    exportMetaList: [...DEFAULT_EXPORT_META_LIST],
    setFormat: () => {},
    setEnableTimestamp: () => {},
    setTimeStamp24H: () => {},
    setEnableTimestampHTML: () => {},
    setEnableTimestampMarkdown: () => {},
    setEnableMeta: () => {},
    setExportMetaList: () => {},
    setExportAllLimit: () => {},
    resetDefault: () => {},
}

const SettingContext = createContext<SettingContextValue>(defaultContextValue)

export const SettingProvider: FC = ({ children }) => {
    const [settings, setSettings] = useState<ExporterSettings>(() => getSettings())

    useEffect(() => {
        const unsubscribe = subscribeSettings((nextSettings) => {
            setSettings(nextSettings)
        })

        return () => {
            unsubscribe()
        }
    }, [])

    useEffect(() => {
        applyTimestampFormatPreference(settings)
    }, [settings])

    const setFormat = useCallback((value: string) => {
        saveSettings({ format: value })
    }, [])

    const setEnableTimestamp = useCallback((value: boolean) => {
        saveSettings({ enableTimestamp: value })
    }, [])

    const setTimeStamp24H = useCallback((value: boolean) => {
        saveSettings({ timeStamp24H: value })
    }, [])

    const setEnableTimestampHTML = useCallback((value: boolean) => {
        saveSettings({ enableTimestampHTML: value })
    }, [])

    const setEnableTimestampMarkdown = useCallback((value: boolean) => {
        saveSettings({ enableTimestampMarkdown: value })
    }, [])

    const setEnableMeta = useCallback((value: boolean) => {
        saveSettings({ enableMeta: value })
    }, [])

    const setExportMetaList = useCallback((value: ExportMeta[]) => {
        saveSettings({ exportMetaList: value })
    }, [])

    const setExportAllLimit = useCallback((value: number) => {
        saveSettings({ exportAllLimit: value })
    }, [])

    const resetDefault = useCallback(() => {
        resetSettings()
    }, [])

    const contextValue = useMemo<SettingContextValue>(() => ({
        ...settings,
        setFormat,
        setEnableTimestamp,
        setTimeStamp24H,
        setEnableTimestampHTML,
        setEnableTimestampMarkdown,
        setEnableMeta,
        setExportMetaList,
        setExportAllLimit,
        resetDefault,
    }), [
        settings,
        setFormat,
        setEnableTimestamp,
        setTimeStamp24H,
        setEnableTimestampHTML,
        setEnableTimestampMarkdown,
        setEnableMeta,
        setExportMetaList,
        setExportAllLimit,
        resetDefault,
    ])

    return (
        <SettingContext.Provider value={contextValue}>
            {children}
        </SettingContext.Provider>
    )
}

export const useSettingContext = () => useContext(SettingContext)

export type { ExportMeta }
