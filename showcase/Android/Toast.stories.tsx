import type { Meta, StoryObj } from '@storybook/react-vite';

import { Toast } from '@government/design-system';

import { Showcase } from '../native-showcase';

const meta: Meta = {
  title: 'Android/Toast',
  parameters: { layout: 'fullscreen', componentCanvas: { width: 820 } },
};
export default meta;
type Story = StoryObj;

export const Overview: Story = {
  render: () => (
    <Showcase
      platform="Android"
      language="XML"
      code={`<br.gov.sggd.designsystem.components.DSToast
      app:dsTitle="Salvo"
      app:dsMessage="Suas alterações foram salvas."
      app:dsToastVariant="positive" />`}
    >
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Toast variant="positive" title="Salvo" defaultOpen autoDismiss={false} dismissible>
          Suas alterações foram salvas.
        </Toast>
        <Toast variant="information" title="Atualização" defaultOpen autoDismiss={false}>
          Nova versão disponível.
        </Toast>
      </div>
    </Showcase>
  ),
};
