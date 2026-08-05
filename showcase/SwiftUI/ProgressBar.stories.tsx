import type { Meta, StoryObj } from '@storybook/react-vite';

import { ProgressBar } from '@government/design-system';

import { Showcase } from '../native-showcase';

const meta: Meta = {
  title: 'SwiftUI/ProgressBar',
  parameters: { layout: 'fullscreen', componentCanvas: { width: 820 } },
};
export default meta;
type Story = StoryObj;

export const Overview: Story = {
  render: () => (
    <Showcase
      platform="SwiftUI"
      language="Swift"
      code={`DSProgressBar(value: 30, label: "Enviando", showValue: true)
  DSProgressBar(value: 70, variant: .success, showValue: true)
  DSProgressBar(mode: .indeterminate, label: "Processando")`}
    >
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <ProgressBar value={30} label="Enviando" showValue />
        <ProgressBar value={70} variant="success" showValue />
        <ProgressBar mode="indeterminate" label="Processando" />
      </div>
    </Showcase>
  ),
};
