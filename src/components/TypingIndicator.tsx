import React, { memo } from 'react';
export const TypingIndicator = memo(function TypingIndicator() {
  return <div className="flex items-center gap-1.5 px-6 py-4 bg-gradient-to-br from-teal-100/80 via-teal-50/70 to-cyan-50/60 glass-message rounded-3xl rounded-tl-md border border-teal-200/60 w-fit will-change-transform">
      <div className="w-2.5 h-2.5 bg-teal-500 rounded-full animate-bounce [animation-delay:-0.3s] will-change-transform"></div>
      <div className="w-2.5 h-2.5 bg-teal-500 rounded-full animate-bounce [animation-delay:-0.15s] will-change-transform"></div>
      <div className="w-2.5 h-2.5 bg-teal-500 rounded-full animate-bounce will-change-transform"></div>
    </div>;
});