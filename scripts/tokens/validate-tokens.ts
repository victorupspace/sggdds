import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

type JsonPrimitive = string | number | boolean | null;
type JsonValue = JsonPrimitive | JsonArray | JsonObject;

interface JsonArray extends Array<JsonValue> {}

interface JsonObject extends Record<string, JsonValue> {}

const tokenRoot = 'src/foundations/tokens/raw';

const allowedTokenTypes = new Set([
  'border',
  'color',
  'cubicBezier',
  'dimension',
  'duration',
  'fontFamily',
  'fontWeight',
  'gradient',
  'number',
  'shadow',
  'strokeStyle',
  'string',
  'typography',
]);

const allowedTopLevelGroups = new Set(['primitive', 'semantic', 'component']);
const allowedFigmaCoreGroups = new Set([
  'border',
  'breakpoint',
  'breakpoints',
  'color',
  'motion',
  'opacity',
  'radius',
  'shadow',
  'spacing',
  'typography',
  'z-index',
]);

interface ValidationResult {
  errors: string[];
  fileCount: number;
  tokenCount: number;
}

const isObject = (value: JsonValue): value is JsonObject =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const hasOwn = (value: JsonObject, key: string): boolean =>
  Object.prototype.hasOwnProperty.call(value, key);

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

function validateTokenNode(value: JsonValue, path: string[], errors: string[]): number {
  if (!isObject(value)) {
    errors.push(`${path.join('.')}: expected an object.`);
    return 0;
  }

  const isToken = hasOwn(value, '$value') || hasOwn(value, '$type');

  if (isToken) {
    if (!hasOwn(value, '$value')) {
      errors.push(`${path.join('.')}: missing $value.`);
    }

    if (!hasOwn(value, '$type')) {
      errors.push(`${path.join('.')}: missing $type.`);
    } else if (typeof value.$type !== 'string' || !allowedTokenTypes.has(value.$type)) {
      const tokenType = typeof value.$type === 'string' ? value.$type : '<non-string>';
      errors.push(`${path.join('.')}: unsupported $type "${tokenType}".`);
    }

    if (hasOwn(value, '$description') && typeof value.$description !== 'string') {
      errors.push(`${path.join('.')}: $description must be a string when present.`);
    }

    return 1;
  }

  return Object.entries(value).reduce((count, [key, child]) => {
    if (key.startsWith('$')) {
      return count;
    }

    return count + validateTokenNode(child, [...path, key], errors);
  }, 0);
}

function validateTopLevelGroups(fileName: string, value: JsonObject, errors: string[]): void {
  const groups = Object.keys(value).filter((key) => !key.startsWith('$'));
  const hasTierGroups = groups.some((group) => allowedTopLevelGroups.has(group));

  for (const group of groups) {
    const isAllowedTierGroup = allowedTopLevelGroups.has(group);
    const isAllowedFigmaCoreGroup = !hasTierGroups && allowedFigmaCoreGroups.has(group);

    if (!isAllowedTierGroup && !isAllowedFigmaCoreGroup) {
      errors.push(
        `${fileName}: top-level token group "${group}" must be a token tier or supported Figma core category.`,
      );
    }
  }
}

export async function validateTokenFiles(root = tokenRoot): Promise<ValidationResult> {
  const files = await collectTokenFiles(root);
  const errors: string[] = [];
  let tokenCount = 0;

  if (files.length === 0) {
    errors.push(`${root}: no .tokens.json files found.`);
  }

  for (const file of files) {
    const displayName = relative(process.cwd(), file);
    const content = await readFile(file, 'utf8');

    try {
      const parsed = JSON.parse(content) as JsonValue;

      if (!isObject(parsed)) {
        errors.push(`${displayName}: root must be a JSON object.`);
        continue;
      }

      validateTopLevelGroups(displayName, parsed, errors);
      tokenCount += validateTokenNode(parsed, [displayName], errors);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'unknown parsing error';
      errors.push(`${displayName}: invalid JSON. ${message}`);
    }
  }

  return {
    errors,
    fileCount: files.length,
    tokenCount,
  };
}

async function main(): Promise<void> {
  const result = await validateTokenFiles();

  if (result.errors.length > 0) {
    console.error(`Token validation failed with ${String(result.errors.length)} issue(s):`);
    for (const error of result.errors) {
      console.error(`- ${error}`);
    }
    process.exitCode = 1;
    return;
  }

  console.info(
    `Token validation passed: ${String(result.tokenCount)} token(s) in ${String(result.fileCount)} file(s).`,
  );
}

const currentFile = pathToFileURL(fileURLToPath(import.meta.url)).href;

if (process.argv[1] && pathToFileURL(process.argv[1]).href === currentFile) {
  await main();
}
