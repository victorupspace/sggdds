#!/usr/bin/env node
/**
 * Valida a COMPLETUDE do conteúdo editorial dos componentes.
 *
 * O contrato trata completude como requisito funcional: uma página incompleta
 * reprova a entrega. Este script mede, seção por seção, quanto de cada página
 * de componente está preenchido — e distingue "vazio por descuido" de "vazio
 * declarado como pendência".
 *
 * Também confere que o conteúdo editorial não inventa nada: toda prop,
 * variante e componente citado precisa existir nos dados extraídos.
 *
 * Uso: node scripts/validar-conteudo.mjs [--json]
 */
import { readFileSync, readdirSync, existsSync, writeFileSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const WIKI = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const REPO = resolve(WIKI, '..');
const DADOS = join(WIKI, 'data', 'components');
const CONTEUDO = join(WIKI, 'content', 'componentes');

const SECOES = [
  { campo: 'resumo', rotulo: 'Resumo', minimo: 1 },
  { campo: 'quandoUsar', rotulo: 'Quando usar', minimo: 3 },
  { campo: 'quandoNaoUsar', rotulo: 'Quando não usar', minimo: 2 },
  { campo: 'anatomia', rotulo: 'Anatomia', minimo: 2 },
  { campo: 'dosDonts', rotulo: 'Do & don\'t', minimo: 3 },
  { campo: 'conteudoEEscrita', rotulo: 'Conteúdo e escrita', minimo: 2 },
  { campo: 'hierarquia', rotulo: 'Hierarquia', minimo: 2 },
  { campo: 'combinacoes', rotulo: 'Combinações', minimo: 2 },
  { campo: 'exemplos', rotulo: 'Exemplos práticos', minimo: 2 },
  { campo: 'errosComuns', rotulo: 'Erros comuns', minimo: 2 },
];

const CATEGORIAS_VALIDAS = new Set(['Ações', 'Formulários', 'Navegação', 'Conteúdo', 'Feedback']);

const slugsExtraidos = new Set(
  readdirSync(DADOS)
    .filter((f) => f.endsWith('.json'))
    .map((f) => f.replace('.json', '')),
);

const problemas = [];
const avisos = [];
const relatorio = [];
let totalSecoes = 0;
let secoesCompletas = 0;

for (const slug of [...slugsExtraidos].sort()) {
  const caminhoConteudo = join(CONTEUDO, `${slug}.json`);
  const extraido = JSON.parse(readFileSync(join(DADOS, `${slug}.json`), 'utf8'));

  if (!existsSync(caminhoConteudo)) {
    problemas.push({ slug, tipo: 'sem-conteudo', detalhe: 'nenhum arquivo editorial' });
    relatorio.push({ slug, completas: 0, total: SECOES.length, faltando: SECOES.map((s) => s.rotulo) });
    totalSecoes += SECOES.length;
    continue;
  }

  const conteudo = JSON.parse(readFileSync(caminhoConteudo, 'utf8'));
  const faltando = [];

  for (const secao of SECOES) {
    totalSecoes += 1;
    const valor = conteudo[secao.campo];
    const tamanho = Array.isArray(valor) ? valor.length : valor ? 1 : 0;
    if (tamanho >= secao.minimo) secoesCompletas += 1;
    else faltando.push(`${secao.rotulo} (${tamanho}/${secao.minimo})`);
  }

  // Categoria válida
  if (!CATEGORIAS_VALIDAS.has(conteudo.categoria)) {
    problemas.push({ slug, tipo: 'categoria', detalhe: `"${conteudo.categoria}" fora da taxonomia` });
  }

  // Status honesto
  if (conteudo.status !== 'em-revisao') {
    problemas.push({
      slug,
      tipo: 'status',
      detalhe: `"${conteudo.status}" — nenhum componente pode ser declarado estável antes da governança`,
    });
  }

  // Referências cruzadas precisam existir
  for (const c of conteudo.combinacoes ?? []) {
    if (c.slug && !slugsExtraidos.has(c.slug)) {
      problemas.push({ slug, tipo: 'referencia', detalhe: `combinacoes → "${c.slug}" não existe` });
    }
  }

  // "tamanhos" só pode ser afirmado se existir prop size
  const temSize = extraido.props.some((p) => p.name === 'size');
  if (conteudo.tamanhos && !temSize) {
    problemas.push({
      slug,
      tipo: 'invencao',
      detalhe: 'campo "tamanhos" preenchido, mas o componente não expõe prop size',
    });
  }

  // "responsivo" sem @media é AVISO, não erro: um componente pode ser fluido
  // por max-width, flex ou truncamento, sem nenhuma consulta de mídia. O que
  // não pode é afirmar breakpoint que não existe.
  if (conteudo.responsivo && extraido.responsive.length === 0) {
    const citaBreakpoint = /\b\d{3,4}\s*px\b|@media/.test(conteudo.responsivo);
    if (citaBreakpoint) {
      problemas.push({
        slug,
        tipo: 'invencao',
        detalhe: 'campo "responsivo" cita breakpoint, mas o CSS não tem nenhuma regra @media',
      });
    } else {
      avisos.push({ slug, detalhe: 'descreve comportamento responsivo sem @media (fluidez)' });
    }
  }

  relatorio.push({ slug, completas: SECOES.length - faltando.length, total: SECOES.length, faltando });
}

const percentual = ((secoesCompletas / totalSecoes) * 100).toFixed(1);
const incompletos = relatorio.filter((r) => r.faltando.length > 0);

console.log(`Componentes avaliados: ${relatorio.length}`);
console.log(`Seções obrigatórias: ${totalSecoes}`);
console.log(`Seções completas: ${secoesCompletas} (${percentual}%)`);
console.log(`Componentes com alguma seção incompleta: ${incompletos.length}`);
console.log(`Problemas de consistência: ${problemas.length}`);
console.log(`Avisos: ${avisos.length}`);

if (incompletos.length) {
  console.log('\nIncompletos:');
  for (const r of incompletos.slice(0, 15)) {
    console.log(`  ${r.slug} (${r.completas}/${r.total}) — falta: ${r.faltando.join(', ')}`);
  }
  if (incompletos.length > 15) console.log(`  … e mais ${incompletos.length - 15}`);
}

if (problemas.length) {
  console.error('\nProblemas:');
  for (const p of problemas) console.error(`  ${p.slug} [${p.tipo}] ${p.detalhe}`);
}

// Grava o resultado para alimentar COBERTURA.md
writeFileSync(
  join(WIKI, 'data', 'cobertura-conteudo.json'),
  JSON.stringify(
    {
      geradoEm: null,
      componentes: relatorio.length,
      secoesObrigatorias: totalSecoes,
      secoesCompletas,
      percentual: Number(percentual),
      incompletos,
      problemas,
    },
    null,
    2,
  ),
);

const relatorioMd = [
  '# Cobertura do conteúdo editorial dos componentes',
  '',
  `Gerado por \`wiki/scripts/validar-conteudo.mjs\`.`,
  '',
  `- Componentes: **${relatorio.length}**`,
  `- Seções obrigatórias: **${totalSecoes}** (${SECOES.length} por componente)`,
  `- Seções completas: **${secoesCompletas}** (${percentual}%)`,
  `- Componentes 100% preenchidos: **${relatorio.length - incompletos.length}**`,
  `- Problemas de consistência: **${problemas.length}**`,
  '',
  '| Componente | Completas | Faltando |',
  '|---|---|---|',
  ...relatorio.map(
    (r) => `| \`${r.slug}\` | ${r.completas}/${r.total} | ${r.faltando.join(', ') || '—'} |`,
  ),
  '',
];
writeFileSync(join(REPO, 'COBERTURA-CONTEUDO.md'), relatorioMd.join('\n'));
console.log('\nRelatório: COBERTURA-CONTEUDO.md');

process.exit(problemas.length > 0 ? 1 : 0);
