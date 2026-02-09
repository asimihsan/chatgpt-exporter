import { describe, expect, it } from 'vitest'
import {
    DEFAULT_SANITIZE_TEXT_OPTIONS,
    findSuspiciousChars,
    resolveSanitizeTextOptions,
    sanitizeLLMText,
} from './textSanitizer'

describe('resolveSanitizeTextOptions', () => {
    it('merges defaults with explicit overrides', () => {
        const resolved = resolveSanitizeTextOptions({
            normalization: 'none',
            preserveEmojiZWJ: false,
        })

        expect(resolved).toEqual({
            ...DEFAULT_SANITIZE_TEXT_OPTIONS,
            normalization: 'none',
            preserveEmojiZWJ: false,
        })
    })
})

describe('sanitizeLLMText', () => {
    it('applies configured normalization mode', () => {
        expect(sanitizeLLMText('ＡＢＣ')).toBe('ABC')
    })

    it('skips normalization when mode is none', () => {
        expect(sanitizeLLMText('ＡＢＣ', { normalization: 'none' })).toBe('ＡＢＣ')
    })
})

describe('findSuspiciousChars', () => {
    it('returns unique suspicious characters with code points in encounter order', () => {
        const suspicious = findSuspiciousChars('“Hi”—it’s…\u200B\u200B')

        expect(suspicious).toEqual([
            { char: '“', codePoint: 'U+201C' },
            { char: '”', codePoint: 'U+201D' },
            { char: '—', codePoint: 'U+2014' },
            { char: '’', codePoint: 'U+2019' },
            { char: '…', codePoint: 'U+2026' },
            { char: '\u200B', codePoint: 'U+200B' },
        ])
    })
})
