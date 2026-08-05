import type { CardProps } from '../Card';

export interface CarouselCardItem extends Omit<CardProps, 'className'> {
  id: string;
  ariaLabel?: string;
  cardClassName?: string;
}

export interface CarouselLabels {
  ariaLabel?: string;
  currentIndicator?: (index: number, total: number) => string;
  indicator?: (index: number, total: number) => string;
  nextSlide?: string;
  previousSlide?: string;
  slide?: (index: number, total: number) => string;
  status?: (index: number, total: number) => string;
}

/**
 * Superfície dos indicadores, espelhando o component set do Figma:
 * `default` (superfícies claras), `darker` (sobre imagens ou fundos coloridos)
 * e `on-dark` (superfícies escuras, com contêiner translúcido).
 */
export type CarouselIndicatorAppearance = 'default' | 'darker' | 'on-dark';

export interface CarouselProps {
  items: CarouselCardItem[];
  className?: string;
  defaultIndex?: number;
  disabled?: boolean;
  indicatorAppearance?: CarouselIndicatorAppearance;
  indicatorsLabel?: string;
  labels?: CarouselLabels;
  loop?: boolean;
  onIndexChange?: (index: number, item: CarouselCardItem) => void;
  selectedIndex?: number;
  showControls?: boolean;
  showIndicators?: boolean;
  /**
   * Maximum number of cards displayed per group. The Carousel reduces this value
   * when the available width would make cards too narrow.
   */
  visibleItems?: number;
}
