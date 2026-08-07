#!/usr/bin/env node
/**
 * Auditoria de reflow dos componentes — WCAG 2.1 critério 1.4.10.
 *
 * O critério exige que o conteúdo funcione em 320px CSS de largura sem exigir
 * rolagem horizontal. 320px é a largura equivalente a 1280px com zoom de 400%,
 * então medir a 320 cobre também o caso de ampliação.
 *
 * Mede a primeira story de cada componente no Storybook publicado, em navegador
 * real. Escreve data/reflow.json, que a página de Grid e layout consome.
 *
 * A auditoria é do componente isolado dentro do iframe da story. Uma página
 * inteira pode estourar por composição mesmo com todos os componentes passando;
 * isso está dito no resultado e na página.
 *
 * Uso: node scripts/auditar-reflow.mjs [--largura 320]
 */
/* global document -- usado apenas dentro de `pagina.evaluate`, cujo corpo é
   serializado e executado no navegador, não neste processo Node. */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const WIKI = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const REPO = resolve(WIKI, '..');
const exigir = createRequire(join(REPO, 'package.json'));

const args = process.argv.slice(2);
const indiceLargura = args.indexOf('--largura');
const LARGURA = indiceLargura >= 0 ? Number(args[indiceLargura + 1]) : 320;

const dirComponentes = join(WIKI, 'data', 'components');
const componentes = readdirSync(dirComponentes)
  .filter((f) => f.endsWith('.json'))
  .map((f) => JSON.parse(readFileSync(join(dirComponentes, f), 'utf8')))
  .filter((c) => c.stories?.length > 0)
  .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));

const { chromium } = exigir('playwright');
const navegador = await chromium.launch();
const contexto = await navegador.newContext({
  viewport: { width: LARGURA, height: 800 },
  // O critério trata de largura CSS; o fator de escala do dispositivo não muda
  // a medida, mas fixá-lo evita variação entre máquinas.
  deviceScaleFactor: 1,
});

const resultados = [];
for (const componente of componentes) {
  const story = componente.stories[0];
  const pagina = await contexto.newPage();

  try {
    await pagina.goto(story.iframeUrl, { waitUntil: 'networkidle', timeout: 45000 });
    // A story precisa ter pintado antes da medição.
    await pagina.waitForTimeout(400);

    const medida = await pagina.evaluate(() => {
      const raiz = document.documentElement;
      const excedente = raiz.scrollWidth - raiz.clientWidth;

      // Quem causa o estouro: elementos cuja borda direita passa da viewport.
      const culpados = [];
      if (excedente > 0) {
        for (const el of document.body.querySelectorAll('*')) {
          const r = el.getBoundingClientRect();
          if (r.width === 0 || r.height === 0) continue;
          if (r.right > raiz.clientWidth + 1) {
            const nome = el.tagName.toLowerCase() + (el.className && typeof el.className === 'string'
              ? '.' + el.className.trim().split(/\s+/).slice(0, 2).join('.')
              : '');
            if (!culpados.includes(nome)) culpados.push(nome);
          }
          if (culpados.length >= 3) break;
        }
      }
      return { excedente, culpados };
    });

    resultados.push({
      nome: componente.name,
      slug: componente.slug,
      story: story.name,
      passa: medida.excedente <= 0,
      excedentePx: Math.max(0, medida.excedente),
      culpados: medida.culpados,
    });
    process.stdout.write(medida.excedente <= 0 ? '.' : 'x');
  } catch (erro) {
    resultados.push({
      nome: componente.name,
      slug: componente.slug,
      story: story.name,
      erro: String(erro).slice(0, 160),
    });
    process.stdout.write('!');
  } finally {
    await pagina.close();
  }
}

await navegador.close();

const medidos = resultados.filter((r) => !r.erro);
const passam = medidos.filter((r) => r.passa);
const falham = medidos.filter((r) => !r.passa);
const comErro = resultados.filter((r) => r.erro);

const saida = {
  fonte: 'Storybook publicado (sggdds.vercel.app), medido com Playwright/Chromium',
  criterio: 'WCAG 2.1 — 1.4.10 Reflow',
  larguraCss: LARGURA,
  escopo: 'primeira story de cada componente, isoladamente dentro do iframe',
  data: new Date().toISOString().slice(0, 10),
  totalMedidos: medidos.length,
  passam: passam.length,
  falham: falham.length,
  naoMedidos: comErro.length,
  componentes: resultados,
};

writeFileSync(join(WIKI, 'data', 'reflow.json'), JSON.stringify(saida, null, 2) + '\n');

console.log(`\n\nLargura medida: ${LARGURA}px CSS`);
console.log(`Componentes medidos: ${medidos.length}`);
console.log(`Passam sem rolagem horizontal: ${passam.length}`);
console.log(`Estouram: ${falham.length}`);
if (falham.length) {
  for (const f of falham) console.log(`  - ${f.nome}: +${f.excedentePx}px (${f.culpados.join(', ')})`);
}
if (comErro.length) console.log(`Não medidos: ${comErro.length}`);
console.log('Resultado: data/reflow.json');
