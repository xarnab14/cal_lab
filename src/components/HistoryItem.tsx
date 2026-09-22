import React, { useState } from 'react';
import { Copy, Check, Trash2, ArrowUpRight } from 'lucide-react';
import { HistoryItem as HistoryItemType } from '../types';
import { formatExpressionForDisplay } from '../utils/formatNumber';

interface HistoryItemProps {
  item: HistoryItemType;
  onReuse: (expression: string) => void;
  onDelete: (id: string) => void;
}

export const HistoryItem: React.FC<HistoryItemProps> = ({ item, onReuse, onDelete }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(item.result);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(item.id);
  };

  const formatTime = (ts: number) => {
    const diff = Math.floor((Date.now() - ts) / 1000);
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div
      id={`history-item-${item.id}`}
      onClick={() => onReuse(item.expression)}
      className="group relative flex flex-col p-3 rounded-xl bg-zinc-900/60 dark:bg-zinc-900/70 hover:bg-zinc-800/80 border border-zinc-700/30 dark:border-white/5 transition-all duration-150 cursor-pointer text-left"
    >
      <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
        <span className="font-mono truncate max-w-[170px]">
          {formatExpressionForDisplay(item.expression)}
        </span>
        <span className="text-[10px] text-zinc-400 opacity-80 shrink-0">
          {formatTime(item.timestamp)}
        </span>
      </div>

      <div className="flex items-center justify-between mt-0.5">
        <span className="text-lg font-semibold font-mono text-zinc-100 tracking-tight group-hover:text-indigo-300 transition-colors">
          = {item.result}
        </span>

        {/* Action icons */}
        <div className="flex items-center gap-1 opacity-80 sm:opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            type="button"
            onClick={() => onReuse(item.expression)}
            title="Reuse expression"
            aria-label="Reuse expression"
            className="p-1.5 rounded-lg text-zinc-400 hover:text-indigo-300 hover:bg-zinc-700/60 transition-colors"
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleCopy}
            title="Copy result"
            aria-label="Copy result"
            className="p-1.5 rounded-lg text-zinc-400 hover:text-emerald-300 hover:bg-zinc-700/60 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <button
            type="button"
            onClick={handleDelete}
            title="Delete item"
            aria-label="Delete history item"
            className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-300 hover:bg-zinc-700/60 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
