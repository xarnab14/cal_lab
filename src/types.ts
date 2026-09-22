export type CalculatorMode = 'basic' | 'scientific';

export type AngleUnit = 'deg' | 'rad';

export type Theme = 'light' | 'dark' | 'system';

export interface HistoryItem {
  id: string;
  expression: string;
  result: string;
  timestamp: number;
}

export interface CalculatorSettings {
  angleUnit: AngleUnit;
  precision: number | 'auto';
  thousandsSeparator: boolean;
  soundEnabled: boolean;
}

export interface ButtonConfig {
  id: string;
  label: string;
  subLabel?: string;
  action: () => void;
  type?: 'number' | 'operator' | 'function' | 'equals' | 'clear' | 'memory' | 'scientific';
  ariaLabel: string;
  className?: string;
  active?: boolean;
  shortcut?: string;
}
