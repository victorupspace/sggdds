import { cp, mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';
import dts from 'vite-plugin-dts';

import { buildTokens } from './scripts/tokens/transform-tokens';

function copyDesignTokenAssets() {
  return {
    buildStart: async () => {
      await buildTokens();

      if (process.exitCode === 1) {
        throw new Error('Design token build failed.');
      }
    },
    closeBundle: async () => {
      const assets = [
        {
          from: 'src/foundations/tokens/css/tokens.css',
          to: 'dist/tokens.css',
        },
        {
          from: 'src/foundations/tokens/build/tokens.json',
          to: 'dist/tokens.json',
        },
      ];

      await Promise.all(
        assets.map(async ({ from, to }) => {
          await mkdir(dirname(to), { recursive: true });
          await cp(from, to);
        }),
      );
    },
    name: 'copy-design-token-assets',
  };
}

export default defineConfig({
  plugins: [
    copyDesignTokenAssets(),
    react(),
    dts({
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      exclude: [
        'src/**/*.stories.tsx',
        'src/**/*.stories.ts',
        'src/**/*.test.tsx',
        'src/**/*.test.ts',
        'src/foundations/**/*.docs.tsx',
        'src/foundations/**/*.docs.ts',
      ],
      insertTypesEntry: true,
      tsconfigPath: './tsconfig.json',
    }),
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './tests/setup.ts',
    coverage: {
      reporter: ['text', 'html'],
    },
  },
});
