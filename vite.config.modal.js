import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/modal-player.js',
      name: 'GumletModalPlayer',
      formats: ['iife'],
      fileName: () => 'gumlet-modal-player.min.js',
    },
    minify: 'esbuild',
    sourcemap: false,
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
});
