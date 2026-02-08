import js from '@eslint/js'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import globals from 'globals'
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
        rules: {
            'no-alert': 'off',
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
