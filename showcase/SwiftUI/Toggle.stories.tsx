import type { Meta, StoryObj } from '@storybook/react-vite';

import { Toggle } from '@government/design-system';

import { Showcase } from '../native-showcase';

const meta: Meta = {
  title: 'SwiftUI/Toggle',
  parameters: { layout: 'fullscreen', componentCanvas: { width: 820 } },
};
export default meta;
type Story = StoryObj;

export const Overview: Story = {
  render: () => (
    <Showcase
      platform="SwiftUI"
      language="Swift"
      code={`DSToggle("Notificações", isOn: $notifications)
  DSToggle("Modo escuro", isOn: $dark, hint: "Aplica o tema escuro")`}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Toggle label="Notificações" defaultChecked />
        <Toggle label="Modo escuro" hint="Aplica o tema escuro" />
        <Toggle label="Desabilitado" disabled />
      </div>
    </Showcase>
  ),
};
