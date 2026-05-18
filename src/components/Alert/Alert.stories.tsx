import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { Alert } from './Alert';
import './Alert.stories.css';
import type { AlertProps, AlertVariant } from './Alert.types';

const variants: AlertVariant[] = ['information', 'success', 'warning', 'error', 'critical'];

const variantLabels: Record<AlertVariant, string> = {
  critical: 'Critical',
  error: 'Error',
  information: 'Information',
  success: 'Success',
  warning: 'Warning',
};

function ControlledAlert(args: AlertProps) {
  const [isVisible, setIsVisible] = useState(args.defaultVisible ?? true);

  if (!isVisible) {
    return (
      <button
        className="ds-alert__action"
        onClick={() => {
          setIsVisible(true);
        }}
        type="button"
      >
        Mostrar alerta
      </button>
    );
  }

  return (
    <Alert
      {...args}
      isVisible={isVisible}
      onVisibleChange={(nextVisible) => {
        setIsVisible(nextVisible);
        args.onVisibleChange?.(nextVisible);
      }}
    />
  );
}

const meta = {
  title: 'Web Components/Alert',
  component: Alert,
  parameters: {
    componentCanvas: {
      width: 640,
    },
    docs: {
      description: {
        component: `
Alert e uma mensagem persistente e reativa exibida em resposta a um evento do sistema ou acao da pessoa usuaria. Ela permanece visivel ate que a condicao seja resolvida pela aplicacao ou a pessoa dispense explicitamente a mensagem.

Use para feedback contextual, erros de formulario ou pagina, alertas de sucesso persistentes, avisos de sistema e mensagens com uma ou duas acoes claras.

Nao use como toast temporario, modal, tooltip, badge, banner promocional ou texto informativo estatico sem relacao com estado do sistema.

Variantes:
- Information: feedback neutro ou instrucao contextual.
- Success: confirmacao de conclusao ou estado positivo.
- Warning: atencao, risco ou acao preventiva.
- Error: falha recuperavel ou bloqueio que precisa de correcao.
- Critical: erro destrutivo ou mensagem de alto impacto.

Responsividade:
O Alert usa grid responsivo: em desktop, conteudo, acoes e dismiss ficam alinhados horizontalmente; em larguras menores, as acoes quebram para a linha inferior e preservam area de toque adequada.

Tokens:
Cores de superficie, borda, texto, icone, feedback, radius, spacing, sizing, focus ring e typography usam variaveis CSS dos tokens do Figma. Como a camada semantica ainda nao cobre todos os casos no projeto, o componente cria aliases internos semanticos apontando para tokens disponiveis.

Acessibilidade:
- Usa role="status" por padrao para information, success e warning.
- Usa role="alert" por padrao para error e critical.
- O icone e decorativo e nao substitui titulo ou texto.
- Acoes e dismiss sao botoes nativos com foco visivel.
- O dismiss pode ser controlado por isVisible/onVisibleChange ou usado em modo nao controlado.
`,
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    actions: {
      control: false,
      description: 'Lista de ate duas acoes renderizadas como botoes de texto.',
    },
    children: {
      control: 'text',
      description: 'Texto de apoio ou conteudo complementar do alerta.',
    },
    className: {
      control: 'text',
      description: 'Classe CSS opcional aplicada ao elemento raiz.',
    },
    defaultVisible: {
      control: 'boolean',
      description: 'Visibilidade inicial no modo nao controlado.',
    },
    dismissible: {
      control: 'boolean',
      description: 'Exibe o botao de dispensar.',
    },
    dismissLabel: {
      control: 'text',
      description: 'Rotulo acessivel do botao de dispensar.',
    },
    icon: {
      control: false,
      description: 'Icone customizado opcional. Quando omitido, usa o icone da variante.',
    },
    isVisible: {
      control: false,
      description: 'Controla a visibilidade externamente.',
    },
    onDismiss: {
      control: false,
      description: 'Callback chamado ao acionar dismiss.',
    },
    onVisibleChange: {
      control: false,
      description: 'Callback chamado quando o componente solicita mudanca de visibilidade.',
    },
    role: {
      control: 'select',
      description: 'Role ARIA do alerta.',
      options: ['alert', 'status', 'note'],
    },
    showIcon: {
      control: 'boolean',
      description: 'Exibe ou oculta o icone lider.',
    },
    title: {
      control: 'text',
      description: 'Titulo curto e objetivo do alerta.',
    },
    variant: {
      control: 'select',
      description: 'Estado semantico e visual do alerta.',
      options: variants,
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    actions: [{ label: 'Action 1' }],
    children: 'Brief description or user instructions go here',
    title: 'Title goes here',
    variant: 'information',
  },
  render: (args) => (
    <div className="alert-story-shell">
      <div className="alert-story-panel">
        <ControlledAlert {...args} />
      </div>
    </div>
  ),
};

export const AllVariants: Story = {
  args: {
    title: 'Title goes here',
  },
  render: () => (
    <div className="alert-story-shell">
      <div className="alert-story-stack">
        {variants.map((variant) => (
          <Alert
            actions={[{ label: 'Action 1' }]}
            key={variant}
            title={`${variantLabels[variant]} alert`}
            variant={variant}
          >
            Brief description or user instructions go here
          </Alert>
        ))}
      </div>
    </div>
  ),
};

export const WithTwoActions: Story = {
  args: {
    actions: [{ label: 'Action 1' }, { label: 'Action 2' }],
    children: 'Brief description or user instructions go here',
    title: 'Title goes here',
    variant: 'information',
  },
  render: (args) => (
    <div className="alert-story-shell">
      <div className="alert-story-panel">
        <ControlledAlert {...args} />
      </div>
    </div>
  ),
};

export const WithoutDismiss: Story = {
  args: {
    actions: [{ label: 'Action 1' }],
    children: 'A aplicacao remove este alerta quando a condicao for resolvida.',
    dismissible: false,
    title: 'Mensagem persistente',
    variant: 'warning',
  },
  render: (args) => (
    <div className="alert-story-shell">
      <div className="alert-story-panel">
        <Alert {...args} />
      </div>
    </div>
  ),
};

export const Critical: Story = {
  args: {
    actions: [{ label: 'Action 1' }],
    children: 'Brief description or user instructions go here',
    title: 'Title goes here',
    variant: 'critical',
  },
  render: (args) => (
    <div className="alert-story-shell">
      <div className="alert-story-panel">
        <ControlledAlert {...args} />
      </div>
    </div>
  ),
};

export const ResponsiveContent: Story = {
  args: {
    actions: [{ label: 'Revisar dados' }, { label: 'Salvar depois' }],
    children:
      'Texto de apoio mais longo para validar quebra de linha, espaco entre acoes e ausencia de overflow horizontal em containers estreitos.',
    title: 'Alerta com titulo longo para validar responsividade',
    variant: 'information',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstra como o Alert reorganiza conteudo, acoes e dismiss em largura reduzida mantendo legibilidade e foco acessivel.',
      },
    },
  },
  render: (args) => (
    <div className="alert-story-shell">
      <div className="alert-story-narrow">
        <ControlledAlert {...args} />
      </div>
    </div>
  ),
};

export const WithoutIcon: Story = {
  args: {
    actions: [{ label: 'Action 1' }],
    children: 'Brief description or user instructions go here',
    showIcon: false,
    title: 'Title goes here',
    variant: 'success',
  },
  render: (args) => (
    <div className="alert-story-shell">
      <div className="alert-story-panel">
        <ControlledAlert {...args} />
      </div>
    </div>
  ),
};
