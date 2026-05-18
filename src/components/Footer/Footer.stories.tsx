import type { Meta, StoryObj } from '@storybook/react-vite';

import { Footer } from './Footer';
import './Footer.stories.css';

const loremSections = [
  {
    defaultOpen: true,
    links: [
      { href: '#lorem-1-1', label: 'Lorem Ipsum' },
      { href: '#lorem-1-2', label: 'Lorem Ipsum' },
      { href: '#lorem-1-3', label: 'Lorem Ipsum' },
      { href: '#lorem-1-4', label: 'Lorem Ipsum' },
    ],
    title: 'Lorem Ipsum',
  },
  {
    links: [
      { href: '#lorem-2-1', label: 'Lorem Ipsum' },
      { href: '#lorem-2-2', label: 'Lorem Ipsum' },
      { href: '#lorem-2-3', label: 'Lorem Ipsum' },
    ],
    title: 'Lorem Ipsum',
  },
  {
    links: [
      { href: '#lorem-3-1', label: 'Lorem Ipsum' },
      { href: '#lorem-3-2', label: 'Lorem Ipsum' },
      { href: '#lorem-3-3', label: 'Lorem Ipsum' },
      { href: '#lorem-3-4', label: 'Lorem Ipsum' },
      { href: '#lorem-3-5', label: 'Lorem Ipsum' },
    ],
    title: 'Lorem Ipsum',
  },
  {
    links: [
      { href: '#lorem-4-1', label: 'Lorem Ipsum' },
      { href: '#lorem-4-2', label: 'Lorem Ipsum' },
      { href: '#lorem-4-3', label: 'Lorem Ipsum' },
      { href: '#lorem-4-4', label: 'Lorem Ipsum' },
    ],
    title: 'Lorem Ipsum',
  },
];

const meta = {
  title: 'Components/Footer',
  component: Footer,
  parameters: {
    componentCanvas: {
      width: 1280,
    },
    docs: {
      description: {
        component: `
Footer e um organismo de fechamento de pagina para navegacao secundaria, links legais, afiliacao de marca, redes sociais e informacoes institucionais.

Use no fim de websites, portais de servico e experiencias que precisam reforcar confianca, navegacao auxiliar e canais oficiais. Nao use dentro de cards, modais ou regioes internas que nao representam o rodape global da pagina.

Responsividade:
Este componente foi desenvolvido com comportamento responsivo nativo, adaptando espacamentos, alinhamento, largura, quebra de conteudo e areas de toque para diferentes tamanhos de tela. A responsividade e aplicada na implementacao do componente e nao depende de variacoes manuais no Storybook. No desktop, as secoes ficam em colunas abertas; no mobile, viram grupos expansiveis com controles de 48px, marca centralizada, redes sociais com quebra de linha e copyright centralizado sem overflow horizontal.

Tokens:
Cores, superficies, bordas, espacamentos, tipografia, foco e estados usam variaveis CSS geradas pelos tokens do Figma. Como a camada semantica ainda nao cobre todos os casos no projeto, o componente cria aliases internos semanticos apontando para tokens disponiveis.

Acessibilidade:
- Usa elemento semantico footer.
- A navegacao de rodape e redes sociais usam nav com aria-label.
- Links atuais podem usar aria-current.
- Itens desabilitados usam disabled/aria-disabled.
- Secoes mobile usam botao com aria-expanded e aria-controls.
- Redes sociais possuem nomes acessiveis, mesmo quando exibem apenas icone.
- Estados de foco sao visiveis para teclado.

Configuracao:
sections, socialItems, legalLinks e brand sao configuraveis. Passe brand null para remover a marca ou um ReactNode para trocar a identidade sem alterar a estrutura.
`,
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    brand: {
      control: false,
      description: 'Slot configuravel para marca do rodape. Passe null para ocultar.',
    },
    brandAriaLabel: {
      control: 'text',
      description: 'Nome acessivel da marca.',
    },
    brandHref: {
      control: 'text',
      description: 'URL opcional da marca.',
    },
    className: {
      control: 'text',
      description: 'Classe CSS opcional aplicada ao footer.',
    },
    copyright: {
      control: 'text',
      description: 'Texto ou node de copyright.',
    },
    legalLinks: {
      control: 'object',
      description: 'Links legais exibidos proximo ao copyright.',
    },
    navAriaLabel: {
      control: 'text',
      description: 'Rotulo acessivel da navegacao de rodape.',
    },
    sections: {
      control: 'object',
      description: 'Lista de grupos de links do rodape.',
    },
    socialAriaLabel: {
      control: 'text',
      description: 'Rotulo acessivel da area de redes sociais.',
    },
    socialItems: {
      control: 'object',
      description: 'Lista de redes sociais com label, href e icone opcional.',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Footer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    sections: loremSections,
  },
  render: (args) => (
    <div className="footer-story-shell">
      <div className="footer-story-frame">
        <Footer {...args} />
      </div>
    </div>
  ),
};

export const WithLegalLinks: Story = {
  args: {
    legalLinks: [
      { href: '#termos', label: 'Termos de uso' },
      { href: '#privacidade', label: 'Privacidade' },
      { href: '#acessibilidade', label: 'Acessibilidade' },
    ],
    sections: loremSections,
  },
  render: (args) => (
    <div className="footer-story-shell">
      <div className="footer-story-frame">
        <Footer {...args} />
      </div>
    </div>
  ),
};

export const CustomBrand: Story = {
  args: {
    brand: (
      <span className="footer-story-custom-brand">
        <span>Minha Marca</span>
        <span>Portal de servicos digitais</span>
      </span>
    ),
    brandAriaLabel: 'Minha Marca',
    sections: loremSections,
  },
  render: (args) => (
    <div className="footer-story-shell">
      <div className="footer-story-frame">
        <Footer {...args} />
      </div>
    </div>
  ),
};

export const MobileResponsive: Story = {
  args: {
    sections: loremSections,
  },
  parameters: {
    componentCanvas: {
      width: 390,
    },
  },
  render: (args) => (
    <div className="footer-story-shell">
      <div className="footer-story-frame">
        <Footer {...args} />
      </div>
    </div>
  ),
};
