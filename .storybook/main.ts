import type { StorybookConfig } from '@storybook/react-vite';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const configDir = dirname(fileURLToPath(import.meta.url));
const previewPath = resolve(configDir, 'preview.ts');

const config: StorybookConfig = {
  stories: [
    '../docs/**/*.mdx',
    '../packages/react/src/**/*.mdx',
    '../packages/react/src/**/*.stories.@(ts|tsx|mdx)',
  ],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y', '@storybook/addon-vitest'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  core: {
    allowedHosts: ['localhost', '127.0.0.1', '0.0.0.0'],
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
  viteFinal: async (viteConfig) => ({
    ...viteConfig,
    plugins: [
      ...(viteConfig.plugins ?? []),
      {
        name: 'sggd-storybook-preview',
        enforce: 'pre',
        resolveId(id) {
          if (id === '/.storybook/preview.ts') {
            return previewPath;
          }

          return null;
        },
      },
    ],
  }),
};

export default config;
