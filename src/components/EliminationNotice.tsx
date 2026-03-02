"use client";

import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Skull } from "lucide-react";

interface EliminationNoticeProps {
  name: string;
  onDone: () => void;
}

export default function EliminationNotice({ name, onDone }: EliminationNoticeProps) {
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(onDone, 1800);
    return () => clearTimeout(timer);
  }, [name, onDone]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div className="animate-in zoom-in-95 fade-in duration-200 bg-gray-900/90 dark:bg-black/90 text-white rounded-3xl px-10 py-8 flex flex-col items-center gap-3 shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center animate-bounce">
          <Skull className="w-8 h-8 text-red-400" />
        </div>
        <p className="text-red-400 font-black text-xl tracking-widest uppercase">{t.eliminated}</p>
        <p className="text-white text-3xl font-black">{name}</p>
      </div>
    </div>
  );
}
