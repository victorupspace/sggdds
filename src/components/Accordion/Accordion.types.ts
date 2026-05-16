import type { ReactNode } from 'react';

export interface AccordionProps {
  children?: ReactNode;
  allowMultiple?: boolean;
  defaultExpanded?: string[];
  className?: string;
}

export interface AccordionItemProps {
  id: string;
  title: ReactNode;
  children: ReactNode;
  disabled?: boolean;
  className?: string;
}
