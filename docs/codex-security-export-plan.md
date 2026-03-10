# Codex Security Export Plan

## Objective

Add Codex Security export support for:

- `/codex/security/findings/:findingId`
- `/codex/security/scans/:repoId`

Phase 1 should export the currently selected detail page in text, markdown, HTML, JSON, and PNG formats. For scans, the exported document should include the rendered threat model and scan metadata already exposed by the page APIs.

## Non-goals For Phase 1

- Bulk export of findings lists, archived findings, or repository-wide scan inventories
- Acting on findings with in-product mutations such as archive, triage, or create-PR
- Supporting a dedicated threat-model-only route that has not yet been captured in HAR or hydrated HTML

Why list export stays out of phase 1:

- the findings list UI uses page numbers in the browser URL, but the backend contract is cursor-based (`cursor` and `next_cursor`)
- the list payload is sparse relative to finding detail, so “export all findings” either needs per-finding detail hydration or a lower-fidelity list export mode
- duplicate cursor fetches appear during paging, so any bulk walker must dedupe responses and avoid assuming a one-request-per-page model

## Key Constraints

- The current code path is built around conversation ids and conversation-turn DOM, so chat assumptions need to be isolated instead of copied into security features.
- Security pages do not mount inside the same chat `nav` structure, so menu injection must target the security left rail.
- The most stable selectors available in the supplied captures are semantic anchors such as route shape, section ids, visible labels, and the resize separator, not hashed utility class names.
- JSON export must preserve the raw security payloads because these pages contain structured security data that downstream tooling may want to re-process.

## Proposed Design

### 1. Add page classification and capabilities

Introduce a small page-context layer that classifies the current page as one of:

- `conversation`
- `security-finding`
- `security-scan`
- `security-findings-list`
- `unsupported`

Phase 1 route policy:

- `/c/:id`, `/g/:gizmoId/c/:id`, and `/share/:id` stay classified as `conversation`
- `/share/:id/continue` keeps its current excluded behavior
- `/codex/security/findings/:findingId` is `security-finding`
- `/codex/security/scans/:repoId` is `security-scan`
- `/codex/security/findings?page=...` and filter-only findings-list routes are classified as `security-findings-list` but remain non-exportable in phase 1

This layer should expose:

- route parsing helpers for finding ids and scan repo ids
- capability checks for text/markdown/html/json/png export plus conversation-only actions
- mount-point discovery for the correct sidebar/menu container
- page-specific disabled messages instead of reusing `Please start a conversation first`

Phase 1 policy:

- `historyDisabled` continues to gate only conversation pages
- the keyboard copy shortcut remains conversation-only until there is an explicit security review for shortcut-triggered exports
- security pages fail closed with explicit messages instead of silently inheriting chat-only behavior
- `security-findings-list` gets no export menu or export actions in phase 1

Likely touchpoints:

- `src/page.ts`
- `src/main.tsx`
- a new helper such as `src/pageContext.ts`

### 2. Add Codex Security API adapters and types

Build security-specific API loaders on top of the existing authenticated `fetchApi()` helper instead of adding ad hoc `fetch()` calls.

Suggested additions:

- `src/api/securityTypes.ts`
- `src/api/securityApi.ts`

Core loaders:

- `fetchSecurityFinding(findingId)`
- `resolveSecurityScanSelection(repoId)`
- `fetchSecurityScan(configuredScanId)`
- `fetchSecurityScanStats(configuredScanId)`
- `fetchSecurityRepo(repoId)`

Scan loading should resolve the active scan deterministically:

- prefer page/bootstrap data if it exposes the active `configured_scan_id`
- otherwise query the scan-configuration list for the routed repo id
- require exactly one matching configuration for phase 1
- fail closed on zero or multiple matches instead of guessing

Once the active scan is resolved, parse `scan_input.project_overview` safely and surface:

- `threat_model`
- `focus_files_and_dirs`
- repo URL / branch / owner / environment / lookback metadata

### 3. Normalize security data into exportable documents

Add a normalized security export model so text/markdown/HTML exporters do not directly depend on raw API response shapes.

Suggested model split:

- `SecurityFindingDocument`
- `SecurityScanDocument`

Each normalized document should include:

- stable title and page kind
- source URL
- summary metadata for filenames and frontmatter
- ordered export sections
- raw payload bundle for JSON export

JSON boundary:

- exported raw JSON is limited to the Aardvark/Wham API responses needed for the current finding or scan plus resolved non-sensitive identifiers
- page/bootstrap data may be consulted for lookup only and must never be serialized
- access tokens, session/account data, and user-profile objects are always excluded

For findings, the normalized sections should cover at least:

- summary
- validation
- evidence
- attack path
- proposed patch metadata when present

For scans, the normalized sections should cover at least:

- status and severity counts
- repository and owner metadata
- scanned-commit metadata
- threat model
- focus files/directories when present

Likely additions:

- `src/security/model.ts`
- `src/security/normalizeFinding.ts`
- `src/security/normalizeScan.ts`

### 4. Refactor exporters behind page-aware entrypoints

Keep the menu surface roughly unchanged, but make each export action dispatch through the current page context.

Approach:

- retain the existing conversation exporters
- add security-specific export builders
- route `exportToText`, `exportToMarkdown`, `exportToHtml`, `exportToJson`, and `exportToPng` through a small page-aware dispatcher
- gate or hide conversation-only actions on security pages

This avoids breaking conversation export behavior while making security support explicit.

Capability matrix for phase 1:

- `conversation`: text, markdown, HTML, PNG, official JSON, Tavern JSONL, Ooba JSON, Export All, archive/delete, copy shortcut
- `security-finding`: text, markdown, HTML, PNG, raw JSON for current finding only
- `security-scan`: text, markdown, HTML, PNG, raw JSON for current scan only
- `security-*` pages: no Export All dialog, no Tavern/Ooba variants, no archive/delete flows, no copy shortcut

Security token contract for global filename/frontmatter settings:

- `{title}`, `{date}`, `{timestamp}`, and `{source}` remain supported
- `{create_time}` and `{update_time}` use finding/scan timestamps when present, otherwise export-time fallback
- `{chat_id}`, `{model}`, and `{model_name}` resolve to empty strings on security pages for backward compatibility
- custom filename/meta settings must not leave unresolved placeholders in exported output

Likely touchpoints:

- `src/ui/Menu.tsx`
- `src/exporter/text.ts`
- `src/exporter/markdown.ts`
- `src/exporter/html.ts`
- `src/exporter/json.ts`
- `src/exporter/image.ts`

### 5. Mount the menu in the Codex Security left rail

Extend the injector in `src/main.tsx` so it can mount into either:

- chat navigation on conversation pages
- the security left rail on findings/scans pages

Mounting strategy should prefer semantic anchors from the captures:

- locate the security left `aside`
- confirm nearby `role="separator"` with `aria-label="Resize repository pane"`
- insert the menu above the scrollable repository/finding list without interfering with the resizer

The implementation should tolerate rerenders by cleaning up detached containers the same way the chat nav injector does today.

SPA safety requirement:

- repeated route transitions or left-rail rerenders must not accumulate duplicate menus
- only one active menu instance may remain attached to the current mount target
- detached containers must be removed promptly after remount

### 6. Add security-aware PNG export

PNG export currently depends on `#thread` and conversation-turn selectors. For security pages it should instead capture the active detail pane:

- finding detail pane for `security-finding`
- scan detail pane for `security-scan`

The capture target should be chosen using stable anchors from the hydrated DOM, such as the top label plus the detail pane container, rather than chat-specific thread selectors.

Parity requirement:

- capture the full scrollable active-detail content, not only the visible viewport
- suppress sticky chrome or floating controls the same way conversation PNG export already suppresses chat-specific UI
- handle internal scroll containers so long findings and long threat models are not truncated

### 7. Sanitize security-derived content before export

Security findings and threat models can include repo-controlled or user-controlled text. Treat all security-derived payload content as untrusted.

Requirements:

- HTML export must escape or strip raw HTML from security payload sections before template insertion
- markdown export must not preserve executable HTML or unsafe URLs
- links with `javascript:` or other unsafe protocols must be dropped or rendered as plain text
- normalization should preserve readable text while removing active content

### 8. Test with compact fixtures, not raw captures

Avoid committing full HAR or SingleFile exports. Instead, create compact fixtures extracted from the supplied captures:

- minimal JSON payloads for finding detail, scan config detail, scan stats, and repo metadata
- minimal HTML snippets or DOM fixtures for mount-point detection and section extraction where necessary

Tests should cover:

- route classification and id extraction
- share-page classification and mount-path regression coverage
- security API loader parsing, including malformed `project_overview`
- scan-selection resolution for zero, one, and multiple matching scan configurations
- normalization for findings and scans
- page-aware exporter dispatch
- unsupported findings-list route behavior for `?page=` and filtered-list variants
- capability-matrix UI behavior, including absence of Export All, Tavern, Ooba, archive/delete, and copy shortcut handling on security pages
- JSON privacy boundaries that assert exported security JSON excludes access token, session, account, and user-profile fields
- global filename/frontmatter token behavior for customized settings on security pages
- security mount-point detection
- duplicate-injection cleanup across rerenders and route transitions
- PNG target selection helpers and tall-content capture behavior
- adversarial sanitization fixtures for `<script>`, inline handlers, and unsafe links

## Phasing

### Phase 1

- current-page exports for findings and scans
- embedded threat model export on scan detail pages
- left-rail menu mounting
- JSON/text/markdown/HTML/PNG support
- targeted unit tests

### Phase 2

- findings list or archived-findings bulk export
- export-all behavior for repository-scoped results
- dedicated threat-model route support if separate routes are later captured
- deeper patch export if the patch tab exposes additional API data beyond the finding detail payload

Phase 2 bulk-export requirements inferred from the list HAR:

- walk the findings list with `next_cursor`, not by guessing from `?page=N`
- dedupe repeated cursor responses and repeated findings by stable ids such as `hid`
- choose between sparse list export and full-fidelity per-finding hydration
- preserve applied repo/status/severity filters in exported metadata

## Open Questions

- Do Codex Security threat models ever appear on a dedicated route distinct from `/codex/security/scans/:repoId`?
- Does the patch tab require an extra API request beyond the finding detail payload in real-world cases, or is the existing payload sufficient?
- For phase 2, should findings-list export be sparse-and-fast or should it hydrate each finding detail for full fidelity?

## Recommended Sequence

1. Land page classification plus security route parsing.
2. Land security API adapters and normalized document builders.
3. Refactor text/markdown/HTML/JSON exporters to dispatch by page kind.
4. Add security sidebar mounting and page-specific copy.
5. Add security PNG capture helpers.
6. Add sanitization rules for security-derived content.
7. Add fixtures and regression tests.
