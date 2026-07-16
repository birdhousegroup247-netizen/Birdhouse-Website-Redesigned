import React from 'react';
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}
export function Input({ label, className = '', ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      {label &&
      <label className="text-sm font-medium text-text-secondary">
          {label}
        </label>
      }
      <input
        className={`w-full px-5 py-4 rounded-xl bg-surface-secondary border border-transparent focus:bg-white dark:focus:bg-surface-800 focus:border-brand-green focus:ring-4 focus:ring-brand-green/10 transition-all outline-none text-text-primary placeholder:text-text-tertiary ${className}`}
        {...props} />
      
    </div>);

}