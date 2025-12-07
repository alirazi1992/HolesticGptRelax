import React, { memo } from 'react';
interface MoodSelectorProps {
  selectedMood: string | null;
  onSelectMood: (mood: string) => void;
}
const moods = [{
  id: 'great',
  emoji: '😊',
  labelFa: 'عالی',
  labelEn: 'Great',
  color: 'hover:bg-emerald-100/80'
}, {
  id: 'good',
  emoji: '🙂',
  labelFa: 'خوب',
  labelEn: 'Good',
  color: 'hover:bg-teal-100/80'
}, {
  id: 'okay',
  emoji: '😐',
  labelFa: 'معمولی',
  labelEn: 'Okay',
  color: 'hover:bg-amber-100/80'
}, {
  id: 'low',
  emoji: '😔',
  labelFa: 'پایین',
  labelEn: 'Low',
  color: 'hover:bg-orange-100/80'
}, {
  id: 'anxious',
  emoji: '😰',
  labelFa: 'مضطرب',
  labelEn: 'Anxious',
  color: 'hover:bg-rose-100/80'
}];
export const MoodSelector = memo(function MoodSelector({
  selectedMood,
  onSelectMood
}: MoodSelectorProps) {
  if (selectedMood) return null;
  return <div className="mx-6 mb-8 animate-fade-in-up" dir="rtl">
      <h3 className="text-center text-gray-600 text-sm font-medium mb-4">
        امروز چه احساسی دارید؟ • How are you feeling today?
      </h3>
      <div className="flex flex-wrap justify-center gap-3">
        {moods.map(mood => <button key={mood.id} onClick={() => onSelectMood(mood.id)} className={`
              flex flex-col items-center gap-1 p-3 rounded-2xl glass-panel border border-white/40
              transition-all duration-300 w-20 group ${mood.color} hover:-translate-y-1 hover:shadow-warm
            `}>
            <span className="text-2xl filter drop-shadow-sm group-hover:scale-110 transition-transform duration-300">
              {mood.emoji}
            </span>
            <span className="text-xs font-bold text-gray-700">
              {mood.labelFa}
            </span>
            <span className="text-[10px] text-gray-500">{mood.labelEn}</span>
          </button>)}
      </div>
    </div>;
});