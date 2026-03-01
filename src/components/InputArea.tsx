"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Shuffle } from "lucide-react";

interface InputAreaProps {
  items: string[];
  setItems: (items: string[]) => void;
  rawText: string;
  setRawText: (text: string) => void;
}

export default function InputArea({ items, setItems, rawText, setRawText }: InputAreaProps) {
  const { t } = useLanguage();

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setRawText(text);
    
    // Parse entries by newline
    const parsedItems = text
      .split("\n")
      .map(item => item.trim())
      .filter(item => item.length > 0);
      
    setItems(parsedItems);
  };

  const handleShuffle = () => {
    if (items.length < 2) return;
    
    // Fisher-Yates shuffle
    const newItems = [...items];
    for (let i = newItems.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newItems[i], newItems[j]] = [newItems[j], newItems[i]];
    }
    
    setItems(newItems);
    setRawText(newItems.join("\n"));
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
        <h2 className="font-semibold flex items-center gap-2 text-gray-700">
          <span className="w-6 h-6 rounded-md bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold">
            {items.length}
          </span>
          {t.entriesCount}
        </h2>
        <button
          onClick={handleShuffle}
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-pink-600 bg-pink-50 hover:bg-pink-100 rounded-lg transition-colors active:scale-95"
        >
          <Shuffle className="w-4 h-4" />
          {t.shuffleBtn}
        </button>
      </div>
      
      <div className="flex-1 p-4 relative">
        <textarea
          value={rawText}
          onChange={handleTextChange}
          placeholder={t.inputPlaceholder}
          className="w-full h-full min-h-[300px] md:min-h-full resize-none bg-transparent outline-none text-gray-700 leading-relaxed font-medium placeholder:text-gray-300 placeholder:font-normal"
          spellCheck="false"
        />
        
        {/* Subtle background decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none select-none text-9xl font-black text-indigo-900">
          #
        </div>
      </div>
    </div>
  );
}
