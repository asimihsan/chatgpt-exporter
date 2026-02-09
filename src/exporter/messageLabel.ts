import { isAnalysisCodeMessage, isAnalysisExecutionOutput, isThinkingMessage } from './messageClassifier'
import type { ConversationNodeMessage } from '../api'

export function getExportAuthorLabel(message: ConversationNodeMessage): string {
    if (isThinkingMessage(message)) {
        return 'ChatGPT (Thinking)'
    }

    if (isAnalysisCodeMessage(message)) {
        return 'ChatGPT (Analysis)'
    }

    if (isAnalysisExecutionOutput(message)) {
        if (message.author.name === 'python') {
            return 'Python (Analysis)'
        }
        return `Plugin${message.author.name ? ` (${message.author.name})` : ''} (Analysis)`
    }

    switch (message.author.role) {
        case 'assistant':
            return 'ChatGPT'
        case 'user':
            return 'You'
        case 'tool':
            return `Plugin${message.author.name ? ` (${message.author.name})` : ''}`
        default:
            return message.author.role
    }
}
