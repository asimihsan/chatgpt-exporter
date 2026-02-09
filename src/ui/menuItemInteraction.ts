/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

export const TOUCH_CLICK_DEDUP_WINDOW_MS = 700

export function shouldSuppressClickAfterTouch(
    lastTouchTimestampMs: number | null,
    nowMs: number,
): boolean {
    if (!lastTouchTimestampMs || lastTouchTimestampMs <= 0) return false

    const elapsedMs = nowMs - lastTouchTimestampMs
    if (elapsedMs < 0) return false

    return elapsedMs <= TOUCH_CLICK_DEDUP_WINDOW_MS
}

