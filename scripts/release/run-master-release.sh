#!/usr/bin/env bash
# Copyright 2026 Asim Ihsan
# SPDX-License-Identifier: MPL-2.0

set -euo pipefail

event_sha="${EVENT_SHA:-}"
tag_prefix="${TAG_PREFIX:-userscript-v}"
tag_remote="${TAG_REMOTE:-origin}"
release_branch="${RELEASE_BRANCH:-master}"
max_attempts="${MAX_ATTEMPTS:-5}"

if [[ -z "${event_sha}" ]]; then
    echo "EVENT_SHA is required." >&2
    exit 1
fi

git config --local user.email github-actions[bot]@users.noreply.github.com
git config --local user.name github-actions[bot]
git config --global core.autocrlf true
git config --global core.safecrlf false

attempt=0
while (( attempt < max_attempts )); do
    attempt=$((attempt + 1))
    echo "Release attempt ${attempt}/${max_attempts}"

    git fetch "${tag_remote}" "${release_branch}" --tags
    git checkout -B release-work "${tag_remote}/${release_branch}"
    node scripts/release/validate-userscript-tags.mjs

    head_subject="$(git log -1 --format=%s HEAD)"
    if git merge-base --is-ancestor "${event_sha}" HEAD && [[ "${head_subject}" == chore:\ release\ v* ]]; then
        echo "Event ${event_sha} is already covered by ${head_subject}; skipping."
        exit 0
    fi

    version="$(node scripts/release/prepare-userscript-release.mjs)"
    echo "Prepared release version ${version}"

    mise build
    bash scripts/release/assert-dist-version.sh

    git add package.json dist/chatgpt.meta.js dist/chatgpt.user.js
    if git diff --cached --quiet; then
        git commit --allow-empty -m "chore: release v${version}"
    else
        git commit -m "chore: release v${version}"
    fi

    tag_name="${tag_prefix}${version}"
    if git rev-parse --verify --quiet "refs/tags/${tag_name}" >/dev/null; then
        tagged_commit="$(git rev-list -n 1 "${tag_name}")"
        if [[ "${tagged_commit}" == "$(git rev-parse HEAD)" ]]; then
            echo "Tag ${tag_name} already exists on HEAD; nothing to push."
            exit 0
        fi

        echo "Tag ${tag_name} already exists on ${tagged_commit}; retrying with fresh state."
        sleep 2
        continue
    fi

    git tag "${tag_name}" HEAD
    if git push --atomic "${tag_remote}" HEAD:"${release_branch}" "refs/tags/${tag_name}"; then
        echo "Pushed release commit and tag ${tag_name}."
        exit 0
    fi

    git tag --delete "${tag_name}" >/dev/null 2>&1 || true
    echo "Atomic push failed; retrying with fresh remote state."
    sleep 2
done

echo "Failed to publish master release after ${max_attempts} attempts." >&2
exit 1
