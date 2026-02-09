/**
 * Copyright 2022-Present Pionxzh
 * SPDX-License-Identifier: MIT
 */

export function standardizeLineBreaks(text: string): string {
    return text
        .replace(/\r\n/g, '\n')
        .replace(/\r/g, '\n')
}
