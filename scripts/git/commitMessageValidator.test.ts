/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it } from 'vitest'
import { isValidCommitMessage } from './commitMessageValidator'

describe('commitMessageValidator', () => {
    it('accepts conventional commit messages with optional scopes and breaking changes', async () => {
        await expect(isValidCommitMessage('fix: handle shared conversations')).resolves.toBe(true)
        await expect(isValidCommitMessage('feat(api): add url builder')).resolves.toBe(true)
        await expect(isValidCommitMessage('refactor(http)!: replace urlcat helper')).resolves.toBe(true)
    })

    it('accepts merge, revert, fixup, and squash messages', async () => {
        await expect(isValidCommitMessage('Merge pull request #12 from main')).resolves.toBe(true)
        await expect(isValidCommitMessage('Revert "feat: add export dialog"')).resolves.toBe(true)
        await expect(isValidCommitMessage('fixup! feat: add export dialog')).resolves.toBe(true)
        await expect(isValidCommitMessage('squash! feat: add export dialog')).resolves.toBe(true)
    })

    it('ignores commented template lines like commitlint --edit does', async () => {
        const longComment = `# ${'x'.repeat(150)}`
        await expect(isValidCommitMessage(`fix: test\n\n${longComment}`)).resolves.toBe(true)
    })

    it('rejects invalid commit messages that commitlint would reject', async () => {
        await expect(isValidCommitMessage('just some text')).resolves.toBe(false)
        await expect(isValidCommitMessage('feat missing colon')).resolves.toBe(false)
        await expect(isValidCommitMessage('docs():')).resolves.toBe(false)
        await expect(isValidCommitMessage(' fix: leading whitespace')).resolves.toBe(false)
        await expect(isValidCommitMessage('fix: Capitalized subject.')).resolves.toBe(false)
        await expect(isValidCommitMessage(`fix: ${'x'.repeat(101)}`)).resolves.toBe(false)
    })
})
