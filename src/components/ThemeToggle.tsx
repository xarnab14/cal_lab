import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { Theme } from '../types';

interface ThemeToggleProps {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onThemeChange }) => {
  return (
    <div
      id="theme-toggle-group"
      className="inline-flex p-0.5 rounded-xl bg-zinc-200/80 dark:bg-zinc-800/80 border border-zinc-300/60 dark:border-white/5"
      role="radiogroup"
      aria-label="Theme selector"
    >
      <button
        id="theme-btn-light"
        type="button"
        role="radio"
        aria-checked={theme === 'light'}
        title="Light theme"
        onClick={() => onThemeChange('light')}
        className={`p-1.5 rounded-lg transition-all ${
          theme === 'light'
            ? 'bg-white text-zinc-900 shadow-xs'
            : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
        }`}
      >
        <Sun className="w-3.5 h-3.5" />
      </button>

      <button
        id="theme-btn-dark"
        type="button"
        role="radio"
        aria-checked={theme === 'dark'}
        title="Dark theme"
        onClick={() => onThemeChange('dark')}
        className={`p-1.5 rounded-lg transition-all ${
          theme === 'dark'
            ? 'bg-zinc-900 text-indigo-400 shadow-xs'
            : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
        }`}
      >
        <Moon className="w-3.5 h-3.5" />
      </button>

      <button
        id="theme-btn-system"
        type="button"
        role="radio"
        aria-checked={theme === 'system'}
        title="System default theme"
        onClick={() => onThemeChange('system')}
        className={`p-1.5 rounded-lg transition-all ${
          theme === 'system'
            ? 'bg-white dark:bg-zinc-700 text-indigo-600 dark:text-indigo-300 shadow-xs'
            : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
        }`}
      >
        <Monitor className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
