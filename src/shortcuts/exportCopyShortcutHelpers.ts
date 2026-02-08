const EDITABLE_SELECTOR = 'input, textarea, select, [contenteditable], [role="textbox"]'

export interface ShortcutKeyEvent {
    key: string
    shiftKey: boolean
    metaKey: boolean
    ctrlKey: boolean
    altKey: boolean
}

export function isMacPlatform(platform?: string): boolean {
    if (!platform) return false
    return /mac|iphone|ipad|ipod/i.test(platform)
}

export function isEditableTarget(target: EventTarget | null): boolean {
    if (!target || typeof target !== 'object') return false

    if (typeof Element !== 'undefined' && target instanceof Element) {
        return Boolean(target.closest(EDITABLE_SELECTOR))
    }

    if ('closest' in target && typeof target.closest === 'function') {
        return Boolean(target.closest(EDITABLE_SELECTOR))
    }

    return false
}

export function matchesExportCopyShortcut(event: ShortcutKeyEvent, isMac: boolean): boolean {
    if (event.altKey) return false
    if (!event.shiftKey) return false
    if (event.key.toLowerCase() !== 'e') return false

    if (isMac) {
        return event.metaKey && !event.ctrlKey
    }

    return event.ctrlKey && !event.metaKey
}

export function isEditableContext(target: EventTarget | null, activeElement: Element | null): boolean {
    return isEditableTarget(target) || isEditableTarget(activeElement)
}
