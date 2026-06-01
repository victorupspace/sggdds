import './Avatar.styles.css';

import { useMemo, useState } from 'react';

import type { AvatarProps } from './Avatar.types';

function getInitials(name: string) {
  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (parts.length === 0) {
    return '?';
  }

  const first = parts[0];
  const second = parts.length > 1 ? parts[1] : first.slice(1);
  const value = `${first.charAt(0)}${second.charAt(0)}`.toUpperCase();

  return value || '?';
}

function normalizeInitials(initials: string | undefined, name: string) {
  if (initials !== undefined) {
    const trimmedInitials = initials.trim();

    if (trimmedInitials.length > 0) {
      return trimmedInitials.slice(0, 2).toUpperCase();
    }
  }

  const value = getInitials(name);

  return value.slice(0, 2).toUpperCase();
}

export function Avatar({
  alt,
  className,
  disabled = false,
  initials,
  name,
  size = 'medium',
  src,
}: AvatarProps) {
  const [failedSrc, setFailedSrc] = useState<string | undefined>();
  const accessibleName = alt ?? name;
  const fallbackInitials = useMemo(() => normalizeInitials(initials, name), [initials, name]);
  const rootClassName = [
    'ds-avatar',
    `ds-avatar--size-${size}`,
    disabled ? 'ds-avatar--disabled' : undefined,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={rootClassName} aria-disabled={disabled ? 'true' : undefined}>
      {src !== undefined && src.length > 0 && failedSrc !== src ? (
        <img
          alt={accessibleName}
          className="ds-avatar__image"
          onError={() => {
            setFailedSrc(src);
          }}
          src={src}
        />
      ) : (
        <span aria-label={name} className="ds-avatar__fallback" role="img">
          {fallbackInitials}
        </span>
      )}
    </span>
  );
}
