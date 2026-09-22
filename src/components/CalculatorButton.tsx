import React from 'react';
import { motion } from 'motion/react';

export interface CalculatorButtonProps {
  id: string;
  label: React.ReactNode;
  subLabel?: string;
  onClick: () => void;
  variant?: 'number' | 'operator' | 'equals' | 'clear' | 'function' | 'memory' | 'scientific';
  ariaLabel: string;
  className?: string;
  disabled?: boolean;
  active?: boolean;
  shortcut?: string;
}

export const CalculatorButton: React.FC<CalculatorButtonProps> = ({
  id,
  label,
  subLabel,
  onClick,
  variant = 'number',
  ariaLabel,
  className = '',
  disabled = false,
  active = false,
  shortcut,
}) => {
  // Styles tailored for a sophisticated dark calculator surface
  const variantStyles = {
    number:
      'bg-zinc-800/90 text-zinc-100 hover:bg-zinc-700/90 active:bg-zinc-700 text-lg sm:text-xl font-medium shadow-xs border border-white/5',
    operator:
      'bg-indigo-600/90 text-white hover:bg-indigo-500 active:bg-indigo-600 text-xl font-medium shadow-xs border border-indigo-400/20',
    equals:
      'bg-gradient-to-br from-indigo-500 to-indigo-600 text-white hover:from-indigo-400 hover:to-indigo-500 text-xl font-semibold shadow-md shadow-indigo-500/25 border border-indigo-300/30',
    clear:
      'bg-rose-500/15 text-rose-300 hover:bg-rose-500/25 active:bg-rose-500/35 border border-rose-500/30 font-semibold text-base sm:text-lg',
    function:
      'bg-zinc-800/60 text-zinc-300 hover:bg-zinc-700/60 active:bg-zinc-700 text-base sm:text-lg font-medium border border-white/5',
    memory:
      'bg-zinc-900/60 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 text-xs sm:text-sm font-semibold border border-white/5 disabled:opacity-40 disabled:hover:text-zinc-400 disabled:hover:bg-zinc-900/60',
    scientific:
      'bg-zinc-800/70 text-indigo-200 hover:bg-zinc-700/80 active:bg-zinc-700 text-sm sm:text-base font-medium border border-white/5',
  }[variant];

  const activeStyle = active ? 'ring-2 ring-indigo-400 ring-offset-2 ring-offset-zinc-900' : '';

  return (
    <motion.button
      id={id}
      type="button"
      whileTap={disabled ? undefined : { scale: 0.96 }}
      transition={{ duration: 0.08 }}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      title={shortcut ? `${ariaLabel} (${shortcut})` : ariaLabel}
      className={`relative select-none flex flex-col items-center justify-center rounded-xl p-2.5 sm:p-3.5 transition-colors duration-150 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 ${variantStyles} ${activeStyle} ${className}`}
    >
      <span className="flex items-center justify-center pointer-events-none leading-none">
        {label}
      </span>
      {subLabel && (
        <span className="text-[10px] text-zinc-400 mt-0.5 pointer-events-none opacity-80 leading-none">
          {subLabel}
        </span>
      )}
    </motion.button>
  );
};
