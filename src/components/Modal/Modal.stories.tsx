import type { Meta, StoryObj } from '@storybook/react-vite';

import './Modal.stories.css';

import { Button } from '../Button';
import { TextInput } from '../TextInput';
import { Modal } from './Modal';
import type { ModalSize } from './Modal.types';

const sizes: ModalSize[] = ['sm', 'md', 'lg', 'full'];

function ModalExample({
  closeOnEsc = true,
  closeOnOverlayClick = true,
  size = 'md',
}: {
  closeOnEsc?: boolean;
  closeOnOverlayClick?: boolean;
  size?: ModalSize;
}) {
  return (
    <div className="ds-modal-storybook-shell">
      <Modal
        className="ds-modal-storybook-fit"
        closeOnEsc={closeOnEsc}
        closeOnOverlayClick={closeOnOverlayClick}
        footer={
          <>
            <Button variant="tertiary">Cancelar</Button>
            <Button>Confirmar</Button>
          </>
        }
        isOpen
        onClose={() => undefined}
        size={size}
        title="Confirmar solicitacao"
      >
        <p>
          Revise as informacoes antes de enviar. Depois da confirmacao, o protocolo sera gerado e
          ficara disponivel para acompanhamento.
        </p>
        <TextInput
          helperText="Inclua um contexto curto, se necessario."
          label="Observacao opcional"
          placeholder="Descreva se necessario"
        />
      </Modal>
    </div>
  );
}

const meta = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    componentCanvas: {
      width: 960,
    },
    docs: {
      description: {
        component: `
O Modal exibe uma janela centralizada sobre overlay para fluxos que exigem atencao imediata.

Anatomia:
- Overlay com escurecimento e blur.
- Dialog com superficie elevada, header, area de conteudo e footer opcional.
- Header com titulo obrigatorio e botao de fechar.
- Corpo rolavel quando o conteudo ultrapassa a altura disponivel.
- Footer opcional para acoes primarias e secundarias.
- Tamanhos sm, md, lg e full para acomodar diferentes densidades de conteudo.

Comportamento:
- Foco inicial entra no modal e permanece preso enquanto aberto.
- Escape fecha por padrao, configuravel com closeOnEsc.
- Clique no overlay fecha por padrao, configuravel com closeOnOverlayClick.
- Scroll do body fica bloqueado enquanto o modal esta aberto.
- Ao fechar, o foco retorna para o elemento que estava ativo antes da abertura.
- No mobile, o dialog ocupa a altura inteira da viewport no uso real do componente.

Use para confirmacoes, formularios curtos, detalhes contextuais ou decisoes que interrompem temporariamente a tarefa atual.

Nao use para mensagens leves, feedback passivo, navegacao comum ou conteudo longo que funciona melhor como pagina dedicada. Em fluxos criticos, o titulo deve ser direto e as acoes do footer devem deixar claro o resultado da escolha.

Responsividade:
- Em desktop, o modal centraliza no overlay e respeita o tamanho selecionado.
- Em telas pequenas, o dialog vira uma superficie de altura cheia com header fixo e conteudo rolavel.
- Nas stories, todas as variacoes sao exibidas abertas em uma preview contida para documentacao. Esse enquadramento evita que o overlay fixo invada outras stories na pagina de Docs.
`,
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    children: {
      control: false,
      description: 'Conteudo principal do modal.',
    },
    closeOnEsc: {
      control: 'boolean',
      description: 'Permite fechar com Escape.',
    },
    closeOnOverlayClick: {
      control: 'boolean',
      description: 'Permite fechar ao clicar no overlay.',
    },
    footer: {
      control: false,
      description: 'Area opcional de acoes.',
    },
    isOpen: {
      control: 'boolean',
      description: 'Controla a visibilidade.',
    },
    onClose: {
      control: false,
      description: 'Callback chamado ao solicitar fechamento.',
    },
    size: {
      control: 'select',
      description: 'Tamanho visual do dialog.',
      options: sizes,
    },
    title: {
      control: 'text',
      description: 'Titulo acessivel do modal.',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof ModalExample>;

export const Default: Story = {
  args: {
    closeOnEsc: true,
    closeOnOverlayClick: true,
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Uso padrao para decisoes ou formularios curtos. Na aplicacao, fecha por Escape, clique no overlay e botao de fechar; na documentacao permanece aberto para inspecao visual.',
      },
    },
  },
  render: (args) => <ModalExample {...args} />,
};

export const Small: Story = {
  args: {
    size: 'sm',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Tamanho compacto para confirmacoes simples, mensagens objetivas ou fluxos com poucas opcoes.',
      },
    },
  },
  render: (args) => <ModalExample {...args} />,
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Tamanho amplo para formularios com mais campos, revisoes de dados ou conteudo que precisa de mais largura.',
      },
    },
  },
  render: (args) => <ModalExample {...args} />,
};

export const Full: Story = {
  args: {
    size: 'full',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Ocupa quase toda a largura disponivel em desktop. Use quando a tarefa exige leitura, comparacao ou edicao com maior area util.',
      },
    },
  },
  render: (args) => <ModalExample {...args} />,
};

export const Persistent: Story = {
  args: {
    closeOnEsc: false,
    closeOnOverlayClick: false,
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Modo persistente para decisoes que nao devem ser descartadas acidentalmente. Desativa fechamento por Escape e clique no overlay, mantendo fechamento apenas por acoes explicitas.',
      },
    },
  },
  render: (args) => <ModalExample {...args} />,
};
