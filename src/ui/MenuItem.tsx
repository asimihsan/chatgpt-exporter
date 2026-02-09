/**
 * Copyright 2022-Present Pionxzh
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0 AND MIT
 */

import { useRef, useState } from 'preact/hooks'
import { shouldSuppressClickAfterTouch } from './menuItemInteraction'
import { IconLoading } from './Icons'
import type { FC } from '../type'

const TIMEOUT = 2500

export interface MenuItemProps {
    text: string
    icon?: FC
    successText?: string
    disabled?: boolean
    title?: string
    className?: string
    onClick?: (() => boolean) | (() => Promise<boolean>)
}

export const MenuItem: FC<MenuItemProps> = ({ text, successText, disabled = false, title, icon: Icon, onClick, className }) => {
    const [loading, setLoading] = useState(false)
    const [succeed, setSucceed] = useState(false)
    const lastTouchTimestampMsRef = useRef<number | null>(null)

    const handleClickAsync = async (e: Event) => {
        e.preventDefault()
        if (loading || disabled) return
        if (!onClick) return

        try {
            setLoading(true)
            const result = await onClick()
            if (result) {
                setSucceed(true)
                setTimeout(() => setSucceed(false), TIMEOUT)
            }
        }
        catch (error) {
            console.error(error)
        }
        finally {
            setLoading(false)
        }
    }

    const handleClick = typeof onClick === 'function'
        ? (e: Event) => {
            if (shouldSuppressClickAfterTouch(lastTouchTimestampMsRef.current, Date.now())) {
                return
            }

            void handleClickAsync(e)
        }
        : undefined

    const handleTouchStart = typeof onClick === 'function'
        ? (e: Event) => {
            lastTouchTimestampMsRef.current = Date.now()
            void handleClickAsync(e)
        }
        : undefined

    return (
        <div
            className={`
            ce-menu-item
            flex flex-shrink-0 py-3 px-3 items-center gap-3 rounded-lg mb-2
            ce-bg-menu
            transition-colors duration-200
            ce-text-menu text-sm
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            border ce-border-menu ${className}`}
            onClick={handleClick}
            onTouchStart={handleTouchStart}
            aria-disabled={disabled}
            title={title}
        >
            {loading
                ? (
                    <div className="flex justify-center items-center w-full h-full">
                        <IconLoading className="w-4 h-4" />
                    </div>
                    )
                : (
                    <>
                        {Icon && <Icon />}
                        {(succeed && successText) ? successText : text}
                    </>
                    )}
        </div>
    )
}
