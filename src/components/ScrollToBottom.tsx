import React, { memo } from 'react';
import { ChevronDown } from 'lucide-react';
interface ScrollToBottomProps {
  visible: boolean;
  onClick: () => void;
}
export const ScrollToBottom = memo(function ScrollToBottom({
  visible,
  onClick
}: ScrollToBottomProps) {
  if (!visible) return null;
  return <button onClick={onClick} className="fixed bottom-24 left-6 z-30 p-3 rounded-full glass-panel shadow-warm-lg hover:scale-110 active:scale-95 transition-all duration-300 animate-fade-in-up bg-white/40 text-gray-600 hover:text-teal-600" aria-label="Scroll to bottom">
      <ChevronDown className="w-6 h-6" />
    </button>;
});