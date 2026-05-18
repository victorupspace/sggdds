import type { Meta, StoryObj } from '@storybook/react-vite';

import { Hero } from './Hero';
import './Hero.stories.css';

function ArrowDownIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10 4v12m0 0 5-5m-5 5-5-5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function PlaceholderMedia({ dark = false }: { dark?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={dark ? 'hero-story-placeholder hero-story-placeholder--dark' : 'hero-story-placeholder'}
    >
      3:2
    </div>
  );
}

function SquareMedia() {
  return (
    <div aria-hidden="true" className="hero-story-placeholder hero-story-placeholder--dark">
      1:1
    </div>
  );
}

const meta = {
  title: 'Components/Hero',
  component: Hero,
  parameters: {
    componentCanvas: {
      width: 1200,
    },
    docs: {
      description: {
        component: `
Hero apresenta uma area de destaque no topo da pagina para chamar atencao para uma mensagem principal, contexto importante e uma acao.

Use no inicio de paginas ou secoes de alta prioridade, combinando titulo, descricao, CTA e opcionalmente uma imagem ou ilustracao. Nao use Hero como card comum, banner pequeno, alerta ou bloco decorativo sem hierarquia de pagina.

Responsividade:
Este componente foi desenvolvido com comportamento responsivo nativo, adaptando espacamento superior/inferior, grid, ordem do conteudo, largura do texto, largura da imagem e area de toque do CTA para mobile, tablet e desktop. A responsividade e aplicada na implementacao do componente e nao depende de variacoes manuais no Storybook.

Tokens:
Cores, superficies, bordas, radius, espacamentos, tipografia e estados de acao usam variaveis CSS geradas pelos tokens do Figma. A largura maxima de 800px para media da variacao light e a recomendacao de imagem 1200x1200px para a variacao image seguem a especificacao funcional do componente, pois nao existem tokens de sizing equivalentes na base atual.

Acessibilidade:
- Renderiza section com ariaLabel opcional quando a pagina precisar nomear a regiao.
- O titulo usa h1 por padrao e pode ser h2 quando o Hero estiver dentro de uma secao.
- Imagens exigem alt via image.alt; media customizada deve cuidar da propria semantica.
- CTAs reutilizam Button do Design System, mantendo foco visivel, teclado e estados disabled.
`,
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    action: {
      control: false,
      description: 'Acao principal renderizada com Button medium.',
    },
    ariaLabel: {
      control: 'text',
      description: 'Nome acessivel opcional da section.',
    },
    children: {
      control: false,
      description: 'Slot opcional abaixo da descricao.',
    },
    className: {
      control: 'text',
      description: 'Classe CSS opcional aplicada ao Hero.',
    },
    description: {
      control: 'text',
      description: 'Texto de apoio abaixo do titulo.',
    },
    eyebrow: {
      control: 'text',
      description: 'Texto curto opcional antes do titulo.',
    },
    headingLevel: {
      control: 'select',
      description: 'Nivel semantico do titulo.',
      options: [1, 2],
    },
    image: {
      control: false,
      description: 'Imagem responsiva com src, alt, srcSet e sizes.',
    },
    media: {
      control: false,
      description: 'Slot de media customizada. Quando usado, substitui image.',
    },
    mediaPosition: {
      control: 'select',
      description: 'Posicao da media em desktop.',
      options: ['start', 'end'],
    },
    secondaryAction: {
      control: false,
      description: 'Acao secundaria renderizada com Button tertiary.',
    },
    title: {
      control: 'text',
      description: 'Titulo principal do Hero.',
    },
    variant: {
      control: 'select',
      description: 'Variacao visual do Hero.',
      options: ['light', 'dark', 'image'],
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Hero>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    action: {
      iconEnd: <ArrowDownIcon />,
      label: 'Aloita tasta',
    },
    description: 'Vaivattomasti. Vain muutamassa minuutissa.',
    headingLevel: 1,
    media: <PlaceholderMedia />,
    title: 'Elainvakuutus.',
    variant: 'light',
  },
  render: (args) => (
    <div className="hero-story-shell">
      <Hero {...args} />
    </div>
  ),
};

export const Dark: Story = {
  args: {
    action: {
      label: 'Vaiha e-laskutukseen',
    },
    description:
      'Talla sivulla naet vakuutuksiisi liittyvat laskut. Voit myos vaihtaa e-laskutukseen klikkaamalla alta.',
    media: <PlaceholderMedia dark />,
    title: 'Laskut',
    variant: 'dark',
  },
  render: (args) => (
    <div className="hero-story-shell">
      <Hero {...args} />
    </div>
  ),
};

export const Image: Story = {
  args: {
    action: {
      label: 'Comecar agora',
    },
    description:
      'Use a variacao image quando a mensagem depende de uma imagem quadrada forte, com origem recomendada em 1200x1200px.',
    media: <SquareMedia />,
    secondaryAction: {
      label: 'Saiba mais',
    },
    title: 'Atendimento digital simples e seguro',
    variant: 'image',
  },
  render: (args) => (
    <div className="hero-story-shell">
      <Hero {...args} />
    </div>
  ),
};

export const WithoutMedia: Story = {
  args: {
    action: {
      label: 'Ver servicos',
    },
    description:
      'Quando nao houver imagem relevante, o Hero centraliza a mensagem e preserva espacamento proprio sem CSS adicional.',
    title: 'Servicos para cidadaos',
    variant: 'light',
  },
  render: (args) => (
    <div className="hero-story-shell">
      <Hero {...args} />
    </div>
  ),
};

export const MobileResponsive: Story = {
  args: {
    action: {
      iconEnd: <ArrowDownIcon />,
      label: 'Acessar',
    },
    description:
      'Em telas pequenas, conteudo, CTA e media se reorganizam em uma coluna sem overflow horizontal.',
    media: <PlaceholderMedia />,
    title: 'Hero responsivo para mobile',
    variant: 'light',
  },
  parameters: {
    componentCanvas: {
      width: 360,
    },
  },
  render: (args) => (
    <div className="hero-story-shell">
      <Hero {...args} />
    </div>
  ),
};
