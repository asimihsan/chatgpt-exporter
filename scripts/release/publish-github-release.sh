#!/usr/bin/env bash
# Copyright 2026 Asim Ihsan
# SPDX-License-Identifier: MPL-2.0

set -euo pipefail

tag_prefix="${TAG_PREFIX:-userscript-v}"
package_json_path="${PACKAGE_JSON_PATH:-package.json}"

version="$(
    node -e "const fs=require('node:fs');const p=JSON.parse(fs.readFileSync(process.argv[1], 'utf8'));if(typeof p.version==='string')process.stdout.write(p.version);" "${package_json_path}"
)"

if [[ ! "${version}" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    echo "Invalid package version: ${version:-<missing>}" >&2
    exit 1
fi

tag_name="${tag_prefix}${version}"
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
