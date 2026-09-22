import { create, all } from 'mathjs';
import { AngleUnit } from '../types';

// Create a safe mathjs instance
const math = create(all, {});

export interface EvaluationResult {
  success: boolean;
  result?: number;
  formattedResult?: string;
  error?: string;
}

/**
 * Preprocesses a raw calculator expression string into a valid mathjs expression
 */
export function sanitizeAndPrepareExpression(rawExpr: string, angleUnit: AngleUnit): string {
  let expr = rawExpr.trim();

  if (!expr) return '';

  // Replace display symbols with mathjs compatible operators
  expr = expr
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/−/g, '-')
    .replace(/π/g, 'pi')
    .replace(/e(?![a-zA-Z0-9])/g, 'e');

  // Handle percentages: convert e.g., "50%" into "(50/100)"
  expr = expr.replace(/(\d+(\.\d+)?)%/g, '($1 / 100)');

  // Handle factorial symbol "!" if typed
  expr = expr.replace(/(\d+)!/g, 'factorial($1)');

  // Automatically close unclosed parentheses
  const openParens = (expr.match(/\(/g) || []).length;
  const closeParens = (expr.match(/\)/g) || []).length;
  if (openParens > closeParens) {
    expr += ')'.repeat(openParens - closeParens);
  }

  return expr;
}

/**
 * Safely evaluates a mathematical expression with customizable angle units (deg/rad)
 */
export function evaluateExpression(rawExpr: string, angleUnit: AngleUnit = 'deg'): EvaluationResult {
  try {
    const sanitized = sanitizeAndPrepareExpression(rawExpr, angleUnit);
    if (!sanitized) {
      return { success: true, result: 0 };
    }

    // Custom scope for trigonometric degrees support
    const scope: Record<string, any> = {};

    if (angleUnit === 'deg') {
      scope.sin = (x: number) => {
        // Normalize angle to avoid precision artifacts like sin(180) != 0
        const rad = (x * Math.PI) / 180;
        const val = Math.sin(rad);
        return Math.abs(val) < 1e-15 ? 0 : val;
      };
      scope.cos = (x: number) => {
        const rad = (x * Math.PI) / 180;
        const val = Math.cos(rad);
        return Math.abs(val) < 1e-15 ? 0 : val;
      };
      scope.tan = (x: number) => {
        // Handle undefined tangent at 90, 270 deg
        const normalized = ((x % 360) + 360) % 360;
        if (Math.abs(normalized - 90) < 1e-9 || Math.abs(normalized - 270) < 1e-9) {
          throw new Error('Division by zero in tan');
        }
        const rad = (x * Math.PI) / 180;
        const val = Math.tan(rad);
        return Math.abs(val) < 1e-15 ? 0 : val;
      };
      scope.asin = (x: number) => (Math.asin(x) * 180) / Math.PI;
      scope.acos = (x: number) => (Math.acos(x) * 180) / Math.PI;
      scope.atan = (x: number) => (Math.atan(x) * 180) / Math.PI;
    }

    // Evaluate safely with mathjs
    const evaluated = math.evaluate(sanitized, scope);

    // If evaluated is a complex number
    if (typeof evaluated === 'object' && evaluated !== null && 'isComplex' in evaluated) {
      return {
        success: false,
        error: 'Complex numbers not supported',
      };
    }

    const num = Number(evaluated);

    if (isNaN(num)) {
      return {
        success: false,
        error: 'Invalid expression.',
      };
    }

    if (!isFinite(num)) {
      return {
        success: false,
        error: 'Cannot divide by zero.',
      };
    }

    if (Math.abs(num) > 1e160) {
      return {
        success: false,
        error: 'Number exceeds supported range.',
      };
    }

    return {
      success: true,
      result: num,
    };
  } catch (err: any) {
    const message = err?.message || '';
    if (message.includes('Division by zero')) {
      return { success: false, error: 'Cannot divide by zero.' };
    }
    if (message.includes('Parenthesis') || message.includes('Unexpected') || message.includes('SyntaxError')) {
      return { success: false, error: 'Invalid expression.' };
    }
    return {
      success: false,
      error: 'Invalid expression.',
    };
  }
}
