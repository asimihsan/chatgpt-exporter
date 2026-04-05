/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

import { useSyncExternalStore } from 'preact/compat'

let historyPatched = false

export function useLocation() {
    return useSyncExternalStore(subscribe, getSnapshot)
}

function getSnapshot() {
    return `${window.location.pathname}${window.location.search}`
}

function subscribe(callback: () => void) {
    patchHistory()
    window.addEventListener('popstate', callback)
    window.addEventListener('locationchange', callback)

    return () => {
        window.removeEventListener('popstate', callback)
        window.removeEventListener('locationchange', callback)
    }
}

function patchHistory() {
    if (historyPatched) return
    historyPatched = true

    const dispatch = () => window.dispatchEvent(new Event('locationchange'))
    const originalPushState = window.history.pushState.bind(window.history)
    const originalReplaceState = window.history.replaceState.bind(window.history)

    window.history.pushState = function pushState(...args) {
        const result = originalPushState(...args)
        dispatch()
        return result
    }

    window.history.replaceState = function replaceState(...args) {
        const result = originalReplaceState(...args)
        dispatch()
        return result
    }
}
