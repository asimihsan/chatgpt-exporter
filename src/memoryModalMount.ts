/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

/**
 * Heading texts that identify the "Memory summary" modal. The heading is the
 * only stable hook ChatGPT exposes (the dialog/heading ids are randomised by
 * Radix), and it is localised, so this list is best-effort and may need
 * additional locales over time.
 */
const MEMORY_SUMMARY_HEADINGS = new Set([
    'memory summary',
])

function isMemorySummaryHeading(heading: Element): boolean {
    const text = heading.textContent?.trim().toLowerCase() ?? ''
    return MEMORY_SUMMARY_HEADINGS.has(text)
}

/**
 * Locates the header element of an open "Memory summary" modal, into which the
 * export button should be injected. Returns the heading's parent (the header
 * row) so the button sits alongside the title, or `null` when the modal is not
 * open.
 */
export function findMemorySummaryModalMountTarget(root: ParentNode = document): HTMLElement | null {
    const dialogs = Array.from(root.querySelectorAll('[role="dialog"]'))
    const scopes: ParentNode[] = dialogs.length > 0 ? dialogs : [root]

    for (const scope of scopes) {
        const heading = Array.from(scope.querySelectorAll('h1, h2')).find(isMemorySummaryHeading)
        const target = heading?.parentElement
        if (target instanceof HTMLElement) {
            return target
        }
    }

    return null
}
