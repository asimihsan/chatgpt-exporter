#!/usr/bin/env bash
# Copyright 2026 Asim Ihsan
# SPDX-License-Identifier: MPL-2.0

set -euo pipefail

tag_prefix="${TAG_PREFIX:-userscript-v}"
package_json_path="${PACKAGE_JSON_PATH:-package.json}"
tag_name="${USERSCRIPT_TAG_NAME:-${GITHUB_REF_NAME:-}}"

version="$(
    node -e "const fs=require('node:fs');const p=JSON.parse(fs.readFileSync(process.argv[1], 'utf8'));if(typeof p.version==='string')process.stdout.write(p.version);" "${package_json_path}"
)"

if [[ ! "${version}" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    echo "Invalid package version: ${version:-<missing>}" >&2
    exit 1
fi

if [[ -z "${tag_name}" ]]; then
    echo "USERSCRIPT_TAG_NAME or GITHUB_REF_NAME is required." >&2
    exit 1
fi

expected_tag_name="${tag_prefix}${version}"
if [[ "${tag_name}" != "${expected_tag_name}" ]]; then
    echo "Tag/version mismatch: workflow tag ${tag_name} does not match package.json version ${version}." >&2
    exit 1
fi

release_subject="chore: release v${version}"
head_subject="$(git log -1 --format=%s HEAD)"
if [[ "${head_subject}" != "${release_subject}" ]]; then
    echo "Tag commit mismatch: HEAD subject ${head_subject@Q} does not match expected ${release_subject@Q}." >&2
    exit 1
fi

release_title="userscript: v${version}"

if gh release view "${tag_name}" >/dev/null 2>&1; then
    echo "GitHub release ${tag_name} already exists; skipping."
    exit 0
fi

gh release create "${tag_name}" \
    --title "${release_title}" \
    --generate-notes \
    --latest

echo "Published GitHub release ${tag_name}."
