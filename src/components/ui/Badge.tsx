import React from 'react';
type BadgeVariant = 'default' | 'success' | 'glass';
interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}
const variants: Record<BadgeVariant, string> = {
  default: 'bg-surface-secondary text-text-secondary',
  success: 'bg-brand-greenLight text-brand-greenDark',
  glass: 'glass-panel text-text-primary'
};
export function Badge({
  children,
  variant = 'default',
  className = ''
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium tracking-wide uppercase ${variants[variant]} ${className}`}>
      
      {children}
    </span>);

}