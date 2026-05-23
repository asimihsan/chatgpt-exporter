/**
 * Copyright 2022-Present Pionxzh
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

export async function copyToClipboard(text: string): Promise<boolean> {
    try {
        // for modern browsers
        await navigator.clipboard.writeText(text)
        return true
    }
    catch {
        try {
            const textarea = document.createElement('textarea')
            textarea.value = text
            document.body.appendChild(textarea)
            try {
                textarea.select()
                return document.execCommand('copy')
            }
            finally {
                document.body.removeChild(textarea)
            }
        }
        catch {
            return false
        }
    }
}
