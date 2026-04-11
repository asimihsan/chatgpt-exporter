# Release Build esbuild Working Note

## Summary
The failing default-branch merge CI run is `24002935598` on `asimihsan/chatgpt-exporter`, created on 2026-04-05 for merge commit `8ca627aa7dae2557b87ca0fac318d5920c4a3195` on `master`. `check` passed and `release` failed.

Root cause: the release path runs `mise build`, which now reaches a Vite 8 code path where `vite-plugin-monkey` still invokes deprecated `transformWithEsbuild`. Vite 8 no longer bundles `esbuild` transitively for that path, and this repo does not declare `esbuild`, so a clean install omits it and the release build fails.

## Evidence
- GitHub Actions logs for run `24002935598` show:
  - `Build failed with 1 error`
  - `[plugin monkey:mock] Error: Failed to load transformWithEsbuild`
  - `Error [ERR_MODULE_NOT_FOUND]: Cannot find package 'esbuild'`
- Local clean reproduction:
  - copied the repo to a temp directory without `node_modules` or `dist`
  - ran `bun install --frozen-lockfile`
  - confirmed `node_modules/esbuild` was absent
  - ran `bun run build`
  - observed the same `transformWithEsbuild` and missing `esbuild` failure

## Decision
Apply the smallest deterministic fix first: add `esbuild` as an explicit dev dependency so clean installs satisfy the Vite 8 plus `vite-plugin-monkey` build path used by `mise build` and the CI release job.

## Dependency Maintenance Scope
Following the dependency-maintenance workflow, I checked the repo's package-manager and toolchain posture before updating anything:

- package manager: Bun with committed `bun.lock`
- runtime/toolchain manager: `mise`
- supply-chain config present: only `.npmrc` with `auto-install-peers=true`
- supply-chain config absent: no `bunfig.toml`, no Dependabot config, no Renovate config

Given that posture, I kept the dependency update scope to low-risk in-range Bun updates and `mise upgrade` lock refreshes, and avoided new majors such as `i18next@26`, `react-i18next@17`, and `typescript@6`.

## Applied Updates
- explicit build fix:
  - added `esbuild` as a dev dependency
- Bun dependencies:
  - refreshed in-range patch/minor updates including `vite 8.0.3 -> 8.0.8`, `vitest 4.1.2 -> 4.1.4`, `react/react-dom 19.2.4 -> 19.2.5`, `i18next 25.8.14 -> 25.10.10`, and related type/test packages
- mise-managed tools:
  - `actionlint 1.7.11 -> 1.7.12`
  - `bun 1.3.10 -> 1.3.12`
  - `jujutsu 0.39.0 -> 0.40.0`
  - `node 24.14.0 -> 24.14.1`

## Validation
- clean reproduction after fix:
  - copied the repo to a temp directory without `node_modules` or `dist`
  - ran `bun install --frozen-lockfile`
  - confirmed `node_modules/esbuild` was present
  - ran `bun run build`
  - build succeeded
- repo validation:
  - `mise check` passed
  - `mise build` passed

## Residual Risk
The repo still depends on `vite-plugin-monkey@7.1.9`, which emits the deprecation warning about `transformWithEsbuild` and only advertises peer support through Vite 7. The explicit `esbuild` dependency fixes the current CI failure, but a future cleanup should either migrate off the deprecated plugin path or move to a plugin version with first-class Vite 8 support.
