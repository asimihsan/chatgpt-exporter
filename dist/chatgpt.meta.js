// ==UserScript==
// @name               ChatGPT Exporter
// @name:zh-CN         ChatGPT Exporter
// @name:zh-TW         ChatGPT Exporter
// @namespace          asimihsan
// @version            2.29.11
// @author             asimihsan
// @description        Easily export the whole ChatGPT conversation history for further analysis or sharing.
// @description:zh-CN  轻松导出 ChatGPT 聊天记录，以便进一步分析或分享。
// @description:zh-TW  輕鬆匯出 ChatGPT 聊天紀錄，以便進一步分析或分享。
// @license            MPL-2.0 AND MIT
// @icon               https://chat.openai.com/favicon.ico
// @homepage           https://github.com/asimihsan/chatgpt-exporter
// @homepageURL        https://github.com/asimihsan/chatgpt-exporter
// @source             https://github.com/asimihsan/chatgpt-exporter.git
// @supportURL         https://github.com/asimihsan/chatgpt-exporter/issues
// @downloadURL        https://raw.githubusercontent.com/asimihsan/chatgpt-exporter/master/dist/chatgpt.user.js
// @updateURL          https://raw.githubusercontent.com/asimihsan/chatgpt-exporter/master/dist/chatgpt.meta.js
// @match              https://chat.openai.com/
// @match              https://chat.openai.com/?model=*
// @match              https://chat.openai.com/c/*
// @match              https://chat.openai.com/g/*
// @match              https://chat.openai.com/gpts
// @match              https://chat.openai.com/gpts/*
// @match              https://chat.openai.com/share/*
// @match              https://chat.openai.com/share/*/continue
// @match              https://chat.openai.com/codex/security/*
// @match              https://chatgpt.com/
// @match              https://chatgpt.com/?model=*
// @match              https://chatgpt.com/c/*
// @match              https://chatgpt.com/g/*
// @match              https://chatgpt.com/gpts
// @match              https://chatgpt.com/gpts/*
// @match              https://chatgpt.com/share/*
// @match              https://chatgpt.com/share/*/continue
// @match              https://chatgpt.com/codex/security/*
// @match              https://new.oaifree.com/
// @match              https://new.oaifree.com/?model=*
// @match              https://new.oaifree.com/c/*
// @match              https://new.oaifree.com/g/*
// @match              https://new.oaifree.com/gpts
// @match              https://new.oaifree.com/gpts/*
// @match              https://new.oaifree.com/share/*
// @match              https://new.oaifree.com/share/*/continue
// @match              https://new.oaifree.com/codex/security/*
// @require            https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js
// @require            https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js
// @grant              GM.registerMenuCommand
// @grant              GM_deleteValue
// @grant              GM_getValue
// @grant              GM_registerMenuCommand
// @grant              GM_setValue
// @grant              unsafeWindow
// @run-at             document-end
// ==/UserScript==