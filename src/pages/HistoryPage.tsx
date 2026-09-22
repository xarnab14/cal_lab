import React, { useState } from 'react';
import { History as HistoryIcon, Trash2, Search, ArrowLeft, ArrowUpRight } from 'lucide-react';
import { HistoryItem } from '../types';
import { HistoryItem as HistoryItemCard } from '../components/HistoryItem';

interface HistoryPageProps {
  history: HistoryItem[];
  onReuseHistory: (expression: string) => void;
  onDeleteHistoryItem: (id: string) => void;
  onClearHistory: () => void;
  onBackToCalculator: () => void;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({
  history,
  onReuseHistory,
  onDeleteHistoryItem,
  onClearHistory,
  onBackToCalculator,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredHistory = history.filter((item) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      item.expression.toLowerCase().includes(query) ||
      item.result.toLowerCase().includes(query)
    );
  });

  return (
    <div id="history-page-root" className="w-full max-w-4xl mx-auto py-6 sm:py-10 px-4">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <button
            type="button"
            onClick={onBackToCalculator}
            className="inline-flex items-center gap-1 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Calculator</span>
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <HistoryIcon className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                Calculation History
              </h1>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                All saved equations and results stored locally in your browser
              </p>
            </div>
          </div>
        </div>

        {/* Clear All action */}
        {history.length > 0 && (
          <button
            id="history-page-clear-all-btn"
            type="button"
            onClick={onClearHistory}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-300 bg-rose-50 dark:bg-rose-500/10 hover:bg-rose-100 dark:hover:bg-rose-500/20 border border-rose-200 dark:border-rose-500/20 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear History</span>
          </button>
        )}
      </div>

      {/* Search and Filters */}
      {history.length > 0 && (
        <div className="mt-6 mb-4 relative">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            id="history-search-input"
            type="text"
            placeholder="Search calculations by expression or result..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 transition-all"
          />
        </div>
      )}

      {/* History Items Grid */}
      <div className="mt-4">
        {filteredHistory.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center bg-white dark:bg-zinc-900/40 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 p-8">
            <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 mb-3">
              <HistoryIcon className="w-6 h-6" />
            </div>
            <h3 className="text-base font-semibold text-zinc-800 dark:text-zinc-200">
              {searchQuery ? 'No matching calculations' : 'No calculations yet'}
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 max-w-sm">
              {searchQuery
                ? 'Try a different query or clear the search input.'
                : 'Perform calculations in the calculator and press = to see them archived here.'}
            </p>
            <button
              type="button"
              onClick={onBackToCalculator}
              className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors"
            >
              <span>Go to Calculator</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredHistory.map((item) => (
              <HistoryItemCard
                key={item.id}
                item={item}
                onReuse={(expr) => {
                  onReuseHistory(expr);
                  onBackToCalculator();
                }}
                onDelete={onDeleteHistoryItem}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
