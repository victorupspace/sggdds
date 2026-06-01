import './Skeleton.styles.css';

import type { CSSProperties } from 'react';
import type { SkeletonDimension, SkeletonProps } from './Skeleton.types';

function toCssDimension(value: SkeletonDimension | undefined) {
  if (value === undefined) {
    return undefined;
  }

  if (typeof value === 'number') {
    return `${String(value)}px`;
  }

  return value;
}

function getSafeLines(lines: number | undefined) {
  if (!lines || !Number.isFinite(lines)) {
    return 1;
  }

  return Math.max(1, Math.floor(lines));
}

export function Skeleton({
  animation = 'pulse',
  ariaLabel,
  className,
  height,
  lineGap,
  lines = 1,
  radius,
  shape = 'rectangle',
  style,
  tone = 'default',
  width,
  ...restProps
}: SkeletonProps) {
  const safeLines = getSafeLines(lines);
  const isText = shape === 'text';
  const shouldRenderLines = isText && safeLines > 1;
  const resolvedRadius = radius ?? (shape === 'circle' ? 'full' : shape === 'rounded' ? 'md' : 'sm');
  const rootClassName = [
    'ds-skeleton',
    `ds-skeleton--shape-${shape}`,
    `ds-skeleton--animation-${animation}`,
    `ds-skeleton--tone-${tone}`,
    `ds-skeleton--radius-${resolvedRadius}`,
    shouldRenderLines ? 'ds-skeleton--multiline' : undefined,
    className,
  ]
    .filter(Boolean)
    .join(' ');
  const skeletonStyle = {
    '--skeleton-height': toCssDimension(height),
    '--skeleton-line-gap': toCssDimension(lineGap),
    '--skeleton-width': toCssDimension(width),
    ...style,
  } as CSSProperties;
  const accessibilityProps = ariaLabel
    ? {
        'aria-busy': true,
        'aria-label': ariaLabel,
        role: 'status',
      }
    : {
        'aria-hidden': true,
      };

  if (shouldRenderLines) {
    return (
      <span
        {...restProps}
        {...accessibilityProps}
        className={rootClassName}
        style={skeletonStyle}
      >
        {Array.from({ length: safeLines }, (_, index) => (
          <span className="ds-skeleton__line" key={String(index)} />
        ))}
      </span>
    );
  }

  return <span {...restProps} {...accessibilityProps} className={rootClassName} style={skeletonStyle} />;
}
