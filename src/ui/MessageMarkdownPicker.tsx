/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

import { createPortal } from 'preact/compat'
import { useCallback, useEffect, useMemo, useRef, useState } from 'preact/hooks'
import { useTranslation } from 'react-i18next'
import { copySelectedMessageMarkdown } from '../messageMarkdown/copyMessageMarkdown'
import { buildPickerItemsForMessage, discoverMessageMarkdownCandidates } from '../messageMarkdown/messageDom'
import { buildInitialSelection, hasSelection, normalizeSelection } from '../messageMarkdown/selection'
import { IconMarkdown } from './Icons'
import type { MessageMarkdownCopyItem } from '../messageMarkdown/types'
import type { FC } from '../type'

export interface MessageMarkdownPickerProps {
    clickedMessageId: string
    items?: MessageMarkdownCopyItem[]
    triggerLabel?: string
}

type PickerStatus = 'idle' | 'copying' | 'success' | 'failure'
type PanelStyle = {
    left?: string
    top?: string
    width?: string
    maxHeight?: string
}

export const MessageMarkdownPicker: FC<MessageMarkdownPickerProps> = ({
    clickedMessageId,
    items: initialItems,
    triggerLabel = 'Copy message Markdown',
}) => {
    const { t } = useTranslation()
    const [items, setItems] = useState<MessageMarkdownCopyItem[]>(() => initialItems ?? [])
    const [open, setOpen] = useState(false)
    const [status, setStatus] = useState<PickerStatus>('idle')
    const [selection, setSelection] = useState(() => buildInitialSelection(items))
    const [panelStyle, setPanelStyle] = useState<PanelStyle>({})
    const triggerRef = useRef<HTMLButtonElement | null>(null)
    const panelRef = useRef<HTMLDivElement | null>(null)
    const firstInputRef = useRef<HTMLInputElement | null>(null)
    const statusTimerRef = useRef<number | undefined>(undefined)
    const canCopy = hasSelection(selection) && status !== 'copying'

    const closePicker = useCallback(() => {
        setOpen(false)
        setStatus('idle')
        window.requestAnimationFrame(() => triggerRef.current?.focus())
    }, [])

    useEffect(() => {
        if (!initialItems) return
        setItems(initialItems)
        setSelection(buildInitialSelection(initialItems))
    }, [initialItems])

    useEffect(() => {
        if (!open) return

        const onPointerDown = (event: PointerEvent) => {
            const target = event.target as Node | null
            if (!target) return
            if (triggerRef.current?.contains(target)) return
            if (panelRef.current?.contains(target)) return
            closePicker()
        }

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                event.preventDefault()
                closePicker()
            }
        }

        document.addEventListener('pointerdown', onPointerDown, true)
        document.addEventListener('keydown', onKeyDown)
        window.requestAnimationFrame(() => {
            setPanelStyle(getPanelStyle(triggerRef.current, panelRef.current))
            firstInputRef.current?.focus()
        })

        return () => {
            document.removeEventListener('pointerdown', onPointerDown, true)
            document.removeEventListener('keydown', onKeyDown)
        }
    }, [closePicker, open])

    useEffect(() => {
        return () => {
            if (statusTimerRef.current !== undefined) {
                window.clearTimeout(statusTimerRef.current)
            }
        }
    }, [])

    const onToggleMessage = useCallback((messageId: string, checked: boolean) => {
        setSelection(current => normalizeSelection({
            messageIds: checked
                ? [...current.messageIds, messageId]
                : current.messageIds.filter(id => id !== messageId),
            blocks: current.blocks,
        }))
    }, [])

    const onToggleBlock = useCallback((item: MessageMarkdownCopyItem, checked: boolean) => {
        if (!item.block) return
        setSelection(current => normalizeSelection({
            messageIds: current.messageIds,
            blocks: checked
                ? [...current.blocks, item.block!]
                : current.blocks.filter(block => block !== item.block),
        }))
    }, [])

    const onCopy = useCallback(async () => {
        if (!canCopy) return

        setStatus('copying')
        const result = await copySelectedMessageMarkdown(selection)
        if (result.ok) {
            setStatus('success')
            setOpen(false)
            window.requestAnimationFrame(() => triggerRef.current?.focus())
            statusTimerRef.current = window.setTimeout(() => setStatus('idle'), 1600)
        }
        else {
            setStatus('failure')
        }
    }, [canCopy, selection])

    const openPicker = useCallback(() => {
        const nextItems = buildPickerItemsForMessage(
            discoverMessageMarkdownCandidates(),
            clickedMessageId,
        )
        setItems(nextItems)
        setSelection(buildInitialSelection(nextItems))
        setStatus('idle')
        setOpen(true)
    }, [clickedMessageId])

    const selectedMessages = useMemo(() => new Set(selection.messageIds), [selection.messageIds])
    const selectedBlocks = useMemo(() => new Set(selection.blocks), [selection.blocks])
    const statusText = status === 'success'
        ? t('Copied!')
        : status === 'failure'
            ? t('Copy failed')
            : ''

    return (
        <span className="ce-message-markdown">
            <button
                ref={triggerRef}
                type="button"
                className={`ce-message-markdown-trigger ${status === 'success' ? 'ce-menu-trigger-success' : ''}`}
                aria-label={triggerLabel}
                title={triggerLabel}
                onClick={() => {
                    if (open) {
                        closePicker()
                    }
                    else {
                        openPicker()
                    }
                }}
            >
                <IconMarkdown />
            </button>
            <span className="ce-message-markdown-status" aria-live="polite">{statusText}</span>
            {open && createPortal(
                <div
                    ref={panelRef}
                    className="ce-message-markdown-panel ce-bg-menu ce-text-menu ce-border-menu"
                    role="dialog"
                    aria-label={t('Markdown excerpt picker')}
                    style={panelStyle}
                >
                    <div className="ce-message-markdown-list">
                        {items.map((item, index) => (
                            <div className="ce-message-markdown-group" key={item.id}>
                                <label className="ce-message-markdown-row">
                                    <input
                                        ref={index === 0 ? firstInputRef : undefined}
                                        type="checkbox"
                                        checked={selectedMessages.has(item.messageId)}
                                        onChange={event => onToggleMessage(item.messageId, event.currentTarget.checked)}
                                    />
                                    <span>{item.label}</span>
                                </label>
                                {(item.children ?? []).map(child => (
                                    <label className="ce-message-markdown-row ce-message-markdown-child" key={child.id}>
                                        <input
                                            type="checkbox"
                                            checked={child.block ? selectedBlocks.has(child.block) : false}
                                            onChange={event => onToggleBlock(child, event.currentTarget.checked)}
                                        />
                                        <span>{child.label}</span>
                                    </label>
                                ))}
                            </div>
                        ))}
                    </div>
                    <div className="ce-message-markdown-actions">
                        <button type="button" onClick={closePicker}>{t('Cancel')}</button>
                        <button type="button" disabled={!canCopy} onClick={() => void onCopy()}>
                            {status === 'copying' ? `${t('Loading')}...` : t('Copy Markdown')}
                        </button>
                    </div>
                </div>,
                document.body,
            )}
        </span>
    )
}

function getPanelStyle(trigger: HTMLElement | null, panel: HTMLElement | null): PanelStyle {
    if (!trigger || !panel) return {}

    const margin = 12
    const gap = 8
    const viewportWidth = window.innerWidth || document.documentElement.clientWidth || 0
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0
    const width = Math.min(340, Math.max(160, viewportWidth - margin * 2))
    const maxHeight = Math.max(160, viewportHeight - margin * 2)
    const triggerRect = trigger.getBoundingClientRect()
    const panelHeight = Math.min(panel.getBoundingClientRect().height || 0, maxHeight)
    const preferredTop = triggerRect.top - panelHeight - gap
    const fallbackTop = triggerRect.bottom + gap
    const unclampedTop = preferredTop >= margin ? preferredTop : fallbackTop
    const top = clamp(unclampedTop, margin, Math.max(margin, viewportHeight - panelHeight - margin))
    const left = clamp(triggerRect.right - width, margin, Math.max(margin, viewportWidth - width - margin))

    return {
        left: `${left}px`,
        top: `${top}px`,
        width: `${width}px`,
        maxHeight: `${maxHeight}px`,
    }
}

function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max)
}
