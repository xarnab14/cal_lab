import React from 'react';
import { X, Keyboard, Command } from 'lucide-react';

interface KeyboardHelpProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ShortcutCategory {
  title: string;
  items: { key: string; description: string }[];
}

export const KeyboardHelp: React.FC<KeyboardHelpProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const categories: ShortcutCategory[] = [
    {
      title: 'Numbers & Operators',
      items: [
        { key: '0 – 9', description: 'Enter numbers' },
        { key: '+', description: 'Addition' },
        { key: '-', description: 'Subtraction' },
        { key: '*', description: 'Multiplication (×)' },
        { key: '/', description: 'Division (÷)' },
        { key: '.', description: 'Decimal point' },
        { key: '%', description: 'Percentage' },
        { key: '^', description: 'Exponentiation (xʸ)' },
      ],
    },
    {
      title: 'Calculation Actions',
      items: [
        { key: 'Enter / =', description: 'Calculate result' },
        { key: 'Backspace', description: 'Delete previous character' },
        { key: 'Escape', description: 'Clear all (AC)' },
        { key: '( and )', description: 'Grouping parentheses' },
      ],
    },
    {
      title: 'Scientific Shortcuts',
      items: [
        { key: 'p', description: 'Pi (π) constant' },
        { key: 'e', description: "Euler's constant (e)" },
        { key: '!', description: 'Factorial (n!)' },
        { key: 's', description: 'Sine function (sin)' },
        { key: 'c', description: 'Cosine function (cos)' },
        { key: 't', description: 'Tangent function (tan)' },
      ],
    },
    {
      title: 'Memory Shortcuts',
      items: [
        { key: 'Alt + C', description: 'Memory Clear (MC)' },
        { key: 'Alt + R', description: 'Memory Recall (MR)' },
        { key: 'Alt + Plus', description: 'Memory Add (M+)' },
        { key: 'Alt + Minus', description: 'Memory Subtract (M−)' },
        { key: 'Alt + M', description: 'Memory Store (MS)' },
      ],
    },
  ];

  return (
    <div
      id="keyboard-shortcuts-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg max-h-[85vh] flex flex-col rounded-2xl bg-zinc-900 border border-zinc-700/80 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
              <Keyboard className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-zinc-100">Keyboard Shortcuts</h2>
              <p className="text-xs text-zinc-400">Full keyboard input is supported natively</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close shortcuts dialog"
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {categories.map((cat, idx) => (
            <div key={idx}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-indigo-300 mb-3">
                {cat.title}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {cat.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2 rounded-lg bg-zinc-800/60 border border-white/5 text-xs"
                  >
                    <span className="text-zinc-300">{item.description}</span>
                    <kbd className="px-2 py-0.5 rounded bg-zinc-950 font-mono font-medium text-indigo-300 border border-zinc-700 shadow-xs text-[11px]">
                      {item.key}
                    </kbd>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-zinc-950/60 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
          <div className="flex items-center gap-1.5">
            <Command className="w-3.5 h-3.5 text-zinc-400" />
            <span>Press Esc anytime to dismiss</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
