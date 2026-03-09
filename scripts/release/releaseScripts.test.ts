/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

import { execFileSync } from 'node:child_process'
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'

const prepareScriptPath = path.resolve(import.meta.dirname, 'prepare-userscript-release.mjs')
const assertScriptPath = path.resolve(import.meta.dirname, 'assert-dist-version.sh')
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

function createRepo(initialVersion = '2.29.3') {
    const dir = mkdtempSync(path.join(tmpdir(), 'chatgpt-exporter-release-'))
    tempDirs.push(dir)

    run('git init --initial-branch=master', dir)
    run('git config user.name "Codex"', dir)
    run('git config user.email "codex@example.com"', dir)

    writeFileSync(
        path.join(dir, 'package.json'),
        `${JSON.stringify({ name: 'release-test', version: initialVersion }, null, 2)}\n`,
    )
    run('git add package.json && git commit -m "base"', dir)

    return dir
}

function readPackageVersion(repoDir: string) {
    return run("node -p \"JSON.parse(require('node:fs').readFileSync('package.json','utf8')).version\"", repoDir)
}

afterEach(() => {
    for (const dir of tempDirs.splice(0)) {
        rmSync(dir, { recursive: true, force: true })
    }
})

describe('prepare-userscript-release', () => {
    it('keeps the current package version when no matching tag exists', () => {
        const repoDir = createRepo('2.29.3')

        const version = execFileSync('node', [prepareScriptPath], {
            cwd: repoDir,
            encoding: 'utf8',
        }).trim()

        expect(version).toBe('2.29.3')
        expect(readPackageVersion(repoDir)).toBe('2.29.3')
    })

    it('bumps beyond the highest existing userscript tag when package.json is behind', () => {
        const repoDir = createRepo('2.29.3')
        run('git tag userscript-v2.30.0 HEAD', repoDir)

        const version = execFileSync('node', [prepareScriptPath], {
            cwd: repoDir,
            encoding: 'utf8',
        }).trim()

        expect(version).toBe('2.30.1')
        expect(readPackageVersion(repoDir)).toBe('2.30.1')
    })

    it('bumps to the next patch when package.json matches the latest userscript tag', () => {
        const repoDir = createRepo('2.30.0')
        run('git tag userscript-v2.30.0 HEAD', repoDir)

        const version = execFileSync('node', [prepareScriptPath], {
            cwd: repoDir,
            encoding: 'utf8',
        }).trim()

        expect(version).toBe('2.30.1')
        expect(readPackageVersion(repoDir)).toBe('2.30.1')
    })

    it('preserves a package version that is already ahead of the latest userscript tag', () => {
        const repoDir = createRepo('2.31.0')
        run('git tag userscript-v2.30.5 HEAD', repoDir)

        const version = execFileSync('node', [prepareScriptPath], {
            cwd: repoDir,
            encoding: 'utf8',
        }).trim()

        expect(version).toBe('2.31.0')
        expect(readPackageVersion(repoDir)).toBe('2.31.0')
    })
})

describe('assert-dist-version', () => {
    it('accepts matching dist header versions', () => {
        const repoDir = createRepo('2.29.3')
        mkdirSync(path.join(repoDir, 'dist'))
        writeFileSync(path.join(repoDir, 'dist/chatgpt.meta.js'), '// @version            2.29.3\n')
        writeFileSync(path.join(repoDir, 'dist/chatgpt.user.js'), '// @version            2.29.3\n')

        const output = execFileSync('bash', [assertScriptPath], {
            cwd: repoDir,
            encoding: 'utf8',
        }).trim()

        expect(output).toContain('Verified dist headers use version 2.29.3.')
    })

    it('rejects mismatched dist header versions', () => {
        const repoDir = createRepo('2.29.3')
        mkdirSync(path.join(repoDir, 'dist'))
        writeFileSync(path.join(repoDir, 'dist/chatgpt.meta.js'), '// @version            2.29.4\n')
        writeFileSync(path.join(repoDir, 'dist/chatgpt.user.js'), '// @version            2.29.3\n')

        expect(() =>
            execFileSync('bash', [assertScriptPath], {
                cwd: repoDir,
                encoding: 'utf8',
                stdio: 'pipe',
            })
        ).toThrowError(/Version mismatch in dist\/chatgpt\.meta\.js: expected 2\.29\.3, found 2\.29\.4/)
    })
})
