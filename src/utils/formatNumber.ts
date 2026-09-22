/**
 * Formatting utilities for numbers and mathematical expressions
 */

export function formatResultNumber(
  value: number | string,
  precision: number | 'auto' = 'auto',
  useThousands = true
): string {
  if (typeof value === 'string') {
    const parsed = Number(value);
    if (isNaN(parsed)) return value;
    value = parsed;
  }

  if (!isFinite(value)) {
    if (isNaN(value)) return 'Error';
    return value > 0 ? 'Infinity' : '-Infinity';
  }

  // Very large or very small numbers (except zero)
  const abs = Math.abs(value);
  if (abs !== 0 && (abs >= 1e15 || abs < 1e-7)) {
    return value.toExponential(6).replace(/\+/, '');
  }

  let formatted: string;
  if (precision === 'auto') {
    // Round to max 10 decimal digits to eliminate floating point glitches (e.g., 0.1 + 0.2 = 0.30000000000000004)
    const factor = 1e10;
    const rounded = Math.round(value * factor) / factor;
    formatted = rounded.toString();
  } else {
    formatted = value.toFixed(precision);
  }

  if (!useThousands) return formatted;

  // Split integer and decimal parts
  const parts = formatted.split('.');
  const intPart = parts[0];
  const decPart = parts.length > 1 ? '.' + parts[1] : '';

  // Add commas to integer part
  const withCommas = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return withCommas + decPart;
}

export function formatExpressionForDisplay(expr: string): string {
  if (!expr) return '';
  return expr
    .replace(/\*/g, ' × ')
    .replace(/\//g, ' ÷ ')
    .replace(/\+/g, ' + ')
    .replace(/(?<=\S)-(?=\S)/g, ' − ')
    .replace(/\^/g, ' ^ ')
    .replace(/\s+/g, ' ')
    .trim();
}
