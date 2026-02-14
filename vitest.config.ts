import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true, // allow describe/it without importing
    environment: 'node', // matches your core package
    coverage: {
      include: ['packages/**/src/**/*.ts'],
      provider: 'v8',
      reporter: ['text', 'lcov'],
    },
  },
});
