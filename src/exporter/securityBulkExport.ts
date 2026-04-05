/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

import { downloadZip } from 'client-zip'
import { normalizeSecurityFindingDocument } from '../security/normalizeFinding'
import { downloadFile, getFileNameWithFormat } from '../utils/download'
import { standardizeLineBreaks } from '../utils/text'
import {
    getSecurityFileNameOptions,
    securityDocumentToHtml,
    securityDocumentToJson,
    securityDocumentToMarkdown,
} from './securityDocument'
import type { ApiSecurityFinding } from '../api'
import type { SecurityFindingDocument } from '../security/model'
import type { ExportMeta } from '../ui/SettingContext'

type SecurityArchiveEntry = {
    input: Blob
    name: string
    size: number
}

function getSecurityFindingDocuments(findings: ApiSecurityFinding[]): SecurityFindingDocument[] {
    return findings.map((finding, index) => {
        const start = performance.now()
        const document = normalizeSecurityFindingDocument(finding)
        console.debug('[chatgpt-exporter] security archive normalized finding', {
            index,
            hid: finding.hid,
            title: document.title,
            durationMs: Math.round(performance.now() - start),
        })
        return document
    })
}

function addSecurityArchiveFile(
    files: SecurityArchiveEntry[],
    fileNameFormat: string,
    ext: string,
    document: SecurityFindingDocument,
    filenameMap: Map<string, number>,
    content: string,
): void {
    let fileName = getFileNameWithFormat(fileNameFormat, ext, getSecurityFileNameOptions(document))
    if (filenameMap.has(fileName)) {
        const count = filenameMap.get(fileName) ?? 1
        filenameMap.set(fileName, count + 1)
        fileName = `${fileName.slice(0, -(ext.length + 1))} (${count}).${ext}`
    }
    else {
        filenameMap.set(fileName, 1)
    }

    console.debug('[chatgpt-exporter] security archive add file', {
        fileName,
        ext,
        contentLength: content.length,
    })

    files.push({
        name: fileName,
        input: new Blob([content], { type: 'text/plain;charset=utf-8' }),
        size: new TextEncoder().encode(content).byteLength,
    })
}

async function downloadSecurityArchive(
    archiveName: string,
    files: SecurityArchiveEntry[],
): Promise<boolean> {
    const start = performance.now()
    console.debug('[chatgpt-exporter] security archive generate start', {
        archiveName,
        fileCount: files.length,
    })

    const metadata = files.map(({ name, input }) => ({
        name,
        size: input.size,
    }))
    const response = downloadZip(files, { metadata })
    const progressResponse = response.clone()
    const contentLength = progressResponse.headers.get('content-length')
    console.debug('[chatgpt-exporter] security archive response ready', {
        archiveName,
        contentLength,
    })

    const reader = progressResponse.body?.getReader()
    if (reader) {
        const expectedBytes = contentLength ? Number(contentLength) : null
        let bytesRead = 0
        let lastLoggedPercent = -1

        while (true) {
            const { done, value } = await reader.read()
            if (done) {
                break
            }

            bytesRead += value.byteLength
            const percent = expectedBytes && expectedBytes > 0
                ? Math.floor((bytesRead / expectedBytes) * 100)
                : null

            if (percent !== lastLoggedPercent) {
                lastLoggedPercent = percent ?? lastLoggedPercent
                console.debug('[chatgpt-exporter] security archive generate progress', {
                    archiveName,
                    bytesRead,
                    expectedBytes,
                    percent,
                })
            }
        }
    }

    const blob = await response.blob()
    console.debug('[chatgpt-exporter] security archive generate done', {
        archiveName,
        fileCount: files.length,
        blobSize: blob.size,
        durationMs: Math.round(performance.now() - start),
    })

    downloadFile(archiveName, 'application/zip', blob)
    console.debug('[chatgpt-exporter] security archive download dispatched', {
        archiveName,
        blobSize: blob.size,
    })
    return true
}

export async function exportAllSecurityFindingsToMarkdown(
    fileNameFormat: string,
    findings: ApiSecurityFinding[],
    metaList?: ExportMeta[],
): Promise<boolean> {
    const files: SecurityArchiveEntry[] = []
    const filenameMap = new Map<string, number>()

    getSecurityFindingDocuments(findings).forEach((document) => {
        const start = performance.now()
        const content = standardizeLineBreaks(securityDocumentToMarkdown(document, metaList))
        console.debug('[chatgpt-exporter] security archive rendered markdown', {
            title: document.title,
            bytes: content.length,
            durationMs: Math.round(performance.now() - start),
        })
        addSecurityArchiveFile(
            files,
            fileNameFormat,
            'md',
            document,
            filenameMap,
            content,
        )
    })

    return downloadSecurityArchive('chatgpt-security-findings-markdown.zip', files)
}

export async function exportAllSecurityFindingsToHtml(
    fileNameFormat: string,
    findings: ApiSecurityFinding[],
    metaList?: ExportMeta[],
): Promise<boolean> {
    const files: SecurityArchiveEntry[] = []
    const filenameMap = new Map<string, number>()

    getSecurityFindingDocuments(findings).forEach((document) => {
        const start = performance.now()
        const content = standardizeLineBreaks(securityDocumentToHtml(document, metaList))
        console.debug('[chatgpt-exporter] security archive rendered html', {
            title: document.title,
            bytes: content.length,
            durationMs: Math.round(performance.now() - start),
        })
        addSecurityArchiveFile(
            files,
            fileNameFormat,
            'html',
            document,
            filenameMap,
            content,
        )
    })

    return downloadSecurityArchive('chatgpt-security-findings-html.zip', files)
}

export async function exportAllSecurityFindingsToJson(
    fileNameFormat: string,
    findings: ApiSecurityFinding[],
): Promise<boolean> {
    const files: SecurityArchiveEntry[] = []
    const filenameMap = new Map<string, number>()

    getSecurityFindingDocuments(findings).forEach((document) => {
        const start = performance.now()
        const content = standardizeLineBreaks(securityDocumentToJson(document))
        console.debug('[chatgpt-exporter] security archive rendered json', {
            title: document.title,
            bytes: content.length,
            durationMs: Math.round(performance.now() - start),
        })
        addSecurityArchiveFile(
            files,
            fileNameFormat,
            'json',
            document,
            filenameMap,
            content,
        )
    })

    return downloadSecurityArchive('chatgpt-security-findings-json.zip', files)
}
