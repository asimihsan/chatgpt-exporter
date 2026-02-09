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
    it('normalizes smart punctuation, odd spaces, and invisible controls by default', () => {
        const input = '“Spidey”—it’s 3–5pm… cost is −10%\u00A0ok\u200B\u00AD\u202E'
        expect(sanitizeLLMText(input)).toBe('"Spidey"-it\'s 3-5pm... cost is -10% ok')
    })

    it('normalizes line terminators to LF', () => {
        const input = 'a\r\nb\rc\u0085d\u2028e\u2029f'
        expect(sanitizeLLMText(input)).toBe('a\nb\nc\nd\ne\nf')
    })

    it('preserves emoji ZWJ by default and removes it when configured', () => {
        const emojiSequence = '👩\u200D💻'
        expect(sanitizeLLMText(emojiSequence)).toBe(emojiSequence)
        expect(sanitizeLLMText(emojiSequence, { preserveEmojiZWJ: false })).toBe('👩💻')
    })

    it('can collapse space runs after odd-space normalization', () => {
        const input = 'a\u00A0  \u2009b'
        expect(sanitizeLLMText(input, { collapseSpaces: true })).toBe('a b')
    })

    it('supports disabling normalization and enabling C0 control stripping', () => {
        expect(sanitizeLLMText('Ａ\u0007Ｂ', {
            normalization: 'none',
            removeC0Controls: true,
        })).toBe('ＡＢ')
    })

    it('keeps tab/newline/carriage-return while removing other C0 controls', () => {
        expect(sanitizeLLMText('A\tB\nC\rD\u0000\u007FE', {
            normalization: 'none',
            normalizeLineBreaks: false,
            removeC0Controls: true,
        })).toBe('A\tB\nC\rDE')
    })

    it('supports disabling transformation toggles', () => {
        const input = '“A”—B…\u00A0x\u00AD\u200B\u202E'
        expect(sanitizeLLMText(input, {
            normalization: 'none',
            replaceQuotes: false,
            replaceDashes: false,
            replaceEllipsis: false,
            normalizeLineBreaks: false,
            normalizeSpaces: false,
            removeSoftHyphen: false,
            removeZeroWidth: false,
            removeBidiControls: false,
        })).toBe(input)
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
