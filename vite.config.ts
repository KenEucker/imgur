import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import path from 'path';

export default defineConfig({
  plugins: [dts()],
  build: {
    target: 'node16',
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
    },
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      external: ['axios', 'form-data', 'events'],
      output: {
        exports: 'named',
        globals: {
          // list any external deps you expect the consumer to provide
        },
      },
    },
  },
});
