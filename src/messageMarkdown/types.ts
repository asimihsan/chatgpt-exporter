/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

export type SelectableBlockKind = 'code' | 'output' | 'source'

export type SelectableBlockRenderMode = 'fenced-markdown'

export interface SelectableBlockDescriptor {
    kind: SelectableBlockKind
    sourceMessageId: string
    sourceSegmentId?: string
    domFingerprint: string
    renderMode: SelectableBlockRenderMode
}

export interface MessageMarkdownSelection {
    messageIds: string[]
    blocks: SelectableBlockDescriptor[]
}

export interface MessageMarkdownCopyItem {
    id: string
    label: string
    messageId: string
    selected: boolean
    kind: 'message' | 'block'
    block?: SelectableBlockDescriptor
    children?: MessageMarkdownCopyItem[]
}
