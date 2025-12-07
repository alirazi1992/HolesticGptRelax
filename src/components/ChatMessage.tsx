import React, { memo } from 'react';
import { detectDirection } from '../utils/languageDetection';
import { MessageActions } from './MessageActions';
interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  onRegenerate?: () => void;
}
export const ChatMessage = memo(function ChatMessage({
  role,
  content,
  timestamp,
  onRegenerate
}: ChatMessageProps) {
  const direction = detectDirection(content);
  const isUser = role === 'user';
  return <div className={`flex w-full mb-8 animate-fade-in-up will-change-transform group relative ${isUser ? 'justify-start' : 'justify-end'}`}>
      <div className={`
          max-w-[85%] md:max-w-[75%] lg:max-w-[70%]
          relative px-7 py-5 glass-message border transition-all duration-300
          ${isUser ? 'bg-gradient-to-br from-rose-100/80 via-rose-50/70 to-pink-50/60 border-rose-200/60 text-gray-800 rounded-3xl rounded-tr-md hover:shadow-warm' : 'bg-gradient-to-br from-teal-100/80 via-teal-50/70 to-cyan-50/60 border-teal-200/60 text-gray-800 rounded-3xl rounded-tl-md hover:shadow-warm'}
        `} dir={direction}>
        <p className={`text-[15px] leading-[1.7] whitespace-pre-wrap ${direction === 'rtl' ? 'text-right font-[Tahoma,Vazir,sans-serif]' : 'text-left'}`}>
          {content}
        </p>

        <div className={`mt-3 text-[11px] text-gray-500/80 font-medium flex items-center gap-1.5 ${direction === 'rtl' ? 'justify-end' : 'justify-start'}`}>
          <div className="w-1 h-1 bg-gray-400/60 rounded-full"></div>
          <span>
            {timestamp.toLocaleTimeString('fa-IR', {
            hour: '2-digit',
            minute: '2-digit'
          })}
          </span>
        </div>

        <MessageActions role={role} content={content} onRegenerate={onRegenerate} />
      </div>
    </div>;
});