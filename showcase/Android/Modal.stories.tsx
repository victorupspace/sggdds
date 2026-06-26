import type { Meta, StoryObj } from '@storybook/react-vite';

import { useState } from 'react';

import { Modal, Button } from '@government/design-system';

import { Showcase } from '../native-showcase';

const meta: Meta = {
  title: 'Android/Modal',
  parameters: { layout: 'fullscreen', componentCanvas: { width: 820 } },
};
export default meta;
type Story = StoryObj;

function Demo() {
  const [open, setOpen] = useState(false);
  return (
      <Showcase platform="Android" language="Kotlin" code={`DSModal(context)
      .setTitle("Confirmar ação")
      .setSubtitle("Esta ação não pode ser desfeita.")
      .addAction("Cancelar", DSButton.Variant.TERTIARY) { it.dismiss() }
      .addAction("Confirmar", DSButton.Variant.PRIMARY) { it.dismiss() }
      .show()`}>
        <div>
            <Button onClick={() => { setOpen(true); }}>Abrir modal</Button>
            <Modal
              isOpen={open}
              onClose={() => { setOpen(false); }}
              title="Confirmar ação"
              subtitle="Esta ação não pode ser desfeita."
              actions={[
                { label: 'Cancelar', variant: 'tertiary', onClick: () => { setOpen(false); } },
                { label: 'Confirmar', variant: 'primary', onClick: () => { setOpen(false); } },
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
