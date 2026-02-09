/**
 * Copyright 2026 Asim Ihsan
 * SPDX-License-Identifier: MPL-2.0
 */

import path from 'node:path'
import { fileURLToPath } from 'node:url'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import baseConfig from './eslint.config.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default [
    ...baseConfig,
    {
        files: ['src/**/*.{ts,tsx}'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: ['./tsconfig.json'],
                tsconfigRootDir: __dirname,
            },
        },
        plugins: {
            '@typescript-eslint': tsPlugin,
        },
        rules: {
            '@typescript-eslint/no-floating-promises': 'error',
            '@typescript-eslint/no-misused-promises': 'error',
            '@typescript-eslint/await-thenable': 'error',
        },
    },
]
