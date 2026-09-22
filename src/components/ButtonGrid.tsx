import React from 'react';
import { Delete } from 'lucide-react';
import { CalculatorButton } from './CalculatorButton';

interface ButtonGridProps {
  onDigit: (digit: string) => void;
  onOperator: (operator: string) => void;
  onDecimal: () => void;
  onClearAll: () => void;
  onToggleSign: () => void;
  onPercentage: () => void;
  onBackspace: () => void;
  onCalculate: () => void;
  hasInput: boolean;
}

export const ButtonGrid: React.FC<ButtonGridProps> = ({
  onDigit,
  onOperator,
  onDecimal,
  onClearAll,
  onToggleSign,
  onPercentage,
  onBackspace,
  onCalculate,
  hasInput,
}) => {
  return (
    <div id="basic-keypad-grid" className="grid grid-cols-4 gap-1.5 sm:gap-2 w-full">
      {/* Row 1: AC, ±, %, ÷ */}
      <CalculatorButton
        id="btn-clear-all"
        label={hasInput ? 'C' : 'AC'}
        variant="clear"
        onClick={onClearAll}
        ariaLabel={hasInput ? 'Clear current entry' : 'Clear all'}
        shortcut="Escape"
      />
      <CalculatorButton
        id="btn-toggle-sign"
        label="±"
        variant="function"
        onClick={onToggleSign}
        ariaLabel="Plus minus toggle sign"
      />
      <CalculatorButton
        id="btn-percent"
        label="%"
        variant="function"
        onClick={onPercentage}
        ariaLabel="Percentage"
        shortcut="%"
      />
      <CalculatorButton
        id="btn-operator-divide"
        label="÷"
        variant="operator"
        onClick={() => onOperator('/')}
        ariaLabel="Divide"
        shortcut="/"
      />

      {/* Row 2: 7, 8, 9, × */}
      <CalculatorButton
        id="btn-num-7"
        label="7"
        variant="number"
        onClick={() => onDigit('7')}
        ariaLabel="Seven"
        shortcut="7"
      />
      <CalculatorButton
        id="btn-num-8"
        label="8"
        variant="number"
        onClick={() => onDigit('8')}
        ariaLabel="Eight"
        shortcut="8"
      />
      <CalculatorButton
        id="btn-num-9"
        label="9"
        variant="number"
        onClick={() => onDigit('9')}
        ariaLabel="Nine"
        shortcut="9"
      />
      <CalculatorButton
        id="btn-operator-multiply"
        label="×"
        variant="operator"
        onClick={() => onOperator('*')}
        ariaLabel="Multiply"
        shortcut="*"
      />

      {/* Row 3: 4, 5, 6, − */}
      <CalculatorButton
        id="btn-num-4"
        label="4"
        variant="number"
        onClick={() => onDigit('4')}
        ariaLabel="Four"
        shortcut="4"
      />
      <CalculatorButton
        id="btn-num-5"
        label="5"
        variant="number"
        onClick={() => onDigit('5')}
        ariaLabel="Five"
        shortcut="5"
      />
      <CalculatorButton
        id="btn-num-6"
        label="6"
        variant="number"
        onClick={() => onDigit('6')}
        ariaLabel="Six"
        shortcut="6"
      />
      <CalculatorButton
        id="btn-operator-subtract"
        label="−"
        variant="operator"
        onClick={() => onOperator('-')}
        ariaLabel="Subtract"
        shortcut="-"
      />

      {/* Row 4: 1, 2, 3, + */}
      <CalculatorButton
        id="btn-num-1"
        label="1"
        variant="number"
        onClick={() => onDigit('1')}
        ariaLabel="One"
        shortcut="1"
      />
      <CalculatorButton
        id="btn-num-2"
        label="2"
        variant="number"
        onClick={() => onDigit('2')}
        ariaLabel="Two"
        shortcut="2"
      />
      <CalculatorButton
        id="btn-num-3"
        label="3"
        variant="number"
        onClick={() => onDigit('3')}
        ariaLabel="Three"
        shortcut="3"
      />
      <CalculatorButton
        id="btn-operator-add"
        label="+"
        variant="operator"
        onClick={() => onOperator('+')}
        ariaLabel="Add"
        shortcut="+"
      />

      {/* Row 5: 0, ., ⌫, = */}
      <CalculatorButton
        id="btn-num-0"
        label="0"
        variant="number"
        onClick={() => onDigit('0')}
        ariaLabel="Zero"
        shortcut="0"
      />
      <CalculatorButton
        id="btn-decimal-point"
        label="."
        variant="number"
        onClick={onDecimal}
        ariaLabel="Decimal point"
        shortcut="."
      />
      <CalculatorButton
        id="btn-backspace"
        label={<Delete className="w-5 h-5" />}
        variant="function"
        onClick={onBackspace}
        ariaLabel="Backspace delete last character"
        shortcut="Backspace"
      />
      <CalculatorButton
        id="btn-calculate-equals"
        label="="
        variant="equals"
        onClick={onCalculate}
        ariaLabel="Calculate result"
        shortcut="Enter"
      />
    </div>
  );
};
