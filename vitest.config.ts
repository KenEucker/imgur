import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'happy-dom', // or "jsdom"
    setupFiles: ['./src/mocks/vitest.setup.ts'],
    globals: true,
  },
});
