import React from 'react';
import {
  Calculator as CalcIcon,
  Keyboard,
  Settings as SettingsIcon,
  Share2,
  BookOpen,
  FlaskConical,
  History as HistoryIcon,
} from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { Theme } from '../types';

export type NavTab = 'calculator' | 'scientific' | 'history' | 'about';

interface NavbarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
  onOpenKeyboardHelp: () => void;
  onOpenSettings: () => void;
  onShare: () => void;
  historyCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  theme,
  onThemeChange,
  onOpenKeyboardHelp,
  onOpenSettings,
  onShare,
  historyCount,
}) => {
  return (
    <header
      id="main-navigation-bar"
      className="w-full border-b border-zinc-200/80 dark:border-white/5 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-md sticky top-0 z-30 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
        {/* Left: Brand Identity */}
        <div
          className="flex items-center gap-2.5 cursor-pointer select-none"
          onClick={() => onSelectTab('calculator')}
          id="brand-logo"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
            <CalcIcon className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-zinc-900 dark:text-white leading-tight">
              CalcLab
            </span>
            <span className="text-[10px] uppercase font-semibold tracking-wider text-indigo-600 dark:text-indigo-400 leading-none">
              Modern Calculator
            </span>
          </div>
        </div>

        {/* Center: Navigation Tabs */}
        <nav
          id="desktop-nav-tabs"
          className="hidden md:flex items-center p-1 rounded-xl bg-zinc-100/90 dark:bg-zinc-900/90 border border-zinc-200/70 dark:border-white/5"
          aria-label="Application sections"
        >
          <button
            type="button"
            id="nav-tab-calculator"
            onClick={() => onSelectTab('calculator')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'calculator'
                ? 'bg-white dark:bg-zinc-800 text-indigo-600 dark:text-indigo-300 shadow-xs'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
            }`}
          >
            <CalcIcon className="w-3.5 h-3.5" />
            <span>Standard</span>
          </button>

          <button
            type="button"
            id="nav-tab-scientific"
            onClick={() => onSelectTab('scientific')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'scientific'
                ? 'bg-white dark:bg-zinc-800 text-indigo-600 dark:text-indigo-300 shadow-xs'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
            }`}
          >
            <FlaskConical className="w-3.5 h-3.5" />
            <span>Scientific</span>
          </button>

          <button
            type="button"
            id="nav-tab-history"
            onClick={() => onSelectTab('history')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'history'
                ? 'bg-white dark:bg-zinc-800 text-indigo-600 dark:text-indigo-300 shadow-xs'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
            }`}
          >
            <HistoryIcon className="w-3.5 h-3.5" />
            <span>History</span>
            {historyCount > 0 && (
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300">
                {historyCount}
              </span>
            )}
          </button>

          <button
            type="button"
            id="nav-tab-about"
            onClick={() => onSelectTab('about')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'about'
                ? 'bg-white dark:bg-zinc-800 text-indigo-600 dark:text-indigo-300 shadow-xs'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>About</span>
          </button>
        </nav>

        {/* Right: Actions (Theme, Shortcuts, Settings, Share) */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Share button */}
          <button
            id="nav-share-button"
            type="button"
            onClick={onShare}
            title="Share Calculation Link"
            aria-label="Share Calculation"
            className="p-2 rounded-xl text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <Share2 className="w-4 h-4" />
          </button>

          {/* Keyboard shortcuts trigger */}
          <button
            id="nav-keyboard-help-button"
            type="button"
            onClick={onOpenKeyboardHelp}
            title="Keyboard shortcuts"
            aria-label="Keyboard shortcuts"
            className="p-2 rounded-xl text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <Keyboard className="w-4 h-4" />
          </button>

          {/* Preferences trigger */}
          <button
            id="nav-settings-button"
            type="button"
            onClick={onOpenSettings}
            title="Preferences"
            aria-label="Calculator Preferences"
            className="p-2 rounded-xl text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <SettingsIcon className="w-4 h-4" />
          </button>

          <div className="h-5 w-[1px] bg-zinc-200 dark:bg-zinc-800 hidden xs:block" />

          {/* Theme selector */}
          <ThemeToggle theme={theme} onThemeChange={onThemeChange} />
        </div>
      </div>

      {/* Mobile Secondary Navigation Row */}
      <div className="flex md:hidden items-center justify-around px-2 py-1.5 border-t border-zinc-200/60 dark:border-white/5 bg-zinc-50 dark:bg-zinc-950/90 text-xs">
        <button
          type="button"
          onClick={() => onSelectTab('calculator')}
          className={`flex items-center gap-1 py-1 px-2.5 rounded-md font-medium ${
            activeTab === 'calculator'
              ? 'text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-50 dark:bg-indigo-950/50'
              : 'text-zinc-500 dark:text-zinc-400'
          }`}
        >
          <CalcIcon className="w-3.5 h-3.5" />
          <span>Basic</span>
        </button>
        <button
          type="button"
          onClick={() => onSelectTab('scientific')}
          className={`flex items-center gap-1 py-1 px-2.5 rounded-md font-medium ${
            activeTab === 'scientific'
              ? 'text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-50 dark:bg-indigo-950/50'
              : 'text-zinc-500 dark:text-zinc-400'
          }`}
        >
          <FlaskConical className="w-3.5 h-3.5" />
          <span>Scientific</span>
        </button>
        <button
          type="button"
          onClick={() => onSelectTab('history')}
          className={`flex items-center gap-1 py-1 px-2.5 rounded-md font-medium ${
            activeTab === 'history'
              ? 'text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-50 dark:bg-indigo-950/50'
              : 'text-zinc-500 dark:text-zinc-400'
          }`}
        >
          <HistoryIcon className="w-3.5 h-3.5" />
          <span>History</span>
          {historyCount > 0 && (
            <span className="text-[10px] px-1 rounded-full bg-zinc-200 dark:bg-zinc-800">
              {historyCount}
            </span>
          )}
        </button>
        <button
          type="button"
          onClick={() => onSelectTab('about')}
          className={`flex items-center gap-1 py-1 px-2.5 rounded-md font-medium ${
            activeTab === 'about'
              ? 'text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-50 dark:bg-indigo-950/50'
              : 'text-zinc-500 dark:text-zinc-400'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>About</span>
        </button>
      </div>
    </header>
  );
};
