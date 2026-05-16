import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from './Button';
import './Button.stories.css';

function SendIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M17 3 8.4 11.6M17 3l-5 14-3.6-5.4L3 8l14-5Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10 3v9m0 0 4-4m-4 4L6 8M4 16h12"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    componentCanvas: {
      width: 360,
    },
    docs: {
      description: {
        component: `
Buttons permitem que pessoas usuarias executem acoes e tomem decisoes dentro da interface. Eles devem oferecer pontos de entrada claros, consistentes e acessiveis para avancar em tarefas.

Use para acoes primarias, secundarias, navegacao acionavel, confirmacoes e comandos diretos.

Nao use Button para texto meramente informativo, tabs, badges, links editoriais longos ou containers clicaveis complexos.

Variantes:
- Primary: usa soft black como superficie principal.
- Secondary: usa o vermelho brand como CTA secundario.
- Tertiary: acao discreta sem superficie preenchida.

Responsividade:
O componente possui comportamento responsivo nativo. Em telas pequenas, os tamanhos medium e large aumentam a area de toque sem exigir variacoes manuais no Storybook.

Tokens:
As cores, bordas, raio, espacamentos, tipografia, foco e estados sao derivados das variaveis CSS geradas pelos tokens do Figma. Como o projeto ainda nao possui uma camada semantica completa publicada, o Button cria aliases internos semanticos apontando para os tokens disponiveis.

Acessibilidade:
- Renderiza button por padrao e anchor quando href e informado.
- Suporta disabled real em button e aria-disabled/tabIndex em links.
- Possui foco visivel via token.
- Loading usa aria-busy e desabilita interacao.
- Icones sao decorativos e o texto/aria-label deve comunicar a acao.
`,
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    ariaLabel: {
      control: 'text',
      description: 'Rotulo acessivel quando o conteudo visual nao for suficiente.',
    },
    children: {
      control: 'text',
      description: 'Texto visivel do botao.',
    },
    className: {
      control: 'text',
      description: 'Classe CSS opcional aplicada ao elemento raiz.',
    },
    disabled: {
      control: 'boolean',
      description: 'Desabilita o botao ou link.',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Faz o botao ocupar toda a largura disponivel.',
    },
    href: {
      control: 'text',
      description: 'Quando informado, renderiza o componente como link.',
    },
    iconEnd: {
      control: false,
      description: 'Icone decorativo no final.',
    },
    iconStart: {
      control: false,
      description: 'Icone decorativo no inicio.',
    },
    isLoading: {
      control: 'boolean',
      description: 'Mostra estado de carregamento e bloqueia interacao.',
    },
    loadingLabel: {
      control: 'text',
      description: 'Texto exibido durante carregamento.',
    },
    onClick: {
      control: false,
      description: 'Callback de clique.',
    },
    size: {
      control: 'select',
      description: 'Tamanho visual do botao.',
      options: ['small', 'medium', 'large'],
    },
    type: {
      control: 'select',
      description: 'Tipo nativo quando renderizado como button.',
      options: ['button', 'submit', 'reset'],
    },
    variant: {
      control: 'select',
      description: 'Variante visual.',
      options: ['primary', 'secondary', 'tertiary'],
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
    iconEnd: <DownloadIcon />,
    iconStart: <SendIcon />,
  },
};

export const Secondary: Story = {
  args: {
    children: 'Button',
    iconEnd: <DownloadIcon />,
    iconStart: <SendIcon />,
    variant: 'secondary',
  },
};

export const Tertiary: Story = {
  args: {
    children: 'Button',
    iconEnd: <DownloadIcon />,
    iconStart: <SendIcon />,
    variant: 'tertiary',
  },
};

export const AsLink: Story = {
  args: {
    children: 'Abrir link',
    href: '#button-link',
    iconStart: <SendIcon />,
    variant: 'secondary',
  },
};

export const Loading: Story = {
  args: {
    children: 'Enviar',
    iconStart: <SendIcon />,
    isLoading: true,
    loadingLabel: 'Enviando',
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="button-story-grid">
      <div className="button-story-row">
        <Button disabled iconEnd={<DownloadIcon />} iconStart={<SendIcon />}>
          Primary
        </Button>
        <Button disabled iconEnd={<DownloadIcon />} iconStart={<SendIcon />} variant="secondary">
          Secondary
        </Button>
        <Button disabled iconEnd={<DownloadIcon />} iconStart={<SendIcon />} variant="tertiary">
          Tertiary
        </Button>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="button-story-grid">
      <div className="button-story-row">
        <Button iconEnd={<DownloadIcon />} iconStart={<SendIcon />} size="small">
          Small
        </Button>
        <Button iconEnd={<DownloadIcon />} iconStart={<SendIcon />}>
          Medium
        </Button>
        <Button iconEnd={<DownloadIcon />} iconStart={<SendIcon />} size="large">
          Large
        </Button>
      </div>
    </div>
  ),
};
