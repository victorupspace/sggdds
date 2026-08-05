import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { basename, dirname, join, relative } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import StyleDictionary from 'style-dictionary';

import styleDictionaryConfig from '../style-dictionary.config';
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

const rawRoot = 'src/raw';
const normalizedRoot = 'src/normalized';
const buildRoot = 'dist/json';
const cssRoot = 'dist/css';

const tokenTiers = new Set(['primitive', 'brand', 'semantic', 'component']);

/**
 * Maps each raw Figma variable collection (by export file name) to its token
 * tier. The tier becomes the top-level group in the normalized output and the
 * first segment of every generated name (e.g. `--ds-brand-color-brand-red`).
 *
 * Figma collection -> file -> tier:
 * - "Global: Core"             -> global-core.tokens.json   -> primitive
 * - "T1: Sampa Design System"  -> t1-sampa.tokens.json      -> brand
 * - "T2: Semantics"            -> t2-semantics.tokens.json  -> semantic
 * - "T3: Components"           -> t3-components.tokens.json -> component
 */
const tierByFile: Record<string, string> = {
  'global-core.tokens.json': 'primitive',
  't1-sampa.tokens.json': 'brand',
  't2-semantics.tokens.json': 'semantic',
  't3-components.tokens.json': 'component',
};

/** Maps Figma `targetVariableSetName` (alias targets) to the same tiers. */
const tierByVariableSet: Record<string, string> = {
  'Global: Core': 'primitive',
  'T1: Sampa Design System': 'brand',
  'T2: Semantics': 'semantic',
  'T3: Components': 'component',
};

/**
 * Single-typeface policy: Plus Jakarta Sans is the only text font of the
 * Design System. Any fontFamily token that arrives from Figma with a different
 * value is normalized to the canonical family, the original value is preserved
 * in `sggd.figmaOriginalValue` and the build logs a warning so the variable
 * also gets fixed at the source in Figma.
 */
const canonicalFontFamily = 'Plus Jakarta Sans';

const normalizationWarnings: string[] = [];

const fontWeightValues: Record<string, number> = {
  Thin: 100,
  ExtraLight: 200,
  Light: 300,
  Regular: 400,
  Medium: 500,
  SemiBold: 600,
  Bold: 700,
  ExtraBold: 800,
  Black: 900,
};

/** Figma scopes that describe a length and should become px dimensions. */
const dimensionScopes = new Set([
  'CORNER_RADIUS',
  'STROKE_FLOAT',
  'WIDTH_HEIGHT',
  'GAP',
  'FONT_SIZE',
  'LINE_HEIGHT',
  'LETTER_SPACING',
]);

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

/**
 * Normalizes a Figma path segment into the stable kebab-case key used across
 * normalized JSON, DTCG references and generated platform names. Mirrors the
 * Style Dictionary `name/kebab` transform so CSS variable names stay identical
 * to previous releases (e.g. "SemiBold" -> "semi-bold", "2%" -> "2").
 * Also fixes the recurring "sucess" typo from the Figma file so code always
 * reads "success"; the original path is preserved in `sggd.figmaPath`.
 */
function normalizeKey(segment: string): string {
  return segment
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .replace(/%/g, '')
    .toLowerCase()
    .replace(/sucess/g, 'success');
}

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

function getExtensions(token: TokenNode): JsonObject {
  return isObject(token.$extensions) ? token.$extensions : {};
}

function getScopes(token: TokenNode): string[] {
  const extensions = getExtensions(token);
  const scopes = extensions['com.figma.scopes'];
  return Array.isArray(scopes)
    ? scopes.filter((scope): scope is string => typeof scope === 'string')
    : [];
}

interface AliasData {
  targetVariableName: string;
  targetVariableSetName: string;
}

function getAliasData(token: TokenNode): AliasData | undefined {
  const extensions = getExtensions(token);
  const aliasData = extensions['com.figma.aliasData'];

  if (!isObject(aliasData)) {
    return undefined;
  }

  const targetVariableName = aliasData.targetVariableName;
  const targetVariableSetName = aliasData.targetVariableSetName;

  if (typeof targetVariableName !== 'string' || typeof targetVariableSetName !== 'string') {
    return undefined;
  }

  return { targetVariableName, targetVariableSetName };
}

const roundPx = (value: number): string => `${String(Math.round(value * 100) / 100)}px`;

function shouldUseDimensionFallback(path: string[]): boolean {
  const joined = path.join('-');

  if (/(^|-)opacity($|-)/.test(joined) || /(^|-)motion($|-)/.test(joined)) {
    return false;
  }

  return /spacing|breakpoint|radius|border|size|width|height|padding|gap|margin|inset|offset|font-size|line-height|letter-spacing/.test(
    joined,
  );
}

function normalizeToken(token: TokenNode, path: string[], figmaPath: string[]): TokenNode {
  const tokenType = typeof token.$type === 'string' ? token.$type : 'number';
  const normalized: TokenNode = { ...token };
  const scopes = getScopes(token);
  const extensions: JsonObject = { ...getExtensions(token) };
  const normalizedPath = path.join('/');
  const originalPath = figmaPath.join('/');

  if (normalizedPath !== originalPath) {
    extensions['sggd.figmaPath'] = originalPath;
  }

  if (tokenType === 'color') {
    normalized.$value = colorValueToCss(token.$value ?? null);
    normalized.$type = 'color';
  } else if (tokenType === 'number' && typeof token.$value === 'number') {
    const isDimension =
      scopes.length > 0
        ? scopes.some((scope) => dimensionScopes.has(scope)) && !scopes.includes('OPACITY')
        : shouldUseDimensionFallback(path);

    if (isDimension) {
      normalized.$value = roundPx(token.$value);
      normalized.$type = 'dimension';
    } else {
      // Motion durations and opacity values stay unitless numbers; the Figma
      // export models them through spacing aliases with an OPACITY scope.
      normalized.$type = 'number';
    }
  } else if (tokenType === 'string' && typeof token.$value === 'string') {
    if (scopes.includes('FONT_FAMILY') || path.includes('font-family')) {
      normalized.$type = 'fontFamily';
      if (token.$value !== canonicalFontFamily) {
        extensions['sggd.figmaOriginalValue'] = token.$value;
        normalized.$value = canonicalFontFamily;
        normalizationWarnings.push(
          `${path.join('.')}: font family "${token.$value}" normalized to "${canonicalFontFamily}" (single-typeface policy); fix the variable in Figma.`,
        );
      }
    } else if (scopes.includes('FONT_STYLE') || path.includes('font-weight')) {
      if (token.$value in fontWeightValues) {
        extensions['sggd.figmaFontStyle'] = token.$value;
        normalized.$value = fontWeightValues[token.$value];
      }
      normalized.$type = 'fontWeight';
    }
  }

  if (Object.keys(extensions).length > 0) {
    normalized.$extensions = extensions;
  }

  return normalized;
}

function normalizeTree(value: JsonValue, path: string[] = [], figmaPath: string[] = []): JsonValue {
  if (Array.isArray(value)) {
    return value.map((item) => normalizeTree(item, path, figmaPath));
  }

  if (!isObject(value)) {
    return value;
  }

  if (isToken(value)) {
    return normalizeToken(value, path, figmaPath);
  }

  const entries: [string, JsonValue][] = [];

  for (const [key, child] of Object.entries(value)) {
    // Figma exports the base value of a stateful group as "$root"; DTCG cannot
    // express a node that is both group and token, so it becomes "default"
    // alongside its sibling states (hover, active, disabled, ...).
    if (key === '$root') {
      if (Object.prototype.hasOwnProperty.call(value, 'default')) {
        throw new Error(
          `Cannot hoist $root at "${path.join('/')}": a "default" sibling already exists.`,
        );
      }
      entries.push([
        'default',
        normalizeTree(child, [...path, 'default'], [...figmaPath, '$root']),
      ]);
      continue;
    }

    if (key.startsWith('$')) {
      continue;
    }

    const normalizedKey = normalizeKey(key);
    entries.push([
      normalizedKey,
      normalizeTree(child, [...path, normalizedKey], [...figmaPath, key]),
    ]);
  }

  return Object.fromEntries(entries);
}

function wrapInTier(value: JsonValue, fileName: string): JsonObject {
  if (!isObject(value)) {
    throw new Error(`${fileName}: token file root must be an object.`);
  }

  const topLevelGroups = Object.keys(value).filter((key) => !key.startsWith('$'));
  const hasTokenTier = topLevelGroups.some((group) => tokenTiers.has(group));

  if (hasTokenTier) {
    return normalizeTree(value) as JsonObject;
  }

  const tier = tierByFile[fileName];

  if (!tier) {
    throw new Error(
      `${fileName}: cannot infer token tier. Either name the file after a known Figma collection (${Object.keys(tierByFile).join(', ')}) or wrap its contents in an explicit tier group (${[...tokenTiers].join(', ')}).`,
    );
  }

  return { [tier]: normalizeTree(value) };
}

function getTokenAtPath(tree: JsonObject, segments: string[]): TokenNode | undefined {
  let cursor: JsonValue = tree;

  for (const segment of segments) {
    if (!isObject(cursor)) {
      return undefined;
    }
    cursor = cursor[segment];
  }

  return isObject(cursor) && isToken(cursor) ? cursor : undefined;
}

/**
 * Second pass: converts Figma `aliasData` into DTCG references so the emitted
 * CSS preserves the tier chain (component -> semantic -> brand/primitive) via
 * `var()` indirection. Unresolvable targets keep their literal value and are
 * reported so drift between collections is visible instead of silent.
 */
function linkAliases(merged: JsonObject, trees: Map<string, JsonObject>): string[] {
  const warnings: string[] = [];

  const visit = (value: JsonValue, path: string[]): void => {
    if (!isObject(value)) {
      return;
    }

    if (isToken(value)) {
      const token = value;
      const aliasData = getAliasData(token);

      if (!aliasData) {
        return;
      }

      const tier = tierByVariableSet[aliasData.targetVariableSetName];

      if (!tier) {
        warnings.push(
          `${path.join('.')}: unknown Figma variable set "${aliasData.targetVariableSetName}"; kept literal value.`,
        );
        return;
      }

      const targetSegments = [tier, ...aliasData.targetVariableName.split('/').map(normalizeKey)];
      const target = getTokenAtPath(merged, targetSegments);

      if (!target) {
        warnings.push(
          `${path.join('.')}: alias target {${targetSegments.join('.')}} not found; kept literal value.`,
        );
        const extensions = { ...getExtensions(token) };
        extensions['sggd.unresolvedAliasTarget'] = targetSegments.join('.');
        token.$extensions = extensions;
        return;
      }

      // Figma models unitless values (motion durations, opacity) as aliases to
      // spacing variables. Linking those would turn "8" into "8px", so aliases
      // are only materialized when both sides normalize to the same type.
      if (token.$type !== target.$type) {
        const tokenType =
          typeof token.$type === 'string' ? token.$type : JSON.stringify(token.$type);
        const targetType =
          typeof target.$type === 'string' ? target.$type : JSON.stringify(target.$type);
        const extensions = { ...getExtensions(token) };
        extensions['sggd.aliasNotLinked'] =
          `type mismatch: ${tokenType} <- {${targetSegments.join('.')}} (${targetType})`;
        token.$extensions = extensions;
        return;
      }

      const extensions = { ...getExtensions(token) };
      extensions['sggd.figmaResolvedValue'] = token.$value ?? null;
      token.$extensions = extensions;
      token.$value = `{${targetSegments.join('.')}}`;
      return;
    }

    for (const [key, child] of Object.entries(value)) {
      if (!key.startsWith('$')) {
        visit(child, [...path, key]);
      }
    }
  };

  for (const tree of trees.values()) {
    visit(tree, []);
  }

  return warnings;
}

function deepMerge(target: JsonObject, source: JsonObject): void {
  for (const [key, value] of Object.entries(source)) {
    const existing = target[key];

    if (isObject(existing) && isObject(value) && !isToken(existing) && !isToken(value)) {
      deepMerge(existing, value);
      continue;
    }

    target[key] = value;
  }
}

async function normalizeRawTokens(): Promise<void> {
  await rm(normalizedRoot, { force: true, recursive: true });
  await mkdir(normalizedRoot, { recursive: true });

  const files = await collectTokenFiles(rawRoot);
  const trees = new Map<string, JsonObject>();
  const merged: JsonObject = {};

  normalizationWarnings.length = 0;

  for (const file of files) {
    const parsed = JSON.parse(await readFile(file, 'utf8')) as JsonValue;
    const wrapped = wrapInTier(parsed, basename(file));
    trees.set(file, wrapped);
    deepMerge(merged, wrapped);
  }

  const warnings = [...normalizationWarnings, ...linkAliases(merged, trees)];

  for (const warning of warnings) {
    console.warn(`[tokens] ${warning}`);
  }

  for (const [file, tree] of trees) {
    const relativePath = relative(rawRoot, file);
    const destination = join(normalizedRoot, relativePath);
    const normalized = `${JSON.stringify(sortJson(tree), null, 2)}\n`;

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
