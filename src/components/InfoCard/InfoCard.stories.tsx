import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../Button';
import { InfoCard } from './InfoCard';

const defaultDescription =
  'Isso é um slot. Aqui é possível que o designer ou desenvolvedor aplique componentes como texto, checkbox, button e outros atômicos';

function CarIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7 15.5 9.1 9.8A2 2 0 0 1 11 8.5h10a2 2 0 0 1 1.9 1.3l2.1 5.7M6.5 15.5h19v8h-19v-8Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M9.5 23.5v2M22.5 23.5v2M10.5 19.5h.01M21.5 19.5h.01M11 13h10"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

const meta = {
  title: 'Web Components/InfoCard',
  component: InfoCard,
  parameters: {
    componentCanvas: {
      width: 320,
    },
    docs: {
      description: {
        component: `
O InfoCard apresenta uma informacao contextual em formato de card, combinando icone, titulo, subtitulo, descricao e um slot flexivel para conteudos atomicos.

Use quando precisar destacar uma orientacao, explicar uma etapa, agrupar texto instrucional ou oferecer um espaco composicional simples dentro de fluxos e formularios.

Nao use como alerta critico, modal, navegacao, card interativo complexo, tabela ou lista extensa.

Anatomia:
- Icone decorativo dentro de circulo escuro.
- Titulo obrigatorio.
- Subtitulo opcional como segunda linha forte.
- Descricao opcional.
- Slot via children para texto, checkbox, button, links ou outros componentes futuros.

Acessibilidade:
- O card usa article.
- O titulo usa heading configuravel por headingLevel, com default h3.
- O icone e decorativo por padrao e fica aria-hidden.
- A informacao principal deve estar no texto, nao apenas no icone.
`,
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    children: {
      control: false,
      description: 'Slot flexivel renderizado abaixo da description.',
    },
    className: {
      control: 'text',
      description: 'Classe CSS opcional aplicada ao elemento raiz.',
    },
    description: {
      control: 'text',
      description: 'Texto descritivo abaixo do header.',
    },
    headingLevel: {
      control: 'select',
      description: 'Nivel semantico do heading do titulo.',
      options: [2, 3, 4, 5, 6],
    },
    icon: {
      control: false,
      description: 'ReactNode renderizado dentro do circulo escuro.',
    },
    subtitle: {
      control: 'text',
      description: 'Linha complementar de titulo.',
    },
    title: {
      control: 'text',
      description: 'Titulo principal obrigatorio.',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof InfoCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    description: defaultDescription,
    icon: <CarIcon />,
    subtitle: 'Ipsum dor simmet',
    title: 'Lorem',
  },
};

export const WithoutSubtitle: Story = {
  args: {
    description: 'Use este card para apresentar uma informacao contextual de leitura rapida.',
    icon: <CarIcon />,
    title: 'Orientação',
  },
};

export const WithChildrenSlot: Story = {
  args: {
    icon: <CarIcon />,
    subtitle: 'Escolha uma opção',
    title: 'Configuração adicional',
  },
  render: (args) => (
    <InfoCard {...args}>
      <p>Você pode inserir conteúdo customizado dentro deste espaço.</p>
      <Button>Ação opcional</Button>
    </InfoCard>
  ),
};

export const WithoutIcon: Story = {
  args: {
    description:
      'Variação para quando o contexto textual já é suficiente e o ícone não agrega informação.',
    subtitle: 'Sem apoio visual',
    title: 'Informação',
  },
};
