/**
 * Copyright 2022-Present Pionxzh
 * SPDX-License-Identifier: MIT
 */

import { useSyncExternalStore } from 'preact/compat'

export function useWindowResize<T>(selector: () => T) {
    return useSyncExternalStore(subscribe, selector)
}

function subscribe(callback: () => void) {
    window.addEventListener('resize', callback)
    return () => window.removeEventListener('resize', callback)
}
