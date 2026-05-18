import type { Meta, StoryObj } from '@storybook/react-vite';

import { Link } from './Link';
import './Link.stories.css';

function ArrowRightIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4 10h12m0 0-4-4m4 4-4 4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

const meta = {
  title: 'Web Components/Link',
  component: Link,
  parameters: {
    componentCanvas: {
      width: 360,
    },
    docs: {
      description: {
        component: `
O Link e o elemento interativo fundamental para navegar para recursos internos ou externos. Ele pode ser usado dentro de blocos de texto ou como chamada navegacional independente, mantendo alta legibilidade e affordance clara.

Use para navegacao, referencias contextuais, rotas internas, documentos, paginas externas e chamadas textuais que nao executam uma acao de sistema.

Nao use Link para submeter formularios, confirmar decisoes, abrir modais criticos ou executar comandos. Nesses casos use Button.

Variantes:
- Default: navegacao principal com azul de identidade.
- Neutral: uso sobre superficies claras quando o link precisa acompanhar texto neutro.
- Inverse: uso sobre superficies escuras.

Responsividade:
O componente foi criado para uso inline e standalone. Em telas pequenas, preserva area minima de toque sem quebrar o fluxo de texto nem gerar overflow horizontal.

Tokens:
Cores, foco, espacamento, iconografia e tipografia usam variaveis CSS geradas pelos tokens do Figma. Como a camada semantica ainda nao esta completa no projeto, o componente usa aliases internos semanticos apontando para tokens disponiveis.

Acessibilidade:
- Renderiza anchor nativo com href obrigatorio.
- Links externos podem exibir icone automaticamente quando target="_blank" ou external=true.
- target="_blank" recebe rel="noopener noreferrer" por padrao.
- disabled usa aria-disabled, remove o item da ordem de tabulacao e bloqueia navegacao.
- O texto do link deve ser descritivo fora de contexto; evite "clique aqui".
`,
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    ariaLabel: {
      control: 'text',
      description: 'Rotulo acessivel quando o texto visual nao for suficiente.',
    },
    children: {
      control: 'text',
      description: 'Texto visivel do link.',
    },
    className: {
      control: 'text',
      description: 'Classe CSS opcional aplicada ao elemento raiz.',
    },
    disabled: {
      control: 'boolean',
      description: 'Comunica link indisponivel e bloqueia navegacao.',
    },
    external: {
      control: 'boolean',
      description:
        'Marca o link como externo e exibe icone quando showExternalIcon nao for definido.',
    },
    href: {
      control: 'text',
      description: 'Destino do link.',
    },
    iconEnd: {
      control: false,
      description: 'Icone decorativo no final.',
    },
    iconStart: {
      control: false,
      description: 'Icone decorativo no inicio.',
    },
    showExternalIcon: {
      control: 'boolean',
      description: 'Forca ou oculta o icone de link externo.',
    },
    size: {
      control: 'select',
      description: 'Tamanho tipografico.',
      options: ['small', 'medium', 'large'],
    },
    target: {
      control: 'text',
      description: 'Target nativo do anchor.',
    },
    variant: {
      control: 'select',
      description: 'Variante visual.',
      options: ['default', 'neutral', 'inverse'],
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Link>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Link',
    href: '#link-default',
    showExternalIcon: true,
  },
};

export const Inline: Story = {
  args: {
    children: 'documentacao tecnica',
    href: '#documentacao',
  },
  render: () => (
    <div className="link-story-grid">
      <p className="link-story-paragraph">
        Use links dentro de textos para conectar a pessoa usuaria a recursos relacionados, como{' '}
        <Link href="#documentacao">documentacao tecnica</Link>, instrucoes complementares ou paginas
        de apoio.
      </p>
    </div>
  ),
};

export const External: Story = {
  args: {
    children: 'Abrir recurso externo',
    href: 'https://example.com',
    target: '_blank',
  },
};

export const WithIcon: Story = {
  args: {
    children: 'Continuar leitura',
    href: '#continuar',
    iconEnd: <ArrowRightIcon />,
  },
};

export const Variants: Story = {
  args: {
    children: 'Default',
    href: '#default',
  },
  render: () => (
    <div className="link-story-grid">
      <div className="link-story-row">
        <Link href="#default">Default</Link>
        <Link href="#neutral" variant="neutral">
          Neutral
        </Link>
        <Link disabled href="#disabled">
          Disabled
        </Link>
      </div>
      <div className="link-story-inverse">
        <Link href="#inverse" variant="inverse">
          Inverse
        </Link>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  args: {
    children: 'Medium',
    href: '#medium',
  },
  render: () => (
    <div className="link-story-grid">
      <div className="link-story-row">
        <Link href="#small" size="small">
          Small
        </Link>
        <Link href="#medium">Medium</Link>
        <Link href="#large" size="large">
          Large
        </Link>
      </div>
    </div>
  ),
};
