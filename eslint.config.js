import eslintPluginAstro from 'eslint-plugin-astro'
import tsParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'

export default [
  ...eslintPluginAstro.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx'],
    languageOptions: {
      parser: tsParser,
    },
  },
  {
    // Specific config for Astro files
    files: ['**/*.astro'],
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
  },
  {
    ignores: ['dist/', '.astro/', 'pnpm-lock.yaml', 'package-lock.json'],
  },
]
