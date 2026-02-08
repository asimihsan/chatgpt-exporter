import { exportToText } from '../exporter/text'
import { isEditableTarget, isMacPlatform, matchesExportCopyShortcut } from './exportCopyShortcutHelpers'

export { isEditableTarget, isMacPlatform, matchesExportCopyShortcut } from './exportCopyShortcutHelpers'

export const COPY_TEXT_SHORTCUT_SUCCESS_EVENT = 'ce:copy-text-success'

let shortcutRegistered = false

async function handleShortcutKeydown(event: KeyboardEvent, isMac: boolean): Promise<void> {
    if (event.repeat || event.isComposing) return
    if (!matchesExportCopyShortcut(event, isMac)) return
    if (isEditableTarget(event.target)) return

    event.preventDefault()
    event.stopPropagation()

    const success = await exportToText()
    if (success) {
        window.dispatchEvent(new CustomEvent(COPY_TEXT_SHORTCUT_SUCCESS_EVENT))
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
