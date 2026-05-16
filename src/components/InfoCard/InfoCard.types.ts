import type { ReactNode } from 'react';

export type InfoCardHeadingLevel = 2 | 3 | 4 | 5 | 6;

export interface InfoCardProps {
  icon?: ReactNode;
  title: string;
  subtitle?: string;
  description?: string;
  children?: ReactNode;
  headingLevel?: InfoCardHeadingLevel;
  className?: string;
}
