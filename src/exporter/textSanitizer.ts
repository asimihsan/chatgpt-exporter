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
}

const SUSPICIOUS_CHAR_REGEX =
    /[\u0085\u00A0\u00AB\u00AD\u00BB\u2000-\u200F\u2010-\u201F\u2026\u2028\u2029\u202A-\u202E\u2032\u2033\u205F\u2060\u2066-\u2069\u2212\u3000\u301D-\u301F\uFE58\uFE63\uFEFF\uFF02\uFF07\uFF0D]/gu

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

/**
 * P2 scaffolding: only normalization is applied here.
 * Additional replacement/removal stages are implemented in P3.
 */
export function sanitizeLLMText(input: string, options: SanitizeTextOptions = {}): string {
    const resolved = resolveSanitizeTextOptions(options)
    if (resolved.normalization === 'none') return input

    return input.normalize(resolved.normalization)
}

export function findSuspiciousChars(input: string): SuspiciousChar[] {
    const matches = input.match(SUSPICIOUS_CHAR_REGEX) ?? []
    const seen = new Set<string>()
    const suspiciousChars: SuspiciousChar[] = []

    for (const char of matches) {
        if (seen.has(char)) continue
        seen.add(char)
        suspiciousChars.push({
            char,
            codePoint: toCodePointString(char),
        })
    }

    return suspiciousChars
}
