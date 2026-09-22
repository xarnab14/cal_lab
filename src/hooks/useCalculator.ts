import { useState, useCallback, useEffect } from 'react';
import { CalculatorMode, CalculatorSettings } from '../types';
import { evaluateExpression } from '../utils/calculatorEngine';
import { formatResultNumber } from '../utils/formatNumber';
import { playClickSound } from '../utils/sound';

const SETTINGS_KEY = 'calclab_settings';
const MEMORY_KEY = 'calclab_memory';

const defaultSettings: CalculatorSettings = {
  angleUnit: 'deg',
  precision: 'auto',
  thousandsSeparator: true,
  soundEnabled: true,
};

export function useCalculator(onCalculationComplete?: (expr: string, result: string) => void) {
  const [expression, setExpression] = useState<string>('');
  const [result, setResult] = useState<string>('0');
  const [error, setError] = useState<string | null>(null);
  const [isEvaluated, setIsEvaluated] = useState<boolean>(false);
  const [mode, setMode] = useState<CalculatorMode>('basic');

  const [memory, setMemory] = useState<number>(() => {
    try {
      const stored = localStorage.getItem(MEMORY_KEY);
      return stored ? parseFloat(stored) : 0;
    } catch {
      return 0;
    }
  });

  const [settings, setSettings] = useState<CalculatorSettings>(() => {
    try {
      const stored = localStorage.getItem(SETTINGS_KEY);
      return stored ? { ...defaultSettings, ...JSON.parse(stored) } : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  // Persist settings
  useEffect(() => {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch {}
  }, [settings]);

  // Persist memory
  useEffect(() => {
    try {
      localStorage.setItem(MEMORY_KEY, memory.toString());
    } catch {}
  }, [memory]);

  // Read URL query parameter for share calculation if present on initial load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sharedExpr = params.get('calc') || params.get('expression');
    if (sharedExpr) {
      try {
        const decoded = decodeURIComponent(sharedExpr);
        setExpression(decoded);
        const evalRes = evaluateExpression(decoded, settings.angleUnit);
        if (evalRes.success && evalRes.result !== undefined) {
          setResult(formatResultNumber(evalRes.result, settings.precision, settings.thousandsSeparator));
        }
      } catch {}
    }
  }, [settings.angleUnit, settings.precision, settings.thousandsSeparator]);

  // Re-evaluate preview or result when angleUnit or formatting changes
  useEffect(() => {
    if (expression.trim() && !isEvaluated) {
      const evalRes = evaluateExpression(expression, settings.angleUnit);
      if (evalRes.success && evalRes.result !== undefined) {
        setResult(formatResultNumber(evalRes.result, settings.precision, settings.thousandsSeparator));
      }
    }
  }, [expression, settings.angleUnit, settings.precision, settings.thousandsSeparator, isEvaluated]);

  const playSound = useCallback((type: 'digit' | 'operator' | 'action' = 'digit') => {
    playClickSound(settings.soundEnabled, type);
  }, [settings.soundEnabled]);

  const inputDigit = useCallback((digit: string) => {
    playSound('digit');
    setError(null);

    setExpression((prev) => {
      if (isEvaluated) {
        setIsEvaluated(false);
        return digit;
      }
      return prev + digit;
    });
  }, [isEvaluated, playSound]);

  const inputOperator = useCallback((op: string) => {
    playSound('operator');
    setError(null);

    setExpression((prev) => {
      setIsEvaluated(false);

      if (!prev) {
        if (op === '-') return '-';
        return `0 ${op} `;
      }

      const trimmed = prev.trimEnd();
      const lastChar = trimmed.slice(-1);

      // If last char is already an operator, replace it
      if (['+', '-', '*', '/', '^'].includes(lastChar)) {
        // Allow negative after operator (e.g. 5 * -)
        if (op === '-' && lastChar !== '-') {
          return `${trimmed} -`;
        }
        return `${trimmed.slice(0, -1)} ${op} `;
      }

      return `${trimmed} ${op} `;
    });
  }, [playSound]);

  const inputDecimal = useCallback(() => {
    playSound('digit');
    setError(null);

    setExpression((prev) => {
      if (isEvaluated) {
        setIsEvaluated(false);
        return '0.';
      }

      // Check current number segment
      const parts = prev.split(/[\s+\-*/^()]+/);
      const currentNumber = parts[parts.length - 1] || '';

      if (currentNumber.includes('.')) {
        return prev;
      }

      if (!prev || /[\s+\-*/^(]$/.test(prev)) {
        return prev + '0.';
      }

      return prev + '.';
    });
  }, [isEvaluated, playSound]);

  const inputParenthesis = useCallback((paren: '(' | ')') => {
    playSound('operator');
    setError(null);

    setExpression((prev) => {
      if (isEvaluated) {
        setIsEvaluated(false);
        return paren === '(' ? '(' : `(${result})`;
      }

      if (paren === '(') {
        // If preceding is a number or closing paren, add implicit multiplication
        if (/(\d|\))$/.test(prev.trimEnd())) {
          return `${prev} * (`;
        }
        return `${prev}(`;
      } else {
        // Count unclosed parens
        const open = (prev.match(/\(/g) || []).length;
        const close = (prev.match(/\)/g) || []).length;
        if (open > close) {
          return `${prev})`;
        }
        return prev;
      }
    });
  }, [isEvaluated, result, playSound]);

  const inputPercentage = useCallback(() => {
    playSound('operator');
    setError(null);

    setExpression((prev) => {
      if (!prev) return '0%';
      return `${prev}%`;
    });
  }, [playSound]);

  const toggleSign = useCallback(() => {
    playSound('action');
    setError(null);

    setExpression((prev) => {
      if (!prev) return '-';

      // Find the last number token
      const match = prev.match(/(-?\d+(\.\d+)?)$/);
      if (match) {
        const lastNum = match[0];
        const index = match.index!;
        const flipped = lastNum.startsWith('-') ? lastNum.slice(1) : `-${lastNum}`;
        return prev.slice(0, index) + flipped;
      }

      return prev;
    });
  }, [playSound]);

  const inputScientificFunction = useCallback((fn: string) => {
    playSound('operator');
    setError(null);

    setExpression((prev) => {
      if (isEvaluated) {
        setIsEvaluated(false);
        if (fn === 'sqr') return `(${result})^2`;
        if (fn === 'cube') return `(${result})^3`;
        if (fn === 'inv') return `1 / (${result})`;
        if (fn === 'fact') return `(${result})!`;
        return `${fn}(${result})`;
      }

      if (fn === 'pi') {
        const preceding = /(\d|\))$/.test(prev.trimEnd());
        return preceding ? `${prev} * π` : `${prev}π`;
      }
      if (fn === 'e') {
        const preceding = /(\d|\))$/.test(prev.trimEnd());
        return preceding ? `${prev} * e` : `${prev}e`;
      }
      if (fn === 'sqr') return prev ? `(${prev})^2` : '0^2';
      if (fn === 'cube') return prev ? `(${prev})^3` : '0^3';
      if (fn === 'inv') return prev ? `1 / (${prev})` : '1 / ';
      if (fn === 'fact') return prev ? `${prev}!` : '0!';
      if (fn === 'sqrt') return `${prev}sqrt(`;
      if (fn === 'pow') return `${prev}^`;

      // Standard prefix functions: sin, cos, tan, log (ln), log10
      return `${prev}${fn}(`;
    });
  }, [isEvaluated, result, playSound]);

  const backspace = useCallback(() => {
    playSound('action');
    setError(null);

    setExpression((prev) => {
      if (isEvaluated) {
        setIsEvaluated(false);
        return '';
      }
      if (!prev) return '';

      // Check if ending with a function like "sin(" or "sqrt("
      const funcMatch = prev.match(/(sin|cos|tan|asin|acos|atan|sqrt|log10|log)\($/);
      if (funcMatch) {
        return prev.slice(0, -funcMatch[0].length);
      }

      // Check if ending with operator with spaces e.g. " + "
      if (prev.endsWith(' ')) {
        const trimmed = prev.trimEnd();
        return trimmed.slice(0, -1).trimEnd();
      }

      return prev.slice(0, -1);
    });
  }, [isEvaluated, playSound]);

  const clearAll = useCallback(() => {
    playSound('action');
    setExpression('');
    setResult('0');
    setError(null);
    setIsEvaluated(false);
  }, [playSound]);

  const clearEntry = useCallback(() => {
    playSound('action');
    // Clear only current number token
    setExpression((prev) => {
      const match = prev.match(/(\d+(\.\d+)?|[a-zA-Z]+\()?$/);
      if (match && match.index !== undefined) {
        return prev.slice(0, match.index);
      }
      return '';
    });
    setError(null);
  }, [playSound]);

  const calculate = useCallback(() => {
    playSound('action');
    if (!expression.trim()) return;

    const evaluation = evaluateExpression(expression, settings.angleUnit);

    if (evaluation.success && evaluation.result !== undefined) {
      const formatted = formatResultNumber(
        evaluation.result,
        settings.precision,
        settings.thousandsSeparator
      );
      setResult(formatted);
      setError(null);
      setIsEvaluated(true);

      if (onCalculationComplete) {
        onCalculationComplete(expression, formatted);
      }
    } else {
      setError(evaluation.error || 'Invalid expression.');
    }
  }, [expression, settings, onCalculationComplete, playSound]);

  // Memory operations
  const memoryClear = useCallback(() => {
    playSound('action');
    setMemory(0);
  }, [playSound]);

  const memoryRecall = useCallback(() => {
    playSound('digit');
    setError(null);
    setExpression((prev) => {
      const memStr = memory.toString();
      if (isEvaluated) {
        setIsEvaluated(false);
        return memStr;
      }
      return prev + memStr;
    });
  }, [memory, isEvaluated, playSound]);

  const memoryAdd = useCallback(() => {
    playSound('action');
    const currNum = parseFloat(result.replace(/,/g, ''));
    if (!isNaN(currNum)) {
      setMemory((prev) => prev + currNum);
    }
  }, [result, playSound]);

  const memorySubtract = useCallback(() => {
    playSound('action');
    const currNum = parseFloat(result.replace(/,/g, ''));
    if (!isNaN(currNum)) {
      setMemory((prev) => prev - currNum);
    }
  }, [result, playSound]);

  const memoryStore = useCallback(() => {
    playSound('action');
    const currNum = parseFloat(result.replace(/,/g, ''));
    if (!isNaN(currNum)) {
      setMemory(currNum);
    }
  }, [result, playSound]);

  const setExpressionDirectly = useCallback((expr: string) => {
    setExpression(expr);
    setError(null);
    setIsEvaluated(false);
    const evalRes = evaluateExpression(expr, settings.angleUnit);
    if (evalRes.success && evalRes.result !== undefined) {
      setResult(formatResultNumber(evalRes.result, settings.precision, settings.thousandsSeparator));
    }
  }, [settings]);

  return {
    expression,
    result,
    error,
    isEvaluated,
    mode,
    setMode,
    memory,
    settings,
    setSettings,
    inputDigit,
    inputOperator,
    inputDecimal,
    inputParenthesis,
    inputPercentage,
    toggleSign,
    inputScientificFunction,
    backspace,
    clearAll,
    clearEntry,
    calculate,
    memoryClear,
    memoryRecall,
    memoryAdd,
    memorySubtract,
    memoryStore,
    setExpressionDirectly,
  };
}
