import type { ReactNode } from 'react';

/** `Size` no Figma: small (440px), medium (600px), large (960px) e extended (1200px). */
export type ModalSize = 'small' | 'medium' | 'large' | 'extended';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: ReactNode;
  /** Slot opcional abaixo do título (Subheader Slot no Figma). */
  subheader?: ReactNode;
  /** Content Slot: conteúdo principal do modal. */
  children?: ReactNode;
  /**
   * Footer Slot: componha com os Buttons do DS (ação primária = secondary,
   * dispensar = tertiary, como na documentação do Figma).
   */
  footer?: ReactNode;
  size?: ModalSize;
  closeLabel?: string;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  className?: string;
}
