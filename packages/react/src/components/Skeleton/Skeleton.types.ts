import type { CSSProperties, HTMLAttributes } from 'react';

export type SkeletonAnimation = 'none' | 'pulse' | 'wave';

export type SkeletonDimension = number | string;

export type SkeletonRadius = 'none' | 'sm' | 'md' | 'lg' | 'full';

export type SkeletonShape = 'circle' | 'rectangle' | 'rounded' | 'text';

export type SkeletonTone = 'default' | 'subtle' | 'strong';

export interface SkeletonProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  animation?: SkeletonAnimation;
  ariaLabel?: string;
  className?: string;
  height?: SkeletonDimension;
  lineGap?: SkeletonDimension;
  lines?: number;
  radius?: SkeletonRadius;
  shape?: SkeletonShape;
  style?: CSSProperties;
  tone?: SkeletonTone;
  width?: SkeletonDimension;
}
