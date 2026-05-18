import type { Meta, StoryObj } from '@storybook/react-vite';

import { Card } from './Card';
import './Card.stories.css';

function TagIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3.5 8.5 8.5 3.5h7v7l-5 5a2 2 0 0 1-2.8 0L3.5 11.3a2 2 0 0 1 0-2.8Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <path d="M12.5 7.5h.01" stroke="currentColor" strokeLinecap="round" strokeWidth="2.4" />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path d="m12 5-5 5 5 5" stroke="currentColor" strokeLinecap="round" strokeWidth="2.2" />
    </svg>
  );
}

function MediaPlaceholder() {
  return <span aria-hidden="true" className="card-story-media" />;
}

const meta = {
  title: 'Web Components/Card',
  component: Card,
  parameters: {
    componentCanvas: {
      width: 400,
    },
    docs: {
      description: {
        component: `
O Card e um componente versatil para destacar informacoes importantes e orientar a pessoa usuaria para um conteudo ou acao. Ele funciona como um signpost de interface, diferente de cards de produto, listagens densas ou itens transacionais.

Use quando precisar destacar uma chamada editorial, uma orientacao contextual, um proximo passo, um conteudo complementar ou um bloco de navegacao com acao clara.

Nao use como alerta critico, produto de catalogo, container generico sem hierarquia, tabela, modal ou lista extensa.

Anatomia:
- Midia opcional.
- Badge opcional usando o componente Badge existente.
- Titulo obrigatorio com headingLevel configuravel.
- Descricao opcional.
- Slot via children para apoio textual curto.
- Acao primaria e acao secundaria opcionais, renderizadas como button ou link conforme href.

Responsividade:
Este componente foi desenvolvido com comportamento responsivo nativo, adaptando espacamentos, alinhamento, largura, quebra de conteudo e areas de toque para diferentes tamanhos de tela. A responsividade e aplicada na implementacao do componente e nao depende de variacoes manuais no Storybook.

Tokens:
O componente usa as variaveis CSS geradas pelos tokens do Figma para cor, superficie, borda, raio, espacamento, tipografia, estados, foco e feedback. Como ainda nao ha tokens dedicados de elevation ou icon size, o Card evita sombra propria e deriva tamanhos de icone da escala de spacing.

Acessibilidade:
- A raiz usa article.
- O titulo usa heading semantico configuravel.
- Acoes possuem foco visivel, area minima de toque e suporte a teclado.
- Links desabilitados recebem aria-disabled e saem da ordem de tabulacao.
- Estado visual nao depende apenas de cor: disabled tambem muda interatividade e semantica.
`,
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    badge: {
      control: false,
      description: 'Configuracao opcional do Badge exibido antes do titulo.',
    },
    children: {
      control: false,
      description: 'Slot opcional para conteudo curto de apoio.',
    },
    className: {
      control: 'text',
      description: 'Classe CSS opcional aplicada ao elemento raiz.',
    },
    description: {
      control: 'text',
      description: 'Texto complementar abaixo do titulo.',
    },
    disabled: {
      control: 'boolean',
      description: 'Desabilita as acoes e comunica aria-disabled no card.',
    },
    headingLevel: {
      control: 'select',
      description: 'Nivel semantico do heading do titulo.',
      options: [2, 3, 4, 5, 6],
    },
    media: {
      control: false,
      description: 'Slot opcional para imagem, video, SVG, canvas ou midia customizada.',
    },
    mediaAspectRatio: {
      control: 'select',
      description: 'Proporcao visual da area de midia.',
      options: ['wide', 'square'],
    },
    orientation: {
      control: 'radio',
      description: 'Orientacao visual do card. Horizontal colapsa para vertical em telas menores.',
      options: ['vertical', 'horizontal'],
    },
    primaryAction: {
      control: false,
      description: 'Acao primaria. Renderiza link quando href existe; caso contrario, button.',
    },
    secondaryAction: {
      control: false,
      description: 'Acao secundaria. Renderiza link quando href existe; caso contrario, button.',
    },
    title: {
      control: 'text',
      description: 'Titulo principal obrigatorio.',
    },
    tone: {
      control: 'select',
      description: 'Tom semantico aplicado nas acoes e foco.',
      options: ['neutral', 'brand', 'info', 'success', 'warning', 'danger'],
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    badge: {
      icon: <TagIcon />,
      label: 'Badge',
    },
    description: 'Description',
    media: <MediaPlaceholder />,
    primaryAction: {
      icon: <ChevronLeftIcon />,
      label: 'Label',
    },
    secondaryAction: {
      href: '#card-link',
      label: 'Link',
    },
    title: 'Card Title',
  },
};

export const Horizontal: Story = {
  args: {
    ...Default.args,
    badge: {
      icon: <TagIcon />,
      label: 'Badge',
      size: 'small',
    },
    mediaAspectRatio: 'square',
    orientation: 'horizontal',
  },
};

export const LongContent: Story = {
  args: {
    badge: {
      icon: <TagIcon />,
      label: 'Orientacao',
    },
    children:
      'Use textos curtos, objetivos e com uma acao clara. Conteudos longos quebram linha sem gerar overflow horizontal.',
    description:
      'Este exemplo valida titulo, descricao e slot com conteudo maior em telas pequenas, tablets e desktop.',
    media: <MediaPlaceholder />,
    primaryAction: {
      icon: <ChevronLeftIcon />,
      label: 'Acessar conteudo',
    },
    secondaryAction: {
      href: '#boas-praticas',
      label: 'Ver boas praticas',
    },
    title: 'Titulo maior para validar quebra de linha e hierarquia visual',
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
    primaryAction: {
      icon: <ChevronLeftIcon />,
      label: 'Indisponivel',
    },
    secondaryAction: {
      href: '#disabled-link',
      label: 'Link indisponivel',
    },
  },
};
