import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../Button';
import { Modal } from './Modal';
import type { ModalProps } from './Modal.types';
import './Modal.stories.css';

/* Footer padrão do Figma: ação primária = secondary, demais = tertiary */
function DefaultFooter({ onClose }: { onClose: () => void }) {
  return (
    <>
      <Button onClick={onClose} variant="tertiary">
        Action 3
      </Button>
      <Button onClick={onClose} variant="tertiary">
        Action 2
      </Button>
      <Button onClick={onClose} variant="secondary">
        Action 1
      </Button>
    </>
  );
}

function ModalExample(args: ModalProps) {
  const [isOpen, setIsOpen] = useState(args.isOpen);

  return (
    <div className="modal-story-shell">
      <Button
        onClick={() => {
          setIsOpen(true);
        }}
        variant="secondary"
      >
        Abrir modal
      </Button>
      <Modal
        {...args}
        footer={
          args.footer ?? (
            <DefaultFooter
              onClose={() => {
                setIsOpen(false);
              }}
            />
          )
        }
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      />
    </div>
  );
}

const meta = {
  title: 'Web Components/Modal',
  component: Modal,
  parameters: {
    componentCanvas: {
      width: 1024,
    },
    docs: {
      description: {
        component: `
O Modal reproduz o layout do Figma (Web Components / Modal): diálogo sobreposto com backdrop modal/backdrop (preto a 48%), container branco com radius de 16 (modal/container) e seções separadas por modal/body/spacing/gap.

Tamanhos (Size no Figma): small (440px, confirmações), medium (600px, formulários), large (960px, conteúdo denso) e extended (1200px, visões de dados).

Anatomia:
- Botão de fechar: Icon Button Ghost de 40px no canto superior direito com o ícone close [outlined] exportado.
- Header: título Title/Medium Sm (SemiBold 18, modal/header/color/text) com borda modal/header/color/border e Subheader Slot opcional.
- Content Slot (children): corpo em Body/Medium com os paddings modal/body/spacing.
- Footer Slot: componha com os Buttons do DS — ação primária = secondary, dispensar = tertiary, como na documentação do Figma (gap modal/footer/spacing/gap).

Responsividade (Mobile=True no Figma): abaixo de 768px, small e medium viram bottom sheet ancorado na base com os botões do footer empilhados em largura total; large permanece centralizado.

Acessibilidade: role dialog com aria-modal, aria-labelledby/describedby, focus trap, Escape e clique no backdrop fecham (configuráveis), scroll do body bloqueado e foco devolvido ao elemento de origem.
`,
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'Classe CSS opcional aplicada ao overlay.',
    },
    closeLabel: {
      control: 'text',
      description: 'Rótulo acessível do botão de fechar.',
    },
    closeOnEsc: {
      control: 'boolean',
      description: 'Fecha ao pressionar Escape.',
    },
    closeOnOverlayClick: {
      control: 'boolean',
      description: 'Fecha ao clicar no backdrop.',
    },
    footer: {
      control: false,
      description: 'Footer Slot (componha com os Buttons do DS).',
    },
    isOpen: {
      control: 'boolean',
      description: 'Controla a exibição do modal.',
    },
    onClose: {
      control: false,
      description: 'Callback chamado ao fechar.',
    },
    size: {
      control: 'select',
      description: 'Size no Figma: small, medium, large ou extended.',
      options: ['small', 'medium', 'large', 'extended'],
    },
    subheader: {
      control: 'text',
      description: 'Subheader Slot opcional abaixo do título.',
    },
    title: {
      control: 'text',
      description: 'Título do modal (conciso, descreve a ação).',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <p>Body content</p>,
    isOpen: true,
    onClose: () => undefined,
    title: 'Title',
  },
  render: (args) => <ModalExample {...args} />,
};

export const Medium: Story = {
  args: {
    children: <p>Body content</p>,
    isOpen: true,
    onClose: () => undefined,
    size: 'medium',
    title: 'Title',
  },
  render: (args) => <ModalExample {...args} />,
};

export const Large: Story = {
  args: {
    children: <p>Body content</p>,
    isOpen: true,
    onClose: () => undefined,
    size: 'large',
    title: 'Title',
  },
  render: (args) => <ModalExample {...args} />,
};

export const Extended: Story = {
  args: {
    children: <p>Body content</p>,
    isOpen: true,
    onClose: () => undefined,
    size: 'extended',
    title: 'Title',
  },
  render: (args) => <ModalExample {...args} />,
};

export const WithSubheader: Story = {
  args: {
    children: <p>Confira os dados antes de confirmar o envio da solicitação.</p>,
    isOpen: true,
    onClose: () => undefined,
    subheader: 'Suas mudanças serão aplicadas imediatamente.',
    title: 'Salvar alterações',
  },
  render: (args) => <ModalExample {...args} />,
};

export const WithoutFooter: Story = {
  args: {
    children: <p>Conteúdo informativo sem ações no rodapé.</p>,
    footer: <span />,
    isOpen: true,
    onClose: () => undefined,
    title: 'Detalhes do pedido',
  },
  render: (args) => (
    <div className="modal-story-shell">
      <Modal {...args} footer={undefined} />
    </div>
  ),
};
