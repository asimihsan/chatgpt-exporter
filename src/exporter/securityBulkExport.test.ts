/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

// @vitest-environment jsdom

import JSZip from 'jszip'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import {
    exportAllSecurityFindingsToHtml,
    exportAllSecurityFindingsToJson,
    exportAllSecurityFindingsToMarkdown,
} from './securityBulkExport'
import type { ApiSecurityFinding } from '../api'
import type * as ConstantsModule from '../constants'
import type * as DownloadUtilsModule from '../utils/download'

const { downloadFileMock } = vi.hoisted(() => ({
    downloadFileMock: vi.fn(),
}))

vi.mock('vite-plugin-monkey/dist/client', () => ({
    unsafeWindow: globalThis.window,
}))

vi.mock('../constants', async () => {
    const actual = await vi.importActual('../constants') as typeof ConstantsModule
    return {
        ...actual,
        baseUrl: 'https://chatgpt.com',
        apiUrl: 'https://chatgpt.com/backend-api',
    }
})

vi.mock('../utils/download', async () => {
    const actual = await vi.importActual('../utils/download') as typeof DownloadUtilsModule
    return {
        ...actual,
        downloadFile: downloadFileMock,
    }
})

function createFinding(overrides: Partial<ApiSecurityFinding> = {}): ApiSecurityFinding {
    return {
        id: 'finding-id',
        hid: 'finding-123',
        repo_id: 'github-123456789',
        repo_url: 'https://github.com/example/example-repo',
        scan_id: 'scan-id',
        configured_scan_id: 'configured-scan-id',
        status: 'new',
        criticality: 'high',
        created_at: '2026-03-09T14:20:07.947627Z',
        updated_at: '2026-03-10T21:21:21.406463Z',
        commit_analysis: {
            title: 'Repeated finding title',
            description: 'Finding description.',
        },
        ...overrides,
    } as ApiSecurityFinding
}

async function getArchiveFileNames(): Promise<string[]> {
    const blob = downloadFileMock.mock.calls.at(-1)?.[2] as Blob
    const zip = await JSZip.loadAsync(blob)
    return Object.keys(zip.files).sort()
}

describe('securityBulkExport', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('exports markdown findings as a zip with deduplicated file names', async () => {
        await exportAllSecurityFindingsToMarkdown('{title}', [
            createFinding({ hid: 'finding-1' }),
            createFinding({ hid: 'finding-2' }),
        ])

        expect(downloadFileMock).toHaveBeenCalledWith('chatgpt-security-findings-markdown.zip', 'application/zip', expect.any(Blob))
        await expect(getArchiveFileNames()).resolves.toEqual([
            'Repeated_finding_title (1).md',
            'Repeated_finding_title.md',
        ])
    })

    it('exports html findings as a zip', async () => {
        await exportAllSecurityFindingsToHtml('{title}', [
            createFinding({ hid: 'finding-1' }),
        ])

        expect(downloadFileMock).toHaveBeenCalledWith('chatgpt-security-findings-html.zip', 'application/zip', expect.any(Blob))
        await expect(getArchiveFileNames()).resolves.toEqual([
            'Repeated_finding_title.html',
        ])
    })

    it('exports raw finding payloads as json files in a zip', async () => {
        await exportAllSecurityFindingsToJson('{title}', [
            createFinding({ hid: 'finding-1', extra_field: 'kept' } as Partial<ApiSecurityFinding>),
        ])

        expect(downloadFileMock).toHaveBeenCalledWith('chatgpt-security-findings-json.zip', 'application/zip', expect.any(Blob))
        await expect(getArchiveFileNames()).resolves.toEqual([
            'Repeated_finding_title.json',
        ])
    })
})
