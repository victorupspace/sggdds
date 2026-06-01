export type AvatarSize = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';

export interface AvatarProps {
  alt?: string;
  className?: string;
  disabled?: boolean;
  initials?: string;
  name: string;
  size?: AvatarSize;
  src?: string;
}
