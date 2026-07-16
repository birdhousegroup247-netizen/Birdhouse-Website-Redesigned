import React from 'react';
import { BoxIcon } from 'lucide-react';
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'glass';
type ButtonSize = 'sm' | 'md' | 'lg';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: BoxIcon;
}
const variants: Record<ButtonVariant, string> = {
  primary:
  'bg-brand-green text-white hover:bg-brand-greenDark hover:shadow-lg hover:shadow-brand-green/20 hover:-translate-y-0.5',
  secondary: 'bg-surface-secondary text-text-primary hover:bg-surface-tertiary',
  outline:
  'border border-gray-200 dark:border-surface-700 text-text-primary hover:border-brand-green hover:text-brand-green',
  ghost:
  'text-text-secondary hover:text-text-primary hover:bg-surface-secondary',
  glass: 'glass-panel glass-panel-hover text-text-primary'
};
const sizes: Record<ButtonSize, string> = {
  sm: 'px-5 py-2.5 text-sm',
  md: 'px-7 py-3.5 text-base',
  lg: 'px-9 py-4 text-lg'
};
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  ...props
}: ButtonProps) {
  const baseStyle =
  'inline-flex items-center justify-center font-medium transition-all duration-300 ease-out rounded-full';
  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}>
      
      {children}
      {Icon && <Icon className="ml-2 w-4 h-4" />}
    </button>);

}