import i18n from '../i18n'
import {
    DEFAULT_EXPORTER_SETTINGS,
    DEFAULT_EXPORT_META_LIST,
} from './types'
import {
    getSettings,
    getStoredLanguage,
    saveSettings,
    setStoredLanguage,
} from './service'
import { buildSettingsPanelView } from './panelView'
import type { PanelElements } from './panelView'
import type { ExportMeta, ExporterSettings } from './types'

interface PanelState {
    settings: ExporterSettings
    language: string
}

interface ActivePanel {
    host: HTMLDivElement
    keydownHandler: (event: KeyboardEvent) => void
}

let activePanel: ActivePanel | null = null

function t(key: string, fallback: string): string {
    const value = i18n.t(key)
    return value === key ? fallback : value
}

function cloneMetaList(metaList: ExportMeta[]): ExportMeta[] {
    return metaList.map(meta => ({ ...meta }))
}

function createPanelState(): PanelState {
    const settings = getSettings()

    return {
        settings: {
            ...settings,
            exportMetaList: cloneMetaList(settings.exportMetaList),
        },
        language: getStoredLanguage() ?? i18n.language,
    }
}

function renderMetaList(elements: PanelElements, state: PanelState): void {
    elements.metaList.innerHTML = ''

    state.settings.exportMetaList.forEach((meta, index) => {
        const row = document.createElement('div')
        row.className = 'ce-meta-item'

        const nameInput = document.createElement('input')
        nameInput.type = 'text'
        nameInput.value = meta.name
        nameInput.placeholder = 'name'
        nameInput.addEventListener('input', () => {
            state.settings.exportMetaList[index] = {
                ...state.settings.exportMetaList[index],
                name: nameInput.value,
            }
        })

        const valueInput = document.createElement('input')
        valueInput.type = 'text'
        valueInput.value = meta.value
        valueInput.placeholder = 'value'
        valueInput.addEventListener('input', () => {
            state.settings.exportMetaList[index] = {
                ...state.settings.exportMetaList[index],
                value: valueInput.value,
            }
        })

        const removeButton = document.createElement('button')
        removeButton.type = 'button'
        removeButton.className = 'ce-remove-btn'
        removeButton.textContent = t('Remove', 'Remove')
        removeButton.addEventListener('click', () => {
            state.settings.exportMetaList = state.settings.exportMetaList.filter((_, currentIndex) => currentIndex !== index)
            renderMetaList(elements, state)
        })

        row.append(nameInput, valueInput, removeButton)
        elements.metaList.append(row)
    })
}

function syncDependentSections(elements: PanelElements, state: PanelState): void {
    elements.timestampOptions.hidden = !state.settings.enableTimestamp
    elements.metaOptions.hidden = !state.settings.enableMeta
}

function applyStateToForm(elements: PanelElements, state: PanelState): void {
    elements.languageSelect.value = state.language
    elements.formatInput.value = state.settings.format
    elements.exportAllLimitInput.value = String(state.settings.exportAllLimit)
    elements.enableTimestampInput.checked = state.settings.enableTimestamp
    elements.timeStamp24HInput.checked = state.settings.timeStamp24H
    elements.enableTimestampHTMLInput.checked = state.settings.enableTimestampHTML
    elements.enableTimestampMarkdownInput.checked = state.settings.enableTimestampMarkdown
    elements.enableMetaInput.checked = state.settings.enableMeta

    renderMetaList(elements, state)
    syncDependentSections(elements, state)
}

function normalizeExportAllLimit(rawValue: string): number {
    const parsed = Number.parseInt(rawValue, 10)
    if (!Number.isFinite(parsed)) return DEFAULT_EXPORTER_SETTINGS.exportAllLimit

    const clamped = Math.min(20000, Math.max(100, parsed))
    return Math.round(clamped / 100) * 100
}

function wirePanelEvents(elements: PanelElements, state: PanelState): void {
    elements.languageSelect.addEventListener('change', () => {
        state.language = elements.languageSelect.value
    })

    elements.formatInput.addEventListener('input', () => {
        state.settings.format = elements.formatInput.value
    })

    elements.exportAllLimitInput.addEventListener('change', () => {
        const normalized = normalizeExportAllLimit(elements.exportAllLimitInput.value)
        state.settings.exportAllLimit = normalized
        elements.exportAllLimitInput.value = String(normalized)
    })

    elements.enableTimestampInput.addEventListener('change', () => {
        state.settings.enableTimestamp = elements.enableTimestampInput.checked
        syncDependentSections(elements, state)
    })

    elements.timeStamp24HInput.addEventListener('change', () => {
        state.settings.timeStamp24H = elements.timeStamp24HInput.checked
    })

    elements.enableTimestampHTMLInput.addEventListener('change', () => {
        state.settings.enableTimestampHTML = elements.enableTimestampHTMLInput.checked
    })

    elements.enableTimestampMarkdownInput.addEventListener('change', () => {
        state.settings.enableTimestampMarkdown = elements.enableTimestampMarkdownInput.checked
    })

    elements.enableMetaInput.addEventListener('change', () => {
        state.settings.enableMeta = elements.enableMetaInput.checked
        syncDependentSections(elements, state)
    })

    elements.addMetaButton.addEventListener('click', () => {
        state.settings.exportMetaList = [...state.settings.exportMetaList, { name: '', value: '' }]
        renderMetaList(elements, state)
    })

    elements.resetButton.addEventListener('click', () => {
        state.settings = {
            ...DEFAULT_EXPORTER_SETTINGS,
            exportMetaList: cloneMetaList(DEFAULT_EXPORT_META_LIST),
        }
        applyStateToForm(elements, state)
    })

    elements.saveButton.addEventListener('click', () => {
        saveSettings(state.settings)
        setStoredLanguage(state.language)
        void i18n.changeLanguage(state.language)
        closeSettingsPanel()
    })

    elements.cancelButton.addEventListener('click', () => {
        closeSettingsPanel()
    })

    elements.closeButton.addEventListener('click', () => {
        closeSettingsPanel()
    })

    elements.backdrop.addEventListener('click', (event) => {
        if (event.target === elements.backdrop) {
            closeSettingsPanel()
        }
    })
}

export function openSettingsPanel(): void {
    if (activePanel && activePanel.host.isConnected) {
        return
    }

    activePanel = null

    const host = document.createElement('div')
    const shadow = host.attachShadow({ mode: 'open' })
    const state = createPanelState()
    const elements = buildSettingsPanelView(shadow)

    applyStateToForm(elements, state)
    wirePanelEvents(elements, state)

    const keydownHandler = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            closeSettingsPanel()
        }
    }

    document.addEventListener('keydown', keydownHandler)
    document.body.append(host)
    elements.formatInput.focus()

    activePanel = {
        host,
        keydownHandler,
    }
}

export function closeSettingsPanel(): void {
    if (!activePanel) return

    document.removeEventListener('keydown', activePanel.keydownHandler)
    activePanel.host.remove()
    activePanel = null
}
