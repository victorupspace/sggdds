import './Carousel.styles.css';

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

import type { CSSProperties, KeyboardEvent } from 'react';
import { Card } from '../Card';
import type { CarouselLabels, CarouselProps } from './Carousel.types';

const useCarouselLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

const defaultLabels: Required<CarouselLabels> = {
  ariaLabel: 'Carrossel',
  currentIndicator: (index, total) => `Grupo ${String(index + 1)} de ${String(total)}, selecionado`,
  indicator: (index, total) => `Ir para grupo ${String(index + 1)} de ${String(total)}`,
  nextSlide: 'Proximo card',
  previousSlide: 'Card anterior',
  slide: (index, total) => `Card ${String(index + 1)} de ${String(total)}`,
  status: (index, total) => `Grupo ${String(index + 1)} de ${String(total)}`,
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function normalizeIndex(index: number | undefined, maxIndex: number) {
  return clamp(Math.trunc(index ?? 0), 0, maxIndex);
}

function normalizeVisibleItems(value: number | undefined, totalItems: number) {
  if (!Number.isFinite(value) || value == null) {
    return 1;
  }

  return clamp(Math.trunc(value), 1, Math.max(totalItems, 1));
}

function parseCssNumber(value: string, fallback: number) {
  const parsedValue = Number.parseFloat(value);

  return Number.isFinite(parsedValue) ? parsedValue : fallback;
}

/* Chevron do Icon Button Ghost exportado do Figma (node 95:19785) */
function CarouselIcon({ direction }: { direction: 'next' | 'previous' }) {
  return (
    <svg
      aria-hidden="true"
      className="ds-carousel__icon"
      fill="none"
      focusable="false"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      {direction === 'previous' ? (
        <path
          d="M6.14645 0.146447C6.34171 -0.0488155 6.65822 -0.0488155 6.85348 0.146447C7.0487 0.341712 7.04873 0.658228 6.85348 0.853478L1.20699 6.49996L6.85348 12.1464C7.0487 12.3417 7.04873 12.6582 6.85348 12.8535C6.65823 13.0487 6.34171 13.0487 6.14645 12.8535L0.146447 6.85348C-0.0488155 6.65822 -0.0488155 6.34171 0.146447 6.14645L6.14645 0.146447Z"
          fill="currentColor"
          transform="translate(8.5 5.5)"
        />
      ) : (
        <path
          d="M0.146447 0.146447C0.341709 -0.0488155 0.658216 -0.0488155 0.853478 0.146447L6.85348 6.14645C7.0487 6.34171 7.04873 6.65823 6.85348 6.85348L0.853478 12.8535C0.658228 13.0487 0.341712 13.0487 0.146447 12.8535C-0.0488153 12.6582 -0.0488153 12.3417 0.146447 12.1464L5.79293 6.49996L0.146447 0.853478C-0.0488155 0.658216 -0.0488155 0.341709 0.146447 0.146447Z"
          fill="currentColor"
          transform="translate(8.5 5.5)"
        />
      )}
    </svg>
  );
}

export function Carousel({
  className,
  defaultIndex = 0,
  disabled = false,
  indicatorAppearance = 'default',
  indicatorsLabel = 'Selecionar grupo de cards',
  items,
  labels,
  loop = false,
  onIndexChange,
  selectedIndex,
  showControls = true,
  showIndicators = true,
  visibleItems = 1,
}: CarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const mergedLabels = { ...defaultLabels, ...labels };
  const normalizedItems = useMemo(() => items.filter((item) => item.id.trim() !== ''), [items]);
  const itemCount = normalizedItems.length;
  const requestedVisibleItems = normalizeVisibleItems(visibleItems, itemCount);
  const [measuredVisibleItems, setMeasuredVisibleItems] = useState(requestedVisibleItems);
  const resolvedVisibleItems = Math.min(
    requestedVisibleItems,
    measuredVisibleItems,
    itemCount || 1,
  );
  const maxIndex = Math.max(itemCount - resolvedVisibleItems, 0);
  const isControlled = selectedIndex !== undefined;
  const [internalIndex, setInternalIndex] = useState(() => normalizeIndex(defaultIndex, maxIndex));
  const currentIndex = normalizeIndex(selectedIndex ?? internalIndex, maxIndex);
  const indicatorCount = maxIndex + 1;
  const canGoPrevious = itemCount > resolvedVisibleItems && (loop || currentIndex > 0);
  const canGoNext = itemCount > resolvedVisibleItems && (loop || currentIndex < maxIndex);
  const rootClassName = [
    'ds-carousel',
    `ds-carousel--visible-${String(resolvedVisibleItems)}`,
    indicatorAppearance !== 'default'
      ? `ds-carousel--indicators-${indicatorAppearance}`
      : undefined,
    disabled ? 'ds-carousel--disabled' : undefined,
    className,
  ]
    .filter(Boolean)
    .join(' ');
  const trackStyle = {
    '--carousel-current-index': currentIndex,
    '--carousel-visible-items': resolvedVisibleItems,
  } as CSSProperties;

  useCarouselLayoutEffect(() => {
    const viewport = viewportRef.current;

    if (!viewport || typeof ResizeObserver === 'undefined') {
      setMeasuredVisibleItems(requestedVisibleItems);
      return undefined;
    }

    const updateVisibleItems = () => {
      const track = viewport.querySelector<HTMLElement>('.ds-carousel__track');
      const rootStyles = window.getComputedStyle(document.documentElement);
      const trackStyles = window.getComputedStyle(track ?? viewport);
      const gap = parseCssNumber(trackStyles.columnGap || '', 24);
      const token128 = parseCssNumber(
        rootStyles.getPropertyValue('--ds-primitive-spacing-128'),
        128,
      );
      const token64 = parseCssNumber(rootStyles.getPropertyValue('--ds-primitive-spacing-64'), 64);
      const minCardInlineSize = token128 * 2 + token64;
      const availableInlineSize = viewport.clientWidth;
      const nextVisibleItems = clamp(
        Math.floor((availableInlineSize + gap) / (minCardInlineSize + gap)),
        1,
        Math.max(requestedVisibleItems, 1),
      );

      setMeasuredVisibleItems(nextVisibleItems);
    };
    const resizeObserver = new ResizeObserver(updateVisibleItems);

    updateVisibleItems();
    resizeObserver.observe(viewport);

    return () => {
      resizeObserver.disconnect();
    };
  }, [requestedVisibleItems]);

  const setIndex = useCallback(
    (nextIndex: number) => {
      if (disabled || itemCount === 0) {
        return;
      }

      const safeIndex = normalizeIndex(nextIndex, maxIndex);

      if (!isControlled) {
        setInternalIndex(safeIndex);
      }

      if (safeIndex !== currentIndex) {
        onIndexChange?.(safeIndex, normalizedItems[safeIndex]);
      }
    },
    [currentIndex, disabled, isControlled, itemCount, maxIndex, normalizedItems, onIndexChange],
  );

  const goPrevious = useCallback(() => {
    if (!canGoPrevious) {
      return;
    }

    setIndex(currentIndex === 0 ? maxIndex : currentIndex - 1);
  }, [canGoPrevious, currentIndex, maxIndex, setIndex]);

  const goNext = useCallback(() => {
    if (!canGoNext) {
      return;
    }

    setIndex(currentIndex === maxIndex ? 0 : currentIndex + 1);
  }, [canGoNext, currentIndex, maxIndex, setIndex]);

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goPrevious();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      goNext();
    } else if (event.key === 'Home') {
      event.preventDefault();
      setIndex(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      setIndex(maxIndex);
    }
  };

  if (itemCount === 0) {
    return null;
  }

  return (
    <section
      aria-label={mergedLabels.ariaLabel}
      aria-roledescription="carousel"
      className={rootClassName}
      onKeyDown={handleKeyDown}
    >
      <div className="ds-carousel__shell">
        {showControls ? (
          <button
            aria-label={mergedLabels.previousSlide}
            className="ds-carousel__control ds-carousel__control--previous"
            disabled={disabled || !canGoPrevious}
            onClick={goPrevious}
            type="button"
          >
            <CarouselIcon direction="previous" />
          </button>
        ) : null}

        <div className="ds-carousel__viewport" ref={viewportRef} tabIndex={disabled ? -1 : 0}>
          <div className="ds-carousel__track" style={trackStyle}>
            {normalizedItems.map(({ ariaLabel, cardClassName, id, ...cardProps }, index) => {
              const slideLabel = ariaLabel ?? mergedLabels.slide(index, itemCount);
              const cardClassNames = ['ds-carousel__card', cardClassName].filter(Boolean).join(' ');

              return (
                <div
                  aria-label={slideLabel}
                  aria-roledescription="slide"
                  className="ds-carousel__item"
                  key={id}
                  role="group"
                >
                  <Card {...cardProps} className={cardClassNames} />
                </div>
              );
            })}
          </div>
        </div>

        {showControls ? (
          <button
            aria-label={mergedLabels.nextSlide}
            className="ds-carousel__control ds-carousel__control--next"
            disabled={disabled || !canGoNext}
            onClick={goNext}
            type="button"
          >
            <CarouselIcon direction="next" />
          </button>
        ) : null}
      </div>

      <div className="ds-carousel__navigation">
        <p className="ds-carousel__status" aria-live="polite">
          {mergedLabels.status(currentIndex, indicatorCount)}
        </p>

        {showIndicators ? (
          <div aria-label={indicatorsLabel} className="ds-carousel__indicators" role="group">
            {Array.from({ length: indicatorCount }, (_, index) => {
              const isSelected = index === currentIndex;

              return (
                <button
                  aria-label={
                    isSelected
                      ? mergedLabels.currentIndicator(index, indicatorCount)
                      : mergedLabels.indicator(index, indicatorCount)
                  }
                  aria-pressed={isSelected}
                  className="ds-carousel__indicator"
                  disabled={disabled}
                  key={String(index)}
                  onClick={() => {
                    setIndex(index);
                  }}
                  type="button"
                >
                  <span className="ds-carousel__indicator-label">{String(index + 1)}</span>
                </button>
              );
            })}
          </div>
        ) : null}
      </div>
    </section>
  );
}
