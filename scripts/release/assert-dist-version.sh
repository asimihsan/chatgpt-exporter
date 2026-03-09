#!/usr/bin/env bash
# Copyright 2026 Asim Ihsan
# SPDX-License-Identifier: MPL-2.0

set -euo pipefail

package_json_path="${PACKAGE_JSON_PATH:-package.json}"
meta_path="${META_PATH:-dist/chatgpt.meta.js}"
user_path="${USER_PATH:-dist/chatgpt.user.js}"

expected_version="$(
    node -e "const fs=require('node:fs');const p=JSON.parse(fs.readFileSync(process.argv[1], 'utf8'));if(typeof p.version==='string')process.stdout.write(p.version);" "${package_json_path}"
)"

if [[ -z "${expected_version}" ]]; then
    echo "Unable to read version from ${package_json_path}" >&2
    exit 1
fi

assert_header_version() {
    local file_path="$1"
    local actual_version

    actual_version="$(
        sed -nE 's|^// @version[[:space:]]+(.+)$|\1|p' "${file_path}" | head -n 1
    )"

    if [[ "${actual_version}" != "${expected_version}" ]]; then
        echo "Version mismatch in ${file_path}: expected ${expected_version}, found ${actual_version:-<missing>}" >&2
        exit 1
    fi
}

assert_header_version "${meta_path}"
assert_header_version "${user_path}"

echo "Verified dist headers use version ${expected_version}."
