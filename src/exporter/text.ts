/**
 * Copyright 2022-Present Pionxzh
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0 AND MIT
 */

import { fetchConversation, getCurrentChatId, processConversation } from '../api'
import i18n from '../i18n'
import { checkIfConversationStarted } from '../page'
import { getPageContext } from '../pageContext'
import { copyToClipboard } from '../utils/clipboard'
import { flatMap, fromMarkdown, toMarkdown } from '../utils/markdown'
import { standardizeLineBreaks } from '../utils/text'
import { getSecurityUnsupportedMessage, loadCurrentSecurityDocument, securityDocumentToText } from './securityDocument'
import { getExecutionOutputImages, getExecutionOutputText } from './executionOutput'
import { shouldIncludeMessageForExport } from './messageClassifier'
import { getExportAuthorLabel } from './messageLabel'
import { normalizeReferenceText, replaceReferenceTokens, resolveExportMessage, stripUiTokens } from './shared'
import { sanitizeLLMText } from './textSanitizer'
import type { ConversationNodeMessage } from '../api'
import type { Emphasis, Strong } from 'mdast'

export async function exportToText() {
    const pageContext = getPageContext()

    if (pageContext.kind === 'security-finding' || pageContext.kind === 'security-scan') {
        const document = await loadCurrentSecurityDocument()
        if (!document) {
            alert(getSecurityUnsupportedMessage())
            return false
        }

        await copyToClipboard(standardizeLineBreaks(securityDocumentToText(document)))
        return true
    }

    if (pageContext.kind !== 'conversation') {
        alert(getSecurityUnsupportedMessage())
        return false
    }

    if (!checkIfConversationStarted()) {
        alert(i18n.t('Please start a conversation first'))
        return false
    }

    const chatId = await getCurrentChatId()
    // All image in text output will be replaced with `[image]`
    // So we don't need to waste time to download them
    const rawConversation = await fetchConversation(chatId, false)

    const { conversationNodes } = processConversation(rawConversation)
    const text = conversationNodes
        .map(({ message }) => transformMessageForTextExport(message))
        .filter(Boolean)
        .join('\n\n')

    await copyToClipboard(standardizeLineBreaks(text))

    return true
}

const LatexRegex = /(\s\$\$.+\$\$\s|\s\$.+\$\s|\\\[.+\\\]|\\\(.+\\\))|(^\$$[\S\s]+^\$$)|(^\$\$[\S\s]+^\$\$$)/gm

export function transformMessageForTextExport(message?: ConversationNodeMessage) {
    const exportMessage = resolveExportMessage(message)
    if (!exportMessage?.content) return null
    if (!shouldIncludeMessageForExport(exportMessage)) return null

    const author = getExportAuthorLabel(exportMessage)
    let content = transformContent(exportMessage.content, exportMessage.metadata)

    const matches = content.match(LatexRegex)
    if (matches) {
        let index = 0
        content = content.replace(LatexRegex, () => {
            // Replace it with `╬${index}╬` to avoid markdown processor ruin the formula
            return `╬${index++}╬`
        })
    }

    if (exportMessage.author.role === 'assistant') {
        content = transformContentReferences(content, exportMessage.metadata)
        content = transformFootNotes(content, exportMessage.metadata)
    }

    // Only message from assistant will be reformatted
    if (exportMessage.author.role === 'assistant' && content) {
        content = reformatContent(content)
    }

    if (matches) {
        // Replace `╬${index}╬` back to the original latex
        content = content.replace(/╬(\d+)╬/g, (_, index) => {
            return matches[+index]
        })
    }

    content = sanitizeLLMText(content)

    return `${author}:\n${content}`
}

/**
 * Convert the content based on the type of message
 */
function transformContent(
    content: ConversationNodeMessage['content'],
    metadata: ConversationNodeMessage['metadata'],
) {
    switch (content.content_type) {
        case 'text':
            return stripUiTokens(content.parts?.join('\n') || '')
        case 'code':
            return stripUiTokens(content.text || '')
        case 'execution_output': {
            const images = getExecutionOutputImages(metadata)
            if (images.length > 0) {
                return images.map(() => '[image]').join('\n')
            }
            return getExecutionOutputText(content)
        }
        case 'tether_quote':
            return `> ${stripUiTokens(content.title || content.text || '')}`
        case 'tether_browsing_code':
            return '' // TODO: implement
        case 'tether_browsing_display': {
            const metadataList = metadata?._cite_metadata?.metadata_list
            if (Array.isArray(metadataList) && metadataList.length > 0) {
                return metadataList.map(({ title, url }) => `> [${title}](${url})`).join('\n')
            }
            return ''
        }
        case 'multimodal_text': {
            return content.parts?.map((part) => {
                if (typeof part === 'string') return stripUiTokens(part)
                // We show `[image]` for multimodal as the base64 string is too long. This is bad for sharing pure text.
                if (part.content_type === 'image_asset_pointer') return '[image]'
                if (part.content_type === 'audio_transcription') return `[audio] ${stripUiTokens(part.text)}`
                if (part.content_type === 'audio_asset_pointer') return null
                if (part.content_type === 'real_time_user_audio_video_asset_pointer') return null
                return '[Unsupported multimodal content]'
            }).join('\n') || ''
        }
        default:
            return '[Unsupported Content]'
    }
}

/**
 * Remove some markdown syntaxes from the content
 */
function reformatContent(input: string) {
    const root = fromMarkdown(input)
    flatMap(root, (item) => {
        // Replace strong/bold with text
        if (item.type === 'strong') return (item as Strong).children
        // Replace emphasis/italic with text
        if (item.type === 'emphasis') return (item as Emphasis).children

        return [item]
    })
    const result = toMarkdown(root)
    // HACK: render to markdown will let [ be escaped, so we need to remove the first character
    if (result.startsWith('\\[') && input.startsWith('[')) {
        return result.slice(1)
    }
    return result
}

function transformContentReferences(
    input: string,
    metadata: ConversationNodeMessage['metadata'],
) {
    const contentRefs = metadata?.content_references
    if (!contentRefs || contentRefs.length === 0) return input

    const sortedRefs = [...contentRefs].sort((a, b) => (b.matched_text?.length || 0) - (a.matched_text?.length || 0))

    let output = normalizeReferenceText(input)

    for (const ref of sortedRefs) {
        if (!ref.matched_text) continue

        switch (ref.type) {
            case 'sources_footnote':
                break
            default:
                // Use ref.alt which contains display text (links won't render in plain text)
                output = replaceReferenceTokens(output, ref.matched_text, ref.alt || '')
        }
    }
    return output
}

/**
 * Transform foot notes in assistant's message
 */
function transformFootNotes(
    input: string,
    metadata: ConversationNodeMessage['metadata'],
) {
    // 【11†(PrintWiki)】
    const footNoteMarkRegex = /【(\d+)†\((.+?)\)】/g
    return input.replace(footNoteMarkRegex, (match, citeIndex, _evidenceText) => {
        const citation = metadata?.citations?.find(cite => cite.metadata?.extra?.cited_message_idx === +citeIndex)
        // We simply remove the foot note mark in text output
        if (citation) return ''

        return match
    })
}
