import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.umd.ts'),
      name: 'ImgurClient',
      formats: ['umd'],
      fileName: () => 'imgur.umd.js',
    },
    outDir: 'dist',
    emptyOutDir: false, // do not wipe out the esm/cjs files
    rollupOptions: {
      output: {
        exports: 'default',
      },
    },
  },
});
