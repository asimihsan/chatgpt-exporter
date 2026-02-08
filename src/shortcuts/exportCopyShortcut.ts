import { exportToText } from '../exporter/text'
import { isEditableContext, isMacPlatform, matchesExportCopyShortcut } from './exportCopyShortcutHelpers'

export { isEditableContext, isEditableTarget, isMacPlatform, matchesExportCopyShortcut } from './exportCopyShortcutHelpers'

export const COPY_TEXT_SHORTCUT_SUCCESS_EVENT = 'ce:copy-text-success'
const SHORTCUT_DEBUG_STORAGE_KEY = 'ce-copy-shortcut-debug'

let shortcutRegistered = false

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
    if (!matchesExportCopyShortcut(event, isMac)) {
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

    const isMac = isMacPlatform(window.navigator.platform)

    document.addEventListener('keydown', (event: KeyboardEvent) => {
        void handleShortcutKeydown(event, isMac).catch((error) => {
            console.error('Copy shortcut failed:', error)
        })
    })

    shortcutRegistered = true
}
