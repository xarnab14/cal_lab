import { useState, useEffect, useCallback } from 'react';
import { HistoryItem } from '../types';

const HISTORY_STORAGE_KEY = 'calclab_history';
const MAX_HISTORY_ITEMS = 50;

export function useHistory() {
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    try {
      const stored = localStorage.getItem(HISTORY_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {}
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
    } catch {}
  }, [history]);

  const addHistoryItem = useCallback((expression: string, result: string) => {
    if (!expression || !result) return;
    const newItem: HistoryItem = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      expression,
      result,
      timestamp: Date.now(),
    };

    setHistory((prev) => [newItem, ...prev.slice(0, MAX_HISTORY_ITEMS - 1)]);
  }, []);

  const deleteHistoryItem = useCallback((id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    try {
      localStorage.removeItem(HISTORY_STORAGE_KEY);
    } catch {}
  }, []);

  return {
    history,
    addHistoryItem,
    deleteHistoryItem,
    clearHistory,
  };
}
