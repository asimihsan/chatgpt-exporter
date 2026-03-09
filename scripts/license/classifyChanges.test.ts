/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { execFileSync } from 'node:child_process'
import path from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'

const scriptPath = path.resolve(import.meta.dirname, 'classify-changes.sh')
const tempDirs: string[] = []

function run(command: string, cwd: string, env: NodeJS.ProcessEnv = {}) {
    return execFileSync('bash', ['-lc', command], {
        cwd,
        encoding: 'utf8',
        env: {
            ...process.env,
            ...env,
        },
    }).trim()
}

function createRepo() {
    const dir = mkdtempSync(path.join(tmpdir(), 'chatgpt-exporter-spdx-'))
    tempDirs.push(dir)

    run('git init --initial-branch=master', dir)
    run('git config user.name "Codex"', dir)
    run('git config user.email "codex@example.com"', dir)

    writeFileSync(path.join(dir, 'README.md'), 'base\n')
    run('git add README.md && git commit -m "base"', dir)

    return dir
}

afterEach(() => {
    for (const dir of tempDirs.splice(0)) {
        rmSync(dir, { recursive: true, force: true })
    }
})

describe('resolve_spdx_git_base_ref', () => {
    it('prefers upstream/master over origin/master in git fallback mode', () => {
        const repoDir = createRepo()

        run('git update-ref refs/remotes/origin/master HEAD', repoDir)
        run('git update-ref refs/remotes/upstream/master HEAD', repoDir)

        const baseRef = run(`source "${scriptPath}"; resolve_spdx_git_base_ref ""`, repoDir)
        expect(baseRef).toBe('upstream/master')
    })

    it('prefers the upstream PR base branch when GITHUB_BASE_REF is set', () => {
        const repoDir = createRepo()

        run('git update-ref refs/remotes/origin/master HEAD', repoDir)
        run('git update-ref refs/remotes/origin/release HEAD~0', repoDir)
        run('git update-ref refs/remotes/upstream/release HEAD~0', repoDir)

        const baseRef = run(`source "${scriptPath}"; resolve_spdx_git_base_ref ""`, repoDir, {
            GITHUB_BASE_REF: 'release',
        })

        expect(baseRef).toBe('upstream/release')
    })

    it('falls back to the origin PR base branch when no upstream PR ref exists', () => {
        const repoDir = createRepo()

        run('git update-ref refs/remotes/origin/release HEAD', repoDir)

        const baseRef = run(`source "${scriptPath}"; resolve_spdx_git_base_ref ""`, repoDir, {
            GITHUB_BASE_REF: 'release',
        })

        expect(baseRef).toBe('origin/release')
    })

    it('falls back to origin/master when no upstream ref exists', () => {
        const repoDir = createRepo()

        run('git update-ref refs/remotes/origin/master HEAD', repoDir)

        const baseRef = run(`source "${scriptPath}"; resolve_spdx_git_base_ref ""`, repoDir)
        expect(baseRef).toBe('origin/master')
    })
})
