/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

import i18n, { LOCALES } from '../i18n'

export interface PanelElements {
    backdrop: HTMLDivElement
    closeButton: HTMLButtonElement
    cancelButton: HTMLButtonElement
    saveButton: HTMLButtonElement
    resetButton: HTMLButtonElement
    languageSelect: HTMLSelectElement
    formatInput: HTMLInputElement
    exportAllLimitInput: HTMLInputElement
    enableTimestampInput: HTMLInputElement
    timeStamp24HInput: HTMLInputElement
    enableTimestampHTMLInput: HTMLInputElement
    enableTimestampMarkdownInput: HTMLInputElement
    enableMetaInput: HTMLInputElement
    enableCopyTextShortcutInput: HTMLInputElement
    copyTextShortcutInput: HTMLInputElement
    timestampOptions: HTMLDivElement
    metaOptions: HTMLDivElement
    shortcutOptions: HTMLDivElement
    metaList: HTMLDivElement
    addMetaButton: HTMLButtonElement
}

function t(key: string, fallback: string): string {
    const value = i18n.t(key)
    return value === key ? fallback : value
}

function createPanelTemplate(): string {
    const languageOptions = LOCALES
        .map(locale => `<option value="${locale.code}">${locale.name}</option>`)
        .join('')

    return `
<div class="ce-overlay" data-ce-role="overlay">
  <div class="ce-panel" role="dialog" aria-modal="true" aria-labelledby="ce-settings-title">
    <header class="ce-header">
      <h2 id="ce-settings-title">${t('Exporter Settings', 'Exporter Settings')}</h2>
      <button type="button" class="ce-icon-btn" data-ce-role="close" aria-label="${t('Close', 'Close')}">×</button>
    </header>

    <div class="ce-body">
      <section class="ce-group">
        <label class="ce-row">
          <span>${t('Language', 'Language')}</span>
          <select data-ce-role="language">${languageOptions}</select>
        </label>

        <label class="ce-row">
          <span>${t('File Name', 'File Name')}</span>
          <input type="text" data-ce-role="format" placeholder="ChatGPT-{title}" />
        </label>

        <label class="ce-row">
          <span>${t('Export All Limit', 'Export All Limit')}</span>
          <input type="number" min="100" max="20000" step="100" data-ce-role="export-all-limit" />
        </label>
      </section>

      <section class="ce-group">
        <label class="ce-row ce-toggle-row">
          <span>${t('Conversation Timestamp', 'Conversation Timestamp')}</span>
          <input type="checkbox" data-ce-role="enable-timestamp" />
        </label>

        <div class="ce-subgroup" data-ce-role="timestamp-options">
          <label class="ce-row ce-toggle-row">
            <span>${t('Use 24-hour format', 'Use 24-hour format')}</span>
            <input type="checkbox" data-ce-role="timestamp-24h" />
          </label>
          <label class="ce-row ce-toggle-row">
            <span>${t('Enable on HTML', 'Enable on HTML')}</span>
            <input type="checkbox" data-ce-role="timestamp-html" />
          </label>
          <label class="ce-row ce-toggle-row">
            <span>${t('Enable on Markdown', 'Enable on Markdown')}</span>
            <input type="checkbox" data-ce-role="timestamp-markdown" />
          </label>
        </div>
      </section>

      <section class="ce-group">
        <label class="ce-row ce-toggle-row">
          <span>${t('Export Metadata', 'Export Metadata')}</span>
          <input type="checkbox" data-ce-role="enable-meta" />
        </label>

        <div class="ce-subgroup" data-ce-role="meta-options">
          <div class="ce-meta-list" data-ce-role="meta-list"></div>
          <button type="button" class="ce-secondary-btn" data-ce-role="meta-add">+ ${t('Add', 'Add')}</button>
        </div>
      </section>

      <section class="ce-group">
        <label class="ce-row ce-toggle-row">
          <span>${t('Enable Copy Text Shortcut', 'Enable Copy Text Shortcut')}</span>
          <input type="checkbox" data-ce-role="enable-copy-text-shortcut" />
        </label>

        <div class="ce-subgroup" data-ce-role="shortcut-options">
          <label class="ce-row">
            <span>${t('Copy Text Shortcut', 'Copy Text Shortcut')}</span>
            <input type="text" data-ce-role="copy-text-shortcut" placeholder="Mod+Shift+E" />
          </label>
          <p class="ce-help">
            ${t('Shortcut Conflict Help', 'Some browser and extension shortcuts override page shortcuts. If this combo does not trigger, choose a different one.')}
          </p>
        </div>
      </section>
    </div>

    <footer class="ce-footer">
      <button type="button" class="ce-secondary-btn" data-ce-role="reset">${t('Reset', 'Reset')}</button>
      <span class="ce-spacer"></span>
      <button type="button" class="ce-secondary-btn" data-ce-role="cancel">${t('Cancel', 'Cancel')}</button>
      <button type="button" class="ce-primary-btn" data-ce-role="save">${t('Save', 'Save')}</button>
    </footer>
  </div>
</div>
`
}

function createPanelStyle(): string {
    return `
:host {
  all: initial;
}

.ce-overlay,
.ce-overlay * {
  box-sizing: border-box;
  font-family: ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

.ce-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.56);
  z-index: 2147483647;
  padding: 24px;
}

.ce-panel {
  width: min(720px, 100%);
  max-height: calc(100vh - 48px);
  display: flex;
  flex-direction: column;
  background: #ffffff;
  color: #111111;
  border-radius: 10px;
  border: 1px solid #d9d9d9;
  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.3);
}

.ce-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 16px;
  border-bottom: 1px solid #e5e5e5;
}

.ce-header h2 {
  margin: 0;
  font-size: 16px;
  line-height: 1.2;
  font-weight: 700;
}

.ce-icon-btn {
  border: none;
  background: transparent;
  color: #333333;
  font-size: 22px;
  line-height: 1;
  cursor: pointer;
  padding: 4px;
}

.ce-body {
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.ce-group {
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.ce-row {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
}

.ce-row span {
  font-size: 13px;
  color: #222222;
}

.ce-row input[type="text"],
.ce-row input[type="number"],
.ce-row select {
  width: 320px;
  max-width: 60%;
  border: 1px solid #c7c7c7;
  border-radius: 6px;
  font-size: 13px;
  padding: 8px 10px;
  background: #fff;
  color: #111;
}

.ce-toggle-row input[type="checkbox"] {
  width: 18px;
  height: 18px;
}

.ce-subgroup {
  margin-top: 2px;
  border-top: 1px solid #f0f0f0;
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.ce-help {
  margin: 0;
  color: #555;
  font-size: 12px;
  line-height: 1.4;
}

.ce-meta-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.ce-meta-item {
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: 8px;
}

.ce-meta-item input {
  width: 100%;
  border: 1px solid #c7c7c7;
  border-radius: 6px;
  font-size: 13px;
  padding: 8px 10px;
}

.ce-remove-btn,
.ce-secondary-btn,
.ce-primary-btn {
  border-radius: 6px;
  font-size: 13px;
  padding: 8px 12px;
  cursor: pointer;
}

.ce-remove-btn,
.ce-secondary-btn {
  border: 1px solid #c7c7c7;
  background: #fff;
  color: #222;
}

.ce-primary-btn {
  border: 1px solid #0b57d0;
  background: #0b57d0;
  color: #fff;
}

.ce-footer {
  border-top: 1px solid #e5e5e5;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.ce-spacer {
  flex: 1;
}

@media (max-width: 760px) {
  .ce-overlay {
    align-items: flex-start;
    padding: 12px;
  }

  .ce-panel {
    max-height: calc(100vh - 24px);
  }

  .ce-row {
    align-items: flex-start;
    flex-direction: column;
  }

  .ce-row input[type="text"],
  .ce-row input[type="number"],
  .ce-row select {
    max-width: 100%;
    width: 100%;
  }

  .ce-meta-item {
    grid-template-columns: 1fr;
  }
}
`
}

function getPanelElements(shadow: ShadowRoot): PanelElements {
    const query = <T extends HTMLElement>(selector: string): T => {
        const element = shadow.querySelector<T>(selector)
        if (!element) throw new Error(`Missing settings panel element: ${selector}`)
        return element
    }

    return {
        backdrop: query<HTMLDivElement>('[data-ce-role="overlay"]'),
        closeButton: query<HTMLButtonElement>('[data-ce-role="close"]'),
        cancelButton: query<HTMLButtonElement>('[data-ce-role="cancel"]'),
        saveButton: query<HTMLButtonElement>('[data-ce-role="save"]'),
        resetButton: query<HTMLButtonElement>('[data-ce-role="reset"]'),
        languageSelect: query<HTMLSelectElement>('[data-ce-role="language"]'),
        formatInput: query<HTMLInputElement>('[data-ce-role="format"]'),
        exportAllLimitInput: query<HTMLInputElement>('[data-ce-role="export-all-limit"]'),
        enableTimestampInput: query<HTMLInputElement>('[data-ce-role="enable-timestamp"]'),
        timeStamp24HInput: query<HTMLInputElement>('[data-ce-role="timestamp-24h"]'),
        enableTimestampHTMLInput: query<HTMLInputElement>('[data-ce-role="timestamp-html"]'),
        enableTimestampMarkdownInput: query<HTMLInputElement>('[data-ce-role="timestamp-markdown"]'),
        enableMetaInput: query<HTMLInputElement>('[data-ce-role="enable-meta"]'),
        enableCopyTextShortcutInput: query<HTMLInputElement>('[data-ce-role="enable-copy-text-shortcut"]'),
        copyTextShortcutInput: query<HTMLInputElement>('[data-ce-role="copy-text-shortcut"]'),
        timestampOptions: query<HTMLDivElement>('[data-ce-role="timestamp-options"]'),
        metaOptions: query<HTMLDivElement>('[data-ce-role="meta-options"]'),
        shortcutOptions: query<HTMLDivElement>('[data-ce-role="shortcut-options"]'),
        metaList: query<HTMLDivElement>('[data-ce-role="meta-list"]'),
        addMetaButton: query<HTMLButtonElement>('[data-ce-role="meta-add"]'),
    }
}

export function buildSettingsPanelView(shadow: ShadowRoot): PanelElements {
    const styleElement = document.createElement('style')
    styleElement.textContent = createPanelStyle()

    const template = document.createElement('template')
    template.innerHTML = createPanelTemplate()

    shadow.append(styleElement, template.content.cloneNode(true))

    return getPanelElements(shadow)
}
