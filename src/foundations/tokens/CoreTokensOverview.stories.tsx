import type { Meta, StoryObj } from '@storybook/react-vite';

import { CoreTokensOverviewPage } from './core-tokens.docs';

const meta = {
  title: 'Foundations/Overview',
  component: CoreTokensOverviewPage,
  parameters: {
    docs: {
      description: {
        component:
          'Visao consolidada dos Core tokens SGGD importados do Figma e compilados pelo Style Dictionary.',
      },
    },
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CoreTokensOverviewPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Page: Story = {};
