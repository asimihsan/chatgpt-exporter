/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it } from 'vitest'
import { getPageContext } from './pageContext'

describe('pageContext', () => {
    it('classifies private conversations', () => {
        expect(getPageContext('/c/abc-123')).toMatchObject({
            kind: 'conversation',
            chatId: 'abc-123',
            isSharePage: false,
            isShareContinuePage: false,
        })
    })

    it('classifies gizmo conversations', () => {
        expect(getPageContext('/g/g-123/c/abc-123')).toMatchObject({
            kind: 'conversation',
            chatId: 'abc-123',
        })
    })

    it('classifies share pages as conversations', () => {
        expect(getPageContext('/share/shared-123')).toMatchObject({
            kind: 'conversation',
            chatId: 'shared-123',
            isSharePage: true,
            isShareContinuePage: false,
        })
    })

    it('keeps share continue pages in the conversation path but marks them excluded from share mounting', () => {
        expect(getPageContext('/share/shared-123/continue')).toMatchObject({
            kind: 'conversation',
            chatId: 'shared-123',
            isSharePage: false,
            isShareContinuePage: true,
        })
    })

    it('classifies security finding detail routes', () => {
        expect(getPageContext('/codex/security/findings/17b5fd57ec1c8191833dd8b866a0bd9e')).toMatchObject({
            kind: 'security-finding',
            findingId: '17b5fd57ec1c8191833dd8b866a0bd9e',
        })
    })

    it('classifies security scan routes', () => {
        expect(getPageContext('/codex/security/scans/github-123456789')).toMatchObject({
            kind: 'security-scan',
            repoId: 'github-123456789',
        })
    })

    it('classifies findings list routes as non-exportable list pages', () => {
        expect(getPageContext('/codex/security/findings')).toMatchObject({
            kind: 'security-findings-list',
        })
    })

    it('fails closed for nested finding routes that are not supported in phase 1', () => {
        expect(getPageContext('/codex/security/findings/abc123/patch')).toMatchObject({
            kind: 'unsupported',
        })
    })

    it('fails closed for nested scan routes that are not supported in phase 1', () => {
        expect(getPageContext('/codex/security/scans/github-123456789/threat-model')).toMatchObject({
            kind: 'unsupported',
        })
    })

    it('treats unrelated pages as unsupported', () => {
        expect(getPageContext('/gpts')).toMatchObject({
            kind: 'unsupported',
        })
    })
})
