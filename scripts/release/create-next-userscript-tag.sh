#!/usr/bin/env bash
# Copyright 2026 Asim Ihsan
# SPDX-License-Identifier: MPL-2.0

set -euo pipefail

tag_prefix="${TAG_PREFIX:-userscript-v}"
tag_remote="${TAG_REMOTE:-origin}"
dry_run="${DRY_RUN:-0}"
max_attempts="${MAX_ATTEMPTS:-5}"
package_json_path="${PACKAGE_JSON_PATH:-package.json}"
fallback_base_version="${FALLBACK_BASE_VERSION:-}"

tag_refspec="refs/tags/${tag_prefix}*:refs/tags/${tag_prefix}*"
git fetch "${tag_remote}" "${tag_refspec}" >/dev/null 2>&1 || true

head_commit="$(git rev-parse HEAD)"
existing_tag="$(git tag --points-at "${head_commit}" --list "${tag_prefix}[0-9]*.[0-9]*.[0-9]*" | head -n 1 || true)"
if [[ -n "${existing_tag}" ]]; then
    echo "Commit ${head_commit} already has tag ${existing_tag}; skipping."
    exit 0
fi

attempt=0
while (( attempt < max_attempts )); do
    attempt=$((attempt + 1))

    latest_tag="$(git tag --list "${tag_prefix}[0-9]*.[0-9]*.[0-9]*" --sort=-v:refname | head -n 1)"
    if [[ -z "${latest_tag}" ]]; then
        if [[ -z "${fallback_base_version}" && -f "${package_json_path}" ]]; then
            fallback_base_version="$(
                node -e "const fs=require('node:fs');const p=JSON.parse(fs.readFileSync(process.argv[1], 'utf8'));if(typeof p.version==='string')process.stdout.write(p.version);" "${package_json_path}" 2>/dev/null || true
            )"
        fi
        if [[ "${fallback_base_version}" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
            latest_tag="${tag_prefix}${fallback_base_version}"
            echo "No ${tag_prefix} tags found on ${tag_remote}; using package version baseline ${fallback_base_version}."
        else
            latest_tag="${tag_prefix}0.0.0"
            echo "No ${tag_prefix} tags found on ${tag_remote}; defaulting baseline to 0.0.0."
        fi
    fi

    latest_version="${latest_tag#"${tag_prefix}"}"
    IFS='.' read -r major minor patch <<< "${latest_version}"

    if [[ ! "${major}" =~ ^[0-9]+$ || ! "${minor}" =~ ^[0-9]+$ || ! "${patch}" =~ ^[0-9]+$ ]]; then
        echo "Failed to parse semantic version from tag: ${latest_tag}" >&2
        exit 1
    fi

    next_patch=$((patch + 1))
    candidate_tag="${tag_prefix}${major}.${minor}.${next_patch}"
    while git rev-parse --verify --quiet "refs/tags/${candidate_tag}" >/dev/null; do
        next_patch=$((next_patch + 1))
        candidate_tag="${tag_prefix}${major}.${minor}.${next_patch}"
    done

    echo "Attempt ${attempt}: candidate tag ${candidate_tag}"

    if [[ "${dry_run}" == "1" ]]; then
        echo "[dry-run] Would create and push tag ${candidate_tag} on ${head_commit}"
        exit 0
    fi

    git tag "${candidate_tag}" "${head_commit}"
    if git push "${tag_remote}" "refs/tags/${candidate_tag}"; then
        echo "Created and pushed tag: ${candidate_tag}"
        exit 0
    fi

    # Likely a race with another writer. Drop local tag, refresh, and retry.
    git tag --delete "${candidate_tag}" >/dev/null 2>&1 || true
    git fetch "${tag_remote}" "${tag_refspec}" >/dev/null 2>&1 || true
done

echo "Failed to create and push tag after ${max_attempts} attempts." >&2
exit 1
