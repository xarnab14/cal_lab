import React from 'react';
import { CalculatorButton } from './CalculatorButton';
import { AngleUnit } from '../types';

interface ScientificPanelProps {
  onFunction: (fn: string) => void;
  onParenthesis: (p: '(' | ')') => void;
  angleUnit: AngleUnit;
  onToggleAngleUnit: () => void;
}

export const ScientificPanel: React.FC<ScientificPanelProps> = ({
  onFunction,
  onParenthesis,
  angleUnit,
  onToggleAngleUnit,
}) => {
  return (
    <div id="scientific-keypad-panel" className="grid grid-cols-4 sm:grid-cols-4 gap-1.5 sm:gap-2 w-full">
      {/* Row 1 */}
      <CalculatorButton
        id="btn-sci-angle-mode"
        label={angleUnit.toUpperCase()}
        subLabel="DEG/RAD"
        variant="scientific"
        onClick={onToggleAngleUnit}
        ariaLabel={`Toggle angle mode, current: ${angleUnit}`}
        className="text-indigo-400 font-semibold"
      />
      <CalculatorButton
        id="btn-sci-sin"
        label="sin"
        variant="scientific"
        onClick={() => onFunction('sin')}
        ariaLabel="Sine"
      />
      <CalculatorButton
        id="btn-sci-cos"
        label="cos"
        variant="scientific"
        onClick={() => onFunction('cos')}
        ariaLabel="Cosine"
      />
      <CalculatorButton
        id="btn-sci-tan"
        label="tan"
        variant="scientific"
        onClick={() => onFunction('tan')}
        ariaLabel="Tangent"
      />

      {/* Row 2 */}
      <CalculatorButton
        id="btn-sci-ln"
        label="ln"
        variant="scientific"
        onClick={() => onFunction('log')}
        ariaLabel="Natural Logarithm"
      />
      <CalculatorButton
        id="btn-sci-log"
        label="log"
        variant="scientific"
        onClick={() => onFunction('log10')}
        ariaLabel="Logarithm base 10"
      />
      <CalculatorButton
        id="btn-sci-paren-open"
        label="("
        variant="scientific"
        onClick={() => onParenthesis('(')}
        ariaLabel="Open parenthesis"
        shortcut="("
      />
      <CalculatorButton
        id="btn-sci-paren-close"
        label=")"
        variant="scientific"
        onClick={() => onParenthesis(')')}
        ariaLabel="Close parenthesis"
        shortcut=")"
      />

      {/* Row 3 */}
      <CalculatorButton
        id="btn-sci-sqrt"
        label="√x"
        variant="scientific"
        onClick={() => onFunction('sqrt')}
        ariaLabel="Square Root"
      />
      <CalculatorButton
        id="btn-sci-sqr"
        label="x²"
        variant="scientific"
        onClick={() => onFunction('sqr')}
        ariaLabel="Square"
      />
      <CalculatorButton
        id="btn-sci-pow"
        label="xʸ"
        variant="scientific"
        onClick={() => onFunction('pow')}
        ariaLabel="Power x to y"
        shortcut="^"
      />
      <CalculatorButton
        id="btn-sci-fact"
        label="n!"
        variant="scientific"
        onClick={() => onFunction('fact')}
        ariaLabel="Factorial"
        shortcut="!"
      />

      {/* Row 4 */}
      <CalculatorButton
        id="btn-sci-pi"
        label="π"
        variant="scientific"
        onClick={() => onFunction('pi')}
        ariaLabel="Pi constant"
        shortcut="p"
      />
      <CalculatorButton
        id="btn-sci-e"
        label="e"
        variant="scientific"
        onClick={() => onFunction('e')}
        ariaLabel="Euler's number constant"
        shortcut="e"
      />
      <CalculatorButton
        id="btn-sci-inv"
        label="1/x"
        variant="scientific"
        onClick={() => onFunction('inv')}
        ariaLabel="Reciprocal"
      />
      <CalculatorButton
        id="btn-sci-cube"
        label="x³"
        variant="scientific"
        onClick={() => onFunction('cube')}
        ariaLabel="Cube"
      />
    </div>
  );
};
