import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import tseslint from 'typescript-eslint';

export default defineConfig(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  prettierRecommended,
  {
    ignores: ['**/node_modules/**', '**/dist/**'],
  },
  {
    files: ['packages/*/src/**/*.ts'],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.eslint.json', './packages/*/tsconfig.json'],
      },
    },
  }
);
