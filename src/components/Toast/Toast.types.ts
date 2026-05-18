import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from 'react';

export type ToastVariant = 'brand' | 'neutral' | 'positive' | 'information' | 'notice' | 'negative';

export type ToastRole = 'alert' | 'status';

export interface ToastAction
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className' | 'type'> {
  label: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export interface ToastProps {
  title: ReactNode;
  children?: ReactNode;
  actions?: ToastAction[];
  autoDismiss?: boolean;
  className?: string;
  defaultOpen?: boolean;
  dismissible?: boolean;
  dismissLabel?: string;
  duration?: number;
  icon?: ReactNode;
  isOpen?: boolean;
  onDismiss?: MouseEventHandler<HTMLButtonElement>;
  onOpenChange?: (isOpen: boolean) => void;
  pauseOnFocus?: boolean;
  pauseOnHover?: boolean;
  role?: ToastRole;
  showIcon?: boolean;
  variant?: ToastVariant;
}
