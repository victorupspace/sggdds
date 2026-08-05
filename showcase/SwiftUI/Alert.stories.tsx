import type { Meta, StoryObj } from '@storybook/react-vite';

import { Alert } from '@government/design-system';

import { Showcase } from '../native-showcase';

const meta: Meta = {
  title: 'SwiftUI/Alert',
  parameters: { layout: 'fullscreen', componentCanvas: { width: 820 } },
};
export default meta;
type Story = StoryObj;

export const Overview: Story = {
  render: () => (
    <Showcase
      platform="SwiftUI"
      language="Swift"
      code={`DSAlert(title: "Informação", message: "Mensagem informativa.", variant: .information)
  DSAlert(title: "Sucesso", message: "Operação concluída.", variant: .success)
  DSAlert(title: "Erro", message: "Algo deu errado.", variant: .error, onDismiss: { })`}
    >
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Alert variant="information" title="Informação">
          Mensagem informativa.
        </Alert>
        <Alert variant="success" title="Sucesso">
          Operação concluída.
        </Alert>
        <Alert variant="warning" title="Atenção">
          Reveja os dados.
        </Alert>
        <Alert variant="error" title="Erro" dismissible>
          Algo deu errado.
        </Alert>
      </div>
    </Showcase>
  ),
};
