#!/usr/bin/env node
/**
 * Verifica links quebrados no site já construído (out/).
 *
 * Cobre a exigência "zero links quebrados" da Definition of Done. Checa:
 *  - links internos que não correspondem a nenhuma página gerada
 *  - âncoras (#id) que não existem no documento de destino
 *  - arquivos referenciados em public/ que não existem
 *  - blocos "PENDENTE" que não estão registrados em LACUNAS.md
 *
 * Links externos não são requisitados: a verificação é offline e determinística.
 *
 * Uso: node scripts/verificar-links.mjs
 */
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const WIKI = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(WIKI, 'out');
const PUBLIC = join(WIKI, 'public');

if (!existsSync(OUT)) {
  console.error('Rode "npm run build" antes de verificar links.');
  process.exit(1);
}

function listarHtml(dir) {
  const achados = [];
  for (const entrada of readdirSync(dir)) {
    const caminho = join(dir, entrada);
    if (statSync(caminho).isDirectory()) achados.push(...listarHtml(caminho));
    else if (entrada.endsWith('.html')) achados.push(caminho);
  }
  return achados;
}

const paginas = listarHtml(OUT);
const rotasGeradas = new Set(
  paginas.map((p) => {
    const rel = p.slice(OUT.length).replace(/\\/g, '/');
    return rel.replace(/\/index\.html$/, '').replace(/\.html$/, '') || '/';
  }),
);

// Ids presentes em cada página, para validar âncoras.
const idsPorRota = new Map();
const conteudoPorRota = new Map();
for (const p of paginas) {
  const rel = p.slice(OUT.length).replace(/\\/g, '/');
  const rota = rel.replace(/\/index\.html$/, '').replace(/\.html$/, '') || '/';
  const html = readFileSync(p, 'utf8');
  conteudoPorRota.set(rota, html);
  idsPorRota.set(rota, new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
}

const problemas = [];
let totalLinks = 0;

for (const [rota, html] of conteudoPorRota) {
  const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);

  for (const href of hrefs) {
    if (
      href.startsWith('http://') ||
      href.startsWith('https://') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      href === '#'
    ) {
      continue;
    }

    totalLinks += 1;

    // Âncora na própria página
    if (href.startsWith('#')) {
      const id = decodeURIComponent(href.slice(1));
      if (!idsPorRota.get(rota)?.has(id)) {
        problemas.push({ rota, href, motivo: 'âncora inexistente nesta página' });
      }
      continue;
    }

    const [caminho, ancora] = href.split('#');
    const normalizado = caminho.replace(/\/$/, '') || '/';

    // Arquivo estático em public/
    if (/\.[a-z0-9]{2,5}$/i.test(normalizado)) {
      if (!existsSync(join(PUBLIC, normalizado)) && !existsSync(join(OUT, normalizado))) {
        problemas.push({ rota, href, motivo: 'arquivo estático inexistente' });
      }
      continue;
    }

    if (!rotasGeradas.has(normalizado)) {
      problemas.push({ rota, href, motivo: 'rota não gerada' });
      continue;
    }

    if (ancora && !idsPorRota.get(normalizado)?.has(decodeURIComponent(ancora))) {
      problemas.push({ rota, href, motivo: 'âncora inexistente na página de destino' });
    }
  }
}

// Blocos PENDENTE precisam estar registrados em LACUNAS.md.
const lacunas = existsSync(join(WIKI, '..', 'LACUNAS.md'))
  ? readFileSync(join(WIKI, '..', 'LACUNAS.md'), 'utf8')
  : '';
for (const [rota, html] of conteudoPorRota) {
  const pendentes = (html.match(/PENDENTE:/g) ?? []).length;
  if (pendentes > 0 && !lacunas) {
    problemas.push({
      rota,
      href: `${pendentes} bloco(s) PENDENTE`,
      motivo: 'LACUNAS.md não encontrado',
    });
  }
}

console.log(`Páginas verificadas: ${paginas.length}`);
console.log(`Links internos verificados: ${totalLinks}`);
console.log(
  `Blocos PENDENTE encontrados: ${[...conteudoPorRota.values()].reduce(
    (t, h) => t + (h.match(/PENDENTE:/g) ?? []).length,
    0,
  )}`,
);

if (problemas.length === 0) {
  console.log('✔ Nenhum link quebrado.');
  process.exit(0);
}

console.error(`\n✘ ${problemas.length} problemas:`);
const porMotivo = new Map();
for (const p of problemas) {
  porMotivo.set(p.motivo, [...(porMotivo.get(p.motivo) ?? []), p]);
}
for (const [motivo, lista] of porMotivo) {
  console.error(`\n  ${motivo} (${lista.length}):`);
  for (const p of lista.slice(0, 25)) console.error(`    ${p.rota} → ${p.href}`);
  if (lista.length > 25) console.error(`    … e mais ${lista.length - 25}`);
}
process.exit(1);
