import tokens from './normalized/core-sggd.tokens.json';

export type TokenValue = string | number;

export interface TokenEntry {
  figmaPath?: string;
  figmaId?: string;
  group: string;
  hiddenFromPublishing?: boolean;
  name: string;
  normalizedFrom?: string;
  originalValue?: string;
  path: string;
  reference?: string;
  subgroup?: string;
  type: string;
  value: TokenValue;
  variable: string;
}

interface TokenNode {
  $type?: string;
  $value?: TokenValue;
  $extensions?: Record<string, unknown>;
  [key: string]: unknown;
}

export const categoryOrder = ['color', 'spacing', 'border', 'breakpoints', 'typography'] as const;

export type TokenCategory = (typeof categoryOrder)[number];

const categoryLabels: Record<TokenCategory, string> = {
  border: 'Border',
  breakpoints: 'Breakpoints',
  color: 'Color',
  spacing: 'Spacing',
  typography: 'Typography',
};

const colorGroupOrder = [
  'base',
  'identity',
  'brand',
  'utility/success',
  'utility/warning',
  'utility/danger',
  'utility/info',
  'neutral',
  'neutral-alpha',
];

const isToken = (value: unknown): value is TokenNode =>
  typeof value === 'object' && value !== null && ('$value' in value || '$type' in value);

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

export const toKebab = (value: string): string =>
  value
    .replace(/%/g, '')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();

export const sortTokens = (entries: TokenEntry[]): TokenEntry[] =>
  [...entries].sort((left, right) =>
    left.path.localeCompare(right.path, undefined, { numeric: true }),
  );

const extensionString = (extensions: Record<string, unknown>, key: string): string | undefined =>
  typeof extensions[key] === 'string' ? extensions[key] : undefined;

const getReference = (value: TokenValue): string | undefined => {
  if (typeof value !== 'string' || !value.startsWith('{') || !value.endsWith('}')) {
    return undefined;
  }

  return value.slice(1, -1);
};

function getColorGroup(token: TokenEntry): string {
  const segments = token.path.split('.');
  const colorIndex = segments.indexOf('color');
  const colorSegments = colorIndex >= 0 ? segments.slice(colorIndex + 1) : [];
  const [family, role] = colorSegments;

  if (!family || colorSegments.length === 1) {
    return 'base';
  }

  if (family === 'utility' && role) {
    return `${family}/${role}`;
  }

  return family;
}

function flattenTokens(value: unknown, path: string[] = []): TokenEntry[] {
  if (isToken(value)) {
    const normalizedPath = path.join('.');
    const variable = `--ds-${path.map(toKebab).join('-')}`;
    const extensions = isRecord(value.$extensions) ? value.$extensions : {};

    return [
      {
        figmaId: extensionString(extensions, 'com.figma.variableId'),
        figmaPath: extensionString(extensions, 'sggd.figmaPath'),
        group: path[1] ?? 'unknown',
        hiddenFromPublishing: extensions['com.figma.hiddenFromPublishing'] === true,
        name: path.at(-1) ?? normalizedPath,
        normalizedFrom: extensionString(extensions, 'sggd.normalizedFrom'),
        originalValue: extensionString(extensions, 'sggd.originalValue'),
        path: normalizedPath,
        reference: getReference(
          typeof value.$value === 'number' || typeof value.$value === 'string' ? value.$value : '',
        ),
        subgroup: path[2],
        type: typeof value.$type === 'string' ? value.$type : 'unknown',
        value:
          typeof value.$value === 'number' || typeof value.$value === 'string' ? value.$value : '',
        variable,
      },
    ];
  }

  if (!isRecord(value)) {
    return [];
  }

  return Object.entries(value).flatMap(([key, child]) => flattenTokens(child, [...path, key]));
}

export const allTokens = flattenTokens(tokens).filter((token) =>
  token.path.startsWith('primitive.'),
);

export const byCategory = (category: TokenCategory): TokenEntry[] =>
  sortTokens(allTokens.filter((token) => token.group === category));

export const colors = byCategory('color');
export const spacing = byCategory('spacing');
export const borders = byCategory('border');
export const breakpoints = byCategory('breakpoints');
export const typography = byCategory('typography');

export const fontSizes = typography.filter((token) => token.path.includes('.font-size.'));
export const lineHeights = typography.filter((token) => token.path.includes('.line-height.'));
export const letterSpacing = typography.filter((token) => token.path.includes('.letter-spacing.'));
export const fontWeights = typography.filter((token) => token.path.includes('.font-weight.'));
export const fontFamilies = typography.filter((token) => token.path.includes('.font-family.'));

export const tokenSummary = categoryOrder.map((category) => ({
  category,
  count: byCategory(category).length,
  label: categoryLabels[category],
}));

export const totalTokenCount = allTokens.length;

export const categoryLabel = (category: TokenCategory): string => categoryLabels[category];

export function groupBySubgroup(entries: TokenEntry[]): [string, TokenEntry[]][] {
  const groups = entries.reduce<Record<string, TokenEntry[]>>((accumulator, token) => {
    const key = token.subgroup ?? 'base';
    accumulator[key] = [...(accumulator[key] ?? []), token];
    return accumulator;
  }, {});

  return Object.entries(groups).map(([group, groupTokens]) => [group, sortTokens(groupTokens)]);
}

export function groupColorTokens(entries: TokenEntry[]): [string, TokenEntry[]][] {
  const groups = entries.reduce<Record<string, TokenEntry[]>>((accumulator, token) => {
    const key = getColorGroup(token);
    accumulator[key] = [...(accumulator[key] ?? []), token];
    return accumulator;
  }, {});

  return Object.entries(groups)
    .map(([group, groupTokens]) => [group, sortTokens(groupTokens)] as [string, TokenEntry[]])
    .sort(([left], [right]) => {
      const leftIndex = colorGroupOrder.indexOf(left);
      const rightIndex = colorGroupOrder.indexOf(right);

      if (leftIndex === -1 && rightIndex === -1) {
        return left.localeCompare(right);
      }

      if (leftIndex === -1) {
        return 1;
      }

      if (rightIndex === -1) {
        return -1;
      }

      return leftIndex - rightIndex;
    });
}
