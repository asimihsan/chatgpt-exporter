/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

import type { ApiConversationWithId } from '../api'

function isObject(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null
}

function isApiConversationWithId(value: unknown): value is ApiConversationWithId {
    if (!isObject(value)) return false

    return (
        typeof value.id === 'string'
        && typeof value.title === 'string'
        && typeof value.current_node === 'string'
        && typeof value.create_time === 'number'
        && typeof value.update_time === 'number'
        && typeof value.is_archived === 'boolean'
        && isObject(value.mapping)
    )
}

export function parseLocalConversationsFromUpload(rawContent: string): ApiConversationWithId[] | null {
    let parsed: unknown
    try {
        parsed = JSON.parse(rawContent)
    }
    catch {
        return null
    }

    if (!Array.isArray(parsed)) return null
    if (!parsed.every(isApiConversationWithId)) return null

    return parsed
}

