import React from 'react';
import { History as HistoryIcon, Keyboard } from 'lucide-react';
import { Calculator } from '../components/Calculator';
import { HistoryPanel } from '../components/HistoryPanel';
import { CalculatorMode, CalculatorSettings, HistoryItem } from '../types';

interface CalculatorPageProps {
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
  history: HistoryItem[];
  onReuseHistory: (expression: string) => void;
  onDeleteHistoryItem: (id: string) => void;
  onClearHistory: () => void;
  onOpenKeyboardHelp: () => void;
}

export const CalculatorPage: React.FC<CalculatorPageProps> = ({
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
  history,
  onReuseHistory,
  onDeleteHistoryItem,
  onClearHistory,
  onOpenKeyboardHelp,
}) => {
  return (
    <div id="calculator-page-container" className="w-full py-6 sm:py-10 px-4">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8">
        {/* Main Calculator Unit */}
        <div className="w-full max-w-md flex flex-col items-center">
          <Calculator
            expression={expression}
            result={result}
            error={error}
            memory={memory}
            mode={mode}
            onSetMode={onSetMode}
            settings={settings}
            onUpdateSettings={onUpdateSettings}
            onDigit={onDigit}
            onOperator={onOperator}
            onDecimal={onDecimal}
            onParenthesis={onParenthesis}
            onPercentage={onPercentage}
            onToggleSign={onToggleSign}
            onScientificFunction={onScientificFunction}
            onBackspace={onBackspace}
            onClearAll={onClearAll}
            onCalculate={onCalculate}
            onMemoryClear={onMemoryClear}
            onMemoryRecall={onMemoryRecall}
            onMemoryAdd={onMemoryAdd}
            onMemorySubtract={onMemorySubtract}
            onMemoryStore={onMemoryStore}
            onShowToast={onShowToast}
          />

          {/* Helper caption below calculator */}
          <div className="flex items-center justify-between w-full max-w-md px-3 mt-3 text-xs text-zinc-500 dark:text-zinc-400">
            <button
              type="button"
              onClick={onOpenKeyboardHelp}
              className="flex items-center gap-1.5 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              <Keyboard className="w-3.5 h-3.5" />
              <span>Keyboard shortcuts available</span>
            </button>
            <span className="hidden sm:inline">Safe Math.js evaluation</span>
          </div>
        </div>

        {/* Side History Panel (Always visible on large screens) */}
        <div className="hidden lg:block w-80 h-[560px] shrink-0 sticky top-24">
          <HistoryPanel
            history={history}
            onReuse={onReuseHistory}
            onDelete={onDeleteHistoryItem}
            onClearAll={onClearHistory}
          />
        </div>
      </div>
    </div>
  );
};
