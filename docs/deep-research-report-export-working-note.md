# Summary

Deep research report export now resolves the report body from `metadata.chatgpt_sdk.widget_state.report_message`, scoped to the `internal://deep-research` widget, so clipboard/text/markdown/html exports use the rendered report instead of the widget bootstrap payload.

# Deep Research Report Export Working Note

- [x] Goal: make deep research exports copy the rendered report content instead of only the prompt/widget bootstrap messages.
- [x] Evidence: the HAR shows the report is not in the visible assistant turn body.
  - `backend-api/conversation/<id>` includes a tool message whose `metadata.chatgpt_sdk.widget_state` JSON contains `report_message`.
  - `backend-api/ecosystem/call_mcp` also exposes session state, but the conversation payload already has enough data for export.
- [x] Conclusion: the fix should read `widget_state.report_message` from the conversation payload and surface it as an exportable assistant message.
- [x] Implement normalization so deep research report messages participate in text/markdown/html and shortcut exports.
- [x] Add regression tests using a minimal deep-research-shaped message fixture, including a negative guard for non deep-research widgets.
- [x] Run targeted tests and reviewer pass.
