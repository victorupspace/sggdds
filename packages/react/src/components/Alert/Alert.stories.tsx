import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../Button';
import { Alert } from './Alert';
import './Alert.stories.css';
import type { AlertProps, AlertVariant } from './Alert.types';

const variants: AlertVariant[] = ['information', 'success', 'warning', 'error'];

function ControlledAlert(args: AlertProps) {
  const [isVisible, setIsVisible] = useState(args.defaultVisible ?? true);

  if (!isVisible) {
    return (
      <Button
        onClick={() => {
          setIsVisible(true);
        }}
        size="small"
        variant="secondary"
      >
        Mostrar alerta
      </Button>
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
      width: 480,
    },
    docs: {
      description: {
        component: `
O Alert reproduz o layout do Figma (Web Components / Alert): card com borda de 1px, icone do tipo (24px), titulo Body/Small Bold, descricao Body/Small e botao de fechar opcional.

Variantes (propriedade type no Figma):
- Information: fundo information/subtle, borda information/default e icone azul.
- Success: fundo sucess/subtle, borda sucess/default e icone verde.
- Warning: fundo warning/subtle, borda warning/default e icone preto.
- Error: fundo danger/subtle, borda brand/default e icone vermelho.

Tokens: superficies e bordas usam color/background e color/border, textos usam text-style/content color/typography/primary, icones usam color/icons, espacamentos usam badge/spacing e accordion/content/spacing, o radius usa badge/border/radius/sm e os tamanhos usam Component sizing — as mesmas variables aplicadas no Figma.

Responsividade: o card e fluido (100% do container), os textos quebram automaticamente e icone e botao de fechar ficam fixos nas extremidades. O node do Figma nao define variante mobile; a story MobileWidth demonstra o comportamento em 328px.

Acessibilidade: role status por padrao (alert na variante error), icone decorativo com aria-hidden e botao de fechar com rotulo acessivel. A visibilidade pode ser controlada via isVisible/onVisibleChange ou nao controlada via defaultVisible.
`,
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Conteudo do Content Slot, exibido abaixo do titulo.',
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
      description: 'Exibe o botao de fechar (showCloseButton no Figma).',
    },
    dismissLabel: {
      control: 'text',
      description: 'Rotulo acessivel do botao de fechar.',
    },
    isVisible: {
      control: false,
      description: 'Controla a visibilidade externamente.',
    },
    onDismiss: {
      control: false,
      description: 'Callback chamado ao acionar o botao de fechar.',
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
    title: {
      control: 'text',
      description: 'Titulo curto e objetivo do alerta.',
    },
    variant: {
      control: 'select',
      description: 'Tipo do alerta (type no Figma).',
      options: variants,
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
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
          <Alert key={variant} title="Title goes here" variant={variant}>
            Brief description or user instructions go here
          </Alert>
        ))}
      </div>
    </div>
  ),
};

export const WithoutDescription: Story = {
  args: {
    title: 'Somente titulo, centralizado na altura minima do bloco de texto',
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

export const WithoutDismiss: Story = {
  args: {
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

export const ErrorRole: Story = {
  args: {
    children: 'Corrija os campos destacados antes de continuar.',
    title: 'Nao foi possivel enviar o formulario',
    variant: 'error',
  },
  parameters: {
    docs: {
      description: {
        story:
          'A variante error usa role="alert" por padrao para leitura imediata por tecnologia assistiva.',
      },
    },
  },
  render: (args) => (
    <div className="alert-story-shell">
      <div className="alert-story-panel">
        <ControlledAlert {...args} />
      </div>
    </div>
  ),
};

export const MobileWidth: Story = {
  args: {
    children:
      'Texto de apoio mais longo para validar quebra de linha e ausencia de overflow horizontal em containers estreitos.',
    title: 'Alerta com titulo longo para validar responsividade',
    variant: 'information',
  },
  parameters: {
    componentCanvas: {
      width: 328,
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
