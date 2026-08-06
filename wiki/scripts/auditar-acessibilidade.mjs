#!/usr/bin/env node
/**
 * Auditoria de acessibilidade do site construído, com axe-core em navegador real.
 *
 * Roda sobre out/ servido localmente e gera RELATORIO-ACESSIBILIDADE.md na raiz
 * do repositório. Cobre a exigência de verificação WCAG 2.1 AA da Definition of
 * Done — medindo, em vez de afirmar conformidade.
 *
 * Uso: node scripts/auditar-acessibilidade.mjs [--porta 6410] [--todas]
 *   sem --todas, audita uma amostra representativa (uma página de cada tipo)
 *
 * Dependências: playwright e axe-core, resolvidos a partir do monorepo.
 */
/* global axe, document -- usados apenas dentro de `pagina.evaluate`, cujo corpo
   é serializado e executado no navegador, não neste processo Node. */
import { createServer } from 'node:http';
import { readFileSync, existsSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const WIKI = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const REPO = resolve(WIKI, '..');
const OUT = join(WIKI, 'out');
const exigir = createRequire(join(REPO, 'package.json'));

const args = process.argv.slice(2);
const PORTA = Number(args[args.indexOf('--porta') + 1]) || 6410;
const TODAS = args.includes('--todas');

if (!existsSync(OUT)) {
  console.error('Rode "npm run build" antes de auditar.');
  process.exit(1);
}

const TIPOS = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
  '.woff2': 'font/woff2',
  '.png': 'image/png',
};

function listarRotas() {
  const achados = [];
  const andar = (dir) => {
    for (const entrada of readdirSync(dir)) {
      const caminho = join(dir, entrada);
      if (statSync(caminho).isDirectory()) andar(caminho);
      else if (entrada === 'index.html') {
        const rota = caminho.slice(OUT.length).replace(/\\/g, '/').replace(/index\.html$/, '');
        achados.push(rota);
      }
    }
  };
  andar(OUT);
  return achados.sort();
}

const todasAsRotas = listarRotas();
const rotas = TODAS
  ? todasAsRotas
  : todasAsRotas.filter(
      (r) =>
        r === '/' ||
        r === '/componentes/' ||
        /^\/(fundamentos|introducao|padroes|templates|conteudo|recursos)\/[^/]+\/$/.test(r) ||
        r === '/componentes/visao-geral/' ||
        r === '/componentes/badge/' ||
        r === '/componentes/data-table/',
    );

const servidor = createServer((req, res) => {
  const url = decodeURIComponent((req.url ?? '/').split('?')[0]);
  let caminho = join(OUT, url);
  if (existsSync(caminho) && statSync(caminho).isDirectory()) caminho = join(caminho, 'index.html');
  if (!existsSync(caminho)) {
    res.writeHead(404);
    res.end('404');
    return;
  }
  res.writeHead(200, { 'Content-Type': TIPOS[extname(caminho)] ?? 'application/octet-stream' });
  res.end(readFileSync(caminho));
});

await new Promise((r) => servidor.listen(PORTA, r));

const { chromium } = exigir('playwright');
const axeFonte = readFileSync(exigir.resolve('axe-core/axe.min.js'), 'utf8');

const navegador = await chromium.launch();
// `reducedMotion: 'reduce'` é essencial e não é atalho: sem ele a auditoria
// corre junto com as animações de entrada e o axe mede o contraste na
// opacidade intermediária, acusando falha onde não há. Com ele, medimos o
// estado final — que é exatamente o que uma pessoa com movimento reduzido vê.
const contexto = await navegador.newContext({
  viewport: { width: 1280, height: 900 },
  reducedMotion: 'reduce',
});

const resultados = [];
for (const rota of rotas) {
  const pagina = await contexto.newPage();
  // O preview de componente é um iframe de outro domínio; bloqueá-lo evita
  // que a auditoria dependa de rede e do conteúdo do Storybook.
  await pagina.route('**://sggdds.vercel.app/**', (r) => r.abort());

  try {
    await pagina.goto(`http://localhost:${PORTA}${rota}`, { waitUntil: 'domcontentloaded' });
    await pagina.addScriptTag({ content: axeFonte });
    const relatorio = await pagina.evaluate(async () => {
      // @ts-expect-error axe é injetado acima
      return axe.run(document, {
        iframes: false,
        resultTypes: ['violations'],
        runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] },
      });
    });
    resultados.push({
      rota,
      violacoes: relatorio.violations.map((v) => ({
        id: v.id,
        impacto: v.impact,
        descricao: v.help,
        nos: v.nodes.length,
        alvo: v.nodes[0]?.target?.join(' ') ?? '',
      })),
    });
    process.stdout.write(relatorio.violations.length === 0 ? '.' : 'x');
  } catch (erro) {
    resultados.push({ rota, erro: String(erro).slice(0, 200), violacoes: [] });
    process.stdout.write('!');
  } finally {
    await pagina.close();
  }
}

await navegador.close();
servidor.close();

const totalViolacoes = resultados.reduce((t, r) => t + r.violacoes.length, 0);
const paginasLimpas = resultados.filter((r) => r.violacoes.length === 0 && !r.erro).length;

const porRegra = new Map();
for (const r of resultados) {
  for (const v of r.violacoes) {
    const atual = porRegra.get(v.id) ?? { ...v, paginas: [], totalNos: 0 };
    atual.paginas.push(r.rota);
    atual.totalNos += v.nos;
    porRegra.set(v.id, atual);
  }
}

const dataHoje = new Date().toISOString().slice(0, 10);
const linhas = [
  '# Relatório de acessibilidade — Wiki do Sampa Design System',
  '',
  `Auditoria automatizada com axe-core sobre o site construído, em navegador real (Chromium).`,
  `Regras aplicadas: WCAG 2.0 A/AA e WCAG 2.1 A/AA.`,
  '',
  `- Data: ${dataHoje}`,
  `- Páginas auditadas: **${resultados.length}** de ${todasAsRotas.length} geradas${TODAS ? '' : ' (amostra representativa)'}`,
  `- Páginas sem violação: **${paginasLimpas}**`,
  `- Violações totais: **${totalViolacoes}**`,
  '',
  '> O preview de componente é um `iframe` do Storybook, em outro domínio. Ele é bloqueado durante',
  '> a auditoria: o que se mede aqui é a acessibilidade da Wiki, não a do Storybook.',
  '',
  '> O navegador roda com `prefers-reduced-motion: reduce`, que desliga as revelações de entrada.',
  '> Sem isso o axe mediria o contraste no meio da animação, com opacidade intermediária, e acusaria',
  '> falhas inexistentes. O que se mede é o estado final — o mesmo que vê quem pede movimento reduzido.',
  '',
];

if (porRegra.size === 0) {
  linhas.push('## Resultado', '', 'Nenhuma violação encontrada nas páginas auditadas.', '');
} else {
  linhas.push('## Violações por regra', '', '| Regra | Impacto | Descrição | Ocorrências | Páginas |', '|---|---|---|---|---|');
  for (const [id, v] of [...porRegra.entries()].sort((a, b) => b[1].totalNos - a[1].totalNos)) {
    linhas.push(
      `| \`${id}\` | ${v.impacto ?? '—'} | ${v.descricao} | ${v.totalNos} | ${v.paginas.length} |`,
    );
  }
  linhas.push('', '## Detalhe por página', '');
  for (const r of resultados.filter((x) => x.violacoes.length > 0)) {
    linhas.push(`### \`${r.rota}\``, '');
    for (const v of r.violacoes) {
      linhas.push(`- **${v.id}** (${v.impacto}) — ${v.descricao}. ${v.nos} ocorrência(s). Ex.: \`${v.alvo}\``);
    }
    linhas.push('');
  }
}

const comErro = resultados.filter((r) => r.erro);
if (comErro.length) {
  linhas.push('## Páginas que não puderam ser auditadas', '');
  for (const r of comErro) linhas.push(`- \`${r.rota}\` — ${r.erro}`);
  linhas.push('');
}

linhas.push(
  '## Como reproduzir',
  '',
  '```bash',
  'cd wiki',
  'npm run build',
  'node scripts/auditar-acessibilidade.mjs --todas',
  '```',
  '',
);

writeFileSync(join(REPO, 'RELATORIO-ACESSIBILIDADE.md'), linhas.join('\n'));

console.log(`\n\nPáginas auditadas: ${resultados.length}`);
console.log(`Sem violação: ${paginasLimpas}`);
console.log(`Violações: ${totalViolacoes}`);
console.log('Relatório: RELATORIO-ACESSIBILIDADE.md');

process.exit(totalViolacoes > 0 ? 1 : 0);
