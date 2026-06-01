import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from 'react';

export type ModalSize = 'sm' | 'md' | 'lg' | 'full';

export type ModalActionVariant = 'primary' | 'secondary' | 'tertiary';

export interface ModalAction
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className' | 'type'> {
  label: string;
  variant?: ModalActionVariant;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
  actions?: ModalAction[];
  footer?: ReactNode;
  size?: ModalSize;
  closeLabel?: string;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  className?: string;
}
