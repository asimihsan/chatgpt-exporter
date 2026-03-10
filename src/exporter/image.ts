/**
 * Copyright 2022-Present Pionxzh
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0 AND MIT
 */

import html2canvas from 'html2canvas'
import i18n from '../i18n'
import { checkIfConversationStarted, getChatIdFromUrl } from '../page'
import { getPageContext, isSecurityExportPageContext } from '../pageContext'
import { downloadUrl, getFileNameWithFormat } from '../utils/download'
import { Effect } from '../utils/effect'
import { sleep } from '../utils/utils'
import { getSecurityFileNameOptions, getSecurityUnsupportedMessage, loadCurrentSecurityDocument } from './securityDocument'

type PngCaptureMode = 'conversation' | 'security'

interface PngCaptureSpec {
    mode: PngCaptureMode
    element: HTMLElement
    fileNameOptions: {
        title?: string
        chatId?: string
        createTime?: number
        updateTime?: number
    }
}

const SECURITY_PNG_TARGET_ATTRIBUTE = 'data-ce-security-png-target'

// https://github.com/niklasvh/html2canvas/issues/2792#issuecomment-1042948572
function fnIgnoreElements(el: any) {
    return typeof el.shadowRoot === 'object' && el.shadowRoot !== null
}

function getConversationCaptureTarget(): HTMLElement | null {
    return document.querySelector('#thread div:has(> [data-testid="conversation-turn-1"])')
}

export function getSecurityDetailPane(): HTMLElement | null {
    const separator = document.querySelector('[role="separator"][aria-label="Resize repository pane"]')
    if (!(separator instanceof HTMLElement)) return null

    const aside = separator.previousElementSibling
    const detailPane = separator.nextElementSibling
    if (!(aside instanceof HTMLElement) || !(detailPane instanceof HTMLElement)) return null

    if (!aside.style.getPropertyValue('--codex-security-left-pane-width')) {
        return null
    }

    return detailPane
}

function resolveSecurityTitle(root: ParentNode): string | undefined {
    const heading = root.querySelector('h1')
    if (!(heading instanceof HTMLElement)) return undefined

    const title = heading.textContent?.trim()
    return title ? title : undefined
}

export function resolvePngCaptureSpec(): PngCaptureSpec | null {
    const pageContext = getPageContext()

    if (pageContext.kind === 'conversation') {
        const thread = getConversationCaptureTarget()
        if (!thread || thread.children.length === 0 || thread.scrollHeight < 50) {
            return null
        }

        return {
            mode: 'conversation',
            element: thread,
            fileNameOptions: {
                chatId: getChatIdFromUrl() || undefined,
            },
        }
    }

    if (isSecurityExportPageContext(pageContext)) {
        const detailPane = getSecurityDetailPane()
        if (!detailPane || detailPane.scrollHeight < 50) {
            return null
        }

        return {
            mode: 'security',
            element: detailPane,
            fileNameOptions: {
                title: resolveSecurityTitle(detailPane),
            },
        }
    }

    return null
}

function applyConversationPngEffect(effect: Effect, target: HTMLElement): void {
    const isDarkMode = document.documentElement.classList.contains('dark')

    effect.add(() => {
        const style = document.createElement('style')
        style.textContent = `
            #thread div:has(> [data-testid="conversation-turn-1"]),
            #thread [data-testid^="conversation-turn-"] {
                color: ${isDarkMode ? '#ececec' : '#0d0d0d'};
                background-color: ${isDarkMode ? '#212121' : '#fff'};
            }

            img {
                display: initial !important;
            }

            pre {
                margin-top: 8px !important;
            }

            pre > div > div > span {
                margin-top: -12px;
                padding-bottom: 2px;
            }

            #page-header,
            #thread-bottom-container,
            #thread div:has(> [data-testid="conversation-turn-1"]) > :not([data-testid^="conversation-turn-"]),
            button.absolute,
            .group.absolute > button {
                display: none;
            }

            .group\\/conversation-turn > div > div.absolute,
            #thread pre button {
                visibility: hidden;
            }
        `
        target.appendChild(style)
        return () => style.remove()
    })
}

function applySecurityPngEffect(effect: Effect, target: HTMLElement): void {
    const isDarkMode = document.documentElement.classList.contains('dark')

    effect.add(() => {
        const style = document.createElement('style')
        style.textContent = `
            [${SECURITY_PNG_TARGET_ATTRIBUTE}] {
                color: ${isDarkMode ? '#ececec' : '#0d0d0d'} !important;
                background-color: ${isDarkMode ? '#212121' : '#fff'} !important;
            }

            [${SECURITY_PNG_TARGET_ATTRIBUTE}] button,
            [${SECURITY_PNG_TARGET_ATTRIBUTE}] [role="button"] {
                visibility: hidden !important;
            }

            [${SECURITY_PNG_TARGET_ATTRIBUTE}] img {
                display: initial !important;
            }
        `
        document.head.appendChild(style)
        return () => style.remove()
    })

    effect.add(() => {
        const previousAttribute = target.getAttribute(SECURITY_PNG_TARGET_ATTRIBUTE)
        const previousOverflow = target.style.overflow
        const previousOverflowY = target.style.overflowY
        const previousHeight = target.style.height
        const previousMaxHeight = target.style.maxHeight

        target.setAttribute(SECURITY_PNG_TARGET_ATTRIBUTE, '')
        target.style.overflow = 'visible'
        target.style.overflowY = 'visible'
        target.style.height = 'auto'
        target.style.maxHeight = 'none'

        return () => {
            if (previousAttribute === null) {
                target.removeAttribute(SECURITY_PNG_TARGET_ATTRIBUTE)
            }
            else {
                target.setAttribute(SECURITY_PNG_TARGET_ATTRIBUTE, previousAttribute)
            }
            target.style.overflow = previousOverflow
            target.style.overflowY = previousOverflowY
            target.style.height = previousHeight
            target.style.maxHeight = previousMaxHeight
        }
    })
}

async function takeScreenshot(target: HTMLElement, width: number, height: number, additionalScale = 1, currentPass = 1): Promise<string | null> {
    const passLimit = 10
    const ratio = window.devicePixelRatio || 1
    const scale = ratio * 2 * additionalScale

    let canvas: HTMLCanvasElement | null = null
    try {
        canvas = await html2canvas(target, {
            scale,
            useCORS: true,
            scrollX: -window.scrollX,
            scrollY: -window.scrollY,
            windowWidth: width,
            windowHeight: height,
            ignoreElements: fnIgnoreElements,
        })
    }
    catch (error) {
        console.log(`ChatGPT Exporter:takeScreenshot with height=${height} width=${width} scale=${scale}`)
        console.error('Failed to take screenshot', error)
    }

    const context = canvas?.getContext('2d')
    if (context) context.imageSmoothingEnabled = false

    const dataUrl = canvas?.toDataURL('image/png', 1)
        .replace(/^data:image\/[^;]/, 'data:application/octet-stream')

    if (!canvas || !dataUrl || dataUrl === 'data:,') {
        if (currentPass > passLimit) return null
        return takeScreenshot(target, width, height, additionalScale / 1.4, currentPass + 1)
    }

    return dataUrl
}

export async function exportToPng(fileNameFormat: string) {
    const pageContext = getPageContext()

    if (pageContext.kind === 'conversation' && !checkIfConversationStarted()) {
        alert(i18n.t('Please start a conversation first'))
        return false
    }

    const captureSpec = resolvePngCaptureSpec()
    if (!captureSpec) {
        alert(pageContext.kind === 'conversation'
            ? i18n.t('Failed to export to PNG. Failed to find the element node.')
            : isSecurityExportPageContext(pageContext)
                ? i18n.t('Failed to export to PNG. Failed to find the element node.')
                : getSecurityUnsupportedMessage())
        return false
    }

    const effect = new Effect()
    if (captureSpec.mode === 'conversation') {
        applyConversationPngEffect(effect, captureSpec.element)
    }
    else {
        applySecurityPngEffect(effect, captureSpec.element)
    }

    effect.run()

    await sleep(100)

    const dataUrl = await takeScreenshot(
        captureSpec.element,
        captureSpec.element.scrollWidth,
        captureSpec.element.scrollHeight,
    )
    effect.dispose()

    if (!dataUrl) {
        alert('Failed to export to PNG. This might be caused by the size of the conversation. Please try to export a smaller conversation.')
        return false
    }

    let fileNameOptions = captureSpec.fileNameOptions
    if (captureSpec.mode === 'security') {
        try {
            const securityDocument = await loadCurrentSecurityDocument()
            if (securityDocument) {
                fileNameOptions = {
                    ...fileNameOptions,
                    ...getSecurityFileNameOptions(securityDocument),
                }
            }
        }
        catch (error) {
            console.warn('Failed to load security document metadata for PNG filename.', error)
        }
    }

    const fileName = getFileNameWithFormat(fileNameFormat, 'png', fileNameOptions)
    downloadUrl(fileName, dataUrl)
    window.URL.revokeObjectURL(dataUrl)

    return true
}
