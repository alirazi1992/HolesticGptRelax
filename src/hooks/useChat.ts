import { useState, useCallback } from 'react';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const initialAssistantMessage =
  'سلام! من همراه هُلیستیک هستم؛ چطور می‌توانم امروز به آرامش و حال خوبت کمک کنم؟\n\nHi! I’m your holistic companion. How can I support your wellbeing today?';

const persianRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;

const moodReflectionsFa: Record<string, string> = {
  great: 'شنیدن اینکه حالت عالی است لبخند روی لبم می‌آورد. می‌توانیم انرژی خوبت را حفظ کنیم.',
  good: 'خوشحالم که حالت خوب است. اگر چیزی ذهنت را مشغول کرده من اینجا هستم.',
  okay: 'حس معمولی هم طبیعی است. با چند تمرین ساده می‌توانیم کمی حال خوب بسازیم.',
  low: 'متوجه‌ام که انرژی‌ات پایین است. با ملایمت جلو می‌رویم و سعی می‌کنیم سبکی برگردد.',
  anxious:
    'دلشوره حس سختی است. بیایید با تنفس و گفت‌وگوی آرام به بدنت پیام امنیت بدهیم.'
};

const moodReflectionsEn: Record<string, string> = {
  great: 'It is lovely to hear you feel great. Let’s keep that momentum going.',
  good: 'I’m glad you’re feeling good. I’m here if anything still feels heavy.',
  okay: 'Feeling “just okay” is completely valid. Gentle steps can shift the day.',
  low: 'When energy is low, we will move slowly and bring back some lightness.',
  anxious: 'Anxiety can feel loud. Let’s ground your body and remind it you are safe.'
};

const toolPrompts: Record<
  string,
  {
    fa: string;
    en: string;
  }
> = {
  journal: {
    fa: 'می‌خواهم چند خط درباره احساسی که دارم بنویسم. لطفاً با یک سوال راهنمایم کن.',
    en: 'I’d like to journal about how I feel. Could you give me a reflective prompt?'
  },
  habits: {
    fa: 'به دنبال ساختن عادت‌های سالم‌تر هستم. چند پیشنهاد ساده می‌دهی؟',
    en: 'I want to build healthier habits. Can you suggest a small next step?'
  },
  affirmations: {
    fa: 'چند جمله تأکیدی مثبت برای امروز نیاز دارم.',
    en: 'Please share a few positive affirmations for today.'
  },
  meditation: {
    fa: 'می‌خواهم یک مراقبه کوتاه ذهن‌آگاهی انجام دهم. از کجا شروع کنم؟',
    en: 'Guide me through a short mindfulness meditation, please.'
  }
};

const hasPersianText = (text: string) => persianRegex.test(text);

const normalizeTopic = (text: string) => {
  const cleaned = text.replace(/\s+/g, ' ').trim();
  if (!cleaned) return '';
  if (cleaned.length > 160) {
    return `${cleaned.slice(0, 160).trim()}…`;
  }
  return cleaned;
};

const getMoodReflection = (mood: string | null, isFarsi: boolean) => {
  if (!mood) return '';
  return isFarsi ? moodReflectionsFa[mood] || '' : moodReflectionsEn[mood] || '';
};

const buildAssistantResponse = (content: string, mood: string | null) => {
  const isFarsi = hasPersianText(content);
  const topic = normalizeTopic(content);
  const moodNote = getMoodReflection(mood, isFarsi);

  if (isFarsi) {
    const lines = [
      'ممنون که احساست را با من در میان گذاشتی.',
      moodNote || undefined,
      topic
        ? `اگر دوست داری می‌توانیم درباره "${topic}" بیشتر حرف بزنیم یا تمرینی را با هم امتحان کنیم.`
        : 'اگر دوست داری می‌توانیم با یک تمرین آرام‌بخش یا گفت‌وگو شروع کنیم.',
      'هر زمان آماده‌ای من کنارت هستم.'
    ];
    return lines.filter(Boolean).join('\n\n');
  }

  const lines = [
    'Thank you for sharing what is on your mind.',
    moodNote || undefined,
    topic
      ? `If it feels helpful, we can explore "${topic}" together or try a gentle exercise.`
      : 'We can start with a grounding practice or simply unpack what feels heavy.',
    'I’m right here whenever you are ready.'
  ];

  return lines.filter(Boolean).join('\n\n');
};

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: initialAssistantMessage,
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const sendMessage = useCallback(
    (content: string) => {
      const trimmed = content.trim();
      if (!trimmed) return;

      const moodAtSend = selectedMood;

      const userMsg: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: trimmed,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, userMsg]);
      setIsLoading(true);

      const responseContent = buildAssistantResponse(trimmed, moodAtSend);

      setTimeout(() => {
        const assistantMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: responseContent,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, assistantMsg]);
        setIsLoading(false);
      }, 1400);
    },
    [selectedMood]
  );

  const triggerTool = useCallback(
    (toolId: string, label: string) => {
      const prompt = toolPrompts[toolId];
      if (prompt) {
        sendMessage(`${prompt.fa}\n\n${prompt.en}`);
        return;
      }
      sendMessage(`می‌توانی درباره ${label} بیشتر راهنمایم کنی؟`);
    },
    [sendMessage]
  );

  const clearConversation = useCallback(() => {
    if (
      window.confirm(
        'آیا مطمئن هستی می‌خواهی گفتگو پاک شود؟\nAre you sure you want to clear the conversation?'
      )
    ) {
      setMessages([
        {
          id: Date.now().toString(),
          role: 'assistant',
          content: 'گفتگو پاک شد. هر زمان آماده‌ای می‌توانیم دوباره شروع کنیم.',
          timestamp: new Date()
        }
      ]);
      setSelectedMood(null);
    }
  }, []);

  const exportConversation = useCallback(() => {
    const text = messages
      .map(m => `[${m.role.toUpperCase()}] ${m.timestamp.toLocaleString()}:\n${m.content}\n`)
      .join('\n---\n');
    const blob = new Blob([text], {
      type: 'text/plain'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `holistic-chat-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }, [messages]);

  const regenerateLastMessage = useCallback(() => {
    const lastUserMessage = [...messages].reverse().find(m => m.role === 'user');
    if (!lastUserMessage) return;

    const moodForRetry = selectedMood;
    setIsLoading(true);
    setMessages(prev =>
      prev[prev.length - 1]?.role === 'assistant' ? prev.slice(0, -1) : prev
    );

    setTimeout(() => {
      const assistantMsg: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: buildAssistantResponse(lastUserMessage.content, moodForRetry),
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMsg]);
      setIsLoading(false);
    }, 1400);
  }, [messages, selectedMood]);

  return {
    messages,
    isLoading,
    selectedMood,
    setSelectedMood,
    sendMessage,
    triggerTool,
    clearConversation,
    exportConversation,
    regenerateLastMessage
  };
}
