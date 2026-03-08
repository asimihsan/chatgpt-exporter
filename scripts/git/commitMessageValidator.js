/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

import { execFileSync } from 'node:child_process'
import lint from '@commitlint/lint'
import config from '@commitlint/config-conventional'
import conventionalCommits from 'conventional-changelog-conventionalcommits'

export const COMMIT_MESSAGE_HINT = 'Expected a commit message that passes @commitlint/config-conventional.'

function getCommentChar() {
    try {
        const configured = execFileSync('git', ['config', 'core.commentChar'], {
            encoding: 'utf8',
            stdio: ['ignore', 'pipe', 'ignore'],
        }).trim()

        return configured || '#'
    }
    catch {
        return '#'
    }
}

const parserOptsPromise = Promise.resolve(conventionalCommits()).then(preset => ({
    ...preset.parser,
    commentChar: getCommentChar(),
}))
const rules = config.rules

export async function validateCommitMessage(message) {
    const parserOpts = await parserOptsPromise
    return lint(message, rules, {
        defaultIgnores: true,
        parserOpts,
    })
}

export async function isValidCommitMessage(message) {
    const result = await validateCommitMessage(message)
    return result.valid
}
