/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

/**
 * Test fixture shaped like a live ChatGPT conversation that uses an app/connector
 * (an MCP "Forgejo" app) plus memory search and Pro reasoning. Structural fields
 * mirror the real API payload; all content is synthetic.
 */

import type { ConversationNodeMessage, ConversationResult } from '../api'

const TURN_ID = 'turn-1'
const FORGEJO_LINK = '/Forgejo/link_0123456789abcdef'
const FORGEJO_RESOURCE_BASE = '/asdk_app_0123456789abcdef/link_0123456789abcdef'

function base(id: string, overrides: Partial<ConversationNodeMessage>): ConversationNodeMessage {
    return {
        id,
        author: { role: 'assistant', metadata: {} },
        content: { content_type: 'text', parts: [''] },
        recipient: 'all',
        status: 'finished_successfully',
        weight: 1,
        metadata: { turn_id: TURN_ID } as ConversationNodeMessage['metadata'],
        ...overrides,
    }
}

export function fixtureUserTurn(): ConversationNodeMessage {
    return base('user-1', {
        author: { role: 'user', metadata: {} },
        content: { content_type: 'text', parts: ['Analyze the role for me, use @Forgejo as needed.'] },
    })
}

export function fixturePreamble(): ConversationNodeMessage {
    return base('preamble-1', {
        channel: 'commentary',
        content: { content_type: 'text', parts: ['I’ll assess the role’s fit using your repository history.'] },
        metadata: { is_thinking_preamble_message: true, hide_inline_actions: true } as ConversationNodeMessage['metadata'],
    })
}

export function fixtureMemoryQuery(): ConversationNodeMessage {
    return base('memory-1', {
        recipient: 'q7dr546',
        content: { content_type: 'code', language: 'json', text: '{"query":"prior career constraints and backend stack"}' },
    })
}

export function fixtureListResourcesCall(): ConversationNodeMessage {
    return base('list-1', {
        recipient: 'api_tool.list_resources',
        channel: 'commentary',
        content: { content_type: 'code', language: 'json', text: '{"paths":["Forgejo"]}' },
    })
}

export function fixtureCallToolCall(id = 'call-1', tool = 'find_files', args: Record<string, unknown> = { owner: 'someone', name: 'repo', contains: 'role' }): ConversationNodeMessage {
    return base(id, {
        recipient: 'api_tool.call_tool',
        channel: 'commentary',
        content: {
            content_type: 'code',
            language: 'python3',
            text: JSON.stringify({ path: `${FORGEJO_LINK}/${tool}`, args }),
        },
    })
}

function forgejoResultMetadata(tool: string): ConversationNodeMessage['metadata'] {
    return {
        turn_id: TURN_ID,
        invoked_plugin: {},
        invoked_resource: {
            resource_uri: `${FORGEJO_RESOURCE_BASE}/${tool}`,
            publish_status: 'private',
            app_name: 'Forgejo',
        },
        citation_metadata: { id: 'cite-1', title: 'main', url: 'main' },
    } as ConversationNodeMessage['metadata']
}

export function fixturePopulatedResult(id = 'result-1', tool = 'find_files', payload = '{"call_id":"fmcp-1","files":[{"kind":"file","path":"README.md","size":12}]}'): ConversationNodeMessage {
    return base(id, {
        author: { role: 'tool', name: 'api_tool.call_tool', metadata: {} },
        channel: 'commentary',
        metadata: forgejoResultMetadata(tool),
        content: {
            content_type: 'multimodal_text',
            parts: [
                'Resource uri: /response/turn0\nShowing 1 of 1 lines.',
                'Citation Marker: fileciteturn0file0\n',
                `[L1] ${payload}`,
            ],
        },
    })
}

export function fixtureTruncatedResult(id = 'result-2'): ConversationNodeMessage {
    return base(id, {
        author: { role: 'tool', name: 'api_tool.call_tool', metadata: {} },
        channel: 'commentary',
        metadata: forgejoResultMetadata('find_files'),
        content: {
            content_type: 'multimodal_text',
            parts: [
                'Resource uri: /response/turn2\nShowing 1 of 1 lines.\nResponse output was truncated at a line boundary to fit the tool response budget.',
                'Citation Marker: fileciteturn2file0\n',
                '[L1] {"advice":"showing the first 500 matches, so narrow the filter","capped":true}',
            ],
        },
    })
}

export function fixtureEmptyCodeResult(id = 'result-empty-code'): ConversationNodeMessage {
    return base(id, {
        author: { role: 'tool', name: 'api_tool.call_tool', metadata: {} },
        channel: 'commentary',
        metadata: forgejoResultMetadata('get_file'),
        content: { content_type: 'code', language: 'json', text: '' },
    })
}

export function fixtureEmptyTextResult(id = 'result-empty-text'): ConversationNodeMessage {
    return base(id, {
        author: { role: 'tool', name: 'api_tool', metadata: {} },
        channel: 'commentary',
        content: { content_type: 'text', parts: [''] },
    })
}

export function fixtureThoughts(): ConversationNodeMessage {
    return base('thoughts-1', {
        content: {
            content_type: 'thoughts',
            thoughts: [{ summary: 'Reviewed role fit', content: '', chunks: [], finished: true }],
        } as ConversationNodeMessage['content'],
    })
}

export function fixtureReasoningRecap(): ConversationNodeMessage {
    return base('recap-1', {
        content: { content_type: 'reasoning_recap', content: 'Worked for 13m 58s' } as ConversationNodeMessage['content'],
    })
}

export function fixtureProThinkingPlaceholder(id = 'pro-1', parts: string[] = ['']): ConversationNodeMessage {
    return base(id, {
        author: { role: 'tool', name: 'a8km123', metadata: {} },
        metadata: { initial_text: 'Reasoning', finished_text: 'Worked for 13m 58s', finished_duration_sec: 838 } as ConversationNodeMessage['metadata'],
        content: { content_type: 'text', parts },
    })
}

export function fixtureFinalAnswer(): ConversationNodeMessage {
    return base('final-1', {
        channel: 'final',
        content: { content_type: 'text', parts: ['## My recommendation\n\nYes, apply.'] },
        metadata: { finish_details: { type: 'stop', stop_tokens: [200002] }, is_complete: true } as ConversationNodeMessage['metadata'],
    })
}

/** Active-branch order as observed live: user, preamble, memory, list, calls/results, recap, final. */
export function fixtureToolActivityMessages(): ConversationNodeMessage[] {
    return [
        fixtureUserTurn(),
        fixturePreamble(),
        fixtureMemoryQuery(),
        fixtureThoughts(),
        fixtureListResourcesCall(),
        fixtureCallToolCall('call-1', 'find_files'),
        fixturePopulatedResult('result-1', 'find_files'),
        fixtureCallToolCall('call-2', 'get_file', { path: 'README.md', start_line: 1, end_line: 40 }),
        fixtureEmptyCodeResult(),
        fixtureCallToolCall('call-3', 'find_files', { contains: 'x' }),
        fixtureTruncatedResult(),
        fixtureEmptyTextResult(),
        fixtureProThinkingPlaceholder(),
        fixtureReasoningRecap(),
        fixtureFinalAnswer(),
    ]
}

export function fixtureToolActivityConversation(messages = fixtureToolActivityMessages()): ConversationResult {
    return {
        id: 'conversation-tool-activity',
        title: 'Tool Activity Fixture',
        model: 'gpt-6-pro',
        modelSlug: 'gpt-6-pro',
        createTime: 0,
        updateTime: 0,
        conversationNodes: messages.map((message, index) => ({
            id: `node-${index}`,
            children: [],
            message,
        })),
    }
}
