import { beforeEach, describe, expect, it, vi } from 'vitest'

const exportToTextMock = vi.fn<() => Promise<boolean>>()
const getSettingsMock = vi.fn()
const subscribeSettingsMock = vi.fn()

vi.mock('../exporter/text', () => ({
    exportToText: exportToTextMock,
}))

vi.mock('../settings/service', () => ({
    getSettings: getSettingsMock,
    subscribeSettings: subscribeSettingsMock,
}))

interface RuntimeHarness {
    keydownHandler: (event: KeyboardEvent) => void
    updateSettings: (settings: { enableCopyTextShortcut: boolean, copyTextShortcut: string }) => void
    dispatchEvent: ReturnType<typeof vi.fn>
}

function createKeyboardEvent(overrides: Partial<KeyboardEvent> = {}): KeyboardEvent {
    return {
        key: 'e',
        shiftKey: true,
        metaKey: false,
        ctrlKey: false,
        altKey: false,
        repeat: false,
        isComposing: false,
        target: null,
        preventDefault: vi.fn(),
        stopPropagation: vi.fn(),
        ...overrides,
    } as unknown as KeyboardEvent
}

async function flushMicrotasks(): Promise<void> {
    await Promise.resolve()
    await Promise.resolve()
}

async function setupRuntimeHarness(
    platform: string,
    initialSettings = { enableCopyTextShortcut: true, copyTextShortcut: 'Mod+Shift+E' },
): Promise<RuntimeHarness> {
    vi.resetModules()

    let settingsListener: ((settings: { enableCopyTextShortcut: boolean, copyTextShortcut: string }) => void) | null = null

    const keydownHandlers: Array<(event: KeyboardEvent) => void> = []
    const dispatchEvent = vi.fn()

    const fakeDocument = {
        activeElement: null as Element | null,
        addEventListener: vi.fn((type: string, listener: (event: KeyboardEvent) => void) => {
            if (type === 'keydown') keydownHandlers.push(listener)
        }),
    }

    class FakeCustomEvent {
        type: string

        constructor(type: string) {
            this.type = type
        }
    }

    const fakeWindow = {
        navigator: { platform },
        localStorage: { getItem: vi.fn(() => null) },
        dispatchEvent,
    }

    vi.stubGlobal('document', fakeDocument)
    vi.stubGlobal('window', fakeWindow)
    vi.stubGlobal('CustomEvent', FakeCustomEvent)

    getSettingsMock.mockReturnValue(initialSettings)
    subscribeSettingsMock.mockImplementation((listener: typeof settingsListener) => {
        settingsListener = listener
        return () => {}
    })

    const shortcutModule = await import('./exportCopyShortcut')
    shortcutModule.registerExportCopyShortcut()

    if (!keydownHandlers[0]) {
        throw new Error('Expected keydown listener to be registered')
    }

    return {
        keydownHandler: keydownHandlers[0],
        updateSettings: (settings) => {
            if (!settingsListener) throw new Error('Settings listener missing')
            settingsListener(settings)
        },
        dispatchEvent,
    }
}

describe('export copy shortcut runtime', () => {
    beforeEach(() => {
        vi.clearAllMocks()
        vi.unstubAllGlobals()
    })

    it('registers one keydown handler and triggers copy export success event', async () => {
        exportToTextMock.mockResolvedValue(true)
        const harness = await setupRuntimeHarness('MacIntel')

        const shortcutModule = await import('./exportCopyShortcut')
        shortcutModule.registerExportCopyShortcut()

        expect((document.addEventListener as ReturnType<typeof vi.fn>).mock.calls).toHaveLength(1)

        const event = createKeyboardEvent({
            metaKey: true,
            target: { closest: () => null } as unknown as EventTarget,
        })
        harness.keydownHandler(event)
        await flushMicrotasks()

        expect(exportToTextMock).toHaveBeenCalledTimes(1)
        expect(event.preventDefault).toHaveBeenCalledTimes(1)
        expect(event.stopPropagation).toHaveBeenCalledTimes(1)
        expect(harness.dispatchEvent).toHaveBeenCalledTimes(1)
        expect(harness.dispatchEvent.mock.calls[0]?.[0]?.type).toBe('ce:copy-text-success')
    })

    it('does not run export while editable element is active', async () => {
        exportToTextMock.mockResolvedValue(true)
        await setupRuntimeHarness('Win32')

        Object.defineProperty(document, 'activeElement', {
            value: { closest: () => ({ tagName: 'textarea' }) } as unknown as Element,
            configurable: true,
        })
        const event = createKeyboardEvent({
            ctrlKey: true,
            target: { closest: () => null } as unknown as EventTarget,
        })

        const keydownHandler = (document.addEventListener as ReturnType<typeof vi.fn>).mock.calls[0]?.[1] as (event: KeyboardEvent) => void
        keydownHandler(event)
        await flushMicrotasks()

        expect(exportToTextMock).not.toHaveBeenCalled()
        expect(event.preventDefault).not.toHaveBeenCalled()
    })

    it('applies settings subscription updates without re-registering', async () => {
        exportToTextMock.mockResolvedValue(true)
        const harness = await setupRuntimeHarness('Win32')

        harness.updateSettings({ enableCopyTextShortcut: false, copyTextShortcut: 'Mod+Shift+E' })
        harness.keydownHandler(createKeyboardEvent({ ctrlKey: true }))
        await flushMicrotasks()

        harness.updateSettings({ enableCopyTextShortcut: true, copyTextShortcut: 'Mod+Shift+Alt+M' })
        harness.keydownHandler(createKeyboardEvent({ key: 'm', ctrlKey: true, altKey: false }))
        harness.keydownHandler(createKeyboardEvent({ key: 'm', ctrlKey: true, altKey: true }))
        await flushMicrotasks()

        expect(exportToTextMock).toHaveBeenCalledTimes(1)
    })

    it('does not dispatch success event when export action returns false', async () => {
        exportToTextMock.mockResolvedValue(false)
        const harness = await setupRuntimeHarness('Win32')

        harness.keydownHandler(createKeyboardEvent({ ctrlKey: true }))
        await flushMicrotasks()

        expect(exportToTextMock).toHaveBeenCalledTimes(1)
        expect(harness.dispatchEvent).not.toHaveBeenCalled()
    })
})
