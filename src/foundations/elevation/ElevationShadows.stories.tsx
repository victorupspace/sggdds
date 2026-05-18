import type { Meta, StoryObj } from '@storybook/react-vite';

import { ElevationShadowsPage } from './elevation.docs';

const meta = {
  title: 'Foundations/Elevation/Shadows',
  component: ElevationShadowsPage,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ElevationShadowsPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Page: Story = {};
