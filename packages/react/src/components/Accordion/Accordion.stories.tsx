import type { Meta, StoryObj } from '@storybook/react-vite';

import { Avatar } from '../Avatar';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Accordion, AccordionItem } from './Accordion';

const meta = {
  title: 'Web Components/Accordion',
  component: Accordion,
  parameters: {
    componentCanvas: {
      width: 720,
    },
    docs: {
      description: {
        component: `
O Accordion organiza conteudo extenso em cards colapsaveis, seguindo o layout do Figma (Web Components / Accordion).

Anatomia:
- Accordion: controla quais itens estao expandidos e a superficie dos cards (white ou inverse).
- AccordionItem: card com trigger (leading + titulo), badge e acao opcionais, chevron e slot de conteudo.
- O slot de conteudo e um bloco arredondado com superficie invertida em relacao ao card.
- O painel anima altura com grid-template-rows, sem medicao via JavaScript.

Tokens: superficies e borda do card usam as variables do Figma (button/color/background ghost, outline/hover e outline/active), titulo e texto do slot usam text-style/content color/typography, o chevron usa color/icons/brand/default e os espacamentos usam Component sizing.

Responsividade: abaixo de 640px o titulo reduz para 16px, o chevron para 24px e badge/acao ficam ocultos, conforme a variante Mobile do Figma.

Use para reduzir densidade visual em paginas com blocos de informacao relacionados. Evite quando todo o conteudo precisa estar visivel para comparacao imediata.
`,
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    allowMultiple: {
      control: 'boolean',
      description: 'Permite mais de um painel aberto ao mesmo tempo.',
    },
    background: {
      control: 'inline-radio',
      options: ['white', 'inverse'],
      description:
        'Superficie dos cards: white (card branco, slot cinza) ou inverse (card cinza, slot branco).',
    },
    children: {
      control: false,
      description: 'Itens do Accordion.',
    },
    className: {
      control: 'text',
      description: 'Classe CSS opcional aplicada ao elemento raiz.',
    },
    defaultExpanded: {
      control: 'object',
      description: 'Lista de ids inicialmente expandidos.',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof meta>;

const slotText = 'Isso é um slot, clique e adicione elementos para personalizar o componente';

const buttonChevron = (
  <svg aria-hidden="true" fill="none" height="20" viewBox="0 0 32 32" width="20">
    <path
      d="M16 20.0667L8.46667 12.5L9.53333 11.4333L16 17.9L22.4667 11.4333L23.5333 12.5333L16 20.0667Z"
      fill="currentColor"
    />
  </svg>
);

function ExampleAccordion({
  allowMultiple = false,
  background = 'white' as const,
  defaultExpanded = ['first'],
}: {
  allowMultiple?: boolean;
  background?: 'white' | 'inverse';
  defaultExpanded?: string[];
}) {
  return (
    <Accordion
      allowMultiple={allowMultiple}
      background={background}
      defaultExpanded={defaultExpanded}
    >
      <AccordionItem
        id="first"
        title="Title do Accordion"
        leading={<Avatar name="Serviço Digital" size="small" />}
        badge={
          <Badge size="small" variant="neutral">
            Label
          </Badge>
        }
        action={
          <Button iconEnd={buttonChevron} size="small" variant="tertiary">
            Button
          </Button>
        }
      >
        <p>{slotText}</p>
      </AccordionItem>
      <AccordionItem
        id="second"
        title="Prazos de atendimento"
        leading={<Avatar name="Prazos Atendimento" size="small" />}
      >
        <p>
          O prazo medio depende da complexidade da solicitacao e pode ser acompanhado pelos canais
          oficiais de atendimento.
        </p>
      </AccordionItem>
      <AccordionItem id="third" title="Canais disponiveis">
        <p>
          Voce pode acompanhar o andamento pelo portal, por telefone ou presencialmente na unidade
          responsavel.
        </p>
      </AccordionItem>
    </Accordion>
  );
}

export const Default: Story = {
  args: {
    allowMultiple: false,
    background: 'white',
    defaultExpanded: ['first'],
  },
  render: (args) => <ExampleAccordion {...args} />,
};

export const Inverse: Story = {
  args: {
    allowMultiple: false,
    background: 'inverse',
    defaultExpanded: ['first'],
  },
  render: (args) => <ExampleAccordion {...args} />,
};

export const AllowMultiple: Story = {
  args: {
    allowMultiple: true,
    background: 'white',
    defaultExpanded: ['first', 'second'],
  },
  render: (args) => <ExampleAccordion {...args} />,
};

export const DisabledItem: Story = {
  args: {
    defaultExpanded: ['first'],
  },
  render: () => (
    <Accordion defaultExpanded={['first']}>
      <AccordionItem
        id="first"
        title="Documentos necessarios"
        leading={<Avatar name="Documentos Necessarios" size="small" />}
      >
        <p>Confira a lista de documentos antes de iniciar a solicitacao.</p>
      </AccordionItem>
      <AccordionItem disabled id="blocked" title="Etapa indisponivel">
        <p>Este conteudo nao pode ser aberto enquanto a etapa anterior nao for concluida.</p>
      </AccordionItem>
    </Accordion>
  ),
};

export const MobileWidth: Story = {
  args: {
    allowMultiple: true,
    defaultExpanded: ['first'],
  },
  parameters: {
    componentCanvas: {
      width: 328,
    },
  },
  render: (args) => <ExampleAccordion {...args} />,
};
