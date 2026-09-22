import React from 'react';
import { X, Settings, Volume2, VolumeX, Hash } from 'lucide-react';
import { CalculatorSettings } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: CalculatorSettings;
  onUpdateSettings: (newSettings: Partial<CalculatorSettings>) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="settings-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md flex flex-col rounded-2xl bg-zinc-900 border border-zinc-700/80 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-zinc-100">Preferences</h2>
              <p className="text-xs text-zinc-400">Configure calculator calculations and feedback</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close preferences modal"
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Settings Body */}
        <div className="p-6 space-y-5">
          {/* Angle Mode */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-medium text-zinc-200">Trigonometry Angle Unit</span>
              <p className="text-xs text-zinc-400 mt-0.5">Applies to sin, cos, tan functions</p>
            </div>
            <div className="flex p-0.5 rounded-lg bg-zinc-800 border border-zinc-700">
              <button
                type="button"
                onClick={() => onUpdateSettings({ angleUnit: 'deg' })}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                  settings.angleUnit === 'deg'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                DEG
              </button>
              <button
                type="button"
                onClick={() => onUpdateSettings({ angleUnit: 'rad' })}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                  settings.angleUnit === 'rad'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                RAD
              </button>
            </div>
          </div>

          {/* Decimal Precision */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-medium text-zinc-200">Decimal Precision</span>
              <p className="text-xs text-zinc-400 mt-0.5">Maximum digits after decimal</p>
            </div>
            <div className="flex p-0.5 rounded-lg bg-zinc-800 border border-zinc-700">
              {(['auto', 2, 4, 6] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => onUpdateSettings({ precision: p })}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors capitalize ${
                    settings.precision === p
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Thousands Separators */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Hash className="w-4 h-4 text-indigo-400" />
              <div>
                <span className="text-sm font-medium text-zinc-200">Thousands Separator</span>
                <p className="text-xs text-zinc-400">Display numbers with commas (e.g. 1,000)</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onUpdateSettings({ thousandsSeparator: !settings.thousandsSeparator })}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 ${
                settings.thousandsSeparator ? 'bg-indigo-600' : 'bg-zinc-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                  settings.thousandsSeparator ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Audio Click Feedback */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {settings.soundEnabled ? (
                <Volume2 className="w-4 h-4 text-indigo-400" />
              ) : (
                <VolumeX className="w-4 h-4 text-zinc-500" />
              )}
              <div>
                <span className="text-sm font-medium text-zinc-200">Audio Feedback</span>
                <p className="text-xs text-zinc-400">Soft acoustic click on button press</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onUpdateSettings({ soundEnabled: !settings.soundEnabled })}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 ${
                settings.soundEnabled ? 'bg-indigo-600' : 'bg-zinc-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                  settings.soundEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-zinc-950/60 border-t border-zinc-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
