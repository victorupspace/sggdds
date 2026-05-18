import type { Meta, StoryObj } from '@storybook/react-vite';

import { CoreTokensBreakpointsPage } from './core-tokens.docs';

const meta = {
  title: 'Foundations/Breakpoints',
  component: CoreTokensBreakpointsPage,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CoreTokensBreakpointsPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Page: Story = {};
