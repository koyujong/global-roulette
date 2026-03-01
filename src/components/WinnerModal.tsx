"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";
import { useLanguage } from "@/contexts/LanguageContext";
import { X, Trash2, RotateCcw } from "lucide-react";

interface WinnerModalProps {
  isOpen: boolean;
  winnerName: string;
  onClose: () => void;
  onRemove: () => void;
}

export default function WinnerModal({ isOpen, winnerName, onClose, onRemove }: WinnerModalProps) {
  const { t, tReplace } = useLanguage();

  useEffect(() => {
    if (isOpen) {
      // Trigger confetti when modal opens
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        }));
        confetti(Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        }));
      }, 250);

      return () => clearInterval(interval);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-md transform transition-all animate-in zoom-in-95 duration-300">
        
        {/* Header decoration */}
        <div className="bg-gradient-to-r from-pink-500 to-indigo-500 h-3 w-full" />
        
        <div className="p-6 relative text-center">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="mb-2 uppercase text-indigo-500 font-bold tracking-widest text-sm">
            {t.winnerTitle}
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-8 break-words leading-tight bg-clip-text text-transparent bg-gradient-to-b from-gray-900 to-gray-600">
            {winnerName}
          </h2>
          
          <div className="flex flex-col gap-3">
            <button
              onClick={onClose}
              className="w-full py-4 text-white font-bold text-lg bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl transition-all shadow-md shadow-indigo-200 flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              {t.closeBtn}
            </button>
            <button
              onClick={() => {
                onRemove();
                onClose();
              }}
              className="w-full py-3 text-red-600 font-semibold bg-red-50 hover:bg-red-100 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
            >
              <Trash2 className="w-4 h-4" />
              {tReplace(t.removeWinnerBtn, { name: winnerName })}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
