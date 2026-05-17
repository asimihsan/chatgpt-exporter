/**
 * Copyright 2022-Present Pionxzh
 * SPDX-License-Identifier: MPL-2.0
 */

export function standardizeLineBreaks(text: string): string {
    return text
        .replace(/\r\n/g, '\n')
        .replace(/\r/g, '\n')
}
