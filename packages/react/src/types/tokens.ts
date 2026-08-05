/**
 * Token tiers mirror the Figma variable collections one-to-one:
 * - `primitive` — "Global: Core" (raw scales: color, spacing, typography, border, breakpoints)
 * - `brand` — "T1: Sampa Design System" (brand/identity/utility palettes and brand typography)
 * - `semantic` — "T2: Semantics" (role-based color and text-style decisions)
 * - `component` — "T3: Components" (per-component decisions: button, input, modal, ...)
 */
export type DesignTokenTier = 'primitive' | 'brand' | 'semantic' | 'component';

export type DesignTokenCategory =
  | 'color'
  | 'typography'
  | 'spacing'
  | 'border'
  | 'breakpoints'
  | 'shadow'
  | 'size'
  | 'motion'
  | 'effect';

export type DesignTokenType =
  | 'border'
  | 'color'
  | 'cubicBezier'
  | 'dimension'
  | 'duration'
  | 'fontFamily'
  | 'fontWeight'
  | 'gradient'
  | 'number'
  | 'shadow'
  | 'strokeStyle'
  | 'string'
  | 'typography';

/**
 * Extension keys actually present in the normalized token files. `com.figma.*`
 * keys come straight from the Figma variables export; `sggd.*` keys are added
 * by `packages/tokens/scripts/transform-tokens.ts` during normalization.
 */
export interface DesignTokenExtensions {
  'com.figma.variableId'?: string;
  'com.figma.scopes'?: string[];
  'com.figma.type'?: string;
  'com.figma.aliasData'?: {
    targetVariableId?: string;
    targetVariableName?: string;
    targetVariableSetId?: string;
    targetVariableSetName?: string;
  };
  /** Original Figma path when normalization renamed segments (e.g. "sucess"). */
  'sggd.figmaPath'?: string;
  /** Literal value from the Figma export before it was replaced by a reference. */
  'sggd.figmaResolvedValue'?: string | number;
  /** Original Figma font style name (e.g. "SemiBold") behind a numeric weight. */
  'sggd.figmaFontStyle'?: string;
  /** Set when an alias target could not be resolved across the collections. */
  'sggd.unresolvedAliasTarget'?: string;
  [key: string]: unknown;
}

export interface DesignToken<TValue = string | number> {
  $type: DesignTokenType;
  $value: TValue;
  $description?: string;
  $extensions?: DesignTokenExtensions;
}

export interface DesignTokenCollection extends Record<
  string,
  DesignToken | DesignTokenCollection
> {}
