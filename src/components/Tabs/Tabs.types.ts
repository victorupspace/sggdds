import type { KeyboardEventHandler, ReactNode } from 'react';

export type TabsVariant = 'standard' | 'compact';

export type TabsActivationMode = 'automatic' | 'manual';

export interface TabsItem {
  id: string;
  label: ReactNode;
  content: ReactNode;
  icon?: ReactNode;
  badge?: ReactNode;
  disabled?: boolean;
  ariaLabel?: string;
}

export interface TabsProps {
  items: TabsItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  ariaLabel?: string;
  activationMode?: TabsActivationMode;
  variant?: TabsVariant;
  className?: string;
  panelClassName?: string;
  onKeyDown?: KeyboardEventHandler<HTMLDivElement>;
}
