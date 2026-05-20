import type { Meta, StoryObj } from '@storybook/react-vite';

import { Hero } from './Hero';
import './Hero.stories.css';

function ArrowRightIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4 10h12m0 0-5-5m5 5-5 5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function PlaceholderMedia({ ratio = '3 / 2', tone = 'light' }: { ratio?: string; tone?: 'light' | 'dark' }) {
  return (
    <div
      aria-hidden="true"
      className={tone === 'dark' ? 'hero-story-placeholder hero-story-placeholder--dark' : 'hero-story-placeholder'}
    >
      {ratio}
    </div>
  );
}

const meta = {
  title: 'Web Components/Hero',
  component: Hero,
  parameters: {
    componentCanvas: {
      width: 1200,
    },
    docs: {
      description: {
        component: `
O Hero ocupa o topo da pagina (ou de uma secao de alta prioridade) com titulo, descricao, CTA e mídia opcional. Use para apresentar a proposta principal do conteudo abaixo, nao para reforco decorativo.

Anatomia:
- Eyebrow opcional para categoria ou contexto.
- Titulo (h1 por padrao; h2 ou h3 quando aninhado em secao com hierarquia propria).
- Descricao curta (1 a 3 linhas).
- Ate duas acoes: primaria (Button primary) e secundaria (Button tertiary).
- Mídia opcional posicionada ao lado do conteudo em desktop, abaixo em mobile.

Variantes:
- light: superficie clara, conteudo em soft-black.
- dark: superficie soft-black, conteudo em branco. Os CTAs trocam de cor automaticamente para garantir contraste.

Responsividade:
- Acima de 900px: layout em duas colunas com mídia ao lado do conteudo.
- Entre 640px e 900px: layout em uma coluna, mídia abaixo do texto.
- Abaixo de 640px: padding reduzido, titulo menor, CTAs empilhados em largura total.

Acessibilidade:
- Renderiza section; use ariaLabel quando a pagina tiver multiplos heros.
- Title respeita headingLevel para manter ordem de h1 a h3.
- image.alt obrigatorio; media customizada deve cuidar da propria semantica.
- CTAs usam Button do DS, herdando foco, teclado e estados.
`,
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    action: {
      control: false,
      description: 'Acao principal (Button primary).',
    },
    ariaLabel: {
      control: 'text',
      description: 'Nome acessivel opcional da section.',
    },
    children: {
      control: false,
      description: 'Slot opcional entre a descricao e as acoes.',
    },
    className: {
      control: 'text',
    },
    description: {
      control: 'text',
    },
    eyebrow: {
      control: 'text',
    },
    headingLevel: {
      control: 'select',
      options: [1, 2, 3],
    },
    image: {
      control: false,
    },
    media: {
      control: false,
    },
    mediaAspectRatio: {
      control: 'select',
      options: ['1/1', '4/3', '3/2', '16/9'],
    },
    mediaPosition: {
      control: 'select',
      options: ['start', 'end'],
    },
    secondaryAction: {
      control: false,
    },
    title: {
      control: 'text',
    },
    variant: {
      control: 'select',
      options: ['light', 'dark'],
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Hero>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    action: {
      iconEnd: <ArrowRightIcon />,
      label: 'Acessar servicos',
    },
    description:
      'Acompanhe pedidos, atualize cadastros e acesse documentos em um unico ambiente, sem precisar ir a uma unidade fisica.',
    eyebrow: 'Servicos digitais',
    media: <PlaceholderMedia ratio="3 / 2" />,
    secondaryAction: {
      label: 'Ver tutoriais',
    },
    title: 'Tudo o que voce precisa, em um so lugar.',
    variant: 'light',
  },
};

export const Dark: Story = {
  args: {
    action: {
      iconEnd: <ArrowRightIcon />,
      label: 'Ver meus beneficios',
    },
    description:
      'Consulte valores, datas de pagamento e atualize seus dados sem sair de casa. Disponivel 24 horas, com seguranca.',
    eyebrow: 'Beneficios',
    media: <PlaceholderMedia ratio="3 / 2" tone="dark" />,
    secondaryAction: {
      label: 'Saiba mais',
    },
    title: 'Acompanhe seus beneficios em tempo real.',
    variant: 'dark',
  },
};

export const SquareMedia: Story = {
  args: {
    action: {
      label: 'Comecar agora',
    },
    description:
      'Sua identidade digital agora cabe no celular. Aceita em mais de 4.000 servicos publicos com o mesmo nivel de seguranca dos documentos fisicos.',
    eyebrow: 'Identidade digital',
    media: <PlaceholderMedia ratio="1 / 1" tone="dark" />,
    mediaAspectRatio: '1/1',
    secondaryAction: {
      label: 'Como funciona',
    },
    title: 'Carteira de identidade digital.',
    variant: 'dark',
  },
};

export const MediaStart: Story = {
  args: {
    action: {
      label: 'Atualizar cadastro',
    },
    description:
      'Mantenha endereco, telefone e e-mail sempre corretos para receber notificacoes importantes sobre seus servicos.',
    media: <PlaceholderMedia ratio="3 / 2" />,
    mediaPosition: 'start',
    title: 'Seus dados atualizados garantem servicos mais agis.',
    variant: 'light',
  },
};

export const WithoutMedia: Story = {
  args: {
    action: {
      label: 'Atualizar agora',
    },
    description:
      'Voce tem ate 30 de junho para confirmar seus dados cadastrais e continuar recebendo seus beneficios sem interrupcao.',
    eyebrow: 'Prazo importante',
    secondaryAction: {
      label: 'Verificar prazo',
    },
    title: 'Atualizacao cadastral anual.',
    variant: 'light',
  },
};

export const HeadingLevelTwo: Story = {
  args: {
    action: {
      label: 'Acessar painel',
    },
    description:
      'Use headingLevel=2 quando o Hero estiver dentro de uma pagina que ja possui um h1 proprio.',
    headingLevel: 2,
    title: 'Hero como secao secundaria.',
    variant: 'light',
  },
};
