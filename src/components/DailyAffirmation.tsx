import React, { useCallback, useState, memo } from 'react';
import { Sparkles, RefreshCw, X } from 'lucide-react';
const affirmations = [{
  fa: 'من کافی هستم همانگونه که هستم.',
  en: 'I am enough just as I am.'
}, {
  fa: 'امروز را با آرامش و امید آغاز می‌کنم.',
  en: 'I start today with peace and hope.'
}, {
  fa: 'من لایق عشق و احترام هستم.',
  en: 'I am worthy of love and respect.'
}, {
  fa: 'هر نفس به من آرامش می‌دهد.',
  en: 'Every breath brings me peace.'
}, {
  fa: 'من به مسیر زندگی‌ام اعتماد دارم.',
  en: 'I trust the path of my life.'
}];
export const DailyAffirmation = memo(function DailyAffirmation() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const handleRefresh = useCallback(() => {
    setIndex(prev => (prev + 1) % affirmations.length);
  }, []);
  if (!visible) return null;
  return <div className="mx-6 mb-6 relative overflow-hidden rounded-3xl glass-panel border border-amber-200/50 shadow-warm p-6 animate-fade-in-up group" dir="rtl">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-300 via-rose-300 to-teal-300"></div>

      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2 text-amber-600">
          <Sparkles className="w-5 h-5 animate-pulse-slow" />
          <span className="text-xs font-bold uppercase tracking-wider">
            تاییدیه روزانه • Daily Affirmation
          </span>
        </div>
        <div className="flex gap-2">
          <button onClick={handleRefresh} className="p-1.5 rounded-full hover:bg-amber-100/50 text-gray-400 hover:text-amber-600 transition-colors">
            <RefreshCw className="w-4 h-4" />
          </button>
          <button onClick={() => setVisible(false)} className="p-1.5 rounded-full hover:bg-rose-100/50 text-gray-400 hover:text-rose-600 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="text-center space-y-2 py-2">
        <p className="text-xl font-bold text-gray-800 font-[Tahoma,Vazir,sans-serif]">
          {affirmations[index].fa}
        </p>
        <p className="text-sm text-gray-500 font-medium italic">
          {affirmations[index].en}
        </p>
      </div>
    </div>;
});