import React, { useEffect, useState, memo } from 'react';
import { X } from 'lucide-react';
interface BreathingTimerProps {
  isOpen: boolean;
  onClose: () => void;
}
export const BreathingTimer = memo(function BreathingTimer({
  isOpen,
  onClose
}: BreathingTimerProps) {
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [timeLeft, setTimeLeft] = useState(4);
  useEffect(() => {
    if (!isOpen) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev > 1) return prev - 1;
        // Transition phases
        if (phase === 'inhale') {
          setPhase('hold');
          return 2;
        } else if (phase === 'hold') {
          setPhase('exhale');
          return 6;
        } else {
          setPhase('inhale');
          return 4;
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen, phase]);
  if (!isOpen) return null;
  const getPhaseText = () => {
    switch (phase) {
      case 'inhale':
        return {
          fa: 'دم',
          en: 'Inhale'
        };
      case 'hold':
        return {
          fa: 'نگه دارید',
          en: 'Hold'
        };
      case 'exhale':
        return {
          fa: 'بازدم',
          en: 'Exhale'
        };
    }
  };
  const getCircleScale = () => {
    switch (phase) {
      case 'inhale':
        return 'scale-100';
      // Growing
      case 'hold':
        return 'scale-110';
      // Static full
      case 'exhale':
        return 'scale-50';
      // Shrinking
    }
  };
  const getDuration = () => {
    switch (phase) {
      case 'inhale':
        return 'duration-[4000ms]';
      case 'hold':
        return 'duration-0';
      case 'exhale':
        return 'duration-[6000ms]';
    }
  };
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-teal-900/20 backdrop-blur-md animate-fade-in-up">
      <div className="relative w-full max-w-md mx-4 bg-white/30 backdrop-blur-xl rounded-3xl shadow-warm-xl border border-white/50 p-8 flex flex-col items-center">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/40 text-gray-600 transition-colors">
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-xl font-bold text-gray-800 mb-8">
          تمرین تنفس • Breathing
        </h2>

        <div className="relative w-64 h-64 flex items-center justify-center mb-8">
          {/* Outer glow rings */}
          <div className={`absolute inset-0 rounded-full bg-teal-400/20 animate-pulse-slow`}></div>
          <div className={`absolute inset-4 rounded-full bg-teal-400/30 animate-pulse-glow`}></div>

          {/* Main breathing circle */}
          <div className={`
              w-48 h-48 rounded-full bg-gradient-to-br from-teal-400 to-emerald-400 shadow-glow
              flex items-center justify-center transition-transform ease-in-out
              ${getCircleScale()} ${getDuration()}
            `}>
            <div className="text-center text-white">
              <div className="text-3xl font-bold mb-1">{timeLeft}</div>
              <div className="text-lg font-medium">{getPhaseText().fa}</div>
              <div className="text-xs opacity-80">{getPhaseText().en}</div>
            </div>
          </div>
        </div>

        <p className="text-center text-gray-600 max-w-xs">
          روی تنفس خود تمرکز کنید و با دایره هماهنگ شوید.
          <br />
          <span className="text-sm opacity-80">
            Focus on your breath and sync with the circle.
          </span>
        </p>
      </div>
    </div>;
});