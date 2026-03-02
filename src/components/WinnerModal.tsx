"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";
import { useLanguage } from "@/contexts/LanguageContext";
import { X, Trash2, RotateCcw, Trophy } from "lucide-react";

interface WinnerModalProps {
  isOpen: boolean;
  winnerName: string;
  onClose: () => void;
  onRemove: () => void;
  isFinalWinner?: boolean; // survival mode: this is the last survivor
}

export default function WinnerModal({ isOpen, winnerName, onClose, onRemove, isFinalWinner = false }: WinnerModalProps) {
  const { t, tReplace } = useLanguage();

  useEffect(() => {
    if (isOpen) {
      const duration = isFinalWinner ? 5000 : 3000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };
      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);
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
  }, [isOpen, isFinalWinner]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 dark:bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 transition-colors">
      <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden w-full max-w-md transform transition-all animate-in zoom-in-95 duration-300">
        
        {/* Header decoration — gold gradient for final winner */}
        <div className={`h-3 w-full ${isFinalWinner ? "bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500" : "bg-gradient-to-r from-pink-500 to-indigo-500"}`} />
        
        <div className="p-6 relative text-center">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          {isFinalWinner ? (
            <>
              {/* Trophy icon for final winner */}
              <div className="flex justify-center mb-3">
                <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                  <Trophy className="w-8 h-8 text-amber-500" />
                </div>
              </div>
              <div className="mb-2 uppercase text-amber-500 dark:text-amber-400 font-black tracking-widest text-sm transition-colors">
                {t.finalWinner}
              </div>
            </>
          ) : (
            <div className="mb-2 uppercase text-indigo-500 dark:text-indigo-400 font-bold tracking-widest text-sm transition-colors">
              {t.winnerTitle}
            </div>
          )}
          
          <h2 className={`text-4xl md:text-5xl font-black mb-8 break-words leading-tight bg-clip-text text-transparent transition-colors ${
            isFinalWinner
              ? "bg-gradient-to-b from-amber-600 to-amber-400 dark:from-amber-300 dark:to-amber-500"
              : "bg-gradient-to-b from-gray-900 to-gray-600 dark:from-white dark:to-gray-400"
          }`}>
            {winnerName}
          </h2>
          
          <div className="flex flex-col gap-3">
            <button
              onClick={onClose}
              className={`w-full py-4 text-white font-bold text-lg rounded-xl transition-all shadow-md flex items-center justify-center gap-2 ${
                isFinalWinner
                  ? "bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 shadow-amber-200 dark:shadow-amber-900"
                  : "bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 shadow-indigo-200"
              }`}
            >
              <RotateCcw className="w-5 h-5" />
              {t.closeBtn}
            </button>
            {/* Only show remove button in normal mode */}
            {!isFinalWinner && (
              <button
                onClick={() => {
                  onRemove();
                  onClose();
                }}
                className="w-full py-3 text-red-600 dark:text-red-400 font-semibold bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <Trash2 className="w-4 h-4" />
                {tReplace(t.removeWinnerBtn, { name: winnerName })}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
