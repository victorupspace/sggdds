import './BackToTop.styles.css';

import { useEffect, useState } from 'react';

import type { BackToTopProps } from './BackToTop.types';

function isWindowTarget(target: HTMLElement | Window): target is Window {
  return typeof Window !== 'undefined' && target instanceof Window;
}

function getScrollTop(target: HTMLElement | Window) {
  if (isWindowTarget(target)) {
    return target.scrollY || target.document.documentElement.scrollTop;
  }

  return target.scrollTop;
}

function scrollTargetToTop(target: HTMLElement | Window, behavior: ScrollBehavior) {
  if (isWindowTarget(target)) {
    target.scrollTo({ behavior, top: 0 });
    return;
  }

  target.scrollTo({ behavior, top: 0 });
}

function getPrefersReducedMotion() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }

  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function BackToTop({
  ariaLabel = 'Voltar ao topo',
  className,
  disabled = false,
  onClick,
  position = 'right',
  scrollBehavior = 'smooth',
  target,
  threshold = 320,
  visible,
}: BackToTopProps) {
  const [isVisible, setIsVisible] = useState(() => visible ?? false);
  const resolvedVisible = visible ?? isVisible;
  const safeThreshold = Math.max(0, Math.trunc(threshold));
  const rootClassName = [
    'ds-back-to-top',
    `ds-back-to-top--position-${position}`,
    resolvedVisible ? 'ds-back-to-top--visible' : undefined,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  useEffect(() => {
    if (visible !== undefined || typeof window === 'undefined') {
      return undefined;
    }

    const scrollTarget = target ?? window;
    const updateVisibility = () => {
      setIsVisible(getScrollTop(scrollTarget) >= safeThreshold);
    };
    const animationFrame = window.requestAnimationFrame(updateVisibility);

    scrollTarget.addEventListener('scroll', updateVisibility, { passive: true });
    window.addEventListener('resize', updateVisibility);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      scrollTarget.removeEventListener('scroll', updateVisibility);
      window.removeEventListener('resize', updateVisibility);
    };
  }, [safeThreshold, target, visible]);

  return (
    <button
      aria-hidden={!resolvedVisible ? 'true' : undefined}
      aria-label={ariaLabel}
      className={rootClassName}
      disabled={disabled}
      onClick={(event) => {
        onClick?.(event);

        if (event.defaultPrevented || disabled) {
          return;
        }

        const behavior = getPrefersReducedMotion() ? 'auto' : scrollBehavior;
        scrollTargetToTop(target ?? window, behavior);
      }}
      tabIndex={resolvedVisible ? undefined : -1}
      type="button"
    >
      <span className="ds-back-to-top__icon" aria-hidden="true">
        arrow_upward
      </span>
    </button>
  );
}
