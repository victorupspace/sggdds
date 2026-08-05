import type { Meta, StoryObj } from '@storybook/react-vite';

import { Divider } from '@government/design-system';

import { Showcase } from '../native-showcase';

const meta: Meta = {
  title: 'Android/Divider',
  parameters: { layout: 'fullscreen', componentCanvas: { width: 820 } },
};
export default meta;
type Story = StoryObj;

export const Overview: Story = {
  render: () => (
    <Showcase
      platform="Android"
      language="XML"
      code={`<br.gov.sggd.designsystem.components.DSDivider
      app:dsTone="default" />`}
    >
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <Divider tone="subtle" />
        <Divider tone="default" />
        <Divider tone="darker" />
      </div>
    </Showcase>
  ),
};
