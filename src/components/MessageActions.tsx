import React, { useState, memo } from 'react';
import { Copy, RefreshCw, Check } from 'lucide-react';
interface MessageActionsProps {
  content: string;
  role: 'user' | 'assistant';
  onRegenerate?: () => void;
}
export const MessageActions = memo(function MessageActions({
  content,
  role,
  onRegenerate
}: MessageActionsProps) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return <div className={`
      absolute -bottom-8 ${role === 'user' ? 'left-0' : 'right-0'} 
      flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200
    `}>
      <button onClick={handleCopy} className="p-1.5 rounded-lg bg-white/40 hover:bg-white/80 text-gray-500 hover:text-teal-600 backdrop-blur-sm transition-all shadow-sm" title="Copy">
        {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
      </button>

      {role === 'assistant' && onRegenerate && <button onClick={onRegenerate} className="p-1.5 rounded-lg bg-white/40 hover:bg-white/80 text-gray-500 hover:text-amber-600 backdrop-blur-sm transition-all shadow-sm" title="Regenerate">
          <RefreshCw className="w-3.5 h-3.5" />
        </button>}
    </div>;
});