import { blobToDataURL } from '../utils/dom'
import { fetchApi, getFileDownloadApiUrl } from './http'
import type { ApiConversation } from './types'

type ApiFileDownload = {
    status: 'success'
    /** signed download url */
    download_url: string
    metadata: {}
    file_name: string
    /** iso8601 datetime string */
    creation_time: string
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

async function fetchImageFromPointer(uri: string) {
    const pointer = uri.replace('file-service://', '')
    const imageDetails = await fetchApi<ApiFileDownload>(getFileDownloadApiUrl(pointer))
    if (imageDetails.status === 'error') {
        console.error('Failed to fetch image asset', imageDetails.error_code, imageDetails.error_message)
        return null
    }

    const image = await fetch(imageDetails.download_url)
    const blob = await image.blob()
    const base64 = await blobToDataURL(blob)
    return base64.replace(/^data:.*?;/, `data:${image.headers.get('content-type')};`)
}

/** replaces `file-service://` pointers with data uris containing the image */
/** avoid errors in parsing multimodal parts we don't understand */
export async function replaceImageAssets(conversation: ApiConversation): Promise<void> {
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
