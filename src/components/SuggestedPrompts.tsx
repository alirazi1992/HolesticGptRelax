import React, { memo } from 'react';
import { Lightbulb, Heart, Briefcase, Coffee } from 'lucide-react';
interface SuggestedPromptsProps {
  onSelectPrompt: (prompt: string) => void;
}
const prompts = [{
  id: 'stress',
  icon: Coffee,
  textFa: 'احساس استرس دارم و نیاز به آرامش دارم.',
  textEn: 'I feel stressed and need to calm down.',
  color: 'text-amber-600',
  bg: 'hover:bg-amber-50'
}, {
  id: 'habits',
  icon: Lightbulb,
  textFa: 'چطور می‌توانم عادت‌های بهتری بسازم؟',
  textEn: 'How can I build better habits?',
  color: 'text-teal-600',
  bg: 'hover:bg-teal-50'
}, {
  id: 'career',
  icon: Briefcase,
  textFa: 'در مورد مسیر شغلی‌ام سردرگم هستم.',
  textEn: 'I am confused about my career path.',
  color: 'text-blue-600',
  bg: 'hover:bg-blue-50'
}, {
  id: 'relationships',
  icon: Heart,
  textFa: 'می‌خواهم ارتباطاتم را بهبود ببخشم.',
  textEn: 'I want to improve my relationships.',
  color: 'text-rose-600',
  bg: 'hover:bg-rose-50'
}];
export const SuggestedPrompts = memo(function SuggestedPrompts({
  onSelectPrompt
}: SuggestedPromptsProps) {
  return <div className="mx-6 mb-8 grid grid-cols-1 md:grid-cols-2 gap-3 animate-fade-in-up" dir="rtl">
      {prompts.map(prompt => <button key={prompt.id} onClick={() => onSelectPrompt(prompt.textFa)} className={`
            flex items-center gap-4 p-4 rounded-2xl glass-panel border border-white/40 text-right
            transition-all duration-300 group ${prompt.bg} hover:shadow-warm hover:-translate-y-1
          `}>
          <div className={`p-3 rounded-xl bg-white/50 shadow-sm ${prompt.color}`}>
            <prompt.icon className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-gray-800 mb-1">
              {prompt.textFa}
            </div>
            <div className="text-xs text-gray-500">{prompt.textEn}</div>
          </div>
        </button>)}
    </div>;
});