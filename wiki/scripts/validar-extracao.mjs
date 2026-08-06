#!/usr/bin/env node
/**
 * Valida os dados extraídos em wiki/data/ contra a fonte de verdade (código do
 * monorepo e index.json do Storybook). Existe para sustentar a regra de zero
 * invenção: nenhum dado técnico entra na Wiki sem bater com a origem.
 *
 * Uso: node wiki/scripts/validar-extracao.mjs  (sai com código 1 se houver falha)
 */
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const WIKI = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const REPO = resolve(WIKI, '..');
const DATA = join(WIKI, 'data');

const falhas = [];
const acertos = [];
const check = (cond, slug, regra, detalhe) =>
  cond ? acertos.push(`${slug}:${regra}`) : falhas.push({ slug, regra, detalhe });

const lerJson = (p) => JSON.parse(readFileSync(p, 'utf8'));
const listar = (dir, sufixo) =>
  existsSync(dir) ? readdirSync(dir).filter((f) => f.endsWith(sufixo)) : [];

const storybook = lerJson(join(REPO, 'storybook-static/index.json')).entries;
const arquivos = listar(join(DATA, 'components'), '.json');

if (arquivos.length === 0) {
  console.error('Nenhum componente extraído em wiki/data/components/');
  process.exit(1);
}

for (const arquivo of arquivos) {
  const d = lerJson(join(DATA, 'components', arquivo));
  const slug = d.slug ?? arquivo;
  const dir = join(REPO, d.sourceDir ?? '');

  check(existsSync(dir) && statSync(dir).isDirectory(), slug, 'sourceDir', d.sourceDir);
  if (!existsSync(dir)) continue;

  // Testes de acessibilidade: presença declarada precisa bater com o disco.
  const a11yNoDisco = listar(dir, '.a11y.test.tsx').length > 0;
  check(a11yNoDisco === Boolean(d.tests?.a11yFile), slug, 'tests.a11yFile', `disco=${a11yNoDisco}`);

  // Contagem de testes unitários.
  const unitFile = d.tests?.unitFile ? join(REPO, d.tests.unitFile) : null;
  if (unitFile && existsSync(unitFile)) {
    const real = (readFileSync(unitFile, 'utf8').match(/^\s*it\(/gm) ?? []).length;
    check(d.tests.unitCount === real, slug, 'tests.unitCount', `json=${d.tests.unitCount} real=${real}`);
  }

  // Tokens consumidos: o var() pode estar quebrado em várias linhas pelo Prettier,
  // por isso o texto é normalizado antes do match.
  const [css] = listar(dir, '.styles.css');
  if (css) {
    const texto = readFileSync(join(dir, css), 'utf8').replace(/\s+/g, ' ');
    const real = new Set([...texto.matchAll(/var\(\s*(--ds-[a-z0-9-]+)/g)].map((m) => m[1]));
    const declarados = new Set(d.tokensUsed ?? []);
    const faltando = [...real].filter((t) => !declarados.has(t));
    const sobrando = [...declarados].filter((t) => !real.has(t));
    check(
      faltando.length === 0 && sobrando.length === 0,
      slug,
      'tokensUsed',
      `faltando=${faltando.length} sobrando=${sobrando.length} ${faltando[0] ?? sobrando[0] ?? ''}`,
    );
  }

  // Ids de story precisam existir no index do Storybook.
  const idsInvalidos = (d.stories ?? []).map((s) => s.id).filter((id) => !storybook[id]);
  check(idsInvalidos.length === 0, slug, 'stories.id', idsInvalidos.slice(0, 3).join(', '));

  // Links precisam apontar para o Storybook publicado.
  const linksRuins = (d.stories ?? []).filter(
    (s) => !s.iframeUrl?.includes('iframe.html?id=') || !s.docsUrl?.includes('?path=/docs/'),
  );
  check(linksRuins.length === 0, slug, 'stories.url', `${linksRuins.length} malformadas`);
}

// Cruzamento com o Figma: todo componente pareado precisa de node-id válido.
const figmaPath = join(DATA, 'figma-components.json');
if (existsSync(figmaPath)) {
  const figma = lerJson(figmaPath);
  const nodes = new Set(figma.components.map((c) => c.nodeId));
  const mappingPath = join(DATA, 'mapping.json');
  if (existsSync(mappingPath)) {
    for (const par of lerJson(mappingPath).pares ?? []) {
      check(nodes.has(par.figmaNodeId), par.codeSlug ?? par.figmaName, 'mapping.figmaNodeId', par.figmaNodeId);
    }
  }
}

console.log(`✔ ${acertos.length} verificações passaram`);
if (falhas.length > 0) {
  console.error(`✘ ${falhas.length} falhas:`);
  for (const f of falhas) console.error(`  ${f.slug} — ${f.regra}: ${f.detalhe}`);
  process.exit(1);
}
