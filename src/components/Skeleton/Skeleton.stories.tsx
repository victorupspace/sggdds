import type { Meta, StoryObj } from '@storybook/react-vite';

import { Skeleton } from './Skeleton';
import './Skeleton.stories.css';
import type { SkeletonAnimation, SkeletonRadius, SkeletonShape, SkeletonTone } from './Skeleton.types';

const animations: SkeletonAnimation[] = ['pulse', 'wave', 'none'];
const radii: SkeletonRadius[] = ['none', 'sm', 'md', 'lg', 'full'];
const shapes: SkeletonShape[] = ['rectangle', 'rounded', 'circle', 'text'];
const tones: SkeletonTone[] = ['default', 'subtle', 'strong'];

const meta = {
  title: 'Components/Skeleton',
  component: Skeleton,
  parameters: {
    componentCanvas: {
      width: 520,
    },
    docs: {
      description: {
        component: `
Skeleton representa uma estrutura de carregamento enquanto o conteudo real ainda nao esta disponivel.

Use para preservar estabilidade visual em listas, cards, avatar, imagens, titulos e blocos de texto. Ele ajuda a pessoa usuaria a entender a estrutura que esta chegando sem depender de percentuais de progresso.

Nao use Skeleton para acoes curtas ou carregamentos globais de tela. Nesses casos, use Spinner/Loading. Para progresso mensuravel, use ProgressBar.

Aplicacao:
- shape controla a geometria principal: rectangle, rounded, circle e text.
- width e height aceitam valores de CSS ou numeros em pixels para facilitar composicoes responsivas.
- lines cria placeholders de texto em multiplas linhas com a ultima linha menor.
- radius permite ajustar a forma sem criar novos componentes.
- animation aceita pulse, wave ou none.

Tokens:
Cores, radius, spacing, border e sizing usam variaveis CSS dos tokens importados do Figma. As dimensoes customizadas entram como variaveis CSS locais para permitir composicoes diferentes em desktop e mobile.

Acessibilidade:
- Por padrao o Skeleton e decorativo e usa aria-hidden para evitar ruido em telas com varios placeholders.
- Quando usado sozinho como estado de carregamento, informe ariaLabel para ativar role="status" e aria-busy.
- Respeita prefers-reduced-motion reduzindo a velocidade da animacao.
`,
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    animation: {
      control: 'select',
      description: 'Tipo de animacao do placeholder.',
      options: animations,
    },
    ariaLabel: {
      control: 'text',
      description: 'Nome acessivel quando o skeleton representa um loading standalone.',
    },
    className: {
      control: 'text',
      description: 'Classe CSS opcional aplicada ao elemento raiz.',
    },
    height: {
      control: 'text',
      description: 'Altura do skeleton. Numeros sao convertidos para px.',
    },
    lineGap: {
      control: 'text',
      description: 'Espaco entre linhas no shape text com lines maior que 1.',
    },
    lines: {
      control: { min: 1, step: 1, type: 'number' },
      description: 'Quantidade de linhas para skeleton de texto.',
    },
    radius: {
      control: 'select',
      description: 'Raio visual do placeholder.',
      options: radii,
    },
    shape: {
      control: 'select',
      description: 'Formato do skeleton.',
      options: shapes,
    },
    tone: {
      control: 'select',
      description: 'Intensidade visual do placeholder.',
      options: tones,
    },
    width: {
      control: 'text',
      description: 'Largura do skeleton. Numeros sao convertidos para px.',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Skeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    height: 64,
    shape: 'rounded',
    width: 64,
  },
  render: (args) => (
    <div className="skeleton-story-shell">
      <Skeleton {...args} />
    </div>
  ),
};

export const Shapes: Story = {
  render: () => (
    <div className="skeleton-story-shell">
      <div className="skeleton-story-panel">
        <div className="skeleton-story-row">
          <Skeleton height={80} shape="circle" width={80} />
          <Skeleton height={80} shape="rounded" width={80} />
          <Skeleton height={80} shape="rectangle" width={128} />
          <Skeleton shape="text" width={240} />
        </div>
      </div>
    </div>
  ),
};

export const TextLines: Story = {
  render: () => (
    <div className="skeleton-story-shell">
      <div className="skeleton-story-panel">
        <Skeleton lines={3} shape="text" width="100%" />
      </div>
    </div>
  ),
};

export const CardPlaceholder: Story = {
  render: () => (
    <div className="skeleton-story-shell">
      <div className="skeleton-story-card" aria-busy="true" aria-label="Carregando card">
        <div className="skeleton-story-card__header">
          <Skeleton height={56} shape="circle" width={56} />
          <div className="skeleton-story-stack">
            <Skeleton shape="text" width="70%" />
            <Skeleton shape="text" tone="subtle" width="42%" />
          </div>
        </div>
        <div className="skeleton-story-card__content">
          <Skeleton height={160} radius="md" width="100%" />
          <Skeleton lines={3} shape="text" width="100%" />
        </div>
      </div>
    </div>
  ),
};

export const Surfaces: Story = {
  render: () => (
    <div className="skeleton-story-shell">
      <div className="skeleton-story-grid">
        <div className="skeleton-story-surface skeleton-story-surface--white">
          <Skeleton height={64} shape="circle" width={64} />
          <Skeleton height={32} radius="md" width="70%" />
          <Skeleton height={32} radius="md" width="100%" />
        </div>
        <div className="skeleton-story-surface skeleton-story-surface--grey">
          <Skeleton height={64} shape="circle" width={64} />
          <Skeleton height={32} radius="md" width="70%" />
          <Skeleton height={32} radius="md" width="100%" />
        </div>
      </div>
    </div>
  ),
};

export const WaveAnimation: Story = {
  args: {
    animation: 'wave',
    ariaLabel: 'Carregando conteudo',
    lines: 3,
    shape: 'text',
    width: '100%',
  },
  render: (args) => (
    <div className="skeleton-story-shell">
      <div className="skeleton-story-panel">
        <Skeleton {...args} />
      </div>
    </div>
  ),
};
