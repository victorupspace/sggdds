import { useMemo, useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../Button';
import { Checkbox } from '../Checkbox';
import { DataTable } from './DataTable';
import './DataTable.stories.css';
import type { DataTableColumn, DataTableProps, DataTableTheme } from './DataTable.types';

interface ServiceRequest {
  id: number;
  protocol: string;
  requester: string;
  service: string;
  department: string;
  estimatedValue: number;
  deadline: string;
  status: 'Em analise' | 'Aguardando documentos' | 'Concluido' | 'Pendente';
}

const serviceRequests: ServiceRequest[] = [
  {
    deadline: '22/05/2026',
    department: 'Atendimento ao Cidadao',
    estimatedValue: 0,
    id: 1,
    protocol: 'SP-2026-01482',
    requester: 'Ana Clara Souza',
    service: 'Atualizacao cadastral',
    status: 'Em analise',
  },
  {
    deadline: '24/05/2026',
    department: 'Habitacao',
    estimatedValue: 1200,
    id: 2,
    protocol: 'SP-2026-01483',
    requester: 'Bruno Henrique Lima',
    service: 'Auxilio aluguel',
    status: 'Aguardando documentos',
  },
  {
    deadline: '25/05/2026',
    department: 'Saude',
    estimatedValue: 0,
    id: 3,
    protocol: 'SP-2026-01484',
    requester: 'Camila Nogueira',
    service: 'Agendamento de consulta',
    status: 'Concluido',
  },
  {
    deadline: '28/05/2026',
    department: 'Transportes',
    estimatedValue: 89.9,
    id: 4,
    protocol: 'SP-2026-01485',
    requester: 'Diego Martins',
    service: 'Segunda via de cartao',
    status: 'Em analise',
  },
  {
    deadline: '29/05/2026',
    department: 'Educacao',
    estimatedValue: 0,
    id: 5,
    protocol: 'SP-2026-01486',
    requester: 'Fernanda Rocha',
    service: 'Matricula em escola estadual',
    status: 'Pendente',
  },
  {
    deadline: '02/06/2026',
    department: 'Fazenda',
    estimatedValue: 342.75,
    id: 6,
    protocol: 'SP-2026-01487',
    requester: 'Gabriel Almeida',
    service: 'Regularizacao de debito',
    status: 'Aguardando documentos',
  },
  {
    deadline: '04/06/2026',
    department: 'Meio Ambiente',
    estimatedValue: 0,
    id: 7,
    protocol: 'SP-2026-01488',
    requester: 'Helena Costa',
    service: 'Licenca para poda de arvore',
    status: 'Em analise',
  },
  {
    deadline: '06/06/2026',
    department: 'Seguranca Publica',
    estimatedValue: 48.35,
    id: 8,
    protocol: 'SP-2026-01489',
    requester: 'Igor Pereira',
    service: 'Emissao de atestado',
    status: 'Concluido',
  },
];

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  currency: 'BRL',
  maximumFractionDigits: 2,
  style: 'currency',
});

const themeLabels: Record<DataTableTheme, string> = {
  catppuccin: 'Suave',
  crisp: 'Compacto',
  default: 'Padrao',
  material: 'Elevado',
  rounded: 'Arredondado',
};

function StatusBadge({ status }: { status: ServiceRequest['status'] }) {
  const statusClassName =
    status === 'Concluido'
      ? 'data-table-story-status--active'
      : status === 'Em analise'
        ? 'data-table-story-status--remote'
        : 'data-table-story-status--leave';

  return <span className={['data-table-story-status', statusClassName].join(' ')}>{status}</span>;
}

const serviceRequestColumns: DataTableColumn<ServiceRequest>[] = [
  {
    id: 'protocol',
    minWidth: 'var(--data-table-column-min-width)',
    name: 'Protocolo',
    selector: (row) => row.protocol,
    sortable: true,
  },
  {
    id: 'requester',
    minWidth: 'calc(var(--ds-primitive-spacing-128) + var(--ds-primitive-spacing-96))',
    name: 'Solicitante',
    selector: (row) => row.requester,
    sortable: true,
  },
  {
    hideBelow: 'md',
    id: 'service',
    minWidth: 'calc(var(--ds-primitive-spacing-128) + var(--ds-primitive-spacing-128))',
    name: 'Servico',
    selector: (row) => row.service,
    sortable: true,
  },
  {
    hideBelow: 'lg',
    id: 'department',
    minWidth: 'calc(var(--ds-primitive-spacing-128) + var(--ds-primitive-spacing-96))',
    name: 'Unidade responsavel',
    selector: (row) => row.department,
    sortable: true,
  },
  {
    hideBelow: 'sm',
    id: 'estimatedValue',
    minWidth: 'calc(var(--ds-primitive-spacing-128) + var(--ds-primitive-spacing-32))',
    name: 'Valor',
    right: true,
    selector: (row) => (row.estimatedValue > 0 ? currencyFormatter.format(row.estimatedValue) : 'Sem custo'),
    sortAccessor: (row) => row.estimatedValue,
    sortable: true,
  },
  {
    hideBelow: 'sm',
    id: 'deadline',
    minWidth: 'calc(var(--ds-primitive-spacing-128) + var(--ds-primitive-spacing-16))',
    name: 'Prazo',
    selector: (row) => row.deadline,
    sortable: true,
  },
  {
    id: 'status',
    minWidth: 'calc(var(--ds-primitive-spacing-128) + var(--ds-primitive-spacing-64))',
    name: 'Status',
    cell: (row) => <StatusBadge status={row.status} />,
    selector: (row) => row.status,
    sortable: true,
  },
];

function useServiceRequestColumns() {
  return useMemo(() => serviceRequestColumns, []);
}

function DataTableExample(args: DataTableProps<ServiceRequest>) {
  const columns = useServiceRequestColumns();

  return (
    <DataTable
      {...args}
      columns={columns}
      data={serviceRequests}
      expandableRowsComponent={(row) => (
        <div className="data-table-story-expanded">
          <strong>{row.protocol} - {row.service}</strong>
          <span>
            Solicitante: {row.requester}. Unidade responsavel: {row.department}. Prazo previsto:{' '}
            {row.deadline}. Valor estimado:{' '}
            {row.estimatedValue > 0 ? currencyFormatter.format(row.estimatedValue) : 'sem custo'}.
          </span>
        </div>
      )}
      keyField="id"
    />
  );
}

function InteractiveDataTable() {
  const columns = useServiceRequestColumns();
  const [theme, setTheme] = useState<DataTableTheme>('default');
  const [selectable, setSelectable] = useState(true);
  const [striped, setStriped] = useState(true);
  const [animateRows, setAnimateRows] = useState(true);
  const themes: DataTableTheme[] = ['default', 'material', 'rounded', 'catppuccin', 'crisp'];

  return (
    <DataTable
      actions={
        <div className="data-table-story-controls" aria-label="Controles da tabela">
          {themes.map((item) => (
            <Button
              ariaPressed={theme === item}
              className="data-table-story-control"
              key={item}
              onClick={() => {
                setTheme(item);
              }}
              size="small"
              variant={theme === item ? 'primary' : 'secondary'}
            >
              {themeLabels[item]}
            </Button>
          ))}
          <Checkbox
            checked={selectable}
            className="data-table-story-switch"
            label="Selecionavel"
            onCheckedChange={setSelectable}
          />
          <Checkbox
            checked={striped}
            className="data-table-story-switch"
            label="Linhas alternadas"
            onCheckedChange={setStriped}
          />
          <Checkbox
            checked={animateRows}
            className="data-table-story-switch"
            label="Animar linhas"
            onCheckedChange={setAnimateRows}
          />
        </div>
      }
      animateRows={animateRows}
      columns={columns}
      data={serviceRequests}
      expandableRows
      expandableRowsComponent={(row) => (
        <div className="data-table-story-expanded">
          <strong>{row.protocol} - {row.service}</strong>
          <span>
            Historico resumido do protocolo {row.protocol}: ultima atualizacao registrada para{' '}
            {row.department}, com prazo previsto para {row.deadline}.
          </span>
        </div>
      )}
      keyField="id"
      pagination
      paginationPerPage={5}
      selectableRows={selectable}
      striped={striped}
      theme={theme}
      title="Solicitacoes de servicos"
    />
  );
}

const meta = {
  title: 'Web Components/Data Table',
  component: DataTable,
  args: {
    columns: serviceRequestColumns,
    data: serviceRequests,
  },
  parameters: {
    componentCanvas: {
      width: 1120,
    },
    docs: {
      description: {
        component: `
Data Table organiza colecoes densas de dados com leitura tabular, ordenacao, paginacao, selecao de linhas e conteudo expansivel.

A API foi inspirada na experiencia do react-data-table-component, mas a implementacao e nativa deste Design System: sem dependencia externa, com tokens semanticos, tipografia Plus Jakarta Sans e CSS responsivo do projeto.

Use quando a pessoa precisa comparar registros, ordenar atributos, selecionar itens em lote ou abrir detalhes sem sair do contexto. Evite para listas simples, cards editoriais ou conteudo que nao exige comparacao por colunas.

Boas praticas:
- Defina sempre um keyField estavel para selecao, expansao e paginacao.
- Use selector para valores simples e cell para renderizacao customizada.
- Forneca sortAccessor quando a celula renderiza moeda, badge, data formatada ou ReactNode.
- Em mobile, a tabela passa a exibir linhas em formato empilhado com labels por campo; use hideBelow apenas para remover informacoes secundarias.
- Se usar selecao controlada, mantenha selectedRowKeys sincronizado com onSelectedRowsChange.

Acessibilidade:
- Usa table semantica nativa, th com scope="col" e aria-sort.
- Checkboxes possuem labels acessiveis e estado indeterminate.
- Linhas expansivas usam botoes com aria-expanded.
- Estados de foco usam tokens de focus ring.
`,
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    actions: {
      control: false,
      description: 'Slot opcional para filtros, busca ou controles de tabela.',
    },
    animateRows: {
      control: 'boolean',
      description: 'Ativa animacao de entrada nas linhas, respeitando prefers-reduced-motion.',
    },
    columns: {
      control: false,
      description: 'Definicoes tipadas das colunas.',
    },
    data: {
      control: false,
      description: 'Registros renderizados pela tabela.',
    },
    dense: {
      control: 'boolean',
      description: 'Reduz a altura das linhas.',
    },
    expandableRows: {
      control: 'boolean',
      description: 'Habilita coluna de expansao de linhas.',
    },
    highlightOnHover: {
      control: 'boolean',
      description: 'Aplica estado visual ao passar o ponteiro sobre linhas.',
    },
    pagination: {
      control: 'boolean',
      description: 'Habilita paginacao interna.',
    },
    selectableRows: {
      control: 'boolean',
      description: 'Habilita checkbox de selecao por linha e select all visivel.',
    },
    striped: {
      control: 'boolean',
      description: 'Alterna fundo das linhas para leitura em tabelas densas.',
    },
    theme: {
      control: 'select',
      description: 'Tema visual tokenizado da tabela.',
      options: ['default', 'material', 'rounded', 'catppuccin', 'crisp'],
    },
    title: {
      control: 'text',
      description: 'Titulo opcional exibido acima da tabela.',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<DataTableProps<ServiceRequest>>;

export default meta;

type Story = StoryObj<DataTableProps<ServiceRequest>>;

export const Default: Story = {
  args: {
    animateRows: true,
    expandableRows: true,
    highlightOnHover: true,
    pagination: true,
    paginationPerPage: 5,
    selectableRows: true,
    striped: true,
    theme: 'default',
    title: 'Solicitacoes de servicos',
  },
  render: (args) => (
    <div className="data-table-story-shell">
      <div className="data-table-story-panel">
        <DataTableExample {...args} />
      </div>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => (
    <div className="data-table-story-shell">
      <div className="data-table-story-panel">
        <InteractiveDataTable />
      </div>
    </div>
  ),
};

export const LoadingAndEmpty: Story = {
  args: {},
  render: () => {
    return (
      <div className="data-table-story-shell">
        <div className="data-table-story-panel">
          <DataTable
            columns={serviceRequestColumns}
            data={[]}
            pagination
            progressPending
            title="Carregando solicitacoes"
          />
        </div>
      </div>
    );
  },
};
