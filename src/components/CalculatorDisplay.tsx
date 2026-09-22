import React, { useRef, useEffect } from 'react';
import { Copy, Check, AlertCircle } from 'lucide-react';
import { formatExpressionForDisplay } from '../utils/formatNumber';
import { AngleUnit } from '../types';

interface CalculatorDisplayProps {
  expression: string;
  result: string;
  error: string | null;
  memory: number;
  angleUnit: AngleUnit;
  onToggleAngleUnit?: () => void;
  onCopyResult: () => void;
  isCopied: boolean;
  onMemoryClick?: () => void;
}

export const CalculatorDisplay: React.FC<CalculatorDisplayProps> = ({
  expression,
  result,
  error,
  memory,
  angleUnit,
  onToggleAngleUnit,
  onCopyResult,
  isCopied,
  onMemoryClick,
}) => {
  const expressionRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // Auto-scroll expression to the end on change
  useEffect(() => {
    if (expressionRef.current) {
      expressionRef.current.scrollLeft = expressionRef.current.scrollWidth;
    }
  }, [expression]);

  const formattedExpr = formatExpressionForDisplay(expression) || '0';

  // Dynamic font sizing based on result length to prevent clipping
  const getResultFontSizeClass = (len: number) => {
    if (len > 16) return 'text-2xl sm:text-3xl';
    if (len > 12) return 'text-3xl sm:text-4xl';
    if (len > 8) return 'text-4xl sm:text-5xl';
    return 'text-4xl sm:text-6xl';
  };

  return (
    <div
      id="calculator-display-container"
      className="relative w-full rounded-2xl bg-zinc-950/70 border border-white/10 p-4 sm:p-5 flex flex-col justify-between shadow-inner transition-all overflow-hidden"
    >
      {/* Top Status Indicators (Angle Mode, Memory Indicator, Copy Action) */}
      <div className="flex items-center justify-between text-xs text-zinc-400 mb-2 gap-2">
        <div className="flex items-center gap-2">
          {/* Angle Unit Badge */}
          <button
            id="toggle-angle-unit-badge"
            type="button"
            onClick={onToggleAngleUnit}
            title={`Click to switch between Degrees and Radians (Current: ${angleUnit.toUpperCase()})`}
            className="px-2 py-0.5 rounded-md font-semibold text-[11px] uppercase tracking-wider bg-zinc-800/80 hover:bg-zinc-700 text-indigo-300 border border-white/5 transition-colors"
          >
            {angleUnit}
          </button>

          {/* Memory Active Indicator */}
          {memory !== 0 && (
            <button
              id="memory-indicator-pill"
              type="button"
              onClick={onMemoryClick}
              title={`Memory stored: ${memory}. Click to recall.`}
              className="flex items-center gap-1 px-2 py-0.5 rounded-md font-semibold text-[11px] bg-indigo-950/60 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-900/60 transition-colors animate-fade-in"
            >
              <span>M</span>
              <span className="opacity-70 text-[10px]">({memory})</span>
            </button>
          )}
        </div>

        {/* Copy Result Button */}
        <button
          id="copy-result-button"
          type="button"
          onClick={onCopyResult}
          title="Copy result to clipboard"
          aria-label="Copy result to clipboard"
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/80 transition-colors focus:outline-hidden focus-visible:ring-1 focus-visible:ring-indigo-400"
        >
          {isCopied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-medium">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Expression line (scrolling, secondary) */}
      <div
        ref={expressionRef}
        id="calculator-expression-scroll"
        className="w-full overflow-x-auto no-scrollbar whitespace-nowrap text-right text-zinc-400 text-sm sm:text-base font-mono tracking-wide py-1 scroll-smooth"
        aria-live="polite"
      >
        {formattedExpr}
      </div>

      {/* Main Result or Error line */}
      <div className="mt-1 flex items-baseline justify-end min-h-[52px] sm:min-h-[68px]">
        {error ? (
          <div
            id="calculator-error-message"
            className="flex items-center gap-2 text-rose-400 text-base sm:text-xl font-medium tracking-tight animate-fade-in text-right"
            role="alert"
          >
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        ) : (
          <div
            ref={resultRef}
            id="calculator-result-value"
            className={`font-mono font-semibold tracking-tight text-white select-all text-right transition-all duration-150 ${getResultFontSizeClass(
              result.length
            )}`}
            aria-live="assertive"
          >
            {result}
          </div>
        )}
      </div>
    </div>
  );
};
