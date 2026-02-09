#!/usr/bin/env bash
# Copyright 2026 Asim Ihsan
# SPDX-License-Identifier: MPL-2.0

set -euo pipefail

repo_root="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "${repo_root}"

base_rev="${SPDX_BASE_REV:-master@upstream}"
template_dir="${repo_root}/scripts/license/templates"

if ! command -v jj >/dev/null 2>&1; then
    echo "Error: jj is required for SPDX classification." >&2
    exit 1
fi

if ! command -v mise >/dev/null 2>&1; then
    echo "Error: mise is required to run addlicense." >&2
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
    echo "No target files found for SPDX header application."
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

declare -a mpl_files=()
declare -a mixed_files=()
declare -a mit_files=()

for file_path in "${target_files[@]}"; do
    if [[ -v "added_files[$file_path]" ]]; then
        mpl_files+=("${file_path}")
    elif [[ -v "modified_files[$file_path]" ]]; then
        mixed_files+=("${file_path}")
    else
        mit_files+=("${file_path}")
    fi
done

apply_group() {
    local template_path="$1"
    shift
    local -a files=("$@")

    if ((${#files[@]} == 0)); then
        return 0
    fi

    mise exec -- addlicense -f "${template_path}" "${files[@]}"
}

apply_group "${template_dir}/spdx-mpl.txt" "${mpl_files[@]}"
apply_group "${template_dir}/spdx-mpl-and-mit.txt" "${mixed_files[@]}"
apply_group "${template_dir}/spdx-mit-upstream.txt" "${mit_files[@]}"

echo "Applied SPDX headers using base revision: ${base_rev}"
echo "MPL-2.0 files: ${#mpl_files[@]}"
echo "MPL-2.0 AND MIT files: ${#mixed_files[@]}"
echo "MIT files: ${#mit_files[@]}"
