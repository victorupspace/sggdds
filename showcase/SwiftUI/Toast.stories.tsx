import type { Meta, StoryObj } from '@storybook/react-vite';

import { Toast } from '@government/design-system';

import { Showcase } from '../native-showcase';

const meta: Meta = {
  title: 'SwiftUI/Toast',
  parameters: { layout: 'fullscreen', componentCanvas: { width: 820 } },
};
export default meta;
type Story = StoryObj;

export const Overview: Story = {
  render: () => (
      <Showcase platform="SwiftUI" language="Swift" code={`DSToast(title: "Salvo", message: "Suas alterações foram salvas.",
          variant: .positive, onDismiss: { })
  DSToast(title: "Atualização", message: "Nova versão disponível.", variant: .information)`}>
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
