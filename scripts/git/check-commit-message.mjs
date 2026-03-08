#!/usr/bin/env node
/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

import { readFileSync } from 'node:fs'
import { COMMIT_MESSAGE_HINT, isValidCommitMessage } from './commitMessageValidator.js'

const [, , commitMessagePath] = process.argv

if (!commitMessagePath) {
    console.error('Usage: check-commit-message.mjs <commit-message-file>')
    process.exit(1)
}

const message = readFileSync(commitMessagePath, 'utf8')
if (await isValidCommitMessage(message)) {
    process.exit(0)
}

console.error(
    `Invalid commit message: "${message}"\n`
    + COMMIT_MESSAGE_HINT,
)
process.exit(1)
