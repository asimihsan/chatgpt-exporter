#!/usr/bin/env bash
# Copyright 2026 Asim Ihsan
# SPDX-License-Identifier: MPL-2.0

set -euo pipefail

repo_root="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "${repo_root}"

base_rev="${SPDX_BASE_REV:-master@upstream}"

if ! command -v jj >/dev/null 2>&1; then
    echo "Error: jj is required for SPDX classification." >&2
    exit 1
fi

mapfile -t target_files < <(
    rg --files \
        -g '*.ts' \
        -g '*.tsx' \
        -g '*.js' \
        -g '*.css' \
        -g '*.html' \
        -g '*.sh' \
        -g '*.yml' \
        -g '*.yaml' \
        -g '*.toml' \
        -g '!node_modules/**' \
        -g '!dist/**' \
        -g '!.git/**' \
        -g '!.jj/**' \
        -g '!LICENSE*' \
        | sort
)

if ((${#target_files[@]} == 0)); then
    echo "No target files found for SPDX header checks."
    exit 0
fi

declare -A added_files=()
declare -A modified_files=()

while read -r status path; do
    case "${status}" in
        A)
            added_files["${path}"]=1
            ;;
        M)
            modified_files["${path}"]=1
            ;;
    esac
done < <(jj diff --summary --from "${base_rev}" --to @ --no-pager)

failures=0

for file_path in "${target_files[@]}"; do
    actual="$(perl -ne 'if (/SPDX-License-Identifier:\s*([^\r\n]+)/) { print $1; exit }' "${file_path}")"

    if [[ -z "${actual}" ]]; then
        echo "Missing SPDX header: ${file_path}"
        failures=$((failures + 1))
        continue
    fi

    if [[ -v "added_files[$file_path]" ]]; then
        if [[ "${actual}" != "MPL-2.0" ]]; then
            echo "Incorrect SPDX header: ${file_path} (expected MPL-2.0, got ${actual})"
            failures=$((failures + 1))
        fi
        continue
    fi

    if [[ -v "modified_files[$file_path]" ]]; then
        if [[ "${actual}" != "MPL-2.0 AND MIT" && "${actual}" != "MIT" ]]; then
            echo "Incorrect SPDX header: ${file_path} (expected MPL-2.0 AND MIT or MIT, got ${actual})"
            failures=$((failures + 1))
        fi
        continue
    fi

    if [[ "${actual}" != "MIT" ]]; then
        echo "Incorrect SPDX header: ${file_path} (expected MIT, got ${actual})"
        failures=$((failures + 1))
    fi
done

if ((failures > 0)); then
    echo "SPDX check failed with ${failures} file(s) out of policy relative to ${base_rev}." >&2
    exit 1
fi

echo "SPDX headers verified against base revision: ${base_rev}"
