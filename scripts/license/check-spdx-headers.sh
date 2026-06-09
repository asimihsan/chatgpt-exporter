#!/usr/bin/env bash
# Copyright 2026 Asim Ihsan
# SPDX-License-Identifier: MPL-2.0

set -euo pipefail

repo_root="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "${repo_root}"

# Use a portable read loop rather than `mapfile`, which is a bash >= 4 builtin
# and is unavailable on the bash 3.2 shipped with macOS.
target_files=()
while IFS= read -r target_file; do
    target_files+=("${target_file}")
done < <(
    rg --files \
        --hidden \
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

failures=0

for file_path in "${target_files[@]}"; do
    actual="$(perl -ne 'if (/SPDX-License-Identifier:\s*([^\r\n]+)/) { print $1; exit }' "${file_path}")"

    if [[ -z "${actual}" ]]; then
        echo "Missing SPDX header: ${file_path}"
        failures=$((failures + 1))
        continue
    fi

    if [[ "${actual}" != "MPL-2.0" ]]; then
        echo "Incorrect SPDX header: ${file_path} (expected MPL-2.0, got ${actual})"
        failures=$((failures + 1))
    fi
done

if ((failures > 0)); then
    echo "SPDX check failed with ${failures} file(s) out of policy." >&2
    exit 1
fi

echo "SPDX headers verified: MPL-2.0"
