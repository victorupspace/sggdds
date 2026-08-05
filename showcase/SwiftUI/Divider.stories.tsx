import type { Meta, StoryObj } from '@storybook/react-vite';

import { Divider } from '@government/design-system';

import { Showcase } from '../native-showcase';

const meta: Meta = {
  title: 'SwiftUI/Divider',
  parameters: { layout: 'fullscreen', componentCanvas: { width: 820 } },
};
export default meta;
type Story = StoryObj;

export const Overview: Story = {
  render: () => (
    <Showcase
      platform="SwiftUI"
      language="Swift"
      code={`DSDivider(tone: .subtle)
  DSDivider(tone: .default)
  DSDivider(tone: .darker)`}
    >
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <Divider tone="subtle" />
        <Divider tone="default" />
        <Divider tone="darker" />
      </div>
    </Showcase>
  ),
};
