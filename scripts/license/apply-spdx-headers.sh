#!/usr/bin/env bash
# Copyright 2026 Asim Ihsan
# SPDX-License-Identifier: MPL-2.0

set -euo pipefail

repo_root="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "${repo_root}"

template_dir="${repo_root}/scripts/license/templates"

if ! command -v mise >/dev/null 2>&1; then
    echo "Error: mise is required to run addlicense." >&2
    exit 1
fi

mapfile -t target_files < <(
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
    echo "No target files found for SPDX header application."
    exit 0
fi

declare -a missing_header_files=()
updated_files=0

for file_path in "${target_files[@]}"; do
    if perl -ne 'if (/SPDX-License-Identifier:/) { $found = 1; last } END { exit($found ? 0 : 1) }' "${file_path}"; then
        perl -0pi -e 's/SPDX-License-Identifier:\s*[^\r\n]*/SPDX-License-Identifier: MPL-2.0/' "${file_path}"
        updated_files=$((updated_files + 1))
    else
        missing_header_files+=("${file_path}")
    fi
done

apply_missing_headers() {
    local template_path="$1"
    shift
    local -a files=("$@")

    if ((${#files[@]} == 0)); then
        return 0
    fi

    mise exec -- addlicense -f "${template_path}" "${files[@]}"
}

apply_missing_headers "${template_dir}/spdx-mpl.txt" "${missing_header_files[@]}"

echo "Applied MPL-2.0 SPDX policy."
echo "Updated existing headers: ${updated_files}"
echo "Added missing headers: ${#missing_header_files[@]}"
