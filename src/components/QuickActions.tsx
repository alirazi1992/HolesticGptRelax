import React, { useCallback, memo } from 'react';
import { Wind, BookOpen, Calendar, Sun, Sparkles } from 'lucide-react';
interface QuickActionsProps {
  onAction: (action: string, label: string) => void;
  disabled?: boolean;
}
const actions = [{
  id: 'breathing',
  icon: Wind,
  labelEn: 'Breathing',
  labelFa: 'تنفس آرام',
  color: 'text-sky-600',
  bg: 'from-sky-100/90 via-sky-50/80 to-blue-50/70',
  hoverBg: 'hover:from-sky-200/90 hover:via-sky-100/80 hover:to-blue-100/70',
  border: 'border-sky-200/70',
  shadow: 'hover:shadow-[0_8px_30px_-8px_rgba(14,165,233,0.4)]'
}, {
  id: 'journal',
  icon: BookOpen,
  labelEn: 'Journal',
  labelFa: 'یادداشت احساسی',
  color: 'text-amber-600',
  bg: 'from-amber-100/90 via-amber-50/80 to-yellow-50/70',
  hoverBg: 'hover:from-amber-200/90 hover:via-amber-100/80 hover:to-yellow-100/70',
  border: 'border-amber-200/70',
  shadow: 'hover:shadow-[0_8px_30px_-8px_rgba(245,158,11,0.4)]'
}, {
  id: 'habits',
  icon: Calendar,
  labelEn: 'Habits',
  labelFa: 'عادت‌های خوب',
  color: 'text-emerald-600',
  bg: 'from-emerald-100/90 via-emerald-50/80 to-green-50/70',
  hoverBg: 'hover:from-emerald-200/90 hover:via-emerald-100/80 hover:to-green-100/70',
  border: 'border-emerald-200/70',
  shadow: 'hover:shadow-[0_8px_30px_-8px_rgba(16,185,129,0.4)]'
}, {
  id: 'affirmations',
  icon: Sun,
  labelEn: 'Affirmations',
  labelFa: 'تأییدیه روزانه',
  color: 'text-orange-600',
  bg: 'from-orange-100/90 via-orange-50/80 to-amber-50/70',
  hoverBg: 'hover:from-orange-200/90 hover:via-orange-100/80 hover:to-amber-100/70',
  border: 'border-orange-200/70',
  shadow: 'hover:shadow-[0_8px_30px_-8px_rgba(249,115,22,0.4)]'
}, {
  id: 'meditation',
  icon: Sparkles,
  labelEn: 'Meditation',
  labelFa: 'مدیتیشن کوتاه',
  color: 'text-violet-600',
  bg: 'from-violet-100/90 via-violet-50/80 to-purple-50/70',
  hoverBg: 'hover:from-violet-200/90 hover:via-violet-100/80 hover:to-purple-100/70',
  border: 'border-violet-200/70',
  shadow: 'hover:shadow-[0_8px_30px_-8px_rgba(139,92,246,0.4)]'
}];
export const QuickActions = memo(function QuickActions({
  onAction,
  disabled
}: QuickActionsProps) {
  const handleClick = useCallback((actionId: string, labelEn: string) => {
    onAction(actionId, labelEn);
  }, [onAction]);
  return <div className="flex flex-wrap gap-3 justify-center md:justify-start" dir="rtl">
      {actions.map(action => <button key={action.id} onClick={() => handleClick(action.id, action.labelEn)} disabled={disabled} className={`
            group flex items-center gap-2.5 px-5 py-3 rounded-2xl transition-all duration-300
            border backdrop-blur-md shadow-md will-change-transform
            bg-gradient-to-br ${action.bg} ${action.hoverBg} ${action.border} ${action.shadow}
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:-translate-y-1.5 active:scale-95'}
          `} aria-label={`${action.labelFa} / ${action.labelEn}`}>
          <div className="flex flex-col items-end leading-none gap-1">
            <span className={`text-sm font-bold ${action.color}`}>
              {action.labelFa}
            </span>
            <span className={`text-[11px] opacity-70 ${action.color}`}>
              {action.labelEn}
            </span>
          </div>
          <action.icon className={`w-5 h-5 ${action.color} transition-transform duration-300 ${!disabled && 'group-hover:scale-110'}`} />
        </button>)}
    </div>;
});
