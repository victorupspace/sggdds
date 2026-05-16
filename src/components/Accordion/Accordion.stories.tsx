import type { Meta, StoryObj } from '@storybook/react-vite';

import { Accordion, AccordionItem } from './Accordion';

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    componentCanvas: {
      width: 640,
    },
    docs: {
      description: {
        component: `
O Accordion organiza conteudo extenso em secoes colapsaveis.

Anatomia:
- Accordion: controla quais itens estao expandidos.
- AccordionItem: contem trigger, titulo, chevron e painel.
- O painel anima altura com grid-template-rows, sem medicao via JavaScript.

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

function ExampleAccordion({
  allowMultiple = false,
  defaultExpanded = ['documents'],
}: {
  allowMultiple?: boolean;
  defaultExpanded?: string[];
}) {
  return (
    <Accordion allowMultiple={allowMultiple} defaultExpanded={defaultExpanded}>
      <AccordionItem id="documents" title="Documentos necessarios">
        <p>
          Tenha em maos documento de identificacao, comprovante de residencia e demais anexos
          solicitados no formulario do servico.
        </p>
      </AccordionItem>
      <AccordionItem id="deadlines" title="Prazos de atendimento">
        <p>
          O prazo medio depende da complexidade da solicitacao e pode ser acompanhado pelos canais
          oficiais de atendimento.
        </p>
      </AccordionItem>
      <AccordionItem id="channels" title="Canais disponiveis">
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
    defaultExpanded: ['documents'],
  },
  render: (args) => <ExampleAccordion {...args} />,
};

export const AllowMultiple: Story = {
  args: {
    allowMultiple: true,
    defaultExpanded: ['documents', 'deadlines'],
  },
  render: (args) => <ExampleAccordion {...args} />,
};

export const DisabledItem: Story = {
  args: {
    defaultExpanded: ['documents'],
  },
  render: () => (
    <Accordion defaultExpanded={['documents']}>
      <AccordionItem id="documents" title="Documentos necessarios">
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
    defaultExpanded: ['documents'],
  },
  parameters: {
    componentCanvas: {
      width: 320,
    },
  },
  render: (args) => <ExampleAccordion {...args} />,
};
