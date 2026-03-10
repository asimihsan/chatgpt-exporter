/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

import { execFileSync } from 'node:child_process'
import { chmodSync, mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'

const prepareScriptPath = path.resolve(import.meta.dirname, 'prepare-userscript-release.mjs')
const assertScriptPath = path.resolve(import.meta.dirname, 'assert-dist-version.sh')
const publishScriptPath = path.resolve(import.meta.dirname, 'publish-github-release.sh')
const validateScriptPath = path.resolve(import.meta.dirname, 'validate-userscript-tags.mjs')
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
    mkdirSync(path.join(dir, 'scripts', 'release'), { recursive: true })
    writeFileSync(
        path.join(dir, 'scripts', 'release', 'prepare-userscript-release.mjs'),
        'export {};\n',
    )
    run('git add package.json scripts/release/prepare-userscript-release.mjs && git commit -m "base"', dir)

    return dir
}

function createFakeGh(repoDir: string, releaseViewExitCode = 1) {
    const binDir = path.join(repoDir, 'bin')
    mkdirSync(binDir, { recursive: true })
    const logPath = path.join(repoDir, 'gh.log')
    const scriptPath = path.join(binDir, 'gh')
    writeFileSync(
        scriptPath,
        `#!/usr/bin/env bash
set -euo pipefail
printf '%s\\n' "$*" >> "${logPath}"
if [[ "$1" == "release" && "$2" == "view" ]]; then
  exit ${releaseViewExitCode}
fi
exit 0
`,
    )
    chmodSync(scriptPath, 0o755)
    return {
        logPath,
        path: `${binDir}:${process.env.PATH}`,
    }
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

describe('validate-userscript-tags', () => {
    it('accepts tags whose package and dist versions match the tag name', () => {
        const repoDir = createRepo('2.29.3')
        mkdirSync(path.join(repoDir, 'dist'))
        writeFileSync(path.join(repoDir, 'dist/chatgpt.meta.js'), '// @version            2.29.3\n')
        writeFileSync(path.join(repoDir, 'dist/chatgpt.user.js'), '// @version            2.29.3\n')
        run('git add dist package.json && git commit -m "chore: release v2.29.3"', repoDir)
        run('git tag userscript-v2.29.3 HEAD', repoDir)

        const output = execFileSync('node', [validateScriptPath], {
            cwd: repoDir,
            encoding: 'utf8',
        }).trim()

        expect(output).toBe('Validated 1 userscript-v tags.')
    })

    it('rejects tags whose package version does not match the tag name', () => {
        const repoDir = createRepo('2.29.3')
        run('git tag userscript-v2.29.4 HEAD', repoDir)

        expect(() =>
            execFileSync('node', [validateScriptPath], {
                cwd: repoDir,
                encoding: 'utf8',
                stdio: 'pipe',
            })
        ).toThrowError(/userscript-v2\.29\.4 points to package\.json version 2\.29\.3 instead of 2\.29\.4/)
    })

    it('rejects tags whose commit subject is not the release commit message', () => {
        const repoDir = createRepo('2.29.3')
        mkdirSync(path.join(repoDir, 'dist'))
        writeFileSync(path.join(repoDir, 'dist/chatgpt.meta.js'), '// @version            2.29.3\n')
        writeFileSync(path.join(repoDir, 'dist/chatgpt.user.js'), '// @version            2.29.3\n')
        run('git add dist package.json && git commit -m "not a release"', repoDir)
        run('git tag userscript-v2.29.3 HEAD', repoDir)

        expect(() =>
            execFileSync('node', [validateScriptPath], {
                cwd: repoDir,
                encoding: 'utf8',
                stdio: 'pipe',
            })
        ).toThrowError(/userscript-v2\.29\.3 points to commit subject "not a release" instead of "chore: release v2\.29\.3"/)
    })

    it('ignores historical tags outside the current release workflow era', () => {
        const repoDir = createRepo('2.29.3')
        run('git rm scripts/release/prepare-userscript-release.mjs && git commit -m "historical"', repoDir)
        run('git tag userscript-v2.29.4 HEAD', repoDir)

        const output = execFileSync('node', [validateScriptPath], {
            cwd: repoDir,
            encoding: 'utf8',
        }).trim()

        expect(output).toBe('Validated 0 userscript-v tags.')
    })
})

describe('publish-github-release', () => {
    it('publishes the pushed tag when it matches package.json', () => {
        const repoDir = createRepo('2.29.3')
        const fakeGh = createFakeGh(repoDir)
        run('git commit --allow-empty -m "chore: release v2.29.3"', repoDir)

        const output = execFileSync('bash', [publishScriptPath], {
            cwd: repoDir,
            encoding: 'utf8',
            env: {
                ...process.env,
                PATH: fakeGh.path,
                USERSCRIPT_TAG_NAME: 'userscript-v2.29.3',
            },
        }).trim()

        expect(output).toContain('Published GitHub release userscript-v2.29.3.')
        expect(run(`cat "${fakeGh.logPath}"`, repoDir)).toContain(
            'release create userscript-v2.29.3 --title userscript: v2.29.3 --generate-notes --latest',
        )
    })

    it('rejects mismatched workflow tag names', () => {
        const repoDir = createRepo('2.29.3')
        const fakeGh = createFakeGh(repoDir)
        run('git commit --allow-empty -m "chore: release v2.29.3"', repoDir)

        expect(() =>
            execFileSync('bash', [publishScriptPath], {
                cwd: repoDir,
                encoding: 'utf8',
                env: {
                    ...process.env,
                    PATH: fakeGh.path,
                    USERSCRIPT_TAG_NAME: 'userscript-v2.29.4',
                },
                stdio: 'pipe',
            })
        ).toThrowError(/Tag\/version mismatch: workflow tag userscript-v2\.29\.4 does not match package\.json version 2\.29\.3\./)
    })

    it('rejects non-release tag commits even when the version matches', () => {
        const repoDir = createRepo('2.29.3')
        const fakeGh = createFakeGh(repoDir)

        expect(() =>
            execFileSync('bash', [publishScriptPath], {
                cwd: repoDir,
                encoding: 'utf8',
                env: {
                    ...process.env,
                    PATH: fakeGh.path,
                    USERSCRIPT_TAG_NAME: 'userscript-v2.29.3',
                },
                stdio: 'pipe',
            })
        ).toThrowError(/Tag commit mismatch: HEAD subject ['"]base['"] does not match expected ['"]chore: release v2\.29\.3['"]\./)
    })
})
