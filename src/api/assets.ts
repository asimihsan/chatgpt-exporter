/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

import { blobToDataURL } from '../utils/dom'
import { fetchApi, getFileDownloadApiUrl, getLegacyFileDownloadApiUrl } from './http'
import type { ApiConversation, ContentReference, ConversationNodeMessage } from './types'

type ApiFileDownload = {
    status: 'success'
    /** signed download url */
    download_url: string
    metadata: Record<string, unknown> | null
    file_name: string
    /** iso8601 datetime string */
    creation_time: string | null
    mime_type?: string | null
    file_size_bytes?: number | null
} | {
    status: 'error'
    error_code: string
    error_message: string | null
}

interface ImageAssetPointer {
    asset_pointer: string
    content_type: 'image_asset_pointer' & (string & {})
    fovea: number
    height: number
    size_bytes: number
    width: number
    metadata?: {
        dalle?: {
            gen_id: string
            prompt: string
            seed: number
            serialization_title: string
        }
    }
}

function isImageAssetPointer(part: unknown): part is ImageAssetPointer {
    if (typeof part !== 'object' || part === null) return false

    const candidate = part as Partial<ImageAssetPointer>
    return candidate.content_type === 'image_asset_pointer'
        && typeof candidate.asset_pointer === 'string'
        && typeof candidate.fovea === 'number'
        && typeof candidate.height === 'number'
        && typeof candidate.size_bytes === 'number'
        && typeof candidate.width === 'number'
        && candidate.asset_pointer.startsWith('file-service://')
}

interface ReplaceAssetOptions {
    conversationId?: string
}

function getReferencedFileId(ref: ContentReference): string | null {
    return ref.file_id || ref.cite_key || null
}

function getFileSourceReferences(
    metadata: ConversationNodeMessage['metadata'],
    fileId: string,
): ContentReference[] {
    return metadata?.content_references_by_file?.[fileId]
        ?? metadata?.n7jupd_crefs_by_file?.[fileId]
        ?? []
}

async function fetchFileDownloadDetails(fileId: string, options: ReplaceAssetOptions = {}): Promise<ApiFileDownload> {
    try {
        const primaryDetails = await fetchApi<ApiFileDownload>(
            getFileDownloadApiUrl(fileId, { conversationId: options.conversationId }),
        )
        if (primaryDetails.status === 'success') {
            return primaryDetails
        }
    }
    catch {
        // Fall through to the legacy route used by older file-service pointers.
    }

    return fetchApi<ApiFileDownload>(getLegacyFileDownloadApiUrl(fileId))
}

async function fetchImageFromPointer(uri: string) {
    const pointer = uri.replace('file-service://', '')
    const imageDetails = await fetchFileDownloadDetails(pointer)
    if (imageDetails.status === 'error') {
        console.error('Failed to fetch image asset', imageDetails.error_code, imageDetails.error_message)
        return null
    }

    const image = await fetch(imageDetails.download_url)
    const blob = await image.blob()
    const base64 = await blobToDataURL(blob)
    return base64.replace(/^data:.*?;/, `data:${image.headers.get('content-type')};`)
}

function isInlineableTextFile(fileName: string, contentType: string | null): boolean {
    const lowerFileName = fileName.toLowerCase()
    const lowerContentType = contentType?.toLowerCase() ?? ''

    return lowerContentType.startsWith('text/')
        || lowerContentType.includes('markdown')
        || lowerFileName.endsWith('.md')
        || lowerFileName.endsWith('.markdown')
}

function escapeMarkdownUrl(input: string): string {
    return input.replaceAll('>', '%3E').replaceAll('\n', '')
}

function getSourceKey(ref: ContentReference): string {
    return ref.url || ref.title || ref.matched_text || ''
}

function getUniqueSources(refs: ContentReference[]): ContentReference[] {
    const sources: ContentReference[] = []
    const seen = new Set<string>()
    for (const ref of refs) {
        const key = getSourceKey(ref)
        if (!key || seen.has(key)) continue

        seen.add(key)
        sources.push(ref)
    }
    return sources
}

function isValidSourceSpan(fileText: string, ref: ContentReference): boolean {
    return Number.isInteger(ref.start_idx)
        && Number.isInteger(ref.end_idx)
        && ref.start_idx >= 0
        && ref.end_idx > ref.start_idx
        && ref.end_idx <= fileText.length
        && fileText.slice(ref.start_idx, ref.end_idx) === ref.matched_text
}

function renderInlineSourceMarker(ref: ContentReference, sourceNumber: number): string {
    if (ref.url) return `[[${sourceNumber}]](<${escapeMarkdownUrl(ref.url)}>)`
    return `[${sourceNumber}]`
}

function replaceSourceRefsBySpan(
    fileText: string,
    sourceRefs: ContentReference[],
    sourceNumberByKey: Map<string, number>,
): string | null {
    const spanRefs = sourceRefs
        .filter((ref) => {
            return ref.matched_text
                && sourceNumberByKey.has(getSourceKey(ref))
                && isValidSourceSpan(fileText, ref)
        })
        .sort((a, b) => b.start_idx - a.start_idx)

    if (spanRefs.length === 0) return null

    let content = fileText
    for (const ref of spanRefs) {
        const sourceNumber = sourceNumberByKey.get(getSourceKey(ref))
        if (!sourceNumber) continue

        content = [
            content.slice(0, ref.start_idx),
            renderInlineSourceMarker(ref, sourceNumber),
            content.slice(ref.end_idx),
        ].join('')
    }

    return content
}

function replaceSourceRefsByMarker(
    fileText: string,
    sourceRefs: ContentReference[],
    sourceNumberByKey: Map<string, number>,
): string {
    const sortedRefs = [...sourceRefs].sort((a, b) => (b.matched_text?.length || 0) - (a.matched_text?.length || 0))
    let content = fileText

    for (const ref of sortedRefs) {
        if (!ref.matched_text) continue

        const sourceNumber = sourceNumberByKey.get(getSourceKey(ref))
        if (!sourceNumber) continue

        content = content.replaceAll(ref.matched_text, renderInlineSourceMarker(ref, sourceNumber))
    }

    return content
}

function renderFileContentWithSources(
    fileText: string,
    sourceRefs: ContentReference[],
): string {
    const sources = getUniqueSources(sourceRefs.filter(ref => ref.type === 'webpage_extended' && getSourceKey(ref)))
    if (sources.length === 0) {
        return fileText
    }

    const sourceNumberByKey = new Map(sources.map((source, index) => [getSourceKey(source), index + 1]))
    const content = replaceSourceRefsBySpan(fileText, sourceRefs, sourceNumberByKey)
        ?? replaceSourceRefsByMarker(fileText, sourceRefs, sourceNumberByKey)

    return content
}

async function fetchGeneratedTextFile(
    fileRef: ContentReference,
    sourceRefs: ContentReference[],
    options: ReplaceAssetOptions = {},
): Promise<string | null> {
    const fileId = getReferencedFileId(fileRef)
    if (!fileId) return null

    const fileDetails = await fetchFileDownloadDetails(fileId, options)
    if (fileDetails.status === 'error') {
        console.error('Failed to fetch generated file', fileDetails.error_code, fileDetails.error_message)
        return null
    }

    const fileResponse = await fetch(fileDetails.download_url)
    if (!fileResponse.ok) {
        console.error('Failed to download generated file', fileResponse.status, fileResponse.statusText)
        return null
    }

    const contentType = fileResponse.headers.get('content-type') || fileDetails.mime_type || null
    if (!isInlineableTextFile(fileDetails.file_name, contentType)) {
        return null
    }

    const fileText = await fileResponse.text()
    return renderFileContentWithSources(fileText, sourceRefs)
}

async function replaceGeneratedFileReferences(
    message: ConversationNodeMessage,
    options: ReplaceAssetOptions = {},
): Promise<void> {
    if (message.content.content_type !== 'text') return

    const fileRefs = message.metadata?.n7jupd_crefs?.filter((ref) => {
        return ref.type === 'file' && !!ref.matched_text && !!getReferencedFileId(ref)
    }) ?? []
    if (fileRefs.length === 0) return

    for (const fileRef of fileRefs) {
        try {
            const fileId = getReferencedFileId(fileRef)
            const matchedText = fileRef.matched_text
            if (!fileId || !matchedText) continue

            const fileText = await fetchGeneratedTextFile(
                fileRef,
                getFileSourceReferences(message.metadata, fileId),
                options,
            )
            if (!fileText) continue

            if (!message.content.parts.some(part => part.includes(matchedText))) continue

            message.content.parts = message.content.parts.map(part => part.replaceAll(matchedText, fileText))
            message.metadata ??= {}
            message.metadata.exported_generated_file_ids ??= []
            if (!message.metadata.exported_generated_file_ids.includes(fileId)) {
                message.metadata.exported_generated_file_ids.push(fileId)
            }
        }
        catch (error) {
            console.error('Failed to inline generated file', error)
        }
    }
}

export async function inlineGeneratedTextFiles(
    conversation: ApiConversation,
    options: ReplaceAssetOptions = {},
): Promise<void> {
    const messages = Object.values(conversation.mapping)
        .map(node => node.message)
        .filter((message): message is ConversationNodeMessage => !!message)

    await Promise.all(messages.map(message => replaceGeneratedFileReferences(message, options)))
}

/** replaces `file-service://` pointers with data uris containing the image */
/** avoid errors in parsing multimodal parts we don't understand */
export async function replaceImageAssets(
    conversation: ApiConversation,
    options: ReplaceAssetOptions = {},
): Promise<void> {
    const imageAssets = Object.values(conversation.mapping).flatMap((node) => {
        if (!node.message) return []
        if (node.message.content.content_type !== 'multimodal_text') return []

        const parts = Array.isArray(node.message.content.parts) ? node.message.content.parts : []
        return parts.filter((part): part is ImageAssetPointer => isImageAssetPointer(part))
    })

    const executionOutputs = Object.values(conversation.mapping).flatMap((node) => {
        if (!node.message) return []
        if (node.message.content.content_type !== 'execution_output') return []
        if (!node.message.metadata?.aggregate_result?.messages) return []

        return node.message.metadata.aggregate_result.messages
            .filter(msg => msg.message_type === 'image')
    })

    await Promise.all([
        inlineGeneratedTextFiles(conversation, options),
        ...imageAssets.map(async (asset) => {
            try {
                const newAssetPointer = await fetchImageFromPointer(asset.asset_pointer)
                if (newAssetPointer) asset.asset_pointer = newAssetPointer
            }
            catch (error) {
                console.error('Failed to fetch image asset', error)
            }
        }),
        ...executionOutputs.map(async (msg) => {
            try {
                const newImageUrl = await fetchImageFromPointer(msg.image_url)
                if (newImageUrl) msg.image_url = newImageUrl
            }
            catch (error) {
                console.error('Failed to fetch image asset', error)
            }
        }),
    ])
}
