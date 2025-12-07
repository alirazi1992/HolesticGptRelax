import React, { memo } from 'react';
import { X, Moon, Globe, Type } from 'lucide-react';
interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}
export const SettingsPanel = memo(function SettingsPanel({
  isOpen,
  onClose
}: SettingsPanelProps) {
  return <>
      {/* Backdrop */}
      <div className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose} />

      {/* Panel */}
      <div className={`
          fixed top-0 left-0 h-full w-80 bg-white/80 backdrop-blur-xl shadow-2xl z-50
          border-r border-white/50 transition-transform duration-300 ease-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `} dir="rtl">
        <div className="p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-gray-800">
              تنظیمات • Settings
            </h2>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 text-gray-500">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-8 flex-1">
            {/* Theme Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-gray-800 font-bold">
                <Moon className="w-5 h-5 text-teal-600" />
                <h3>ظاهر • Appearance</h3>
              </div>
              <div className="p-4 rounded-2xl bg-white/50 border border-white/60">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    حالت تیره (به زودی)
                  </span>
                  <div className="w-10 h-6 bg-gray-200 rounded-full relative cursor-not-allowed">
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Language Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-gray-800 font-bold">
                <Globe className="w-5 h-5 text-amber-600" />
                <h3>زبان • Language</h3>
              </div>
              <div className="p-4 rounded-2xl bg-white/50 border border-white/60 space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="lang" defaultChecked className="text-teal-600 focus:ring-teal-500" />
                  <span className="text-sm text-gray-700">
                    فارسی + English (Auto)
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer opacity-50">
                  <input type="radio" name="lang" disabled className="text-teal-600 focus:ring-teal-500" />
                  <span className="text-sm text-gray-700">فارسی (Only)</span>
                </label>
              </div>
            </div>

            {/* Font Size Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-gray-800 font-bold">
                <Type className="w-5 h-5 text-rose-600" />
                <h3>اندازه متن • Font Size</h3>
              </div>
              <div className="p-4 rounded-2xl bg-white/50 border border-white/60">
                <input type="range" min="12" max="20" defaultValue="16" className="w-full accent-teal-600" />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>کوچک</span>
                  <span>متوسط</span>
                  <span>بزرگ</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center text-xs text-gray-400 mt-8">
            Holistic GPT v1.0.0
          </div>
        </div>
      </div>
    </>;
});