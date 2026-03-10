/**
 * Copyright 2022-Present Pionxzh
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0 AND MIT
 */

import { render } from 'preact'
import sentinel from 'sentinel-js'
import { fetchConversation, processConversation } from './api'
import { type InjectionKind, type InjectionRecord, shouldKeepInjectedContainer } from './menuInjection'
import { findSecuritySidebarMountTarget } from './menuMount'
import { getChatIdFromUrl, isSharePage } from './page'
import { getPageContext, isConversationPageContext, isSecurityExportPageContext } from './pageContext'
import { registerExportCopyShortcut } from './shortcuts/exportCopyShortcut'
import { registerSettingsMenuCommand } from './settings/menuCommand'
import { Menu } from './ui/Menu'
import { onloadSafe } from './utils/utils'

import './i18n'
import './styles/missing-tailwind.css'

main()

function main() {
    onloadSafe(() => {
        registerSettingsMenuCommand()
        registerExportCopyShortcut()

        const styleEl = document.createElement('style')
        styleEl.id = 'sentinel-css'
        document.head.append(styleEl)

        const injectionMap = new Map<HTMLElement, InjectionRecord>()

        const injectNavMenu = (nav: HTMLElement) => {
            const pageContext = getPageContext()
            if (!isConversationPageContext(pageContext) || pageContext.isSharePage || pageContext.isShareContinuePage) return
            if (injectionMap.has(nav)) return

            const container = getMenuContainer()
            injectionMap.set(nav, { container, kind: 'conversation-nav' })

            const chatList = nav.querySelector(':scope > div.sticky.bottom-0')
            if (chatList) {
                chatList.prepend(container)
            }
            else {
                // fallback to the bottom of the nav
                container.style.backgroundColor = '#171717'
                container.style.position = 'sticky'
                container.style.bottom = '72px'
                nav.append(container)
            }
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
            if (!isSecurityExportPageContext(pageContext) || injectionMap.has(target)) return

            const container = getMenuContainer()
            injectionMap.set(target, { container, kind: 'security-sidebar' })
            target.prepend(container)
        }

        const shouldKeepInjection = (target: HTMLElement, kind: InjectionKind) => {
            const pageContext = getPageContext()
            const record = injectionMap.get(target)
            if (!record || record.kind !== kind) return false
            return shouldKeepInjectedContainer(target, record, pageContext)
        }

        // Delay DOM injections until the host app has had time to hydrate.
        setTimeout(() => {
            sentinel.on('nav', injectNavMenu)
            sentinel.on(`div[role="presentation"] > .w-full > div >.flex.w-full`, injectShareMenu)
            sentinel.on('[role="separator"][aria-label="Resize repository pane"]', () => {
                const mountTarget = findSecuritySidebarMountTarget()
                if (mountTarget) {
                    injectSecurityMenu(mountTarget)
                }
            })

            setInterval(() => {
                injectionMap.forEach((record, target) => {
                    if (!shouldKeepInjection(target, record.kind)) {
                        record.container.remove()
                        injectionMap.delete(target)
                    }
                })

                const navList = Array.from(document.querySelectorAll('nav')).filter(nav => !injectionMap.has(nav))
                navList.forEach(injectNavMenu)

                if (isSharePage()) {
                    const shareWrappers = Array.from(document.querySelectorAll<HTMLElement>('div[role="presentation"] > .w-full > div >.flex.w-full'))
                        .filter(target => !injectionMap.has(target))
                    shareWrappers.forEach(injectShareMenu)
                }

                const securityMountTarget = findSecuritySidebarMountTarget()
                if (securityMountTarget && !injectionMap.has(securityMountTarget)) {
                    injectSecurityMenu(securityMountTarget)
                }
            }, 300)

            /** Insert timestamp to the bottom right of each message */
            let chatId = ''
            const addMessageTimestamps = async () => {
                const currentChatId = getChatIdFromUrl()
                if (!currentChatId || currentChatId === chatId) return
                chatId = currentChatId

                const rawConversation = await fetchConversation(chatId, false)
                const { conversationNodes } = processConversation(rawConversation)

                const threadContents = Array.from(document.querySelectorAll('main [data-testid^="conversation-turn-"] [data-message-id]'))
                if (threadContents.length === 0) return

                threadContents.forEach((thread, index) => {
                    const createTime = conversationNodes[index]?.message?.create_time
                    if (!createTime) return

                    const date = new Date(createTime * 1000)

                    const timestamp = document.createElement('time')
                    timestamp.className = 'w-full text-gray-500 dark:text-gray-400 text-sm text-right'
                    timestamp.dateTime = date.toISOString()
                    timestamp.title = date.toLocaleString()

                    const hour12 = document.createElement('span')
                    hour12.setAttribute('data-time-format', '12')
                    hour12.textContent = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
                    const hour24 = document.createElement('span')
                    hour24.setAttribute('data-time-format', '24')
                    hour24.textContent = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
                    timestamp.append(hour12, hour24)
                    thread.append(timestamp)
                })
            }

            sentinel.on('[role="presentation"]', () => {
                void addMessageTimestamps().catch((error) => {
                    console.error('Failed to add message timestamps:', error)
                })
            })
        }, 1200)
    })
}

function getMenuContainer() {
    const container = document.createElement('div')
    // to overlap on the list section
    container.style.zIndex = '99'
    render(<Menu container={container} />, container)
    return container
}
