#!/usr/bin/env node
/**
 * Copia os tokens do Design System (monorepo) para dentro da Wiki.
 *
 * A cópia é COMMITADA em src/styles/tokens.css: o build da Vercel não pode
 * depender do monorepo estar presente. Quando o monorepo está disponível, este
 * script regenera a cópia; quando não está, mantém a existente e avisa.
 *
 * Uso: node scripts/sync-tokens.mjs
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const WIKI = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const ORIGEM = join(WIKI, '..', 'packages', 'tokens', 'dist', 'css', 'tokens.css');
const DESTINO = join(WIKI, 'src', 'styles', 'tokens.css');

if (!existsSync(ORIGEM)) {
  if (existsSync(DESTINO)) {
    console.warn(
      `[tokens] Monorepo indisponível. Mantendo a cópia commitada em src/styles/tokens.css.`,
    );
    process.exit(0);
  }
  console.error(
    `[tokens] Nem a origem (${ORIGEM}) nem a cópia local existem. Rode "pnpm tokens:build" no monorepo.`,
  );
  process.exit(1);
}

const css = readFileSync(ORIGEM, 'utf8');
const total = (css.match(/--ds-[a-z0-9-]+\s*:/g) ?? []).length;

const cabecalho = `/*
 * GERADO POR scripts/sync-tokens.mjs — NÃO EDITE À MÃO.
 * Origem: packages/tokens/dist/css/tokens.css (@government/tokens)
 * Tokens: ${total}
 *
 * A Wiki consome os tokens reais do Design System. Qualquer valor de cor,
 * espaçamento, tipografia ou raio usado na interface desta Wiki vem daqui.
 */
`;

mkdirSync(dirname(DESTINO), { recursive: true });
writeFileSync(DESTINO, cabecalho + css);
console.log(`[tokens] ${total} tokens sincronizados para src/styles/tokens.css`);
