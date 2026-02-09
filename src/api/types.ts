export type ModelSlug =
    | 'text-davinci-002-render-sha'
    | 'text-davinci-002-render-paid'
    | 'text-davinci-002-browse'
    | 'gpt-4'
    | 'gpt-4-browsing'
    | 'gpt-4o'

export interface Citation {
    start_ix: number
    end_ix: number
    citation_format_type: 'tether_og' & (string & {})
    metadata?: {
        extra?: {
            cited_message_idx: number
            evidence_text: string
        }
        text: string
        title: string
        type: 'webpage' & (string & {})
        url: string
    }
}

export interface ContentReference {
    type: 'grouped_webpages' | 'sources_footnote' | 'nav_list' | 'alt_text' & (string & {})
    /** The text that was matched in the content, e.g., "citeturn0search3" */
    matched_text?: string
    start_idx: number
    end_idx: number
    /** Pre-formatted markdown link, e.g., "([Title](url))" */
    alt?: string
    /** Array of actual reference items with URL and title */
    items?: Array<{
        title: string
        url: string
        attribution?: string
        /** Additional sources for multi-citations */
        supporting_websites?: Array<{
            title: string
            url: string
            attribution?: string
        }>
    }>
    // Legacy fields (may still be present in some responses)
    url?: string
    title?: string
}

interface CiteMetadata {
    citation_format: {
        name: 'tether_og' & (string & {})
    }
    metadata_list: Array<{
        title: string
        url: string
        text: string
    }>
}

interface MessageMeta {
    aggregate_result?: {
        code: string
        final_expression_output?: string
        end_time: number
        jupyter_messages: unknown[]
        messages: Array<{
            image_url: string
            message_type: 'image'
            sender: 'server'
            time: number
            width: number
            height: number
        }>
        run_id: string
        start_time: number
        status: 'success' | 'error' & (string & {})
        update_time: number
    }
    args?: unknown
    command?: 'click' | 'search' | 'quote' | 'quote_lines' | 'scroll' & (string & {})
    finish_details?: {
        // stop: string
        stop_tokens?: number[]
        type: 'stop' | 'interrupted' & (string & {})
    }
    is_complete?: boolean
    model_slug?: ModelSlug & (string & {})
    parent_id?: string
    timestamp_?: 'absolute' & (string & {})
    citations?: Citation[]
    _cite_metadata?: CiteMetadata
    /** New-style content references for web search citations */
    content_references?: ContentReference[]
    /** Whether this message is hidden in the UI (e.g., internal system prompts) */
    is_visually_hidden_from_conversation?: boolean
    /** Pro thinking headline, e.g. "Reasoning" */
    initial_text?: string
    /** Pro thinking completion label, e.g. "Reasoned for 33m 31s" */
    finished_text?: string
    /** Pro task type from async execution flow */
    async_task_type?: 'pro_mode' | (string & {})
    /** Duration of pro thinking in seconds */
    finished_duration_sec?: number
}

export type AuthorRole = 'system' | 'assistant' | 'user' | 'tool'

interface MultiModalInputImage {
    /**
     * hack: this come from the api in the form of `file-service://file-base64`, but we replace it
     * automatically in the api wrapper with a data uri
     */
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

interface MultiModalInputAudio {
    content_type: 'audio_asset_pointer'
    audio_asset_pointer: string
    expiry_datetime: string
    format: string
    metadata: {
        start_timestamp: number
        end_timestamp: number
        pretokenized_vq: null
    }
    size_bytes: number
}

interface MultiModalAudioVideoAssetPointer {
    content_type: 'real_time_user_audio_video_asset_pointer'
    expiry_datetime: string
    frames_asset_pointers: unknown[]
    video_container_asset_pointer: null
    audio_asset_pointer: {
        expiry_datetime: string
        content_type: 'audio_asset_pointer'
        asset_pointer: string
        size_bytes: number
        format: string
        metadata: {
            start_timestamp: null
            end_timestamp: null
            pretokenized_vq: null
            interruptions: null
            original_audio_source: null
            transcription: null
            word_transcription: null
            start: number
            end: number
        }
    }
    audio_start_timestamp: number
}

interface MultiModalAudioTranscription {
    content_type: 'audio_transcription'
    decoding_id: null
    direction: 'in' | 'out'
    text: string
}

export interface ConversationNodeMessage {
    author: {
        role: AuthorRole
        name?: 'browser' | 'python' | (string & {})
        metadata: unknown
    }
    content: {
        // chat response
        content_type: 'text'
        parts: string[]
    } | {
        // plugin response
        content_type: 'code'
        language: 'unknown' & (string & {})
        text: string
    } | {
        content_type: 'execution_output'
        text: string
    } | {
        content_type: 'user_editable_context'
        user_profile: string
        user_instructions: string
    } | {
        content_type: 'tether_quote'
        domain?: string
        text: string
        title: string
        url?: string
    } | {
        content_type: 'tether_browsing_code'
        // unknown
    } | {
        content_type: 'tether_browsing_display'
        result: string
        summary?: string
    } | {
        // multi-modal input
        content_type: 'multimodal_text'
        parts: Array<MultiModalAudioVideoAssetPointer | MultiModalAudioTranscription | MultiModalInputImage | MultiModalInputAudio | string>
    } | {
        content_type: 'model_editable_context'
        model_set_context: string
    } | {
        // Thinking/reasoning content from thinking models (hidden in UI)
        content_type: 'thoughts'
        thoughts: Array<{
            summary: string
            content: string
            chunks: string[]
            finished: boolean
        }>
    } | {
        // Reasoning recap showing "Thought for Xs" (hidden in UI)
        content_type: 'reasoning_recap'
        content: string
    }
    create_time?: number
    update_time?: number
    // end_turn: boolean
    id: string
    metadata?: MessageMeta
    recipient: 'all' | 'browser' | 'python' | 'dalle.text2im' & (string & {})
    status: string
    channel?: 'commentary' | 'final' | null | (string & {})
    end_turn?: boolean
    weight: number
}

export interface ConversationNode {
    children: string[]
    id: string
    message?: ConversationNodeMessage
    parent?: string
}

export interface ApiConversation {
    create_time: number
    conversation_id?: string
    current_node: string
    mapping: {
        [key: string]: ConversationNode
    }
    moderation_results: unknown[]
    title: string
    is_archived: boolean
    update_time: number
    safe_urls?: string[]
}

export type ApiConversationWithId = ApiConversation & {
    id: string
}

export interface ApiConversationItem {
    id: string
    title: string
    create_time: number
}

export interface ApiConversations {
    // what is this for?
    has_missing_conversations: boolean
    items: ApiConversationItem[]
    limit: number
    offset: number
    total: number | null
}

/// "Gizmos" are what OpenAI calls "projects" or other GPTs in the UI
export interface ApiGizmo {
    // weird nesting but ok
    gizmo: { gizmo: ApiProjectInfo }
    conversations: { itmes: ApiConversationItem[] }
}

export interface ApiProjectInfo {
    id: string
    organization_id: string
    display: { name: string; description: string }
    // todo: support exporting project context
}

export interface ConversationResult {
    id: string
    title: string
    modelSlug: string
    model: string
    createTime: number
    updateTime: number
    conversationNodes: ConversationNode[]
    projectName?: string
    projectId?: string
}
