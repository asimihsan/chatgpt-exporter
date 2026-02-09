/**
 * Copyright 2022-Present Pionxzh
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0 AND MIT
 */

import { useEffect, useState } from 'preact/hooks'
import './CheckBox.css'
import { IconCheckBox, IconCheckBoxChecked } from './Icons'
import type { JSX } from 'preact'
import type { FC } from '../type'

export interface CheckBoxProps {
    className?: string
    checked?: boolean
    disabled?: boolean
    label: string
    onCheckedChange?: (checked: boolean) => void
}

export const CheckBox: FC<CheckBoxProps> = ({
    className,
    checked = false,
    disabled,
    label,
    onCheckedChange,
}) => {
    const [isChecked, setChecked] = useState(checked)
    const onChange = (e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
        const newValue = e.currentTarget.checked
        setChecked(newValue)
        onCheckedChange?.(newValue)
    }
    useEffect(() => {
        setChecked(checked)
    }, [checked])
    return (
        <label className={`CheckBoxLabel ${className ?? ''}`} aria-disabled={disabled}>
            <span className="IconWrapper">
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={onChange}
                    disabled={disabled}
                />
                {isChecked ? <IconCheckBoxChecked /> : <IconCheckBox />}
            </span>
            <span className="LabelText">{label}</span>
        </label>
    )
}
