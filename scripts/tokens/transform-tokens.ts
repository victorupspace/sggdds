import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import StyleDictionary from 'style-dictionary';

import styleDictionaryConfig from '../../style-dictionary.config';
import { validateTokenFiles } from './validate-tokens';

type JsonPrimitive = string | number | boolean | null;
type JsonValue = JsonPrimitive | JsonArray | JsonObject;

interface JsonArray extends Array<JsonValue> {}

interface JsonObject extends Record<string, JsonValue> {}

type TokenNode = JsonObject & {
  $type?: JsonValue;
  $value?: JsonValue;
  $description?: JsonValue;
  $extensions?: JsonValue;
};

const rawRoot = 'src/foundations/tokens/raw';
const normalizedRoot = 'src/foundations/tokens/normalized';
const buildRoot = 'src/foundations/tokens/build';
const cssRoot = 'src/foundations/tokens/css';

const tokenTiers = new Set(['primitive', 'semantic', 'component']);

const fontWeightValues: Record<string, number> = {
  Light: 300,
  Regular: 400,
  Medium: 500,
  SemiBold: 600,
  Bold: 700,
  ExtraBold: 800,
};

async function collectTokenFiles(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = join(directory, entry.name);

      if (entry.isDirectory()) {
        return collectTokenFiles(entryPath);
      }

      if (entry.isFile() && entry.name.endsWith('.tokens.json')) {
        return [entryPath];
      }

      return [];
    }),
  );

  return nested.flat().sort();
}

const isObject = (value: JsonValue): value is JsonObject =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isToken = (value: JsonValue): value is TokenNode =>
  isObject(value) && ('$value' in value || '$type' in value);

function sortJson(value: JsonValue): JsonValue {
  if (Array.isArray(value)) {
    return value.map(sortJson);
  }

  if (typeof value === 'object' && value !== null) {
    return Object.fromEntries(
      Object.entries(value)
        .sort(([left], [right]) => left.localeCompare(right))
        .map(([key, child]) => [key, sortJson(child)]),
    );
  }

  return value;
}

function colorValueToCss(value: JsonValue): JsonValue {
  if (!isObject(value)) {
    return value;
  }

  const hex = typeof value.hex === 'string' ? value.hex : undefined;
  const alpha = typeof value.alpha === 'number' ? value.alpha : 1;
  const components = Array.isArray(value.components) ? value.components : undefined;

  if (hex && alpha >= 1) {
    return hex;
  }

  if (components && components.length >= 3) {
    const [red, green, blue] = components.map((component) =>
      typeof component === 'number' ? Math.round(component * 255) : 0,
    );
    return `rgba(${String(red)}, ${String(green)}, ${String(blue)}, ${alpha.toFixed(3).replace(/0+$/, '').replace(/\.$/, '')})`;
  }

  return hex ?? value;
}

function shouldUseDimension(path: string[], tokenType: string): boolean {
  const [category, group] = path;

  if (tokenType !== 'number') {
    return false;
  }

  if (category === 'spacing' || category === 'breakpoints' || category === 'breakpoint') {
    return true;
  }

  if (category === 'border' || category === 'radius') {
    return true;
  }

  return (
    category === 'typography' &&
    (group === 'font-size' || group === 'line-height' || group === 'letter-spacing')
  );
}

function normalizeToken(token: TokenNode, path: string[]): TokenNode {
  const tokenType = typeof token.$type === 'string' ? token.$type : 'number';
  const normalized: TokenNode = { ...token };

  if (tokenType === 'color') {
    normalized.$value = colorValueToCss(token.$value ?? null);
    normalized.$type = 'color';
    return normalized;
  }

  if (shouldUseDimension(path, tokenType) && typeof token.$value === 'number') {
    normalized.$value = `${String(token.$value)}px`;
    normalized.$type = 'dimension';
    return normalized;
  }

  if (path[0] === 'typography' && path[1] === 'font-family') {
    normalized.$type = 'fontFamily';
    return normalized;
  }

  if (path[0] === 'typography' && path[1] === 'font-weight') {
    normalized.$type = 'fontWeight';
    normalized.$value =
      typeof token.$value === 'string'
        ? (fontWeightValues[token.$value] ?? token.$value)
        : token.$value;
    return normalized;
  }

  return normalized;
}

function normalizeTree(value: JsonValue, path: string[] = []): JsonValue {
  if (Array.isArray(value)) {
    return value.map((item) => normalizeTree(item, path));
  }

  if (!isObject(value)) {
    return value;
  }

  if (isToken(value)) {
    return normalizeToken(value, path);
  }

  return Object.fromEntries(
    Object.entries(value)
      .filter(([key]) => !key.startsWith('$'))
      .map(([key, child]) => [key, normalizeTree(child, [...path, key])]),
  );
}

function ensureTokenTiers(value: JsonValue): JsonValue {
  if (!isObject(value)) {
    return value;
  }

  const topLevelGroups = Object.keys(value).filter((key) => !key.startsWith('$'));
  const hasTokenTier = topLevelGroups.some((group) => tokenTiers.has(group));

  if (hasTokenTier) {
    return normalizeTree(value);
  }

  return {
    primitive: normalizeTree(value),
  };
}

async function normalizeRawTokens(): Promise<void> {
  await rm(normalizedRoot, { force: true, recursive: true });
  await mkdir(normalizedRoot, { recursive: true });

  const files = await collectTokenFiles(rawRoot);

  for (const file of files) {
    const relativePath = relative(rawRoot, file);
    const destination = join(normalizedRoot, relativePath);
    const parsed = JSON.parse(await readFile(file, 'utf8')) as JsonValue;
    const normalized = `${JSON.stringify(sortJson(ensureTokenTiers(parsed)), null, 2)}\n`;

    await mkdir(dirname(destination), { recursive: true });
    await writeFile(destination, normalized, 'utf8');
  }
}

export async function buildTokens(): Promise<void> {
  const validation = await validateTokenFiles(rawRoot);

  if (validation.errors.length > 0) {
    console.error('Token build aborted because validation failed.');
    for (const error of validation.errors) {
      console.error(`- ${error}`);
    }
    process.exitCode = 1;
    return;
  }

  await normalizeRawTokens();
  await rm(buildRoot, { force: true, recursive: true });
  await rm(cssRoot, { force: true, recursive: true });

  const styleDictionary = new StyleDictionary(styleDictionaryConfig, {
    warnings: 'error',
  });

  await styleDictionary.buildAllPlatforms();
}

async function main(): Promise<void> {
  await buildTokens();

  if (process.exitCode === 1) {
    return;
  }

  console.info('Design tokens built for web CSS variables and normalized JSON.');
}

const currentFile = pathToFileURL(fileURLToPath(import.meta.url)).href;

if (process.argv[1] && pathToFileURL(process.argv[1]).href === currentFile) {
  await main();
}
