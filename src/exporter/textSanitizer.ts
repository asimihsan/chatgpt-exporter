import { standardizeLineBreaks } from '../utils/text'

export type UnicodeNormalizationMode = 'none' | 'NFC' | 'NFKC' | 'NFD' | 'NFKD'

export interface SanitizeTextOptions {
    normalization?: UnicodeNormalizationMode
    replaceQuotes?: boolean
    replaceDashes?: boolean
    replaceEllipsis?: boolean
    normalizeLineBreaks?: boolean
    normalizeSpaces?: boolean
    collapseSpaces?: boolean
    removeSoftHyphen?: boolean
    removeZeroWidth?: boolean
    preserveEmojiZWJ?: boolean
    removeBidiControls?: boolean
    removeC0Controls?: boolean
    stripChatGptUtmSourceFromMarkdownLinks?: boolean
}

export interface SuspiciousChar {
    char: string
    codePoint: string
}

export const DEFAULT_SANITIZE_TEXT_OPTIONS: Required<SanitizeTextOptions> = {
    normalization: 'NFKC',
    replaceQuotes: true,
    replaceDashes: true,
    replaceEllipsis: true,
    normalizeLineBreaks: true,
    normalizeSpaces: true,
    collapseSpaces: false,
    removeSoftHyphen: true,
    removeZeroWidth: true,
    preserveEmojiZWJ: true,
    removeBidiControls: true,
    removeC0Controls: false,
    stripChatGptUtmSourceFromMarkdownLinks: true,
}

const SUSPICIOUS_CHAR_REGEX =
    /[\u0085\u00A0\u00AB\u00AD\u00BB\u02BC\u061C\u2000-\u200F\u2010-\u201F\u2026\u2028\u2029\u202A-\u202E\u2032\u2033\u205F\u2060\u2066-\u2069\u2212\u3000\u301D-\u301F\uFE58\uFE63\uFEFF\uFF02\uFF07\uFF0D]/gu

const ODD_LINE_BREAKS_REGEX = /[\u0085\u2028\u2029]/gu
const ELLIPSIS_REGEX = /\u2026/gu
const DASHES_REGEX = /[\u2010-\u2015\u2212\uFE58\uFE63\uFF0D]/gu
const SINGLE_QUOTES_REGEX = /[\u2018\u2019\u201A\u201B\u2032\u02BC\uFF07]/gu
const DOUBLE_QUOTES_REGEX = /[\u201C\u201D\u201E\u201F\u2033\u00AB\u00BB\u301D-\u301F\uFF02]/gu
const ODD_SPACES_REGEX = /[\u00A0\u202F\u2000-\u200A\u205F\u3000]/gu
const SPACE_RUNS_REGEX = / {2,}/gu
const SOFT_HYPHEN_REGEX = /\u00AD/gu
const ZERO_WIDTH_REGEX = /(?:\u200B|\u200C|\u200D|\u2060|\uFEFF)/gu
const ZERO_WIDTH_NO_ZWJ_REGEX = /(?:\u200B|\u200C|\u2060|\uFEFF)/gu
const BIDI_CONTROLS_REGEX = /[\u061C\u200E\u200F\u202A-\u202E\u2066-\u2069]/gu
const MARKDOWN_LINK_URL_REGEX = /(\[[^\]]+\]\(\s*<?)([^>\s)]+)(>?(?:\s+(?:"[^"]*"|'[^']*'|\([^)]+\)))?\s*\))/gu
const CHATGPT_UTM_SOURCE_AT_END_REGEX = /(?:\?|&)utm_source=chatgpt\.com$/

export function resolveSanitizeTextOptions(options: SanitizeTextOptions = {}): Required<SanitizeTextOptions> {
    return {
        ...DEFAULT_SANITIZE_TEXT_OPTIONS,
        ...options,
    }
}

function toCodePointString(char: string): string {
    const codePoint = char.codePointAt(0)
    if (codePoint === undefined) return ''

    return `U+${codePoint.toString(16).toUpperCase().padStart(4, '0')}`
}

function isRemovableC0Control(codeUnit: number): boolean {
    if (codeUnit === 0x09 || codeUnit === 0x0A || codeUnit === 0x0D) return false
    return (codeUnit >= 0x00 && codeUnit <= 0x1F) || codeUnit === 0x7F
}

function removeC0ControlCharacters(input: string): string {
    let segments: string[] | undefined
    let segmentStart = 0

    for (let index = 0; index < input.length; index++) {
        const codeUnit = input.charCodeAt(index)
        if (!isRemovableC0Control(codeUnit)) continue

        if (segments === undefined) {
            segments = []
        }

        if (segmentStart < index) {
            segments.push(input.slice(segmentStart, index))
        }

        segmentStart = index + 1
    }

    if (segments === undefined) return input
    if (segmentStart < input.length) {
        segments.push(input.slice(segmentStart))
    }

    return segments.join('')
}

function stripChatGptUtmSourceFromMarkdownLinks(input: string): string {
    return input.replaceAll(MARKDOWN_LINK_URL_REGEX, (match, prefix: string, urlText: string, suffix: string) => {
        if (!CHATGPT_UTM_SOURCE_AT_END_REGEX.test(urlText)) return match

        try {
            const parsed = new URL(urlText)
            if (parsed.searchParams.get('utm_source') !== 'chatgpt.com') return match

            parsed.searchParams.delete('utm_source')
            const serialized = parsed.toString()
            if (!serialized) return match

            return `${prefix}${serialized}${suffix}`
        }
        catch {
            return match
        }
    })
}

export function sanitizeLLMText(input: string, options: SanitizeTextOptions = {}): string {
    const resolved = resolveSanitizeTextOptions(options)
    let output = input

    if (resolved.normalization !== 'none') {
        output = output.normalize(resolved.normalization)
    }

    if (resolved.normalizeLineBreaks) {
        output = standardizeLineBreaks(output)
        output = output.replaceAll(ODD_LINE_BREAKS_REGEX, '\n')
    }

    if (resolved.replaceEllipsis) {
        output = output.replaceAll(ELLIPSIS_REGEX, '...')
    }

    if (resolved.replaceDashes) {
        output = output.replaceAll(DASHES_REGEX, '-')
    }

    if (resolved.replaceQuotes) {
        output = output
            .replaceAll(SINGLE_QUOTES_REGEX, "'")
            .replaceAll(DOUBLE_QUOTES_REGEX, '"')
    }

    if (resolved.normalizeSpaces) {
        output = output.replaceAll(ODD_SPACES_REGEX, ' ')
    }

    if (resolved.collapseSpaces) {
        output = output.replaceAll(SPACE_RUNS_REGEX, ' ')
    }

    if (resolved.removeSoftHyphen) {
        output = output.replaceAll(SOFT_HYPHEN_REGEX, '')
    }

    if (resolved.removeZeroWidth) {
        output = output.replaceAll(resolved.preserveEmojiZWJ ? ZERO_WIDTH_NO_ZWJ_REGEX : ZERO_WIDTH_REGEX, '')
    }

    if (resolved.removeBidiControls) {
        output = output.replaceAll(BIDI_CONTROLS_REGEX, '')
    }

    if (resolved.removeC0Controls) {
        output = removeC0ControlCharacters(output)
    }

    if (resolved.stripChatGptUtmSourceFromMarkdownLinks) {
        output = stripChatGptUtmSourceFromMarkdownLinks(output)
    }

    return output
}

export function findSuspiciousChars(input: string): SuspiciousChar[] {
    const seen = new Set<string>()
    const suspiciousChars: SuspiciousChar[] = []
    const regex = new RegExp(SUSPICIOUS_CHAR_REGEX.source, SUSPICIOUS_CHAR_REGEX.flags)

    let match: RegExpExecArray | null
    while ((match = regex.exec(input)) !== null) {
        const char = match[0]
        if (seen.has(char)) continue
        seen.add(char)
        suspiciousChars.push({
            char,
            codePoint: toCodePointString(char),
        })
    }

    return suspiciousChars
}
