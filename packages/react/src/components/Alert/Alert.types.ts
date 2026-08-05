import type { MouseEventHandler, ReactNode } from 'react';

export type AlertVariant = 'information' | 'success' | 'warning' | 'error';

export type AlertRole = 'alert' | 'status' | 'note';

export interface AlertProps {
  /** Título curto do alerta (Body/Small Bold no Figma). */
  title: ReactNode;
  /** Conteúdo do Content Slot, exibido abaixo do título (Body/Small no Figma). */
  children?: ReactNode;
  /** Tipo do alerta, equivalente à propriedade `type` do componente no Figma. */
  variant?: AlertVariant;
  className?: string;
  /** Exibe o botão de fechar (`showCloseButton` no Figma). */
  dismissible?: boolean;
  dismissLabel?: string;
  isVisible?: boolean;
  defaultVisible?: boolean;
  onDismiss?: MouseEventHandler<HTMLButtonElement>;
  onVisibleChange?: (isVisible: boolean) => void;
  role?: AlertRole;
}
