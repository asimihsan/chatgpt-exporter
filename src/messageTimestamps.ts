/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

import { CONVERSATION_MESSAGE_SELECTOR } from './conversationDom'
import type { ConversationNode } from './api'

export function appendMessageTimestamps(nodes: ConversationNode[], root: ParentNode = document): number {
    const times = new Map(nodes.flatMap(node => node.message?.id && node.message.create_time
        ? [[node.message.id, node.message.create_time] as const]
        : []))
    let count = 0
    const canonical = new Map<string, HTMLElement>()
    for (const thread of root.querySelectorAll<HTMLElement>(`main :is(${CONVERSATION_MESSAGE_SELECTOR})`)) {
        const ids = thread.dataset.messageId ? [thread.dataset.messageId] : thread.dataset.chatgptSearchMessageIds?.trim().split(/\s+/) ?? []
        const id = ids.at(-1)
        if (id) canonical.set(id, thread)
    }
    for (const [id, thread] of canonical) {
        const createTime = times.get(id)
        if (!createTime || thread.querySelector('[data-ce-message-timestamp]')) continue
        const date = new Date(createTime * 1000)
        const timestamp = document.createElement('time')
        timestamp.dataset.ceMessageTimestamp = 'true'
        timestamp.className = 'w-full text-gray-500 dark:text-gray-400 text-sm text-right'
        timestamp.dateTime = date.toISOString()
        timestamp.title = date.toLocaleString()
        for (const format of ['12', '24']) {
            const span = document.createElement('span')
            span.dataset.timeFormat = format
            span.textContent = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: format === '12' })
            timestamp.append(span)
        }
        thread.append(timestamp)
        count += 1
    }
    return count
}
