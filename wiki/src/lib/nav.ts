/**
 * Árvore de navegação da Wiki. É a fonte única da sidebar, da busca por rota e
 * da verificação de links quebrados.
 */
import { listarComponentes } from './dados';

export interface ItemNav {
  titulo: string;
  href: string;
  descricao?: string;
}

export interface GrupoNav {
  titulo: string;
  itens: ItemNav[];
}

export const NAV_ESTATICA: GrupoNav[] = [
  {
    titulo: 'Introdução',
    itens: [
      { titulo: 'Sobre o Sampa DS', href: '/introducao/sobre' },
      { titulo: 'Premissas e objetivos', href: '/introducao/premissas-e-objetivos' },
      { titulo: 'Princípios', href: '/introducao/principios' },
      { titulo: 'Como usar', href: '/introducao/como-usar' },
      { titulo: 'Fluxo de criação', href: '/introducao/fluxo-de-criacao' },
      { titulo: 'Fluxo de desenvolvimento', href: '/introducao/fluxo-de-desenvolvimento' },
      { titulo: 'Governança', href: '/introducao/governanca' },
      { titulo: 'Contribua', href: '/introducao/contribua' },
    ],
  },
  {
    titulo: 'Fundamentos',
    itens: [
      { titulo: 'Visão geral', href: '/fundamentos/visao-geral' },
      { titulo: 'Design tokens', href: '/fundamentos/tokens' },
      { titulo: 'Cor', href: '/fundamentos/cor' },
      { titulo: 'Tipografia', href: '/fundamentos/tipografia' },
      { titulo: 'Espaçamento', href: '/fundamentos/espacamento' },
      { titulo: 'Grid e layout', href: '/fundamentos/grid-e-layout' },
      { titulo: 'Iconografia', href: '/fundamentos/iconografia' },
      { titulo: 'Logo e marca', href: '/fundamentos/logo-e-marca' },
      { titulo: 'Elevação e sombra', href: '/fundamentos/elevacao-e-sombra' },
      { titulo: 'Borda e raio', href: '/fundamentos/borda-e-raio' },
      { titulo: 'Motion', href: '/fundamentos/motion' },
      { titulo: 'Acessibilidade', href: '/fundamentos/acessibilidade' },
    ],
  },
];

export const NAV_FINAL: GrupoNav[] = [
  {
    titulo: 'Padrões',
    itens: [
      { titulo: 'Visão geral', href: '/padroes/visao-geral' },
      { titulo: 'Formulários', href: '/padroes/formularios' },
      { titulo: 'Busca', href: '/padroes/busca' },
      { titulo: 'Filtros', href: '/padroes/filtros' },
      { titulo: 'Tabela de dados', href: '/padroes/tabela-de-dados' },
      { titulo: 'Login e identificação', href: '/padroes/login' },
      { titulo: 'Feedback e erros', href: '/padroes/feedback-e-erros' },
      { titulo: 'Estados vazios', href: '/padroes/estados-vazios' },
      { titulo: 'Paginação', href: '/padroes/paginacao' },
      { titulo: 'Upload de arquivos', href: '/padroes/upload' },
    ],
  },
  {
    titulo: 'Templates',
    itens: [
      { titulo: 'Visão geral', href: '/templates/visao-geral' },
      { titulo: 'Landing de serviço', href: '/templates/landing-de-servico' },
      { titulo: 'Página de serviço', href: '/templates/pagina-de-servico' },
      { titulo: 'Formulário longo', href: '/templates/formulario-longo' },
      { titulo: 'Painel', href: '/templates/painel' },
    ],
  },
  {
    titulo: 'Conteúdo',
    itens: [
      { titulo: 'Padrões de escrita', href: '/conteudo/writing' },
      { titulo: 'Vocabulário', href: '/conteudo/vocabulario' },
    ],
  },
  {
    titulo: 'Recursos',
    itens: [
      { titulo: 'Ferramentas', href: '/recursos/ferramentas' },
      { titulo: 'Instalação', href: '/recursos/instalacao' },
      { titulo: 'Downloads', href: '/recursos/downloads' },
      { titulo: 'Perguntas frequentes', href: '/recursos/faq' },
      { titulo: 'Suporte', href: '/recursos/suporte' },
      { titulo: 'Changelog', href: '/recursos/changelog' },
      { titulo: 'Glossário', href: '/recursos/glossario' },
    ],
  },
];

export function navegacaoCompleta(): GrupoNav[] {
  const componentes = listarComponentes();
  return [
    ...NAV_ESTATICA,
    {
      titulo: 'Componentes',
      itens: [
        { titulo: 'Visão geral', href: '/componentes/visao-geral' },
        ...componentes.map((c) => ({ titulo: c.name, href: `/componentes/${c.slug}` })),
      ],
    },
    ...NAV_FINAL,
  ];
}

/** Todas as rotas conhecidas — usado pelo verificador de links quebrados. */
export function todasAsRotas(): string[] {
  return ['/', ...navegacaoCompleta().flatMap((g) => g.itens.map((i) => i.href))];
}
