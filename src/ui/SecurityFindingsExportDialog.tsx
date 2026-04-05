/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

import * as Dialog from '@radix-ui/react-dialog'
import { useCallback, useEffect, useMemo, useState } from 'preact/hooks'
import { useTranslation } from 'react-i18next'
import { fetchAllSecurityFindings, fetchSecurityFinding, fetchSecurityFindings } from '../api'
import {
    exportAllSecurityFindingsToHtml,
    exportAllSecurityFindingsToJson,
    exportAllSecurityFindingsToMarkdown,
} from '../exporter/securityBulkExport'
import {
    getSecurityFindingsFilterSummary,
    getSecurityFindingsListFilters,
    resolveSecurityFindingsListFilters,
} from '../security/findingsListFilters'
import { getPageContext } from '../pageContext'
import { EXPORT_DIALOG_CLASS_NAMES } from './dialogClassNames'
import { IconCross } from './Icons'
import { useSettingContext } from './SettingContext'
import type { ApiSecurityFinding } from '../api'
import type { FC } from '../type'

interface SecurityFindingsExportDialogProps {
    format: string
    open: boolean
    onOpenChange: (value: boolean) => void
}

interface ProgressState {
    total: number
    completed: number
    currentName: string
}

function getFindingProgressName(finding: ApiSecurityFinding): string {
    const title = typeof finding.commit_analysis === 'object'
        && finding.commit_analysis
        && 'title' in finding.commit_analysis
        && typeof finding.commit_analysis.title === 'string'
        ? finding.commit_analysis.title.trim()
        : ''

    return title || finding.hid || finding.id
}

const DialogContent: FC<{ format: string }> = ({ format }) => {
    const { t } = useTranslation()
    const { enableMeta, exportMetaList, exportAllLimit } = useSettingContext()
    const metaList = useMemo(() => enableMeta ? exportMetaList : [], [enableMeta, exportMetaList])
    const pageContext = useMemo(() => getPageContext(), [])
    const initialFilters = useMemo(() => getSecurityFindingsListFilters(), [])
    const exportOptions = useMemo(() => [
        { label: 'Markdown', callback: exportAllSecurityFindingsToMarkdown },
        { label: 'HTML', callback: exportAllSecurityFindingsToHtml },
        { label: 'JSON', callback: exportAllSecurityFindingsToJson },
    ], [])

    const [filters, setFilters] = useState(initialFilters)
    const [matchingTotal, setMatchingTotal] = useState<number | null>(null)
    const [loading, setLoading] = useState(false)
    const [processing, setProcessing] = useState(false)
    const [error, setError] = useState('')
    const [warning, setWarning] = useState('')
    const [exportType, setExportType] = useState(exportOptions[0].label)
    const [progress, setProgress] = useState<ProgressState>({
        total: 0,
        completed: 0,
        currentName: '',
    })
    const filterSummary = useMemo(() => getSecurityFindingsFilterSummary(filters), [filters])

    useEffect(() => {
        let cancelled = false

        setLoading(true)
        setError('')
        setWarning('')
        setMatchingTotal(null)
        resolveSecurityFindingsListFilters(pageContext)
            .then((resolvedFilters) => {
                if (cancelled) return null
                setFilters(resolvedFilters)
                return fetchSecurityFindings({
                    ...resolvedFilters,
                    limit: 1,
                    cursor: 0,
                })
            })
            .then((response) => {
                if (!response || cancelled) return
                if (cancelled) return
                setMatchingTotal(response.total)
            })
            .catch((loadError) => {
                if (cancelled) return
                console.error('Error fetching security findings:', loadError)
                setError(loadError instanceof Error ? loadError.message : 'Failed to load findings')
            })
            .finally(() => {
                if (!cancelled) {
                    setLoading(false)
                }
            })

        return () => {
            cancelled = true
        }
    }, [pageContext])

    const disabled = loading || processing || !!error || (matchingTotal ?? 0) === 0

    const exportAll = useCallback(async () => {
        if (disabled) return

        try {
            setProcessing(true)
            setError('')
            setWarning('')
            const findings = await fetchAllSecurityFindings(filters, {
                maxItems: exportAllLimit,
            })
            setProgress({
                total: findings.length,
                completed: 0,
                currentName: findings.length > 0 ? getFindingProgressName(findings[0]) : '',
            })

            const fullFindings: ApiSecurityFinding[] = []
            let skippedCount = 0
            for (const [index, finding] of findings.entries()) {
                setProgress({
                    total: findings.length,
                    completed: index,
                    currentName: getFindingProgressName(finding),
                })
                try {
                    fullFindings.push(await fetchSecurityFinding(finding.hid || finding.id))
                }
                catch (findingError) {
                    skippedCount += 1
                    console.error('Error fetching security finding for export:', findingError)
                }
            }

            if (fullFindings.length === 0) {
                throw new Error('Failed to load any findings for export')
            }

            setProgress({
                total: findings.length,
                completed: findings.length,
                currentName: 'Packaging export',
            })

            const callback = exportOptions.find(option => option.label === exportType)?.callback
            if (callback) {
                await callback(format, fullFindings, metaList)
            }

            const warnings: string[] = []
            if ((matchingTotal ?? 0) > exportAllLimit) {
                warnings.push(`Exported the first ${fullFindings.length} findings because the export limit is ${exportAllLimit}.`)
            }
            if (skippedCount > 0) {
                warnings.push(`Skipped ${skippedCount} findings that could not be loaded.`)
            }
            setWarning(warnings.join(' '))
        }
        catch (exportError) {
            console.error('Error exporting security findings:', exportError)
            setError(exportError instanceof Error ? exportError.message : 'Failed to export findings')
        }
        finally {
            setProcessing(false)
        }
    }, [disabled, exportAllLimit, exportOptions, exportType, filters, format, matchingTotal, metaList])

    return (
        <>
            <Dialog.Title className={EXPORT_DIALOG_CLASS_NAMES.title}>Export Matching Findings</Dialog.Title>
            <div className="text-gray-600 dark:text-gray-300 mb-3">
                Export the current filtered findings set from this security view.
            </div>
            <div className="border-b-[1px] pb-3 mb-3 dark:border-gray-700">
                <div className="flex items-center text-gray-600 dark:text-gray-300 justify-between mb-2">
                    <span>Matching findings</span>
                    <span>{loading ? `${t('Loading')}...` : matchingTotal ?? 0}</span>
                </div>
                {filterSummary.length > 0 && (
                    <ul className="text-sm text-gray-600 dark:text-gray-300">
                        {filterSummary.map((item) => (
                            <li key={item.label} className="mb-1">
                                <strong>{item.label}:</strong> {item.value}
                            </li>
                        ))}
                    </ul>
                )}
                <div className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                    Export limit: {exportAllLimit}
                </div>
                {!loading && (matchingTotal ?? 0) > exportAllLimit && (
                    <div className="mt-2 text-sm text-amber-600 dark:text-amber-400">
                        This export will include the first {exportAllLimit} findings from the current filtered set.
                    </div>
                )}
                {error && (
                    <div className="mt-3 text-sm text-red-600 dark:text-red-400">
                        {t('Error')}: {error}
                    </div>
                )}
                {!error && warning && (
                    <div className="mt-3 text-sm text-amber-600 dark:text-amber-400">
                        {warning}
                    </div>
                )}
            </div>
            <div className="flex mt-6" style={{ justifyContent: 'space-between' }}>
                <select className="Select" disabled={processing || loading} value={exportType} onChange={e => setExportType(e.currentTarget.value)}>
                    {exportOptions.map(({ label }) => (
                        <option key={label} value={label}>{label}</option>
                    ))}
                </select>
                <div className="flex flex-grow"></div>
                <button className="Button green ml-4" disabled={disabled} onClick={() => void exportAll()}>
                    {t('Export')}
                </button>
            </div>
            {processing && (
                <>
                    <div className="mt-2 mb-1 justify-between flex">
                        <span className="truncate mr-8">{progress.currentName}</span>
                        <span>{`${progress.completed}/${progress.total}`}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: progress.total > 0 ? `${(progress.completed / progress.total) * 100}%` : '0%' }} />
                    </div>
                </>
            )}
            <Dialog.Close asChild>
                <button className="IconButton CloseButton" aria-label="Close">
                    <IconCross />
                </button>
            </Dialog.Close>
        </>
    )
}

export const SecurityFindingsExportDialog: FC<SecurityFindingsExportDialogProps> = ({ format, open, onOpenChange, children }) => {
    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Trigger asChild>
                {children}
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className={EXPORT_DIALOG_CLASS_NAMES.overlay} />
                <Dialog.Content className={EXPORT_DIALOG_CLASS_NAMES.content}>
                    {open && <DialogContent format={format} />}
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}
