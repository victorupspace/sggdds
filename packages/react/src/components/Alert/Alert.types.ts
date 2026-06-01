import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from 'react';

export type AlertVariant = 'information' | 'success' | 'warning' | 'error' | 'critical';

export type AlertRole = 'alert' | 'status' | 'note';

export interface AlertAction
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className' | 'type'> {
  label: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export interface AlertProps {
  title: ReactNode;
  children?: ReactNode;
  actions?: AlertAction[];
  className?: string;
  dismissible?: boolean;
  dismissLabel?: string;
  icon?: ReactNode;
  isVisible?: boolean;
  defaultVisible?: boolean;
  onDismiss?: MouseEventHandler<HTMLButtonElement>;
  onVisibleChange?: (isVisible: boolean) => void;
  role?: AlertRole;
  showIcon?: boolean;
  variant?: AlertVariant;
}
