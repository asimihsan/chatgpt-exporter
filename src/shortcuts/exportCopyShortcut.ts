import { exportToText } from '../exporter/text'

export const COPY_TEXT_SHORTCUT_SUCCESS_EVENT = 'ce:copy-text-success'

let shortcutRegistered = false

interface ShortcutKeyEvent {
    key: string
    shiftKey: boolean
    metaKey: boolean
    ctrlKey: boolean
}

export function isMacPlatform(platform?: string): boolean {
    if (!platform) return false
    return /mac|iphone|ipad|ipod/i.test(platform)
}

export function isEditableTarget(target: EventTarget | null): boolean {
    if (!(target instanceof Element)) return false
    return Boolean(target.closest('input, textarea, select, [contenteditable], [role="textbox"]'))
}

export function matchesExportCopyShortcut(event: ShortcutKeyEvent, isMac: boolean): boolean {
    if (!event.shiftKey) return false
    if (event.key.toLowerCase() !== 'e') return false

    if (isMac) {
        return event.metaKey && !event.ctrlKey
    }

    return event.ctrlKey && !event.metaKey
}

export function registerExportCopyShortcut(): void {
    if (shortcutRegistered) return

    const isMac = isMacPlatform(window.navigator.platform)

    document.addEventListener('keydown', async (event: KeyboardEvent) => {
        if (event.repeat || event.isComposing) return
        if (!matchesExportCopyShortcut(event, isMac)) return
        if (isEditableTarget(event.target)) return

        event.preventDefault()
        event.stopPropagation()

        const success = await exportToText()
        if (success) {
            window.dispatchEvent(new CustomEvent(COPY_TEXT_SHORTCUT_SUCCESS_EVENT))
        }
    })

    shortcutRegistered = true
}
