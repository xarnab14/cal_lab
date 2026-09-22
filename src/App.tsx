import { useState, useCallback } from 'react';
import { Navbar, NavTab } from './components/Navbar';
import { CalculatorPage } from './pages/CalculatorPage';
import { HistoryPage } from './pages/HistoryPage';
import { AboutPage } from './pages/AboutPage';
import { KeyboardHelp } from './components/KeyboardHelp';
import { SettingsModal } from './components/SettingsModal';
import { ToastContainer, ToastMessage } from './components/Toast';
import { useTheme } from './hooks/useTheme';
import { useHistory } from './hooks/useHistory';
import { useCalculator } from './hooks/useCalculator';

export default function App() {
  const { theme, setTheme } = useTheme();
  const { history, addHistoryItem, deleteHistoryItem, clearHistory } = useHistory();

  const [activeTab, setActiveTab] = useState<NavTab>('calculator');
  const [isKeyboardHelpOpen, setIsKeyboardHelpOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Toast dispatcher
  const showToast = useCallback((text: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Calculator custom hook with history callback
  const {
    expression,
    result,
    error,
    memory,
    mode,
    setMode,
    settings,
    setSettings,
    inputDigit,
    inputOperator,
    inputDecimal,
    inputParenthesis,
    inputPercentage,
    toggleSign,
    inputScientificFunction,
    backspace,
    clearAll,
    calculate,
    memoryClear,
    memoryRecall,
    memoryAdd,
    memorySubtract,
    memoryStore,
    setExpressionDirectly,
  } = useCalculator((expr, res) => {
    addHistoryItem(expr, res);
  });

  // Handle tab navigation
  const handleSelectTab = (tab: NavTab) => {
    setActiveTab(tab);
    if (tab === 'scientific') {
      setMode('scientific');
    } else if (tab === 'calculator') {
      setMode('basic');
    }
  };

  // Share calculation URL generator
  const handleShareCalculation = async () => {
    const exprToShare = expression.trim() || result;
    if (!exprToShare || exprToShare === '0') {
      showToast('Enter a calculation to share', 'info');
      return;
    }

    try {
      const url = new URL(window.location.href);
      url.searchParams.set('calc', exprToShare);
      await navigator.clipboard.writeText(url.toString());
      showToast('Shareable link copied to clipboard!');
    } catch {
      showToast('Failed to copy share link', 'error');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-100 dark:bg-[#0d0e12] text-zinc-900 dark:text-zinc-100 transition-colors duration-200 selection:bg-indigo-500 selection:text-white font-sans">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        theme={theme}
        onThemeChange={setTheme}
        onOpenKeyboardHelp={() => setIsKeyboardHelpOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onShare={handleShareCalculation}
        historyCount={history.length}
      />

      {/* Main View Port */}
      <main className="flex-1 flex flex-col justify-center items-center">
        {(activeTab === 'calculator' || activeTab === 'scientific') && (
          <CalculatorPage
            expression={expression}
            result={result}
            error={error}
            memory={memory}
            mode={mode}
            onSetMode={(m) => {
              setMode(m);
              setActiveTab(m === 'scientific' ? 'scientific' : 'calculator');
            }}
            settings={settings}
            onUpdateSettings={(newVals) => setSettings((prev) => ({ ...prev, ...newVals }))}
            onDigit={inputDigit}
            onOperator={inputOperator}
            onDecimal={inputDecimal}
            onParenthesis={inputParenthesis}
            onPercentage={inputPercentage}
            onToggleSign={toggleSign}
            onScientificFunction={inputScientificFunction}
            onBackspace={backspace}
            onClearAll={clearAll}
            onCalculate={calculate}
            onMemoryClear={memoryClear}
            onMemoryRecall={memoryRecall}
            onMemoryAdd={memoryAdd}
            onMemorySubtract={memorySubtract}
            onMemoryStore={memoryStore}
            onShowToast={showToast}
            history={history}
            onReuseHistory={(expr) => {
              setExpressionDirectly(expr);
              showToast('Equation loaded into calculator');
            }}
            onDeleteHistoryItem={(id) => {
              deleteHistoryItem(id);
              showToast('Calculation removed from history', 'info');
            }}
            onClearHistory={() => {
              clearHistory();
              showToast('History cleared', 'info');
            }}
            onOpenKeyboardHelp={() => setIsKeyboardHelpOpen(true)}
          />
        )}

        {activeTab === 'history' && (
          <HistoryPage
            history={history}
            onReuseHistory={(expr) => {
              setExpressionDirectly(expr);
              setActiveTab('calculator');
              showToast('Equation loaded into calculator');
            }}
            onDeleteHistoryItem={(id) => {
              deleteHistoryItem(id);
              showToast('Calculation removed from history', 'info');
            }}
            onClearHistory={() => {
              clearHistory();
              showToast('History cleared', 'info');
            }}
            onBackToCalculator={() => setActiveTab('calculator')}
          />
        )}

        {activeTab === 'about' && <AboutPage />}
      </main>

      {/* Subtle Footer */}
      <footer className="w-full py-4 text-center text-xs text-zinc-500 dark:text-zinc-400 border-t border-zinc-200/80 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-zinc-700 dark:text-zinc-300">CalcLab</span>
            <span>&bull;</span>
            <span>Production-Grade React Calculator</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <button
              type="button"
              onClick={() => setIsKeyboardHelpOpen(true)}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              Shortcuts
            </button>
            <button
              type="button"
              onClick={() => handleSelectTab('about')}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              Architecture
            </button>
            <button
              type="button"
              onClick={() => setIsSettingsOpen(true)}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              Settings
            </button>
          </div>
        </div>
      </footer>

      {/* Keyboard Shortcuts Dialog */}
      <KeyboardHelp
        isOpen={isKeyboardHelpOpen}
        onClose={() => setIsKeyboardHelpOpen(false)}
      />

      {/* Settings Dialog */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onUpdateSettings={(newVals) => setSettings((prev) => ({ ...prev, ...newVals }))}
      />

      {/* Global Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
