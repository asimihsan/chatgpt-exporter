/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

/** Start once mountable DOM exists, without waiting for resources or hydration. */
export function onDomAvailable(callback: () => void, doc: Document = document): void {
    if (doc.head && doc.body) {
        callback()
        return
    }
    const observer = new MutationObserver(() => {
        if (!doc.head || !doc.body) return
        observer.disconnect()
        callback()
    })
    observer.observe(doc, { childList: true, subtree: true })
}
