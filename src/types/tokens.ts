export type DesignTokenTier = 'primitive' | 'semantic' | 'component';

export type DesignTokenCategory =
  | 'color'
  | 'typography'
  | 'spacing'
  | 'radius'
  | 'border'
  | 'shadow'
  | 'opacity'
  | 'motion'
  | 'z-index'
  | 'breakpoint';

export type DesignTokenMode = 'light' | 'dark' | 'high-contrast';

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

export interface DesignToken<TValue = string | number> {
  $type: DesignTokenType;
  $value: TValue;
  $description?: string;
  $extensions?: {
    category?: DesignTokenCategory;
    tier?: DesignTokenTier;
    mode?: DesignTokenMode;
    figmaVariableId?: string;
    figmaCollectionId?: string;
  };
}

export interface DesignTokenCollection extends Record<
  string,
  DesignToken | DesignTokenCollection
> {}
