import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../theme/ThemeContext';

export function ThemeToggle({ className = '' }: {className?: string;}) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-colors ${className || 'text-text-secondary hover:text-text-primary bg-surface-secondary hover:bg-surface-tertiary'}`}>

      {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>);

}
