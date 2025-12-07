import React, { memo } from 'react';
import { Trash2, Download, Plus, Settings } from 'lucide-react';
interface ConversationControlsProps {
  onClear: () => void;
  onExport: () => void;
  onNewSession: () => void;
  onOpenSettings: () => void;
}
export const ConversationControls = memo(function ConversationControls({
  onClear,
  onExport,
  onNewSession,
  onOpenSettings
}: ConversationControlsProps) {
  return <div className="flex items-center gap-2" dir="rtl">
      <button onClick={onNewSession} className="p-2 rounded-xl glass-panel hover:bg-teal-50 text-teal-600 transition-all hover:scale-105 active:scale-95" title="New Session / جلسه جدید">
        <Plus className="w-5 h-5" />
      </button>
      <button onClick={onExport} className="p-2 rounded-xl glass-panel hover:bg-amber-50 text-amber-600 transition-all hover:scale-105 active:scale-95" title="Export Chat / خروجی گرفتن">
        <Download className="w-5 h-5" />
      </button>
      <button onClick={onClear} className="p-2 rounded-xl glass-panel hover:bg-rose-50 text-rose-600 transition-all hover:scale-105 active:scale-95" title="Clear Chat / پاک کردن">
        <Trash2 className="w-5 h-5" />
      </button>
      <div className="w-px h-6 bg-gray-300/50 mx-1"></div>
      <button onClick={onOpenSettings} className="p-2 rounded-xl glass-panel hover:bg-gray-50 text-gray-600 transition-all hover:scale-105 active:scale-95" title="Settings / تنظیمات">
        <Settings className="w-5 h-5" />
      </button>
    </div>;
});