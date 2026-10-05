/**
 * Copyright 2022-Present Pionxzh
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

import { render } from 'preact'
import sentinel from 'sentinel-js'
import { fetchConversation, processConversation } from './api'
import { cleanupMessageMarkdownMounts, mountMessageMarkdownButtons, type MessageMarkdownMountMap } from './messageMarkdown/messageMount'
import { type InjectionKind, type InjectionRecord, shouldKeepInjectedContainer } from './menuInjection'
import { findMemorySummaryModalMountTarget } from './memoryModalMount'
import { appendMessageTimestamps } from './messageTimestamps'
import { CONVERSATION_MENU_SELECTOR, findConversationSidebarMountTarget, findSecuritySidebarMountTarget, mountConversationSidebarMenu } from './menuMount'
import { getChatIdFromUrl, isSharePage } from './page'
import { getPageContext, isConversationPageContext, isSecurityMenuPageContext } from './pageContext'
import { registerExportCopyShortcut } from './shortcuts/exportCopyShortcut'
import { registerSettingsMenuCommand } from './settings/menuCommand'
import { Menu } from './ui/Menu'
import { MemoryExportButton } from './ui/MemoryExportButton'
import { onDomAvailable } from './utils/domReady'

import './i18n'
import './styles/missing-tailwind.css'
import './styles/conversation-menu.css'

main()

function main() {
    onDomAvailable(() => {
        registerSettingsMenuCommand()
        registerExportCopyShortcut()

        const styleEl = document.createElement('style')
        styleEl.id = 'sentinel-css'
        document.head.append(styleEl)

        const injectionMap = new Map<HTMLElement, InjectionRecord>()
        const messageMarkdownMounts: MessageMarkdownMountMap = new Map()

        const injectNavMenu = (nav: HTMLElement) => {
            const pageContext = getPageContext()
            if (!isConversationPageContext(pageContext) || pageContext.isSharePage || pageContext.isShareContinuePage) return
            // The new shell streams SSR navigation before the client conversation is hydrated.
            // Its search message metadata is client-only; wait for it before changing sidebar children.
            if (nav.querySelector('[data-app-action-sidebar-scroll]')
                && !document.querySelector('main [data-chatgpt-search-message-ids]')) return
            if (nav !== findConversationSidebarMountTarget() || injectionMap.has(nav) || nav.querySelector(CONVERSATION_MENU_SELECTOR)) return

            const container = getMenuContainer()
            if (mountConversationSidebarMenu(nav, container)) {
                injectionMap.set(nav, { container, kind: 'conversation-nav' })
            }
            else render(null, container)
        }

        const injectShareMenu = (target: HTMLElement) => {
            const pageContext = getPageContext()
            if (!pageContext.isSharePage || injectionMap.has(target)) return

            const container = getMenuContainer()
            injectionMap.set(target, { container, kind: 'share-wrapper' })
            target.prepend(container)
        }

        const injectSecurityMenu = (target: HTMLElement) => {
            const pageContext = getPageContext()
            if (!isSecurityMenuPageContext(pageContext) || injectionMap.has(target)) return

            const container = getMenuContainer()
            injectionMap.set(target, { container, kind: 'security-sidebar' })
            target.prepend(container)
        }

        const injectMemoryModalButton = (target: HTMLElement) => {
            if (injectionMap.has(target)) return

            const container = getMemoryModalButtonContainer()
            injectionMap.set(target, { container, kind: 'memory-modal' })
            target.append(container)
        }

        const shouldKeepInjection = (target: HTMLElement, kind: InjectionKind) => {
            const pageContext = getPageContext()
            const record = injectionMap.get(target)
            if (!record || record.kind !== kind) return false
            return shouldKeepInjectedContainer(target, record, pageContext)
        }

        sentinel.on('nav', injectNavMenu)
        sentinel.on(`div[role="presentation"] > .w-full > div >.flex.w-full`, injectShareMenu)
        sentinel.on('[role="separator"][aria-label="Resize repository pane"]', () => {
            const mountTarget = findSecuritySidebarMountTarget()
            if (mountTarget) {
                injectSecurityMenu(mountTarget)
            }
        })
        sentinel.on('[role="dialog"]', () => {
            const mountTarget = findMemorySummaryModalMountTarget()
            if (mountTarget) {
                injectMemoryModalButton(mountTarget)
            }
        })

        const reconcile = () => {
            injectionMap.forEach((record, target) => {
                if (!shouldKeepInjection(target, record.kind)) {
                    render(null, record.container)
                    record.container.remove()
                    injectionMap.delete(target)
                }
            })

            const conversationSidebar = findConversationSidebarMountTarget()
            if (conversationSidebar) injectNavMenu(conversationSidebar)

            if (isSharePage()) {
                const shareWrappers = Array.from(document.querySelectorAll<HTMLElement>('div[role="presentation"] > .w-full > div >.flex.w-full'))
                    .filter(target => !injectionMap.has(target))
                shareWrappers.forEach(injectShareMenu)
            }

            const securityMountTarget = findSecuritySidebarMountTarget()
            if (securityMountTarget && !injectionMap.has(securityMountTarget)) {
                injectSecurityMenu(securityMountTarget)
            }

            const memoryModalMountTarget = findMemorySummaryModalMountTarget()
            if (memoryModalMountTarget && !injectionMap.has(memoryModalMountTarget)) {
                injectMemoryModalButton(memoryModalMountTarget)
            }

            void addMessageTimestamps().catch(error => console.error('Failed to add message timestamps:', error))
            cleanupMessageMarkdownMounts(messageMarkdownMounts)
            if (isConversationPageContext(getPageContext())) {
                mountMessageMarkdownButtons(messageMarkdownMounts)
            }
        }

        /** Insert timestamp to the bottom right of each message */
        let chatId = ''
        let timestampNodes: ReturnType<typeof processConversation>['conversationNodes'] = []
        let timestampRequestPending = false
        let timestampRetryAfter = 0
        const addMessageTimestamps = async () => {
            const currentChatId = getChatIdFromUrl()
            if (!currentChatId) return
            if (currentChatId === chatId) {
                appendMessageTimestamps(timestampNodes)
                return
            }
            if (timestampRequestPending || Date.now() < timestampRetryAfter) return
            timestampRequestPending = true
            try {
                const rawConversation = await fetchConversation(currentChatId, false)
                if (getChatIdFromUrl() !== currentChatId) return
                timestampNodes = processConversation(rawConversation, { mergeContinuations: false }).conversationNodes
                chatId = currentChatId
                appendMessageTimestamps(timestampNodes)
            }
            finally {
                timestampRequestPending = false
                timestampRetryAfter = Date.now() + 5000
            }
        }

        sentinel.on('[role="presentation"]', () => {
            void addMessageTimestamps().catch((error) => {
                console.error('Failed to add message timestamps:', error)
            })
        })
        reconcile()
        setInterval(reconcile, 300)
    })
}

function getMenuContainer() {
    const container = document.createElement('div')
    // to overlap on the list section
    container.style.zIndex = '99'
    render(<Menu container={container} />, container)
    return container
}

function getMemoryModalButtonContainer() {
    const container = document.createElement('div')
    container.style.display = 'inline-flex'
    container.style.alignItems = 'center'
    render(<MemoryExportButton />, container)
    return container
}
