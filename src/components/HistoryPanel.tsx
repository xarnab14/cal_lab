import React from 'react';
import { Trash2, History as HistoryIcon, X } from 'lucide-react';
import { HistoryItem as HistoryItemType } from '../types';
import { HistoryItem } from './HistoryItem';

interface HistoryPanelProps {
  history: HistoryItemType[];
  onReuse: (expression: string) => void;
  onDelete: (id: string) => void;
  onClearAll: () => void;
  onClose?: () => void;
  isDrawer?: boolean;
}

export const HistoryPanel: React.FC<HistoryPanelProps> = ({
  history,
  onReuse,
  onDelete,
  onClearAll,
  onClose,
  isDrawer = false,
}) => {
  return (
    <div
      id="history-panel-root"
      className={`flex flex-col h-full bg-zinc-900/90 dark:bg-zinc-950/80 backdrop-blur-md rounded-2xl border border-zinc-800/80 dark:border-white/10 p-4 shadow-xl ${
        isDrawer ? 'w-full' : 'w-full'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-800/80 dark:border-white/5">
        <div className="flex items-center gap-2">
          <HistoryIcon className="w-4 h-4 text-indigo-400" />
          <h2 className="text-sm font-semibold text-zinc-100 tracking-wide">
            Calculation History
          </h2>
          {history.length > 0 && (
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-500/20">
              {history.length}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1">
          {history.length > 0 && (
            <button
              id="clear-all-history-button"
              type="button"
              onClick={onClearAll}
              title="Clear all history"
              aria-label="Clear all calculation history"
              className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-rose-300 hover:text-rose-200 hover:bg-rose-500/15 rounded-lg border border-rose-500/20 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          )}
          {onClose && (
            <button
              id="close-history-panel-button"
              type="button"
              onClick={onClose}
              title="Close panel"
              aria-label="Close history panel"
              className="p-1.5 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* History Items List */}
      <div
        id="history-items-container"
        className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar min-h-[160px] max-h-[500px]"
      >
        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full py-12 text-center text-zinc-400">
            <div className="w-10 h-10 rounded-full bg-zinc-800/60 flex items-center justify-center mb-3">
              <HistoryIcon className="w-5 h-5 text-zinc-400" />
            </div>
            <p className="text-sm font-medium text-zinc-300">No calculations yet</p>
            <p className="text-xs text-zinc-400 mt-1 max-w-[200px]">
              Perform a calculation and press '=' to save expressions to history.
            </p>
          </div>
        ) : (
          history.map((item) => (
            <HistoryItem
              key={item.id}
              item={item}
              onReuse={(expr) => {
                onReuse(expr);
                if (onClose) onClose();
              }}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  );
};
