import type { Meta, StoryObj } from '@storybook/react-vite';

import { ButtonGov } from './ButtonGov';
import './ButtonGov.stories.css';

const noop = () => undefined;

const meta = {
  title: 'Components/ButtonGov',
  component: ButtonGov,
  parameters: {
    componentCanvas: {
      width: 520,
    },
    docs: {
      description: {
        component: `
ButtonGov e o CTA especifico de autenticacao gov.br. Ele fica em story separada para nao misturar esta variacao institucional com as variacoes gerais do Button.

Use exclusivamente para entrada/autenticacao com gov.br. Nao use como CTA generico, botao de formulario comum ou link de navegacao; para esses casos use Button.

Responsividade:
Este componente foi desenvolvido com comportamento responsivo nativo. Em desktop respeita a especificacao de 250px de largura por 48px de altura, padding horizontal de 24px, padding vertical de 8px e gap de 8px. Em telas estreitas, ocupa a largura disponivel do container para preservar area de toque e evitar overflow horizontal.

Tokens:
Cores, radius, espacamentos, foco e estados usam variaveis CSS geradas pelos tokens do Figma. A largura fixa de 250px vem da especificacao do componente e nao possui token equivalente na base atual. A familia Open Sans e aplicada como excecao institucional deste CTA: "Entrar com o" usa Semibold 600 e "gov.br" usa Bold 700.

Acessibilidade:
- Renderiza button nativo ou anchor quando href e informado.
- Estados disabled e loading usam atributos nativos/ARIA.
- Foco visivel, hover, active e disabled usam tokens do Design System.
- O icone e decorativo; o nome acessivel vem do label ou ariaLabel.
`,
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    ariaLabel: {
      control: 'text',
      description: 'Nome acessivel opcional quando o label visual nao for suficiente.',
    },
    children: {
      control: 'text',
      description: 'Label do botao. Por padrao usa Entrar com o gov.br.',
    },
    className: {
      control: 'text',
      description: 'Classe CSS opcional aplicada ao ButtonGov.',
    },
    disabled: {
      control: 'boolean',
      description: 'Desabilita o controle.',
    },
    href: {
      control: 'text',
      description: 'Quando informado, renderiza o componente como link.',
    },
    icon: {
      control: false,
      description: 'Icone opcional. O padrao e o usuario gov.br.',
    },
    isLoading: {
      control: 'boolean',
      description: 'Mostra estado de carregamento e bloqueia interacao.',
    },
    loadingLabel: {
      control: 'text',
      description: 'Label exibido durante carregamento.',
    },
    onClick: {
      control: false,
      description: 'Callback de click.',
    },
    rel: {
      control: 'text',
      description: 'Atributo rel quando renderizado como link.',
    },
    target: {
      control: 'text',
      description: 'Atributo target quando renderizado como link.',
    },
    type: {
      control: 'select',
      description: 'Tipo nativo do button.',
      options: ['button', 'submit', 'reset'],
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ButtonGov>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Entrar com o gov.br',
    onClick: noop,
  },
  render: (args) => (
    <div className="button-gov-story-surface">
      <div className="button-gov-story-panel">
        <ButtonGov {...args} />
      </div>
    </div>
  ),
};

export const States: Story = {
  args: {},
  render: () => (
    <div className="button-gov-story-surface">
      <div className="button-gov-story-panel button-gov-story-stack">
        <ButtonGov onClick={noop}>Entrar com o gov.br</ButtonGov>
        <ButtonGov disabled>Entrar com o gov.br</ButtonGov>
        <ButtonGov isLoading loadingLabel="Entrando">
          Entrar com o gov.br
        </ButtonGov>
      </div>
    </div>
  ),
};

export const AsLink: Story = {
  args: {
    children: 'Entrar com o gov.br',
    href: '#govbr',
  },
  render: (args) => (
    <div className="button-gov-story-surface">
      <div className="button-gov-story-panel">
        <ButtonGov {...args} />
      </div>
    </div>
  ),
};

export const MobileResponsive: Story = {
  args: {
    children: 'Entrar com o gov.br',
    onClick: noop,
  },
  parameters: {
    componentCanvas: {
      width: 320,
    },
  },
  render: (args) => (
    <div className="button-gov-story-surface">
      <div className="button-gov-story-panel">
        <ButtonGov {...args} />
      </div>
    </div>
  ),
};
