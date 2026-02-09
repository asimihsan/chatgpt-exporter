#!/usr/bin/env bash
# Copyright 2026 Asim Ihsan
# SPDX-License-Identifier: MPL-2.0

set -euo pipefail

# Populated by collect_spdx_change_summary.
SPDX_CLASSIFICATION_BASE_LABEL=""
SPDX_CHANGE_SUMMARY=""

# Outputs a change summary with one line per file in the format:
#   A path/to/file
#   M path/to/file
# Prefers jj classification when available and usable, otherwise falls back
# to git diff classification.
#
# Side effects:
# - sets SPDX_CLASSIFICATION_BASE_LABEL for user-facing messages.
# - sets SPDX_CHANGE_SUMMARY to newline-delimited A/M classification records.
collect_spdx_change_summary() {
    local jj_base_rev="$1"
    local requested_git_base_ref="$2"
    local summary=""

    if command -v jj >/dev/null 2>&1 && jj root --ignore-working-copy --quiet --no-pager >/dev/null 2>&1; then
        if summary="$(jj diff --summary --from "${jj_base_rev}" --to @ --no-pager 2>/dev/null)"; then
            SPDX_CLASSIFICATION_BASE_LABEL="${jj_base_rev}"
            SPDX_CHANGE_SUMMARY="${summary}"
            return 0
        fi
        echo "Warning: jj diff failed for base '${jj_base_rev}', falling back to git diff classification." >&2
    fi

    if ! command -v git >/dev/null 2>&1; then
        echo "Error: neither a usable jj repo nor git was found for SPDX classification." >&2
        return 1
    fi

    local git_base_ref
    if ! git_base_ref="$(resolve_spdx_git_base_ref "${requested_git_base_ref}")"; then
        echo "Error: unable to determine a git base ref for SPDX classification." >&2
        echo "Hint: set SPDX_GIT_BASE_REF (for example: origin/master)." >&2
        return 1
    fi

    if ! git rev-parse --verify "${git_base_ref}^{commit}" >/dev/null 2>&1; then
        echo "Error: git base ref '${git_base_ref}' does not resolve to a commit." >&2
        echo "Hint: set SPDX_GIT_BASE_REF to an existing ref (for example: origin/master)." >&2
        return 1
    fi

    SPDX_CLASSIFICATION_BASE_LABEL="${git_base_ref}...HEAD"
    declare -A merged_changes=()

    merge_change_lines() {
        local lines="$1"
        if [[ -z "${lines}" ]]; then
            return 0
        fi

        while read -r status file_path; do
            [[ -z "${status}" || -z "${file_path}" ]] && continue
            if [[ "${status}" != "A" && "${status}" != "M" ]]; then
                continue
            fi

            local current_status="${merged_changes["${file_path}"]:-}"
            if [[ "${status}" == "A" || -z "${current_status}" ]]; then
                merged_changes["${file_path}"]="${status}"
            fi
        done <<< "${lines}"
    }

    merge_change_lines "$(git diff --name-status --diff-filter=AM "${git_base_ref}...HEAD")"
    merge_change_lines "$(git diff --name-status --diff-filter=AM)"
    merge_change_lines "$(git diff --name-status --diff-filter=AM --cached)"

    local untracked_files
    untracked_files="$(git ls-files --others --exclude-standard)"
    if [[ -n "${untracked_files}" ]]; then
        while IFS= read -r file_path; do
            [[ -z "${file_path}" ]] && continue
            merged_changes["${file_path}"]="A"
        done <<< "${untracked_files}"
    fi

    summary=""
    if ((${#merged_changes[@]} > 0)); then
        while IFS= read -r file_path; do
            [[ -z "${file_path}" ]] && continue
            summary+="${merged_changes["${file_path}"]} ${file_path}"$'\n'
        done < <(printf '%s\n' "${!merged_changes[@]}" | sort)

        summary="${summary%$'\n'}"
    fi

    SPDX_CHANGE_SUMMARY="${summary}"
    return 0
}

resolve_spdx_git_base_ref() {
    local requested_git_base_ref="$1"

    if [[ -n "${requested_git_base_ref}" ]]; then
        printf '%s\n' "${requested_git_base_ref}"
        return 0
    fi

    local github_base_ref="${GITHUB_BASE_REF:-}"
    if [[ -n "${github_base_ref}" ]]; then
        printf 'origin/%s\n' "${github_base_ref}"
        return 0
    fi

    local candidate
    for candidate in origin/master origin/main master main; do
        if git rev-parse --verify "${candidate}^{commit}" >/dev/null 2>&1; then
            printf '%s\n' "${candidate}"
            return 0
        fi
    done

    local remote_head
    remote_head="$(git symbolic-ref --quiet refs/remotes/origin/HEAD 2>/dev/null || true)"
    if [[ -n "${remote_head}" ]]; then
        printf '%s\n' "${remote_head#refs/remotes/}"
        return 0
    fi

    return 1
}
