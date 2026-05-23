/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

import { standardizeLineBreaks } from '../utils/text'

export function normalizeBlockFingerprint(input: string): string {
    return standardizeLineBreaks(input)
        .replace(/[ \t]+$/gm, '')
        .trim()
}
