import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { CalculatorMode, AngleUnit, CalculatorSettings } from '../types';
import { CalculatorDisplay } from './CalculatorDisplay';
import { MemoryButtons } from './MemoryButtons';
import { ScientificPanel } from './ScientificPanel';
import { ButtonGrid } from './ButtonGrid';

interface CalculatorProps {
  expression: string;
  result: string;
  error: string | null;
  memory: number;
  mode: CalculatorMode;
  onSetMode: (mode: CalculatorMode) => void;
  settings: CalculatorSettings;
  onUpdateSettings: (newSettings: Partial<CalculatorSettings>) => void;
  onDigit: (digit: string) => void;
  onOperator: (operator: string) => void;
  onDecimal: () => void;
  onParenthesis: (p: '(' | ')') => void;
  onPercentage: () => void;
  onToggleSign: () => void;
  onScientificFunction: (fn: string) => void;
  onBackspace: () => void;
  onClearAll: () => void;
  onCalculate: () => void;
  onMemoryClear: () => void;
  onMemoryRecall: () => void;
  onMemoryAdd: () => void;
  onMemorySubtract: () => void;
  onMemoryStore: () => void;
  onShowToast: (text: string) => void;
}

export const Calculator: React.FC<CalculatorProps> = ({
  expression,
  result,
  error,
  memory,
  mode,
  onSetMode,
  settings,
  onUpdateSettings,
  onDigit,
  onOperator,
  onDecimal,
  onParenthesis,
  onPercentage,
  onToggleSign,
  onScientificFunction,
  onBackspace,
  onClearAll,
  onCalculate,
  onMemoryClear,
  onMemoryRecall,
  onMemoryAdd,
  onMemorySubtract,
  onMemoryStore,
  onShowToast,
}) => {
  const [isCopied, setIsCopied] = useState(false);

  // Copy result to clipboard
  const handleCopyResult = async () => {
    try {
      await navigator.clipboard.writeText(result.replace(/,/g, ''));
      setIsCopied(true);
      onShowToast(`Copied ${result} to clipboard`);
      setTimeout(() => setIsCopied(false), 1800);
    } catch {
      onShowToast('Could not access clipboard');
    }
  };

  const handleToggleAngleUnit = () => {
    const nextUnit: AngleUnit = settings.angleUnit === 'deg' ? 'rad' : 'deg';
    onUpdateSettings({ angleUnit: nextUnit });
    onShowToast(`Angle unit switched to ${nextUnit.toUpperCase()}`);
  };

  // Global Keyboard event handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is inside an input or textarea
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return;
      }

      // Ignore browser shortcuts like Ctrl+R, Cmd+C, etc.
      if (e.metaKey || e.ctrlKey) return;

      // Alt key memory shortcuts
      if (e.altKey) {
        if (e.key.toLowerCase() === 'c') {
          e.preventDefault();
          onMemoryClear();
          onShowToast('Memory Cleared (MC)');
          return;
        }
        if (e.key.toLowerCase() === 'r') {
          e.preventDefault();
          onMemoryRecall();
          onShowToast('Memory Recalled (MR)');
          return;
        }
        if (e.key.toLowerCase() === 'm') {
          e.preventDefault();
          onMemoryStore();
          onShowToast('Memory Stored (MS)');
          return;
        }
        if (e.key === '+' || e.key === '=') {
          e.preventDefault();
          onMemoryAdd();
          onShowToast('Added to Memory (M+)');
          return;
        }
        if (e.key === '-') {
          e.preventDefault();
          onMemorySubtract();
          onShowToast('Subtracted from Memory (M-)');
          return;
        }
        return;
      }

      const key = e.key;

      if (/^[0-9]$/.test(key)) {
        e.preventDefault();
        onDigit(key);
      } else if (key === '.') {
        e.preventDefault();
        onDecimal();
      } else if (key === '+' || key === '-') {
        e.preventDefault();
        onOperator(key);
      } else if (key === '*') {
        e.preventDefault();
        onOperator('*');
      } else if (key === '/') {
        e.preventDefault();
        onOperator('/');
      } else if (key === '^') {
        e.preventDefault();
        onOperator('^');
      } else if (key === '%') {
        e.preventDefault();
        onPercentage();
      } else if (key === '(' || key === ')') {
        e.preventDefault();
        onParenthesis(key as '(' | ')');
      } else if (key === 'Enter' || key === '=') {
        e.preventDefault();
        onCalculate();
      } else if (key === 'Backspace') {
        e.preventDefault();
        onBackspace();
      } else if (key === 'Escape') {
        e.preventDefault();
        onClearAll();
      } else if (key.toLowerCase() === 'p') {
        e.preventDefault();
        onScientificFunction('pi');
      } else if (key.toLowerCase() === 'e') {
        e.preventDefault();
        onScientificFunction('e');
      } else if (key === '!') {
        e.preventDefault();
        onScientificFunction('fact');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    onDigit,
    onOperator,
    onDecimal,
    onParenthesis,
    onPercentage,
    onCalculate,
    onBackspace,
    onClearAll,
    onScientificFunction,
    onMemoryClear,
    onMemoryRecall,
    onMemoryAdd,
    onMemorySubtract,
    onMemoryStore,
    onShowToast,
  ]);

  return (
    <div
      id="calculator-main-device"
      className="relative w-full max-w-md mx-auto rounded-3xl bg-zinc-950/90 text-zinc-100 p-4 sm:p-6 shadow-2xl border border-zinc-800/80 dark:border-white/10 backdrop-blur-xl transition-all"
    >
      {/* Top Controls Bar: Mode Switcher */}
      <div className="flex items-center justify-between mb-4">
        {/* Mode Selector Tabs */}
        <div
          id="calculator-mode-switch"
          className="flex items-center p-1 rounded-xl bg-zinc-900 border border-white/5"
        >
          <button
            id="mode-tab-basic"
            type="button"
            onClick={() => onSetMode('basic')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
              mode === 'basic'
                ? 'bg-zinc-800 text-white shadow-xs'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Basic
          </button>
          <button
            id="mode-tab-scientific"
            type="button"
            onClick={() => onSetMode('scientific')}
            className={`flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
              mode === 'scientific'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Sparkles className="w-3 h-3 text-indigo-200" />
            <span>Scientific</span>
          </button>
        </div>

        {/* Small branding badge */}
        <div className="flex items-center gap-1 text-[11px] font-mono text-zinc-400">
          <span>CalcLab</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </div>
      </div>

      {/* Main Display Screen */}
      <CalculatorDisplay
        expression={expression}
        result={result}
        error={error}
        memory={memory}
        angleUnit={settings.angleUnit}
        onToggleAngleUnit={handleToggleAngleUnit}
        onCopyResult={handleCopyResult}
        isCopied={isCopied}
        onMemoryClick={onMemoryRecall}
      />

      {/* Memory Bar */}
      <div className="mt-3 sm:mt-4">
        <MemoryButtons
          memory={memory}
          onClear={onMemoryClear}
          onRecall={onMemoryRecall}
          onAdd={onMemoryAdd}
          onSubtract={onMemorySubtract}
          onStore={onMemoryStore}
        />
      </div>

      {/* Keypad section with smooth scientific panel expansion */}
      <div className="mt-3 sm:mt-4 space-y-2">
        <AnimatePresence initial={false}>
          {mode === 'scientific' && (
            <motion.div
              key="scientific-panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden pb-1"
            >
              <ScientificPanel
                onFunction={onScientificFunction}
                onParenthesis={onParenthesis}
                angleUnit={settings.angleUnit}
                onToggleAngleUnit={handleToggleAngleUnit}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Standard Numeric and Operator Grid */}
        <ButtonGrid
          onDigit={onDigit}
          onOperator={onOperator}
          onDecimal={onDecimal}
          onClearAll={onClearAll}
          onToggleSign={onToggleSign}
          onPercentage={onPercentage}
          onBackspace={onBackspace}
          onCalculate={onCalculate}
          hasInput={Boolean(expression)}
        />
      </div>
    </div>
  );
};
