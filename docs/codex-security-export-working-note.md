# Summary

The initial Codex Security scan export shipped with a brittle optimization: on scan detail pages it preferred the newest `scan_configurations/:id` resource entry from `performance` timing, but treated any failure to refetch that concrete id as fatal. Real pages can surface owner-qualified ids such as `user-...:github-...` that the userscript then receives `403 Forbidden` for, even though repo-scoped scan resolution is still available. The fix is to keep the optimization only as a hint and fall back to deterministic repo-based scan selection on `403`/`404` preferred-id lookup failures.

Codex Security support should be added as a first-class export surface rather than squeezed into the existing conversation-only path. The plan supports a phase 1 implementation that exports current findings and scans detail pages, includes threat model content from scan detail, keeps findings-list routes non-exportable for now, and preserves existing conversation/share-page behavior.

Task 4 is in progress. The page-aware capability matrix is already wired into the menu and exporter entrypoints; the current implementation pass is hardening the shared security document renderers, keeping the copy shortcut conversation-only via capability gating, and adding regression coverage for security text/markdown/HTML/JSON rendering.

Task 5 is now in progress. The current pass is replacing the conversation-only `#thread` screenshot path with a page-aware PNG target resolver so security findings and scans capture the right detail pane, while preserving the existing chat screenshot flow.

Task 6 is now in progress. The current pass is tightening regression coverage around page-aware exporter dispatch, fail-closed unsupported routes, token behavior, and the security/conversation split introduced by Tasks 4 and 5.

# Codex Security Export Working Note

- [x] Goal: extend the userscript so it can export Codex Security findings and scan detail pages, including threat model content rendered on the scan detail page.
- [x] Goal: mount a menu in the Codex Security left rail so the UX matches the existing sidebar/menu pattern instead of requiring a separate workflow.
- [x] Evidence: the current implementation is conversation-specific.
  - `src/main.tsx` mounts the menu only into chat `nav` containers or share-page chat wrappers.
  - `src/page.ts` only recognizes `/share`, `/c`, and `/g/.../c` routes, and `checkIfConversationStarted()` depends on `[data-testid^="conversation-turn-"]`.
  - `src/ui/Menu.tsx` always calls conversation exporters, exposes chat-only JSON variants, and always renders the `Export All` dialog.
  - `src/ui/ExportDialog.tsx` is conversation-management UI with fetch/archive/delete flows that do not make sense on security pages.
  - `src/exporter/text.ts`, `src/exporter/markdown.ts`, `src/exporter/html.ts`, `src/exporter/json.ts`, and `src/exporter/image.ts` all load chat conversations.
- [x] Evidence: the Codex Security pages use authenticated APIs that are separate from chat conversations.
  - Findings detail uses `/backend-api/aardvark/scan-findings/:hid`.
  - Findings list/filtering uses `/backend-api/aardvark/scan-findings?...`.
  - Scan detail uses `/backend-api/aardvark/scan_configurations?...`, `/backend-api/aardvark/scan_configurations/:configured_scan_id`, and `/backend-api/aardvark/scan_configurations/:configured_scan_id/stats`.
  - Repository metadata uses `/backend-api/wham/github/repositories/:repo_id`.
- [x] Evidence: the findings list page is a cursor API behind page-number navigation.
  - The supplied list HAR shows `/backend-api/aardvark/scan-findings?limit=20&cursor=0|20|40|60...` with `next_cursor` values `20`, `40`, `60`, then `null`.
  - The browser URL uses `?page=4` while the API continues to use cursors, so UI pagination and API pagination are not the same contract.
  - The final page returned `items_count: 7` with `total: 67`.
- [x] Evidence: the findings list payload is materially sparser than finding detail.
  - Sample list items include ids, status, severity, repo ids, and scan ids, but fields such as `title` and `commit_hash` can be null in the list response.
  - A high-fidelity bulk export would therefore need per-finding detail hydration or an explicitly lower-fidelity list-export mode.
- [x] Evidence: the hydrated SingleFile exports expose stable UI anchors that are better than hashed CSS classes.
  - Both pages include a left `<aside>` with the `--codex-security-left-pane-width` inline style and a sibling `role="separator"` labelled `Resize repository pane`.
  - The finding detail pane includes `Finding`, an `h1`, `Report` and `Patch` tabs, and sections with ids `summary`, `validation`, `evidence`, and `attack-path`.
  - The scan detail pane includes `Security scan`, summary stats, repo metadata, and a rendered `Threat model` section.
- [x] Evidence: the scan detail payload contains threat-model content even without a separate threat-model route sample.
  - `scan_input.project_overview` is a JSON string whose parsed object includes `threat_model` and `focus_files_and_dirs`.
- [x] Decision: security pages need an explicit capability matrix instead of inheriting the full conversation menu.
  - On `security-finding` and `security-scan` pages, phase 1 should expose only text, markdown, HTML, PNG, and raw JSON export for the current page.
  - `Export All`, Tavern/Ooba JSON variants, archive/delete flows, and the global copy shortcut should remain conversation-only in phase 1.
- [x] Decision: scan export must resolve one concrete `configured_scan_id` deterministically.
  - Prefer page/bootstrap data if it exposes the active scan configuration id.
  - Otherwise, use the scan-configuration list endpoint and require exactly one matching configuration for the routed repo id.
  - If zero or multiple matches exist, fail closed with a user-visible message instead of exporting the wrong scan.
- [x] Decision: page/bootstrap state is lookup-only for security exports.
  - Bootstrap data may help resolve the active scan configuration id.
  - Exported JSON must be limited to Aardvark/Wham responses plus resolved non-sensitive identifiers such as routed ids and source URLs.
  - Access tokens, session/account data, and user-profile/bootstrap objects must never be serialized into security exports.
- [x] Decision: security-derived content must be treated as untrusted input in exported formats.
  - Raw HTML from finding evidence, threat models, or patch content should be escaped or stripped before HTML export.
  - `javascript:` links, inline handlers, and similar active content should be dropped during normalization/export.
- [x] Decision: security pages need an explicit token contract for filenames and metadata placeholders.
  - Keep the existing global placeholders working where possible: `{title}`, `{date}`, `{timestamp}`, `{create_time}`, `{update_time}`, and `{source}`.
  - Conversation-only placeholders such as `{chat_id}`, `{model}`, and `{model_name}` should resolve to empty strings on security pages instead of leaking literal placeholders into filenames or frontmatter.
- [x] Decision: security sidebar injection must tolerate SPA rerenders and route transitions.
  - Only one menu instance should exist per active mount target.
  - Detached containers should be removed during left-rail rerenders and route changes.
- [x] Conclusion: route detection, mounting, data loading, and export rendering need a page-type abstraction instead of more `if conversation` checks.
- [x] Scope decision: phase 1 should cover current-page export for findings detail and scans detail, including threat model content present on scans.
- [x] Scope decision: findings-list bulk export, archived findings export, and any dedicated threat-model-only route should remain deferred until additional captures confirm the exact UX and payload shapes.
  - The new list HAR reinforces that deferral: a bulk exporter must walk cursors, dedupe repeated fetches, and decide whether to hydrate each finding detail for completeness.
  - In phase 1, `/codex/security/findings?page=...` and filter-only findings-list routes should be treated as unsupported pages with no security export menu mounted.
- [x] Scope decision: existing share-page handling must stay in the conversation path during the refactor.
  - `/share/:id` remains a supported conversation route.
  - `/share/:id/continue` remains excluded from the share-page mount path.
- [x] Risk: PNG export is also conversation-specific today, so security support needs full-detail capture parity for long findings/threat models rather than a viewport-only screenshot.
- [x] Review status: iterative reviewer passes have already identified and closed gaps around menu gating, scan selection, shortcut behavior, PNG parity, JSON privacy boundaries, token behavior, duplicate injection cleanup, route classification, and sanitization.
- [x] Evidence: Task 4 already has partial implementation in-tree.
  - `src/exporter/pageExport.ts` defines the conversation/security/list capability matrix.
  - `src/ui/Menu.tsx` consumes that matrix to hide `Export All` and Tavern/Ooba on security pages.
  - `src/exporter/text.ts`, `src/exporter/markdown.ts`, `src/exporter/html.ts`, and `src/exporter/json.ts` already branch on `getPageContext()` and use `loadCurrentSecurityDocument()`.
- [x] Evidence: the Task 4 implementation pass closed reviewer-raised gaps.
  - Security HTML export now strips unsafe `javascript:`/`vbscript:`/HTML-data `href` and `src` values after markdown rendering.
  - Security scan export now inspects current-page resource timing entries to recover the already-fetched active `configured_scan_id` and pass it as the preferred scan selection.
  - Security PNG is now explicitly disabled in the capability matrix until Task 5 implements a real security-detail capture path.
- [x] Evidence: the second hardening pass addressed stale SPA state and metadata escaping.
  - Preferred scan-id recovery now walks resource timing entries from newest to oldest so the current page wins over stale SPA history.
  - Security markdown frontmatter now double-quotes and escapes keys/values, and exported markdown/text/HTML titles are normalized to a single line.
- [x] Evidence: Task 5 implementation now exists in-tree.
  - `src/exporter/image.ts` resolves conversation vs security PNG capture targets.
  - Security PNG capture now targets the right-hand detail pane adjacent to the Codex Security resize separator instead of chat `#thread`.
  - Security capture temporarily removes overflow clipping so tall findings and scan threat models render full-height for `html2canvas`.
  - Security PNG is re-enabled in `src/exporter/pageExport.ts`.
- [x] Evidence: regression coverage was added for PNG target resolution and export behavior.
  - `src/exporter/image.test.ts` covers security detail-pane resolution, security export dispatch, filename behavior, and unsupported findings-list routes.
- [x] Evidence: the first Task 5 review pass identified and closed filename/title/test gaps.
  - Security PNG filenames now reuse `getSecurityFileNameOptions()` so `{create_time}` and `{update_time}` align with the other security exporters.
  - Security PNG title lookup is now scoped to the resolved detail pane instead of the first document-level `h1`.
  - `src/exporter/image.test.ts` now also covers the conversation PNG path, `checkIfConversationStarted()` gating, and `{chat_id}` filename behavior.
- [x] Evidence: Task 6 added exporter-dispatch regression coverage that was still missing.
  - `src/exporter/pageAwareExportDispatch.test.ts` covers security text/markdown/HTML/JSON dispatch, findings-list fail-closed behavior, and conversation-only Tavern/Ooba gating.
  - Existing route, mount-target, menu-injection cleanup, shortcut, security-document, and PNG tests now form a compact regression matrix across Tasks 1-5.
- [x] Evidence: baseline verification still passes after the regression additions.
  - Focused Task 6 slice: `npm run test:unit -- src/exporter/pageAwareExportDispatch.test.ts src/exporter/image.test.ts src/exporter/pageExport.test.ts src/exporter/securityDocument.test.ts src/pageContext.test.ts src/menuInjection.test.ts src/menuMount.test.ts src/shortcuts/exportCopyShortcut.runtime.test.ts src/api/securityApi.test.ts`
  - Baseline repo verification: `npm test`
- [x] Evidence: the first Task 6 review pass identified and closed one real unsupported-page behavior gap.
  - Current-page text/markdown/HTML/official-JSON exporters now reject non-conversation pages before checking `checkIfConversationStarted()`, so findings-list pages fail closed with the unsupported-page message instead of a chat-only alert.
  - `src/menuInjection.test.ts` now also asserts that `security-sidebar` injections are dropped once the page context becomes `security-findings-list`.
- [ ] Next: rerun the reviewer after the latest hardening pass and keep iterating until the review is clean.
- [x] Evidence: real-world scan detail pages can expose a preferred configured scan id that is not directly refetchable by the userscript.
  - Repro URL: `/codex/security/scans/github-235712907?sev=critical%2Chigh`.
  - Observed failing requests: `GET /backend-api/aardvark/scan_configurations/user-…:github-235712907` and `/stats`, both `403`.
  - Conclusion: current-page resource timing is still useful as a hint, but export must fall back to repo-based scan selection when the hinted id is inaccessible.
