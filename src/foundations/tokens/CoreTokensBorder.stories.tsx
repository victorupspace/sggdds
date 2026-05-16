import type { Meta, StoryObj } from '@storybook/react-vite';

import { CoreTokensBorderPage } from './core-tokens.docs';

const meta = {
  title: 'Foundations/Core Tokens/Border',
  component: CoreTokensBorderPage,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CoreTokensBorderPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Page: Story = {};
