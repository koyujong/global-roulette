"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Shuffle, SlidersHorizontal, List, Plus, Trash2 } from "lucide-react";
import { RouletteItem } from "@/types/roulette";

interface InputAreaProps {
  items: RouletteItem[];
  setItems: (items: RouletteItem[]) => void;
}

export default function InputArea({ items, setItems }: InputAreaProps) {
  const { t } = useLanguage();
  const [isWeightMode, setIsWeightMode] = useState(false);
  
  // Raw text for simple mode
  const [rawText, setRawText] = useState(
    items.map(i => i.name).join("\n")
  );

  // ── Simple mode handlers ────────────────────────────────────
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setRawText(text);
    const names = text
      .split("\n")
      .map(s => s.trim())
      .filter(s => s.length > 0);
    // Keep existing weights, add default 1 for new items
    setItems(
      names.map(name => {
        const existing = items.find(i => i.name === name);
        return { name, weight: existing ? existing.weight : 1 };
      })
    );
  };

  const handleShuffle = () => {
    if (items.length < 2) return;
    const newItems = [...items];
    for (let i = newItems.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newItems[i], newItems[j]] = [newItems[j], newItems[i]];
    }
    setItems(newItems);
    setRawText(newItems.map(i => i.name).join("\n"));
  };

  // ── Weight mode handlers ─────────────────────────────────────
  const totalWeight = items.reduce((s, i) => s + i.weight, 0);

  const updateWeight = (idx: number, val: number) => {
    const clamped = Math.max(1, Math.min(999, val));
    const next = items.map((item, i) =>
      i === idx ? { ...item, weight: clamped } : item
    );
    setItems(next);
  };

  const removeItem = (idx: number) => {
    const next = items.filter((_, i) => i !== idx);
    setItems(next);
    setRawText(next.map(i => i.name).join("\n"));
  };

  const addItem = () => {
    const newItem: RouletteItem = { name: `Item ${items.length + 1}`, weight: 1 };
    const next = [...items, newItem];
    setItems(next);
    setRawText(next.map(i => i.name).join("\n"));
  };

  const updateName = (idx: number, name: string) => {
    const next = items.map((item, i) =>
      i === idx ? { ...item, name } : item
    );
    setItems(next);
    setRawText(next.map(i => i.name).join("\n"));
  };

  // ── Mode toggle ───────────────────────────────────────────────
  const handleModeToggle = () => {
    if (!isWeightMode) {
      // switching to weight mode — reset all weights to 1 if not set
      setItems(items.map(i => ({ ...i, weight: i.weight || 1 })));
    }
    setIsWeightMode(!isWeightMode);
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-zinc-950 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800 overflow-hidden transition-colors duration-300">

      {/* Header */}
      <div className="p-3 border-b border-gray-100 dark:border-zinc-800 flex items-center justify-between bg-gray-50/50 dark:bg-zinc-900/50 transition-colors duration-300 gap-2 flex-wrap">
        <h2 className="font-semibold flex items-center gap-2 text-gray-700 dark:text-gray-200 text-sm">
          <span className="w-6 h-6 rounded-md bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xs font-bold transition-colors shrink-0">
            {items.length}
          </span>
          {t.entriesCount}
        </h2>
        <div className="flex items-center gap-2">
          {/* Mode Toggle */}
          <button
            onClick={handleModeToggle}
            title={isWeightMode ? "Simple mode" : "Weight mode"}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold rounded-lg transition-all active:scale-95 ${
              isWeightMode
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-indigo-900"
                : "bg-gray-100 dark:bg-zinc-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-zinc-700"
            }`}
          >
            {isWeightMode ? <SlidersHorizontal className="w-3.5 h-3.5" /> : <List className="w-3.5 h-3.5" />}
            {isWeightMode ? t.weightModeOn : t.weightMode}
          </button>
          {!isWeightMode && (
            <button
              onClick={handleShuffle}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-900/30 hover:bg-pink-100 dark:hover:bg-pink-900/50 rounded-lg transition-colors active:scale-95"
            >
              <Shuffle className="w-3.5 h-3.5" />
              {t.shuffleBtn}
            </button>
          )}
        </div>
      </div>

      {/* Body */}
      {isWeightMode ? (
        // ── Weight Mode UI ──────────────────────────────────────
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {items.length === 0 && (
            <p className="text-center text-gray-400 dark:text-gray-600 text-sm py-8">
              항목을 추가해주세요
            </p>
          )}
          {items.map((item, idx) => {
            const pct = totalWeight > 0 ? ((item.weight / totalWeight) * 100).toFixed(1) : "0.0";
            const barWidth = totalWeight > 0 ? (item.weight / totalWeight) * 100 : 0;
            return (
              <div key={idx} className="group bg-gray-50 dark:bg-zinc-900/60 rounded-xl p-3 border border-gray-100 dark:border-zinc-800 hover:border-indigo-200 dark:hover:border-indigo-700 transition-all">
                {/* Name row */}
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={item.name}
                    onChange={e => updateName(idx, e.target.value)}
                    className="flex-1 text-sm font-semibold bg-transparent outline-none text-gray-800 dark:text-gray-100 placeholder:text-gray-300"
                    placeholder="항목 이름"
                  />
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 min-w-[42px] text-right">
                    {pct}%
                  </span>
                  <button
                    onClick={() => removeItem(idx)}
                    className="opacity-0 group-hover:opacity-100 p-1 text-red-400 hover:text-red-600 rounded transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Progress bar */}
                <div className="h-2 bg-gray-200 dark:bg-zinc-700 rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full bg-gradient-to-r from-pink-400 to-indigo-500 rounded-full transition-all duration-300"
                    style={{ width: `${barWidth}%` }}
                  />
                </div>

                {/* Weight stepper */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateWeight(idx, item.weight - 1)}
                    className="w-7 h-7 rounded-lg flex items-center justify-center bg-gray-200 dark:bg-zinc-700 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 text-gray-600 dark:text-gray-300 font-bold transition-colors text-sm leading-none"
                  >−</button>
                  <input
                    type="number"
                    min={1}
                    max={999}
                    value={item.weight}
                    onChange={e => updateWeight(idx, parseInt(e.target.value) || 1)}
                    className="w-14 text-center text-sm font-bold bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg py-1 outline-none focus:border-indigo-400 text-gray-700 dark:text-gray-200 transition-colors"
                  />
                  <button
                    onClick={() => updateWeight(idx, item.weight + 1)}
                    className="w-7 h-7 rounded-lg flex items-center justify-center bg-gray-200 dark:bg-zinc-700 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 text-gray-600 dark:text-gray-300 font-bold transition-colors text-sm leading-none"
                  >+</button>
                  <span className="text-xs text-gray-400 dark:text-gray-500 ml-1">{t.weightMode}</span>
                </div>
              </div>
            );
          })}

          {/* Add Item */}
          <button
            onClick={addItem}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 border-dashed border-gray-200 dark:border-zinc-700 text-gray-400 dark:text-gray-500 hover:border-indigo-300 dark:hover:border-indigo-700 hover:text-indigo-500 transition-all text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            {t.addItem}
          </button>

          {/* Total indicator */}
          <div className="text-center text-xs text-gray-400 dark:text-gray-500 pb-1">
            {t.totalWeight}: <span className="font-bold text-indigo-500">{totalWeight}</span>
          </div>
        </div>
      ) : (
        // ── Simple Mode: textarea ──────────────────────────────
        <div className="flex-1 p-4 relative">
          <textarea
            value={rawText}
            onChange={handleTextChange}
            placeholder={t.inputPlaceholder}
            className="w-full h-full min-h-[300px] md:min-h-full resize-none bg-transparent outline-none text-gray-700 dark:text-gray-200 leading-relaxed font-medium placeholder:text-gray-300 dark:placeholder:text-gray-600 placeholder:font-normal transition-colors"
            spellCheck="false"
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] dark:opacity-[0.05] pointer-events-none select-none text-9xl font-black text-indigo-900 dark:text-indigo-50">
            #
          </div>
        </div>
      )}
    </div>
  );
}
