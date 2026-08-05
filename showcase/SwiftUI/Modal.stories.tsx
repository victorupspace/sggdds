import type { Meta, StoryObj } from '@storybook/react-vite';

import { useState } from 'react';

import { Modal, Button } from '@government/design-system';

import { Showcase } from '../native-showcase';

const meta: Meta = {
  title: 'SwiftUI/Modal',
  parameters: { layout: 'fullscreen', componentCanvas: { width: 820 } },
};
export default meta;
type Story = StoryObj;

function Demo() {
  const [open, setOpen] = useState(false);
  return (
    <Showcase
      platform="SwiftUI"
      language="Swift"
      code={`.dsModal(isOpen: $isOpen, title: "Confirmar ação",
           subtitle: "Esta ação não pode ser desfeita.",
           actions: [
               .init(label: "Cancelar", variant: .tertiary) { isOpen = false },
               .init(label: "Confirmar", variant: .primary) { isOpen = false },
           ]) {
      Text("Conteúdo do modal.")
  }`}
    >
      <div>
        <Button
          onClick={() => {
            setOpen(true);
          }}
        >
          Abrir modal
        </Button>
        <Modal
          isOpen={open}
          onClose={() => {
            setOpen(false);
          }}
          title="Confirmar ação"
          subtitle="Esta ação não pode ser desfeita."
          actions={[
            {
              label: 'Cancelar',
              variant: 'tertiary',
              onClick: () => {
                setOpen(false);
              },
            },
            {
              label: 'Confirmar',
              variant: 'primary',
              onClick: () => {
                setOpen(false);
              },
            },
          ]}
        >
          <p>Conteúdo do modal.</p>
        </Modal>
      </div>
    </Showcase>
  );
}

export const Overview: Story = {
  render: () => <Demo />,
};
