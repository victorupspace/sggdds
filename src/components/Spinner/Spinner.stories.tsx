import type { Meta, StoryObj } from '@storybook/react-vite';

import { Spinner } from './Spinner';
import './Spinner.stories.css';
import type { SpinnerSize, SpinnerVariant } from './Spinner.types';

const sizes: SpinnerSize[] = ['sm', 'md', 'lg'];
const variants: SpinnerVariant[] = ['neutral', 'brand', 'inverse'];

const meta = {
  title: 'Components/Spinner',
  component: Spinner,
  parameters: {
    componentCanvas: {
      width: 360,
    },
    docs: {
      description: {
        component: `
Spinner e um indicador de progresso indeterminado para comunicar que uma acao esta em processamento ou que dados estao sendo carregados.

Use quando nao houver percentual de conclusao disponivel, em carregamentos curtos, acoes assincronas e estados temporarios de espera.

Nao use Spinner para progresso mensuravel. Quando houver valor, use ProgressBar.

Comportamento:
- Fica centralizado na viewport por padrao em desktop e mobile, atendendo ao uso como loading principal.
- Use centered={false} para casos inline dentro de botoes, cards ou regioes menores.
- O componente tambem e exportado como Loading para usos em que esse nome seja mais natural no produto.

Tokens:
Cores, sizing, border width, radius, spacing e typography usam variaveis CSS dos tokens importados do Figma.

Acessibilidade:
- Usa role="status", aria-live="polite" e aria-busy="true".
- O elemento visual e decorativo.
- A prop ariaLabel define o nome acessivel quando o label visual nao e exibido.
- Respeita prefers-reduced-motion reduzindo a velocidade da animacao.
`,
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    ariaLabel: {
      control: 'text',
      description: 'Nome acessivel do indicador de carregamento.',
    },
    centered: {
      control: 'boolean',
      description: 'Centraliza o spinner na viewport em desktop e mobile.',
    },
    className: {
      control: 'text',
      description: 'Classe CSS opcional aplicada ao container.',
    },
    label: {
      control: 'text',
      description: 'Texto associado ao estado de carregamento.',
    },
    showLabel: {
      control: 'boolean',
      description: 'Exibe o label abaixo do spinner.',
    },
    size: {
      control: 'select',
      description: 'Tamanho visual do spinner.',
      options: sizes,
    },
    variant: {
      control: 'select',
      description: 'Variante visual.',
      options: variants,
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    centered: true,
    label: 'Carregando',
    size: 'md',
    variant: 'neutral',
  },
};

export const WithLabel: Story = {
  args: {
    centered: true,
    label: 'Carregando conteudo',
    showLabel: true,
    size: 'md',
    variant: 'neutral',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="spinner-story-shell">
      <div className="spinner-story-panel">
        <div className="spinner-story-row">
          {sizes.map((size) => (
            <Spinner centered={false} key={size} label={`Carregando ${size}`} size={size} />
          ))}
        </div>
      </div>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="spinner-story-shell">
      <div className="spinner-story-panel">
        <div className="spinner-story-row">
          <Spinner centered={false} label="Carregando" variant="neutral" />
          <Spinner centered={false} label="Carregando" variant="brand" />
          <div className="spinner-story-inverse">
            <Spinner centered={false} label="Carregando" variant="inverse" />
          </div>
        </div>
      </div>
    </div>
  ),
};

export const InlineWithLabel: Story = {
  render: () => (
    <div className="spinner-story-shell">
      <div className="spinner-story-panel">
        <Spinner centered={false} label="Carregando dados" showLabel />
      </div>
    </div>
  ),
};
