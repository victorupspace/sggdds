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

export interface CarouselProps {
  items: CarouselCardItem[];
  className?: string;
  defaultIndex?: number;
  disabled?: boolean;
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
