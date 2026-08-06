#!/usr/bin/env node
/**
 * Regenera data/tokens.json a partir do build atual do Design System.
 *
 * Existe porque o inventário de tokens da Wiki é um dado EXTRAÍDO: quando os
 * tokens mudam no monorepo, ele envelhece em silêncio e a documentação passa a
 * afirmar valores que o sistema não usa mais. Rodar isto junto do tokens:sync
 * mantém as duas coisas — o tema e o inventário — na mesma versão.
 *
 * Uso: node scripts/extrair-tokens.mjs
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const WIKI = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const TOKENS = join(WIKI, '..', 'packages', 'tokens');
const CSS = join(TOKENS, 'dist', 'css', 'tokens.css');
const DESTINO = join(WIKI, 'data', 'tokens.json');

if (!existsSync(CSS)) {
  console.warn('[tokens] Monorepo indisponível. Mantendo data/tokens.json como está.');
  process.exit(0);
}

const css = readFileSync(CSS, 'utf8');
const declaracoes = [...css.matchAll(/(--ds-[a-z0-9-]+)\s*:\s*([^;]+);/g)].map((m) => [
  m[1],
  m[2].trim(),
]);
const bruto = Object.fromEntries(declaracoes);

/** Segue a cadeia de var() até o literal que o navegador computa. */
function resolver(valor, profundidade = 0) {
  if (profundidade > 16) return valor;
  const alias = /^var\((--ds-[a-z0-9-]+)\)$/.exec(valor.trim());
  return alias ? resolver(bruto[alias[1]] ?? '', profundidade + 1) : valor.trim();
}

const aliasDe = (valor) => /^var\((--ds-[a-z0-9-]+)\)$/.exec(valor.trim())?.[1] ?? null;

const CAMADAS = {
  '--ds-primitive-': 'primitivo',
  '--ds-brand-': 'marca',
  '--ds-semantic-': 'semantico',
  '--ds-component-': 'componente',
};

const COLECAO = {
  primitivo: 'global-core.tokens.json',
  marca: 't1-sampa.tokens.json',
  semantico: 't2-semantics.tokens.json',
  componente: 't3-components.tokens.json',
};

// O inventário anterior guarda o caminho original no Figma e o tipo de cada
// token; preservamos esses campos em vez de reinventá-los a partir do nome.
const anterior = existsSync(DESTINO)
  ? JSON.parse(readFileSync(DESTINO, 'utf8'))
  : { meta: {}, tokens: [] };
const porVar = new Map(anterior.tokens.map((t) => [t.cssVar, t]));

function inferirTipo(valor) {
  if (/^#|^rgba?\(/.test(valor)) return 'color';
  if (/^-?\d+(\.\d+)?(px|rem|em|%)$/.test(valor)) return 'dimension';
  if (/^-?\d+(\.\d+)?$/.test(valor)) return 'number';
  if (/^'|^"/.test(valor)) return 'fontFamily';
  return 'string';
}

const tokens = declaracoes.map(([cssVar, valorBruto]) => {
  const camada =
    Object.entries(CAMADAS).find(([prefixo]) => cssVar.startsWith(prefixo))?.[1] ?? 'extra';
  const antigo = porVar.get(cssVar);
  const valorResolvido = resolver(valorBruto);

  return {
    cssVar,
    figmaPath: antigo?.figmaPath ?? cssVar.replace(/^--ds-[a-z]+-/, '').replace(/-/g, '/'),
    colecao: antigo?.colecao ?? COLECAO[camada] ?? 'web-extras.tokens.json',
    camada,
    tipo: antigo?.tipo ?? inferirTipo(valorResolvido),
    valorBruto,
    aliasDe: aliasDe(valorBruto),
    valorResolvido,
    grupo: antigo?.grupo ?? cssVar.replace(/^--ds-[a-z]+-/, '').split('-')[0],
  };
});

const corrigidos = (() => {
  const override = join(TOKENS, 'src', 'raw', 'z-acessibilidade.tokens.json');
  if (!existsSync(override)) return 0;
  let n = 0;
  const contar = (no) => {
    for (const v of Object.values(no)) {
      if (v && typeof v === 'object') {
        if ('$value' in v) n += 1;
        else contar(v);
      }
    }
  };
  const doc = JSON.parse(readFileSync(override, 'utf8'));
  contar(doc.component ?? {});
  contar(doc.semantic ?? {});
  return n;
})();

const saida = {
  meta: {
    ...anterior.meta,
    geradoDe: ['packages/tokens/dist/css/tokens.css'],
    totalTokens: tokens.length,
    totalCssVars: tokens.length,
    prefixoCss: '--ds-',
    tokensCorrigidosPorAcessibilidade: corrigidos,
  },
  tokens,
};

writeFileSync(DESTINO, `${JSON.stringify(saida, null, 2)}\n`);
console.log(
  `[tokens] inventário regenerado: ${tokens.length} tokens` +
    (corrigidos ? ` (${corrigidos} com correção de acessibilidade)` : ''),
);
