import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { Toast } from './Toast';
import './Toast.stories.css';
import type { ToastProps, ToastVariant } from './Toast.types';

const variants: ToastVariant[] = [
  'positive',
  'information',
  'notice',
  'negative',
  'neutral',
  'brand',
];

const variantLabels: Record<ToastVariant, string> = {
  brand: 'Brand',
  information: 'Information',
  negative: 'Negative',
  neutral: 'Neutral',
  notice: 'Notice',
  positive: 'Positive',
};

function ControlledToast(args: ToastProps) {
  const [isOpen, setIsOpen] = useState(args.defaultOpen ?? true);

  return (
    <div className="toast-story-stack">
      <button
        className="toast-story-trigger"
        onClick={() => {
          setIsOpen(true);
        }}
        type="button"
      >
        Mostrar toast
      </button>
      <Toast
        {...args}
        isOpen={isOpen}
        onOpenChange={(nextOpen) => {
          setIsOpen(nextOpen);
          args.onOpenChange?.(nextOpen);
        }}
      />
    </div>
  );
}

const meta = {
  title: 'Components/Toast',
  component: Toast,
  parameters: {
    componentCanvas: {
      width: 520,
    },
    docs: {
      description: {
        component: `
Toast e uma notificacao leve, nao modal e temporaria para feedback breve sobre processos do sistema ou acoes da pessoa usuaria.

Use para confirmacoes curtas, estados de salvamento, erros recuperaveis, avisos temporarios e mensagens que nao exigem interrupcao do fluxo.

Nao use Toast para mensagens persistentes, erros bloqueantes, confirmacoes destrutivas, conteudo longo ou informacoes que precisam permanecer visiveis. Nesses casos, use Alert, Modal ou outro componente contextual.

Variantes:
- Positive: sucesso ou conclusao.
- Information: feedback informativo.
- Notice: aviso ou atencao.
- Negative: erro temporario.
- Neutral: mensagem neutra do sistema.
- Brand: notificacao padrao com destaque de marca usando tokens disponiveis.

Comportamento:
- Auto-dismiss ativo por padrao com duration de 5000ms.
- Pausa o timer em hover e focus por padrao para preservar leitura e interacao.
- Dismiss pode ser controlado por isOpen/onOpenChange ou usado em modo nao controlado.
- Renderiza ate duas acoes, seguindo a anatomia da referencia.

Tokens:
Cores, surface, foreground, icon, border, radius, spacing, sizing, typography, focus ring e estados usam variaveis CSS dos tokens do Figma. Como ainda nao ha tokens de elevation/shadow publicados, a sombra usa apenas cores alpha tokenizadas e dimensoes da escala de spacing.

Acessibilidade:
- Usa role="status" por padrao e aria-live="polite".
- Usa role="alert" e aria-live="assertive" para negative.
- O icone e decorativo e nao substitui titulo ou supporting text.
- Acoes e dismiss sao botoes nativos com foco visivel.
`,
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    actions: {
      control: false,
      description: 'Lista de ate duas acoes renderizadas como botoes.',
    },
    autoDismiss: {
      control: 'boolean',
      description: 'Fecha automaticamente apos duration quando verdadeiro.',
    },
    children: {
      control: 'text',
      description: 'Supporting text do toast.',
    },
    className: {
      control: 'text',
      description: 'Classe CSS opcional aplicada ao elemento raiz.',
    },
    defaultOpen: {
      control: 'boolean',
      description: 'Estado inicial no modo nao controlado.',
    },
    dismissible: {
      control: 'boolean',
      description: 'Exibe o botao de dismiss.',
    },
    dismissLabel: {
      control: 'text',
      description: 'Rotulo acessivel do botao de dismiss.',
    },
    duration: {
      control: 'number',
      description: 'Tempo em milissegundos antes do auto-dismiss.',
    },
    icon: {
      control: false,
      description: 'Icone customizado opcional.',
    },
    isOpen: {
      control: false,
      description: 'Controla a visibilidade externamente.',
    },
    onDismiss: {
      control: false,
      description: 'Callback chamado no dismiss manual.',
    },
    onOpenChange: {
      control: false,
      description: 'Callback chamado quando o toast solicita mudanca de abertura.',
    },
    pauseOnFocus: {
      control: 'boolean',
      description: 'Pausa o auto-dismiss enquanto o toast ou seus controles recebem foco.',
    },
    pauseOnHover: {
      control: 'boolean',
      description: 'Pausa o auto-dismiss enquanto o ponteiro esta sobre o toast.',
    },
    role: {
      control: 'select',
      description: 'Role ARIA da notificacao.',
      options: ['alert', 'status'],
    },
    showIcon: {
      control: 'boolean',
      description: 'Exibe ou oculta o icone lider.',
    },
    title: {
      control: 'text',
      description: 'Titulo curto da notificacao.',
    },
    variant: {
      control: 'select',
      description: 'Variante semantica e visual.',
      options: variants,
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    actions: [{ label: 'Button' }],
    autoDismiss: false,
    children: 'Supporting text. Keep to 1-2 lines of text',
    title: 'Title goes here',
    variant: 'brand',
  },
  render: (args) => (
    <div className="toast-story-shell">
      <div className="toast-story-panel">
        <ControlledToast {...args} />
      </div>
    </div>
  ),
};

export const AllVariants: Story = {
  args: {
    autoDismiss: false,
    title: 'Title goes here',
  },
  render: () => (
    <div className="toast-story-shell">
      <div className="toast-story-stack">
        {variants.map((variant) => (
          <Toast
            actions={[{ label: 'Button' }]}
            autoDismiss={false}
            key={variant}
            title={`${variantLabels[variant]} toast`}
            variant={variant}
          >
            Supporting text. Keep to 1-2 lines of text
          </Toast>
        ))}
      </div>
    </div>
  ),
};

export const WithTwoActions: Story = {
  args: {
    actions: [{ label: 'Button' }, { label: 'Button' }],
    autoDismiss: false,
    children: 'Supporting text. Keep to 1-2 lines of text',
    title: 'Title goes here',
    variant: 'brand',
  },
  render: (args) => (
    <div className="toast-story-shell">
      <div className="toast-story-panel">
        <ControlledToast {...args} />
      </div>
    </div>
  ),
};

export const AutoDismiss: Story = {
  args: {
    actions: [{ label: 'Desfazer' }],
    children: 'O toast fecha automaticamente apos alguns segundos.',
    duration: 3000,
    title: 'Alteracao salva',
    variant: 'positive',
  },
  render: (args) => (
    <div className="toast-story-shell">
      <div className="toast-story-panel">
        <ControlledToast {...args} />
      </div>
    </div>
  ),
};

export const WithoutDismiss: Story = {
  args: {
    actions: [{ label: 'Button' }],
    autoDismiss: false,
    children: 'Use com cuidado quando uma acao interna controla o fechamento.',
    dismissible: false,
    title: 'Title goes here',
    variant: 'information',
  },
  render: (args) => (
    <div className="toast-story-shell">
      <div className="toast-story-panel">
        <Toast {...args} />
      </div>
    </div>
  ),
};

export const ResponsiveContent: Story = {
  args: {
    actions: [{ label: 'Revisar' }, { label: 'Ignorar' }],
    autoDismiss: false,
    children:
      'Supporting text maior para validar quebra de linha, acoes e dismiss em uma largura estreita.',
    title: 'Titulo longo para validar responsividade',
    variant: 'notice',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstra como o Toast reorganiza texto, acoes e dismiss em containers estreitos sem gerar overflow horizontal.',
      },
    },
  },
  render: (args) => (
    <div className="toast-story-shell">
      <div className="toast-story-narrow">
        <ControlledToast {...args} />
      </div>
    </div>
  ),
};

export const WithoutIcon: Story = {
  args: {
    actions: [{ label: 'Button' }],
    autoDismiss: false,
    children: 'Supporting text. Keep to 1-2 lines of text',
    showIcon: false,
    title: 'Title goes here',
    variant: 'neutral',
  },
  render: (args) => (
    <div className="toast-story-shell">
      <div className="toast-story-panel">
        <ControlledToast {...args} />
      </div>
    </div>
  ),
};
