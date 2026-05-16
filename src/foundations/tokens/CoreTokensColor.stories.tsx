import type { Meta, StoryObj } from '@storybook/react-vite';

import { CoreTokensColorPage } from './core-tokens.docs';

const meta = {
  title: 'Foundations/Core Tokens/Color',
  component: CoreTokensColorPage,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CoreTokensColorPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Page: Story = {};
