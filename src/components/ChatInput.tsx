import React, { useCallback, useEffect, useState, useRef, memo } from 'react';
import { Send } from 'lucide-react';
import { detectDirection } from '../utils/languageDetection';
interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
}
export const ChatInput = memo(function ChatInput({
  onSend,
  isLoading
}: ChatInputProps) {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const direction = detectDirection(input);
  // Debounced auto-resize for better performance
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const resizeTextarea = () => {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 140)}px`;
    };
    // Use requestAnimationFrame for smooth resize
    const rafId = requestAnimationFrame(resizeTextarea);
    return () => cancelAnimationFrame(rafId);
  }, [input]);
  const handleSubmit = useCallback((e?: React.FormEvent) => {
    e?.preventDefault();
    if (input.trim() && !isLoading) {
      onSend(input.trim());
      setInput('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  }, [input, isLoading, onSend]);
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }, [handleSubmit]);
  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  }, []);
  return <div className="w-full max-w-5xl mx-auto px-6 pb-6" dir="rtl">
      <div className="relative glass-panel rounded-3xl shadow-warm-lg p-3 transition-all duration-300 focus-within:shadow-warm-xl focus-within:border-amber-300/60">
        <form onSubmit={handleSubmit} className="flex items-end gap-3">
          <button type="submit" disabled={!input.trim() || isLoading} className={`
              p-3.5 rounded-2xl mb-1 transition-all duration-300 flex-shrink-0 shadow-md will-change-transform
              ${input.trim() && !isLoading ? 'bg-gradient-to-br from-amber-400 via-amber-500 to-rose-400 text-white hover:shadow-glow hover:scale-105 active:scale-95' : 'bg-gray-200/70 text-gray-400 cursor-not-allowed'}
            `} aria-label="ارسال پیام">
            <Send className="w-5 h-5" />
          </button>

          <textarea ref={textareaRef} value={input} onChange={handleChange} onKeyDown={handleKeyDown} placeholder={direction === 'rtl' ? 'چه چیزی ذهنت را مشغول کرده است...' : 'What’s on your mind...'} className={`
              w-full bg-transparent border-none focus:ring-0 resize-none py-4 px-5
              max-h-[140px] min-h-[56px] text-gray-800 placeholder-gray-500/60 text-[15px] leading-relaxed
              ${direction === 'rtl' ? 'text-right' : 'text-left'}
            `} dir={direction} disabled={isLoading} rows={1} />
        </form>
      </div>

      <div className="text-center mt-4 text-[13px] text-gray-600/80 font-medium flex justify-center items-center gap-3 opacity-80">
        <span className="text-xs">می‌توانی فارسی یا انگلیسی تایپ کنی</span>
        <span className="w-1 h-1 bg-gray-400/60 rounded-full"></span>
        <span>Messages stay on your device</span>
      </div>
    </div>;
});
