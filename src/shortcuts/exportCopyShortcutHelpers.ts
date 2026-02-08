const EDITABLE_SELECTOR = 'input, textarea, select, [contenteditable], [role="textbox"]'
const MODIFIER_ORDER = ['Mod', 'Shift', 'Alt'] as const

type ShortcutModifier = (typeof MODIFIER_ORDER)[number]

const MODIFIER_ALIASES: Record<string, ShortcutModifier> = {
    mod: 'Mod',
    meta: 'Mod',
    cmd: 'Mod',
    command: 'Mod',
    ctrl: 'Mod',
    control: 'Mod',
    shift: 'Shift',
    alt: 'Alt',
    option: 'Alt',
}

export const DEFAULT_COPY_TEXT_SHORTCUT = 'Mod+Shift+E'

export interface ShortcutKeyEvent {
    key: string
    shiftKey: boolean
    metaKey: boolean
    ctrlKey: boolean
    altKey: boolean
}

interface ParsedShortcut {
    key: string
    modifiers: Set<ShortcutModifier>
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

function parseShortcut(shortcut: unknown): ParsedShortcut | null {
    if (typeof shortcut !== 'string') return null

    const rawParts = shortcut
        .split('+')
        .map(part => part.trim())
        .filter(Boolean)

    if (rawParts.length < 2) return null

    const key = rawParts[rawParts.length - 1].toUpperCase()
    if (!/^[A-Z]$/.test(key)) return null

    const modifiers = new Set<ShortcutModifier>()
    for (const part of rawParts.slice(0, -1)) {
        const mapped = MODIFIER_ALIASES[part.toLowerCase()]
        if (!mapped) return null
        modifiers.add(mapped)
    }

    // Phase 7 scope: require Mod+Shift and allow Alt optionally.
    if (!modifiers.has('Mod') || !modifiers.has('Shift')) return null

    return { key, modifiers }
}

function formatShortcut(parsed: ParsedShortcut): string {
    const orderedModifiers = MODIFIER_ORDER.filter(modifier => parsed.modifiers.has(modifier))
    return [...orderedModifiers, parsed.key].join('+')
}

export function normalizeCopyTextShortcut(value: unknown, fallback = DEFAULT_COPY_TEXT_SHORTCUT): string {
    const parsed = parseShortcut(value)
    if (!parsed) return fallback
    return formatShortcut(parsed)
}

export function matchesExportCopyShortcut(
    event: ShortcutKeyEvent,
    isMac: boolean,
    configuredShortcut = DEFAULT_COPY_TEXT_SHORTCUT,
): boolean {
    const parsed = parseShortcut(configuredShortcut)
    if (!parsed) return false

    const requiresAlt = parsed.modifiers.has('Alt')
    const requiresShift = parsed.modifiers.has('Shift')
    const requiresMod = parsed.modifiers.has('Mod')

    if (event.altKey !== requiresAlt) return false
    if (event.shiftKey !== requiresShift) return false
    if (event.key.toUpperCase() !== parsed.key) return false

    if (!requiresMod) {
        return !(event.metaKey || event.ctrlKey)
    }

    if (isMac) {
        return event.metaKey && !event.ctrlKey
    }

    return event.ctrlKey && !event.metaKey
}

export function isEditableContext(target: EventTarget | null, activeElement: Element | null): boolean {
    return isEditableTarget(target) || isEditableTarget(activeElement)
}
