import { exportToText } from '../exporter/text'
import { getSettings, subscribeSettings } from '../settings/service'
import { DEFAULT_COPY_TEXT_SHORTCUT, isEditableContext, isMacPlatform, matchesExportCopyShortcut } from './exportCopyShortcutHelpers'

export {
    DEFAULT_COPY_TEXT_SHORTCUT,
    isEditableContext,
    isEditableTarget,
    isMacPlatform,
    matchesExportCopyShortcut,
    normalizeCopyTextShortcut,
} from './exportCopyShortcutHelpers'

export const COPY_TEXT_SHORTCUT_SUCCESS_EVENT = 'ce:copy-text-success'
const SHORTCUT_DEBUG_STORAGE_KEY = 'ce-copy-shortcut-debug'

let shortcutRegistered = false
let settingsSubscribed = false

interface ShortcutSettings {
    enabled: boolean
    shortcut: string
}

let activeShortcutSettings: ShortcutSettings = {
    enabled: true,
    shortcut: DEFAULT_COPY_TEXT_SHORTCUT,
}

function refreshShortcutSettings(): void {
    const settings = getSettings()
    activeShortcutSettings = {
        enabled: settings.enableCopyTextShortcut,
        shortcut: settings.copyTextShortcut,
    }
}

function isShortcutDebugEnabled(): boolean {
    return process.env.NODE_ENV === 'development'
        && window.localStorage?.getItem(SHORTCUT_DEBUG_STORAGE_KEY) === '1'
}

function logShortcut(reason: string, event: KeyboardEvent): void {
    if (!isShortcutDebugEnabled()) return

    const target = event.target instanceof Element ? event.target.tagName : null
    const active = document.activeElement?.tagName ?? null

    console.debug('[chatgpt-exporter] copy shortcut', {
        reason,
        shortcut: activeShortcutSettings.shortcut,
        key: event.key,
        meta: event.metaKey,
        ctrl: event.ctrlKey,
        shift: event.shiftKey,
        alt: event.altKey,
        target,
        active,
    })
}

async function handleShortcutKeydown(event: KeyboardEvent, isMac: boolean): Promise<void> {
    if (event.repeat) {
        logShortcut('skip:repeat', event)
        return
    }
    if (event.isComposing) {
        logShortcut('skip:composing', event)
        return
    }
    if (!activeShortcutSettings.enabled) {
        logShortcut('skip:disabled', event)
        return
    }
    if (!matchesExportCopyShortcut(event, isMac, activeShortcutSettings.shortcut)) {
        logShortcut('skip:mismatch', event)
        return
    }
    if (isEditableContext(event.target, document.activeElement)) {
        logShortcut('skip:editable-context', event)
        return
    }

    event.preventDefault()
    event.stopPropagation()

    logShortcut('run:start', event)
    const success = await exportToText()
    if (success) {
        window.dispatchEvent(new CustomEvent(COPY_TEXT_SHORTCUT_SUCCESS_EVENT))
        logShortcut('run:success', event)
    }
    else {
        logShortcut('run:no-op', event)
    }
}

export function registerExportCopyShortcut(): void {
    if (shortcutRegistered) return

    refreshShortcutSettings()
    if (!settingsSubscribed) {
        subscribeSettings((nextSettings) => {
            activeShortcutSettings = {
                enabled: nextSettings.enableCopyTextShortcut,
                shortcut: nextSettings.copyTextShortcut,
            }
        })
        settingsSubscribed = true
    }

    const isMac = isMacPlatform(window.navigator.platform)

    document.addEventListener('keydown', (event: KeyboardEvent) => {
        void handleShortcutKeydown(event, isMac).catch((error) => {
            console.error('Copy shortcut failed:', error)
        })
    })

    shortcutRegistered = true
}
