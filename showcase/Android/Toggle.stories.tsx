import type { Meta, StoryObj } from '@storybook/react-vite';

import { Toggle } from '@government/design-system';

import { Showcase } from '../native-showcase';

const meta: Meta = {
  title: 'Android/Toggle',
  parameters: { layout: 'fullscreen', componentCanvas: { width: 820 } },
};
export default meta;
type Story = StoryObj;

export const Overview: Story = {
  render: () => (
    <Showcase
      platform="Android"
      language="XML"
      code={`<br.gov.sggd.designsystem.components.DSToggle
      app:dsLabel="Notificações"
      app:dsChecked="true" />`}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Toggle label="Notificações" defaultChecked />
        <Toggle label="Modo escuro" hint="Aplica o tema escuro" />
        <Toggle label="Desabilitado" disabled />
      </div>
    </Showcase>
  ),
};
