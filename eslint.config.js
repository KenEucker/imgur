import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['src/**/*.js'],
    ignores: ['**/*.config.js', '!**/eslint.config.js'],
    rules: {
      semi: 'error',
    },

    ignores: [
      'lib/',
      'src/coverage/',
      'dist/',
      'vite.config.ts',
      'example',
      'imgur.js',
      'imgur.mjs',
    ],
  },
]);
