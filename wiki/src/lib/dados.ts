/**
 * Carregadores dos dados extraídos na Fase 0.
 *
 * Tudo é lido do disco em tempo de build (Server Components + SSG). A Wiki não
 * consulta Figma nem Storybook em produção.
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

export const RAIZ_DADOS = join(process.cwd(), 'data');
export const RAIZ_CONTEUDO = join(process.cwd(), 'content');

export const STORYBOOK_URL = 'https://sggdds.vercel.app';
export const FIGMA_FILE_WEB = 'yDUVLEx2nP1c7SFQDZVj7n';
export const FIGMA_FILE_FOUNDATIONS = '3IPhcwjiNpG6PXVmdG2x3x';
export const REPO_URL = 'https://github.com/victorupspace/sggdds';

export interface PropExtraida {
  name: string;
  type: string;
  values: string[] | null;
  default: string | null;
  required: boolean;
  description: string | null;
  source: string;
}

export interface ComponenteExtraido {
  slug: string;
  name: string;
  storybookTitle: string | null;
  sourceDir: string;
  exports: string[];
  typeExports: string[];
  oneLiner: string | null;
  docsDescription: string | null;
  props: PropExtraida[];
  callbacks: { name: string; signature: string; description: string | null }[];
  slots: { name: string; type: string; description: string | null }[];
  cssClasses: string[];
  cssCustomProperties: { name: string; value: string; comment: string | null }[];
  tokensUsed: string[];
  stories: { id: string; name: string; docsUrl: string; iframeUrl: string }[];
  variants: { prop: string; values: string[] }[];
  states: string[];
  responsive: { query: string; effect: string }[];
  accessibility: {
    roles: string[];
    ariaAttributes: string[];
    keyboardInteractions: string[];
    notes: string[];
  };
  tests: {
    unitFile: string | null;
    unitCount: number | null;
    a11yFile: string | null;
    a11yCount: number | null;
  };
  figmaReferences: { node: string; note: string }[];
  pendencias: string[];
}

/** Conteúdo editorial de um componente — redigido, não extraído. */
export interface ConteudoComponente {
  slug: string;
  status: 'estavel' | 'beta' | 'em-revisao' | 'depreciado';
  statusNota?: string;
  categoria: string;
  resumo: string;
  quandoUsar: string[];
  quandoNaoUsar: { texto: string; alternativa?: string }[];
  anatomia: { numero: number; parte: string; descricao: string }[];
  tamanhos?: string;
  responsivo?: string;
  dosDonts: { faca: string; naoFaca: string; porque: string }[];
  conteudoEEscrita: string[];
  hierarquia: string[];
  combinacoes: { componente: string; slug?: string; relacao: string }[];
  exemplos: { titulo: string; contexto: string; comoFica: string }[];
  errosComuns: { erro: string; consequencia: string; correcao: string }[];
  notasImplementacao?: string[];
  pendentes?: string[];
}

export interface TokenInventariado {
  cssVar: string;
  figmaPath: string;
  colecao: string;
  camada: string;
  tipo: string;
  valorBruto: string;
  aliasDe: string | null;
  valorResolvido: string;
  grupo: string;
}

function lerJson(caminho: string): unknown {
  return JSON.parse(readFileSync(caminho, 'utf8'));
}

let cacheComponentes: ComponenteExtraido[] | null = null;

export function listarComponentes(): ComponenteExtraido[] {
  if (cacheComponentes) return cacheComponentes;
  const dir = join(RAIZ_DADOS, 'components');
  cacheComponentes = readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => lerJson(join(dir, f)) as ComponenteExtraido)
    .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
  return cacheComponentes;
}

export function obterComponente(slug: string): ComponenteExtraido | null {
  const caminho = join(RAIZ_DADOS, 'components', `${slug}.json`);
  return existsSync(caminho) ? (lerJson(caminho) as ComponenteExtraido) : null;
}

export function obterConteudoComponente(slug: string): ConteudoComponente | null {
  const caminho = join(RAIZ_CONTEUDO, 'componentes', `${slug}.json`);
  return existsSync(caminho) ? (lerJson(caminho) as ConteudoComponente) : null;
}

let cacheTokens: TokenInventariado[] | null = null;

export function listarTokens(): TokenInventariado[] {
  if (cacheTokens) return cacheTokens;
  const dados = lerJson(join(RAIZ_DADOS, 'tokens.json')) as { tokens: TokenInventariado[] };
  cacheTokens = dados.tokens;
  return cacheTokens;
}

export function metaTokens() {
  return (lerJson(join(RAIZ_DADOS, 'tokens.json')) as { meta: Record<string, unknown> }).meta;
}

export function tokensPorGrupo(prefixo: string): TokenInventariado[] {
  return listarTokens().filter((t) => t.cssVar.startsWith(prefixo));
}

export interface ParFigma {
  figmaName: string;
  figmaNodeId: string;
  figmaUrl: string;
  figmaPage: string;
  codeSlug: string | null;
  storybookTitle: string | null;
  confianca: 'exata' | 'provavel' | 'incerta';
  justificativa: string;
}

export function listarParesFigma(): ParFigma[] {
  const caminho = join(RAIZ_DADOS, 'mapping.json');
  if (!existsSync(caminho)) return [];
  return (lerJson(caminho) as { pares: ParFigma[] }).pares;
}

export function figmaDoComponente(slug: string): ParFigma | null {
  return listarParesFigma().find((p) => p.codeSlug === slug) ?? null;
}

/** Link para o node do Figma a partir de um id "40000045:5961". */
export function urlFigma(nodeId: string, arquivo = FIGMA_FILE_WEB): string {
  const nome = arquivo === FIGMA_FILE_WEB ? 'Web-Components' : 'Foundations';
  return `https://www.figma.com/design/${arquivo}/${nome}?node-id=${nodeId.replace(':', '-')}`;
}

export function urlStorybookDocs(id: string): string {
  return `${STORYBOOK_URL}/?path=/docs/${id}`;
}

export function urlStorybookIframe(id: string): string {
  return `${STORYBOOK_URL}/iframe.html?id=${id}&viewMode=story`;
}

export function urlCodigoFonte(sourceDir: string): string {
  return `${REPO_URL}/tree/main/${sourceDir}`;
}
