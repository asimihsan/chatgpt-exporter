/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

import { useState } from 'preact/hooks'
import { useTranslation } from 'react-i18next'
import { exportMemoryToMarkdown } from '../exporter/memory'
import { IconBrain, IconLoading } from './Icons'

/**
 * Compact "Export" button injected into the ChatGPT "Memory summary" modal.
 * A single click downloads the Markdown export (JSON remains available from the
 * extension's main menu). Styled with inline rules so it does not depend on
 * ChatGPT's own (unstable) class names.
 */
export function MemoryExportButton() {
    const { t } = useTranslation()
    const [loading, setLoading] = useState(false)

    const onClick = async () => {
        if (loading) return
        try {
            setLoading(true)
            await exportMemoryToMarkdown()
        }
        catch (error) {
            console.error('Failed to export memory summary:', error)
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <button
            type="button"
            onClick={() => void onClick()}
            disabled={loading}
            title={t('Memory Summary')}
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '9999px',
                border: '1px solid var(--ce-border-light, rgba(0,0,0,0.15))',
                background: 'transparent',
                color: 'inherit',
                font: 'inherit',
                fontSize: '14px',
                cursor: loading ? 'default' : 'pointer',
                opacity: loading ? 0.6 : 1,
            }}
        >
            {loading ? <IconLoading className="w-4 h-4" /> : <IconBrain />}
            <span>{t('ExportHelper')}</span>
        </button>
    )
}
