# Codex Security Export Tasks

## Task 1: Page Context And Mounting

- Scope: classify Codex Security routes and mount the existing export menu into the security left rail.
- Files: `src/page.ts`, `src/main.tsx`, plus a new page-context helper if needed.
- Deliverables:
  - detect `/codex/security/findings/:findingId`
  - detect `/codex/security/scans/:repoId`
  - classify `/codex/security/findings?page=...` and filtered findings-list routes as `security-findings-list`, with no export support in phase 1
  - preserve `/share/:id` and `/share/:id/continue` behavior in the conversation path
  - expose ids needed by downstream loaders
  - locate a stable security left-rail mount point
  - keep existing conversation and share-page mounting behavior unchanged
- Acceptance criteria:
  - the menu appears on chat conversation pages exactly as before
  - share pages keep their current mount/export behavior, and `/share/:id/continue` stays excluded
  - the menu appears on findings and scans pages in the left rail without overlapping the resize separator
  - findings-list routes with `?page=` or security filters do not mount an export menu in phase 1
  - repeated rerenders and route transitions leave only one live menu instance and clean up detached containers
  - unsupported pages fail closed instead of showing conversation-only alerts

## Task 2: Security API Adapters And Types

- Scope: add typed loaders for the Codex Security APIs observed in the HAR.
- Files: `src/api/http.ts`, new `src/api/securityApi.ts`, new `src/api/securityTypes.ts`.
- Deliverables:
  - typed fetchers for finding detail, scan configuration detail, scan stats, and repo metadata
  - deterministic scan-selection logic that resolves one active `configured_scan_id` for a routed repo id
  - safe parsing of `scan_input.project_overview`
  - a small composition helper that resolves a scan page into one coherent payload bundle
- Acceptance criteria:
  - loaders reuse the existing authenticated request path
  - scan export fails closed on zero or multiple matching scan configurations
  - malformed or missing `project_overview` does not crash exports
  - exported raw JSON excludes access token, session/account, and user-profile/bootstrap data
  - raw payloads remain available for JSON export

## Task 3: Security Document Normalization

- Scope: translate raw security payloads into export-ready documents that the exporters can render consistently.
- Files: new files under `src/security/` or equivalent.
- Deliverables:
  - `SecurityFindingDocument`
  - `SecurityScanDocument`
  - normalized section ordering and metadata
  - filename/title/source-url derivation
- Acceptance criteria:
  - finding exports include summary, validation, evidence, and attack-path content when present
  - scan exports include status, severity counts, repo metadata, scanned-commit metadata, and threat model content when present
  - absent optional fields degrade cleanly instead of leaving broken placeholders

## Task 4: Page-Aware Exporters

- Scope: make the existing export commands dispatch by page kind instead of assuming conversations.
- Files: `src/ui/Menu.tsx`, `src/exporter/text.ts`, `src/exporter/markdown.ts`, `src/exporter/html.ts`, `src/exporter/json.ts`.
- Deliverables:
  - current-page dispatch for conversation, security finding, and security scan
  - an explicit capability matrix for conversation-only versus security-page actions
  - page-specific copy for unsupported actions or missing capabilities
  - JSON export that preserves raw security payload bundles
- Acceptance criteria:
  - existing conversation exports remain unchanged
  - findings and scans export successfully to text, markdown, HTML, and JSON
  - security pages do not render `Export All`, Tavern, Ooba, archive, or delete actions
  - `historyDisabled` remains conversation-only, and the copy shortcut does not trigger security-page exports in phase 1
  - customized filename/frontmatter settings resolve cleanly on security pages without unresolved chat-only placeholders
  - exported filenames use stable finding/scan metadata instead of chat ids

## Task 5: Security PNG Export

- Scope: add screenshot support for the active security detail pane.
- Files: `src/exporter/image.ts` and any new security DOM helpers.
- Deliverables:
  - a capture target resolver for finding detail pages
  - a capture target resolver for scan detail pages
  - page-aware file naming
- Acceptance criteria:
  - PNG export no longer depends on `#thread` for security pages
  - screenshots capture the full active finding or scan detail content rather than only the visible viewport
  - internal scroll containers and sticky controls are handled so long findings/threat models are not truncated
  - conversation screenshot behavior remains unchanged

## Task 6: Fixtures And Regression Tests

- Scope: cover the new architecture with compact, durable fixtures derived from the supplied HAR and SingleFile captures.
- Files: `src/**/*.test.ts`, plus new fixtures under a test fixture directory.
- Deliverables:
  - route parsing tests
  - share-page regression tests
  - security API parsing tests
  - scan-selection zero/one/many tests
  - normalization tests
  - page-aware exporter dispatch tests
  - unsupported `security-findings-list` route tests for `?page=` and filtered-list variants
  - capability-gating tests for menu/shortcut behavior
  - JSON privacy-boundary tests
  - custom filename/frontmatter token tests for security pages
  - duplicate-injection cleanup tests for SPA rerenders
  - security PNG target-selection tests with tall-content cases
  - sanitization tests for hostile HTML and unsafe links
- Acceptance criteria:
  - tests use minimal extracted fixtures instead of committing full HAR files
  - malformed payload cases are covered
  - security exports treat payload content as untrusted and strip or escape active HTML
  - `npm run test` remains the baseline verification target

## Deferred Follow-Up Tasks

- Bulk export for findings lists and archived findings
- Cursor-walk findings lists via `next_cursor` rather than browser page numbers
- Decide between sparse list export and per-finding detail hydration for high-fidelity bulk exports
- Dedupe repeated cursor responses/findings during bulk export
- Preserve active repo/status/severity filters in bulk-export metadata
- Dedicated threat-model route support if later captures show a distinct page
- Export-all semantics for repository-scoped security results
- Additional patch-tab extraction if real captures show patch content beyond the current finding detail payload
