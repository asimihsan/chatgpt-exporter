import { stripUiTokens } from './shared'
import type { ConversationNodeMessage } from '../api'

type ExecutionOutputContent = Extract<ConversationNodeMessage['content'], { content_type: 'execution_output' }>

type ExecutionOutputImage = {
    image_url: string
    height: number
    width: number
}

function isExecutionOutputImage(value: unknown): value is ExecutionOutputImage {
    if (typeof value !== 'object' || value === null) return false

    const maybeImage = value as Partial<ExecutionOutputImage> & { message_type?: unknown }

    return maybeImage.message_type === 'image'
        && typeof maybeImage.image_url === 'string'
        && typeof maybeImage.height === 'number'
        && typeof maybeImage.width === 'number'
}

export function getExecutionOutputImages(metadata: ConversationNodeMessage['metadata']): ExecutionOutputImage[] {
    const messages = metadata?.aggregate_result?.messages
    if (!Array.isArray(messages)) return []

    return messages.filter(isExecutionOutputImage)
}

export function getExecutionOutputText(content: ExecutionOutputContent): string {
    return stripUiTokens(content.text || '')
}
