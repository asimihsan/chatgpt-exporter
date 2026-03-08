/**
 * Copyright 2022-Present Pionxzh
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0 AND MIT
 */

import js from '@eslint/js'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import globals from 'globals'
import importPlugin from 'eslint-plugin-import-x'
import regexpPlugin from 'eslint-plugin-regexp'
import reactHooks from 'eslint-plugin-react-hooks'

export default [
    {
        ignores: [
            '*.md',
            '.release-please-manifest.json',
            'dist/**',
            'node_modules/**',
        ],
    },
    js.configs.recommended,
    {
        files: ['**/*.{js,jsx,ts,tsx,mjs,cjs}'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
        },
    },
    {
        files: ['src/**/*.{js,jsx,ts,tsx}'],
        languageOptions: {
            globals: {
                ...globals.browser,
            },
        },
        plugins: {
            import: importPlugin,
            regexp: regexpPlugin,
        },
        rules: {
            'no-alert': 'off',
            // Phase L5 promoted set: high-signal import hygiene checks.
            'import/no-duplicates': 'error',
            'import/no-self-import': 'error',
            'import/no-useless-path-segments': 'error',
            // Phase L5 promoted set: high-signal regex safety checks.
            'regexp/no-dupe-characters-character-class': 'error',
            'regexp/no-empty-character-class': 'error',
            'regexp/no-invalid-regexp': 'error',
            'regexp/no-super-linear-backtracking': 'error',
            'regexp/no-useless-flag': 'error',
        },
    },
    {
        files: [
            'eslint.config.js',
            'vite.config.ts',
            '**/*.config.{js,ts,mjs,cjs}',
            'scripts/**/*.{js,ts,mjs,cjs}',
        ],
        languageOptions: {
            globals: {
                ...globals.node,
            },
        },
    },
    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        plugins: {
            '@typescript-eslint': tsPlugin,
        },
        rules: {
            // Baseline TypeScript lint rules that do not require type-aware parser settings.
            ...tsPlugin.configs.recommended.rules,
            'no-undef': 'off',
            'no-unused-vars': 'off',
            // Existing codebase currently relies on these patterns; tighten in a dedicated cleanup pass.
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-empty-object-type': 'off',
            '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
            '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
        },
    },
    {
        files: ['**/*.{jsx,tsx}'],
        plugins: {
            'react-hooks': reactHooks,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            'react-hooks/purity': 'off',
        },
    },
]
