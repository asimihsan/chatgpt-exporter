#!/usr/bin/env node
/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'

const packageJsonPath = process.env.PACKAGE_JSON_PATH ?? 'package.json'
const tagPrefix = process.env.TAG_PREFIX ?? 'userscript-v'

function parseVersion(value) {
    const match = /^(?<major>\d+)\.(?<minor>\d+)\.(?<patch>\d+)$/.exec(value)
    if (!match?.groups) {
        throw new Error(`Invalid semantic version: ${value}`)
    }
    return {
        major: Number(match.groups.major),
        minor: Number(match.groups.minor),
        patch: Number(match.groups.patch),
    }
}

function compareVersions(left, right) {
    if (left.major !== right.major) return Math.sign(left.major - right.major)
    if (left.minor !== right.minor) return Math.sign(left.minor - right.minor)
    if (left.patch !== right.patch) return Math.sign(left.patch - right.patch)
    return 0
}

function formatVersion(version) {
    return `${version.major}.${version.minor}.${version.patch}`
}

function readLatestTaggedVersion() {
    const output = execFileSync(
        'git',
        ['tag', '--list', `${tagPrefix}[0-9]*.[0-9]*.[0-9]*`, '--sort=-v:refname'],
        { encoding: 'utf8' },
    ).trim()

    const latestTag = output.split('\n')[0]?.trim()
    if (!latestTag) return null
    return {
        tag: latestTag,
        version: parseVersion(latestTag.slice(tagPrefix.length)),
    }
}

const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'))
if (typeof packageJson.version !== 'string') {
    throw new Error(`Missing package.json version in ${packageJsonPath}`)
}

const packageVersion = parseVersion(packageJson.version)
const latestTagged = readLatestTaggedVersion()

let releaseVersion = packageVersion
if (latestTagged) {
    const comparison = compareVersions(packageVersion, latestTagged.version)
    if (comparison <= 0) {
        releaseVersion = {
            major: latestTagged.version.major,
            minor: latestTagged.version.minor,
            patch: latestTagged.version.patch + 1,
        }
    }
}

const nextVersion = formatVersion(releaseVersion)
if (packageJson.version !== nextVersion) {
    packageJson.version = nextVersion
    writeFileSync(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`)
}

process.stdout.write(nextVersion)
