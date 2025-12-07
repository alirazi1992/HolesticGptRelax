import React, { useCallback, useEffect, useState, useRef } from 'react';
import { ChatMessage } from '../components/ChatMessage';
import { ChatInput } from '../components/ChatInput';
import { QuickActions } from '../components/QuickActions';
import { TypingIndicator } from '../components/TypingIndicator';
import { ScrollToBottom } from '../components/ScrollToBottom';
import { DailyAffirmation } from '../components/DailyAffirmation';
import { MoodSelector } from '../components/MoodSelector';
import { ConversationControls } from '../components/ConversationControls';
import { BreathingTimer } from '../components/BreathingTimer';
import { SuggestedPrompts } from '../components/SuggestedPrompts';
import { SettingsPanel } from '../components/SettingsPanel';
import { useChat } from '../hooks/useChat';
import { Sparkles } from 'lucide-react';
export function HolisticChat() {
  const {
    messages,
    isLoading,
    selectedMood,
    setSelectedMood,
    sendMessage,
    triggerTool,
    clearConversation,
    exportConversation,
    regenerateLastMessage
  } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showBreathing, setShowBreathing] = useState(false);
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end'
    });
  }, []);
  // Handle scroll visibility
  const handleScroll = useCallback(() => {
    if (scrollContainerRef.current) {
      const {
        scrollTop,
        scrollHeight,
        clientHeight
      } = scrollContainerRef.current;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      setShowScrollButton(!isNearBottom);
    }
  }, []);
  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);
  // Handle breathing tool specifically
  const handleToolAction = useCallback((id: string, label: string) => {
    if (id === 'breathing') {
      setShowBreathing(true);
    } else {
      triggerTool(id, label);
    }
  }, [triggerTool]);
  return <div className="flex flex-col h-screen w-full bg-gradient-to-br from-amber-100 via-rose-100 to-teal-100 overflow-hidden" dir="rtl">
      {/* Header */}
      <header className="flex-none px-6 py-5 glass-panel border-b border-white/40 z-10 shadow-warm">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative p-2.5 bg-gradient-to-br from-amber-400 via-rose-400 to-teal-400 rounded-2xl shadow-warm-lg animate-float will-change-transform">
              <Sparkles className="w-6 h-6 text-white" />
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400 via-rose-400 to-teal-400 rounded-2xl opacity-50 blur-xl animate-pulse-glow"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-l from-amber-600 via-rose-600 to-teal-600 bg-clip-text text-transparent tracking-tight">
                هُلیستیک GPT
              </h1>
              <p className="text-sm text-gray-600 font-semibold mt-0.5">
                یار مهربان برای تنفس، گفت‌وگو و آرامش روزانه
              </p>
            </div>
          </div>

          <ConversationControls onClear={clearConversation} onExport={exportConversation} onNewSession={() => window.location.reload()} onOpenSettings={() => setShowSettings(true)} />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative max-w-5xl mx-auto w-full overflow-hidden">
        {/* Quick Actions Bar */}
        <div className="flex-none pt-6 px-4 z-10">
          <QuickActions onAction={handleToolAction} disabled={isLoading} />
        </div>

        {/* Chat Messages */}
        <div ref={scrollContainerRef} onScroll={handleScroll} className="flex-1 overflow-y-auto px-6 py-6 space-y-6 scroll-smooth">
          {/* Wellness Widgets */}
          <div className="max-w-3xl mx-auto">
            <DailyAffirmation />
            <MoodSelector selectedMood={selectedMood} onSelectMood={setSelectedMood} />

            {messages.length <= 1 && <SuggestedPrompts onSelectPrompt={sendMessage} />}
          </div>

          {messages.map((msg, index) => <div key={msg.id} style={{
          animationDelay: `${index * 0.08}s`,
          opacity: 0
        }} className="animate-fade-in-up">
              <ChatMessage role={msg.role} content={msg.content} timestamp={msg.timestamp} onRegenerate={msg.role === 'assistant' && index === messages.length - 1 ? regenerateLastMessage : undefined} />
            </div>)}

          {isLoading && <div className="flex justify-end animate-fade-in-up">
              <TypingIndicator />
            </div>}

          <div ref={messagesEndRef} className="h-6" />
        </div>

        {/* Input Area */}
        <div className="flex-none z-20 pb-2">
          <ChatInput onSend={sendMessage} isLoading={isLoading} />
        </div>

        {/* Floating Elements */}
        <ScrollToBottom visible={showScrollButton} onClick={scrollToBottom} />
        <BreathingTimer isOpen={showBreathing} onClose={() => setShowBreathing(false)} />
        <SettingsPanel isOpen={showSettings} onClose={() => setShowSettings(false)} />
      </main>
    </div>;
}