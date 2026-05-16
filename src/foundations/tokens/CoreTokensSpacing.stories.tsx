import type { Meta, StoryObj } from '@storybook/react-vite';

import { CoreTokensSpacingPage } from './core-tokens.docs';

const meta = {
  title: 'Foundations/Core Tokens/Spacing',
  component: CoreTokensSpacingPage,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CoreTokensSpacingPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Page: Story = {};
