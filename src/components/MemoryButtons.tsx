import React from 'react';
import { CalculatorButton } from './CalculatorButton';

interface MemoryButtonsProps {
  memory: number;
  onClear: () => void;
  onRecall: () => void;
  onAdd: () => void;
  onSubtract: () => void;
  onStore: () => void;
}

export const MemoryButtons: React.FC<MemoryButtonsProps> = ({
  memory,
  onClear,
  onRecall,
  onAdd,
  onSubtract,
  onStore,
}) => {
  const hasMemory = memory !== 0;

  return (
    <div id="calculator-memory-buttons" className="grid grid-cols-5 gap-1.5 sm:gap-2 w-full">
      <CalculatorButton
        id="btn-memory-clear"
        label="MC"
        variant="memory"
        onClick={onClear}
        disabled={!hasMemory}
        ariaLabel="Memory Clear"
        shortcut="Alt+C"
      />
      <CalculatorButton
        id="btn-memory-recall"
        label="MR"
        variant="memory"
        onClick={onRecall}
        disabled={!hasMemory}
        ariaLabel="Memory Recall"
        shortcut="Alt+R"
      />
      <CalculatorButton
        id="btn-memory-add"
        label="M+"
        variant="memory"
        onClick={onAdd}
        ariaLabel="Memory Add"
        shortcut="Alt+Plus"
      />
      <CalculatorButton
        id="btn-memory-subtract"
        label="M−"
        variant="memory"
        onClick={onSubtract}
        ariaLabel="Memory Subtract"
        shortcut="Alt+Minus"
      />
      <CalculatorButton
        id="btn-memory-store"
        label="MS"
        variant="memory"
        onClick={onStore}
        ariaLabel="Memory Store"
        shortcut="Alt+M"
      />
    </div>
  );
};
