import * as Dialog from '@radix-ui/react-dialog'
import * as HoverCard from '@radix-ui/react-hover-card'
import { useCallback, useMemo, useState } from 'preact/hooks'
import { useTranslation } from 'react-i18next'
import { exportToHtml } from '../exporter/html'
import { exportToPng } from '../exporter/image'
import { exportToJson, exportToOoba, exportToTavern } from '../exporter/json'
import { exportToMarkdown } from '../exporter/markdown'
import { exportToText } from '../exporter/text'
import { useWindowResize } from '../hooks/useWindowResize'
import { getHistoryDisabled } from '../page'
import { openSettingsPanel } from '../settings/panel'
import { Divider } from './Divider'
import { ExportDialog } from './ExportDialog'
import { FileCode, IconArrowRightFromBracket, IconCamera, IconCopy, IconJSON, IconMarkdown, IconSetting, IconZip } from './Icons'
import { MenuItem } from './MenuItem'
import { SettingProvider, useSettingContext } from './SettingContext'

import '../style.css'
import './Dialog.css'

function MenuInner({ container }: { container: HTMLDivElement }) {
    const { t } = useTranslation()
    const disabled = getHistoryDisabled()

    const [open, setOpen] = useState(false)
    const [jsonOpen, setJsonOpen] = useState(false)
    const [exportOpen, setExportOpen] = useState(false)

    const {
        format,
        enableMeta,
        exportMetaList,
    } = useSettingContext()

    const metaList = useMemo(() => enableMeta ? exportMetaList : [], [enableMeta, exportMetaList])

    const onClickText = useCallback(() => exportToText(), [])
    const onClickPng = useCallback(() => exportToPng(format), [format])
    const onClickMarkdown = useCallback(() => exportToMarkdown(format, metaList), [format, metaList])
    const onClickHtml = useCallback(() => exportToHtml(format, metaList), [format, metaList])
    const onClickJSON = useCallback(() => {
        setJsonOpen(true)
        return true
    }, [])
    const onClickOfficialJSON = useCallback(() => exportToJson(format), [format])
    const onClickTavern = useCallback(() => exportToTavern(format), [format])
    const onClickOoba = useCallback(() => exportToOoba(format), [format])
    const onClickSetting = useCallback(() => {
        openSettingsPanel()
        return true
    }, [])

    const width = useWindowResize(() => window.innerWidth)
    const isMobile = width < 768
    const hasOverlayOpen = jsonOpen || exportOpen
    const isMenuOpen = open || hasOverlayOpen

    const contentClassName = `
        ce-menu-content
        grid grid-cols-2
        ce-bg-menu
        border ce-border-menu
        transition-opacity duration-200 shadow-md
        ${isMobile
            ? 'gap-x-1 px-1.5 pt-2 rounded animate-slideUp'
            : 'gap-x-1 px-1.5 py-2 pb-0 rounded-md animate-fadeIn'}
    `

    if (disabled) {
        return (
            <MenuItem
                className="mt-1"
                text="Chat History disabled"
                icon={IconArrowRightFromBracket}
                disabled
            />
        )
    }

    const menuContent = (
        <HoverCard.Content
            className={contentClassName}
            style={{
                width: isMobile ? 316 : 268,
                left: -6,
                bottom: 0,
            }}
            sideOffset={isMobile ? 0 : 8}
            side={isMobile ? 'bottom' : 'right'}
            align="start"
            alignOffset={isMobile ? 0 : -64}
            collisionPadding={isMobile ? 0 : 8}
        >
            <MenuItem
                text={t('Setting')}
                icon={IconSetting}
                className="ce-row-full"
                onClick={onClickSetting}
            />

            <MenuItem
                text={t('Copy Text')}
                successText={t('Copied!')}
                icon={IconCopy}
                className="ce-row-full"
                onClick={onClickText}
            />
            <MenuItem
                text={t('Screenshot')}
                icon={IconCamera}
                className="ce-row-half"
                onClick={onClickPng}
            />
            <MenuItem
                text={t('Markdown')}
                icon={IconMarkdown}
                className="ce-row-half"
                onClick={onClickMarkdown}
            />
            <MenuItem
                text={t('HTML')}
                icon={FileCode}
                className="ce-row-half"
                onClick={onClickHtml}
            />
            <Dialog.Root
                open={jsonOpen}
                onOpenChange={setJsonOpen}
            >
                <Dialog.Trigger asChild>
                    <MenuItem
                        text={t('JSON')}
                        icon={IconJSON}
                        className="ce-row-half"
                        onClick={onClickJSON}
                    />
                </Dialog.Trigger>
                <Dialog.Portal>
                    <Dialog.Overlay className="DialogOverlay" />
                    <Dialog.Content className="DialogContent" style={{ width: '320px' }}>
                        <Dialog.Title className="DialogTitle">{t('JSON')}</Dialog.Title>
                        <MenuItem
                            text={t('OpenAI Official Format')}
                            icon={IconCopy}
                            className="ce-row-full"
                            onClick={onClickOfficialJSON}
                        />
                        <MenuItem
                            text="JSONL (TavernAI, SillyTavern)"
                            icon={IconCopy}
                            className="ce-row-full"
                            onClick={onClickTavern}
                        />
                        <MenuItem
                            text="Ooba (text-generation-webui)"
                            icon={IconCopy}
                            className="ce-row-full"
                            onClick={onClickOoba}
                        />
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
            <ExportDialog
                format={format}
                open={exportOpen}
                onOpenChange={setExportOpen}
            >
                <div className="ce-row-full">
                    <MenuItem
                        text={t('Export All')}
                        icon={IconZip}
                    />
                </div>
            </ExportDialog>

            {!isMobile && (
                <HoverCard.Arrow
                    width="16"
                    height="8"
                    style={{
                        fill: 'var(--ce-menu-primary)',
                        stroke: 'var(--ce-border-light)',
                        strokeWidth: '2px',
                    }}
                />
            )}
        </HoverCard.Content>
    )

    return (
        <>
            {isMobile && open && (
                <div
                    className="dropdown-backdrop animate-fadeIn"
                    onClick={() => setOpen(false)}
                ></div>
            )}

            <HoverCard.Root
                openDelay={0}
                closeDelay={300}
                open={isMenuOpen}
                onOpenChange={setOpen}
            >
                <HoverCard.Trigger>
                    <MenuItem
                        className="mt-1"
                        text={t('ExportHelper')}
                        icon={IconArrowRightFromBracket}
                        onClick={() => {
                            setOpen(true)
                            return true
                        }}
                    />
                </HoverCard.Trigger>
                <HoverCard.Portal
                    container={isMobile ? container : document.body}
                    forceMount={isMenuOpen ? true : undefined}
                >
                    {menuContent}
                </HoverCard.Portal>
            </HoverCard.Root>
            <Divider />
        </>
    )
}

export function Menu({ container }: { container: HTMLDivElement }) {
    return (
        <SettingProvider>
            <MenuInner container={container} />
        </SettingProvider>
    )
}
