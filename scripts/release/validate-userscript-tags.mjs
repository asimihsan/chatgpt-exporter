/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

import { execFileSync } from 'node:child_process'

const tagPrefix = process.env.TAG_PREFIX ?? 'userscript-v'

function runGit(args) {
    return execFileSync('git', args, {
        encoding: 'utf8',
    }).trim()
}

function readTags() {
    const output = runGit(['tag', '--list', `${tagPrefix}[0-9]*.[0-9]*.[0-9]*`, '--sort=v:refname'])
    if (!output) return []
    return output
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)
}

function readPackageVersion(revision) {
    const packageJson = runGit(['show', `${revision}:package.json`])
    const parsed = JSON.parse(packageJson)
    if (typeof parsed.version !== 'string') {
        throw new Error(`Missing package.json version at ${revision}`)
    }
    return parsed.version
}

function readCommitSubject(revision) {
    return runGit(['log', '-1', '--format=%s', revision])
}

function hasPath(revision, path) {
    try {
        execFileSync('git', ['cat-file', '-e', `${revision}:${path}`], {
            stdio: ['ignore', 'ignore', 'ignore'],
        })
        return true
    } catch {
        return false
    }
}

function readDistVersion(revision, path) {
    try {
        const content = runGit(['show', `${revision}:${path}`])
        const match = content.match(/^\/\/ @version\s+(.+)$/m)
        return match?.[1]?.trim() ?? null
    } catch {
        return null
    }
}

const tags = readTags()
const failures = []
let validatedTagCount = 0
for (const tagName of tags) {
    if (!hasPath(tagName, 'scripts/release/prepare-userscript-release.mjs')) {
        continue
    }

    validatedTagCount += 1
    const version = tagName.slice(tagPrefix.length)
    const expectedSubject = `chore: release v${version}`
    const commitSubject = readCommitSubject(tagName)
    if (commitSubject !== expectedSubject) {
        failures.push(`${tagName} points to commit subject "${commitSubject}" instead of "${expectedSubject}"`)
    }

    const packageVersion = readPackageVersion(tagName)
    if (packageVersion !== version) {
        failures.push(
            `${tagName} points to package.json version ${packageVersion} instead of ${version}`,
        )
    }

    for (const distPath of ['dist/chatgpt.meta.js', 'dist/chatgpt.user.js']) {
        const distVersion = readDistVersion(tagName, distPath)
        if (distVersion && distVersion !== version) {
            failures.push(`${tagName} embeds ${distVersion} in ${distPath} instead of ${version}`)
        }
    }
}

if (failures.length > 0) {
    for (const failure of failures) {
        console.error(failure)
    }
    process.exit(1)
}

process.stdout.write(`Validated ${validatedTagCount} ${tagPrefix} tags.\n`)
