import type { Meta, StoryObj } from '@storybook/react-vite';

import { ProgressBar } from '@government/design-system';

import { Showcase } from '../native-showcase';

const meta: Meta = {
  title: 'Android/ProgressBar',
  parameters: { layout: 'fullscreen', componentCanvas: { width: 820 } },
};
export default meta;
type Story = StoryObj;

export const Overview: Story = {
  render: () => (
      <Showcase platform="Android" language="XML" code={`<br.gov.sggd.designsystem.components.DSProgressBar
      app:dsProgressVariant="success"
      app:dsProgress="70" />`}>
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 20 }}>
            <ProgressBar value={30} label="Enviando" showValue />
            <ProgressBar value={70} variant="success" showValue />
            <ProgressBar mode="indeterminate" label="Processando" />
          </div>
      </Showcase>
  ),
};
