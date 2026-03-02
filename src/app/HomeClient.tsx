"use client";

import { useState, useEffect, useCallback } from "react";
import AdUnit from "@/components/AdUnit";
import InputArea from "@/components/InputArea";
import { useLanguage } from "@/contexts/LanguageContext";
import Roulette from "@/components/Roulette";
import WinnerModal from "@/components/WinnerModal";
import EliminationNotice from "@/components/EliminationNotice";
import { RouletteItem } from "@/types/roulette";
import { Swords, Save, FolderOpen, Link2, Check } from "lucide-react";

const LS_KEY = "roulette_list_v2";

const DEFAULT_ITEMS: RouletteItem[] = [
  { name: "Alice", weight: 1 },
  { name: "Bob", weight: 1 },
  { name: "Charlie", weight: 1 },
  { name: "David", weight: 1 },
  { name: "Eve", weight: 1 },
  { name: "Frank", weight: 1 },
];

// Parse ?list=Name1:2,Name2:1,Name3 from URL
function parseUrlList(search: string): RouletteItem[] | null {
  try {
    const params = new URLSearchParams(search);
    const raw = params.get("list");
    if (!raw) return null;
    const parsed = raw.split(",").map(entry => {
      const colonIdx = entry.lastIndexOf(":");
      if (colonIdx > 0) {
        const name = decodeURIComponent(entry.slice(0, colonIdx)).trim();
        const weight = parseInt(entry.slice(colonIdx + 1)) || 1;
        return { name, weight };
      }
      return { name: decodeURIComponent(entry).trim(), weight: 1 };
    }).filter(i => i.name.length > 0);
    return parsed.length > 0 ? parsed : null;
  } catch {
    return null;
  }
}

export default function HomeClient() {
  const { t } = useLanguage();
  
  const [items, setItems] = useState<RouletteItem[]>(DEFAULT_ITEMS);
  const [mounted, setMounted] = useState(false);

  // Winner modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [winnerName, setWinnerName] = useState("");
  const [isFinalWinner, setIsFinalWinner] = useState(false);

  // Survival mode
  const [isSurvivalMode, setIsSurvivalMode] = useState(false);
  const [eliminationName, setEliminationName] = useState<string | null>(null);

  // Toast feedback
  const [toast, setToast] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  };

  // On mount: load from URL first, then localStorage
  useEffect(() => {
    const fromUrl = parseUrlList(window.location.search);
    if (fromUrl) {
      setItems(fromUrl);
      // Clean up URL without reloading
      window.history.replaceState({}, "", window.location.pathname);
    } else {
      try {
        const saved = localStorage.getItem(LS_KEY);
        if (saved) {
          const parsed: RouletteItem[] = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) setItems(parsed);
        }
      } catch {}
    }
    setMounted(true);
  }, []);

  // Save handlers
  const handleSave = useCallback(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(items));
      showToast(t.listSaved);
    } catch {
      showToast("Error saving");
    }
  }, [items, t.listSaved]);

  const handleLoad = useCallback(() => {
    try {
      const saved = localStorage.getItem(LS_KEY);
      if (saved) {
        const parsed: RouletteItem[] = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setItems(parsed);
          showToast(t.loadList + " ✓");
        }
      } else {
        showToast(t.noSavedList);
      }
    } catch {
      showToast(t.noSavedList);
    }
  }, [t.loadList, t.noSavedList]);

  const handleCopyLink = useCallback(async () => {
    const listStr = items.map(i =>
      i.weight !== 1
        ? `${encodeURIComponent(i.name)}:${i.weight}`
        : encodeURIComponent(i.name)
    ).join(",");
    const url = `${window.location.origin}${window.location.pathname}?list=${listStr}`;
    try {
      await navigator.clipboard.writeText(url);
      showToast(t.linkCopied);
    } catch {
      // Fallback: prompt
      window.prompt("Copy this link:", url);
    }
  }, [items, t.linkCopied]);

  // Survival mode logic
  const handleWinner = (winner: string) => {
    if (isSurvivalMode) {
      const remaining = items.filter(i => i.name !== winner);
      if (remaining.length <= 1) {
        setEliminationName(winner);
        setTimeout(() => {
          setItems(remaining);
          setWinnerName(remaining.length === 1 ? remaining[0].name : winner);
          setIsFinalWinner(true);
          setIsModalOpen(true);
          setEliminationName(null);
        }, 1900);
      } else {
        setEliminationName(winner);
      }
    } else {
      setWinnerName(winner);
      setIsFinalWinner(false);
      setIsModalOpen(true);
    }
  };

  const handleEliminationDone = () => {
    if (eliminationName) {
      setItems(prev => prev.filter(i => i.name !== eliminationName));
      setEliminationName(null);
    }
  };

  const handleRemoveWinner = () => {
    setItems(prev => prev.filter(i => i.name !== winnerName));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (isFinalWinner) {
      setItems(DEFAULT_ITEMS);
      setIsFinalWinner(false);
    }
  };

  return (
    <div className="flex flex-col w-full h-full gap-4 pb-12">
      <AdUnit position="top" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch w-full flex-1 min-h-[600px]">
        
        {/* Left Side: Roulette */}
        <div className="lg:col-span-8 flex flex-col bg-white dark:bg-zinc-950 rounded-3xl shadow-sm border border-gray-100 dark:border-zinc-800 transition-colors duration-300 overflow-hidden">
          
          {isSurvivalMode && (
            <div className="flex items-center justify-center gap-2 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold tracking-wider">
              <Swords className="w-3.5 h-3.5" />
              {t.survivalIntro}
              <span className="bg-white/20 rounded-full px-2 py-0.5">{items.length} left</span>
            </div>
          )}

          <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 relative min-h-[400px]">
            <Roulette items={items} onWinner={handleWinner} />
          </div>

          <div className="px-6 pb-5 flex justify-end">
            <button
              onClick={() => setIsSurvivalMode(s => !s)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all active:scale-95 ${
                isSurvivalMode
                  ? "bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-md shadow-red-200 dark:shadow-red-900"
                  : "bg-gray-100 dark:bg-zinc-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-zinc-700"
              }`}
            >
              <Swords className="w-4 h-4" />
              {isSurvivalMode ? t.survivalModeOn : t.survivalMode}
            </button>
          </div>
        </div>

        {/* Right Side: Input Area + Save/Share toolbar */}
        <div className="lg:col-span-4 flex flex-col gap-2 h-[550px] lg:h-auto">
          <InputArea items={items} setItems={setItems} />

          {/* Save / Load / Share row */}
          {mounted && (
            <div className="flex items-center gap-2">
              <button
                onClick={handleSave}
                title={t.saveList}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 rounded-xl transition-colors active:scale-95"
              >
                <Save className="w-3.5 h-3.5" />
                {t.saveList}
              </button>
              <button
                onClick={handleLoad}
                title={t.loadList}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 rounded-xl transition-colors active:scale-95"
              >
                <FolderOpen className="w-3.5 h-3.5" />
                {t.loadList}
              </button>
              <button
                onClick={handleCopyLink}
                title={t.copyLink}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-bold text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/20 hover:bg-violet-100 dark:hover:bg-violet-900/40 rounded-xl transition-colors active:scale-95"
              >
                <Link2 className="w-3.5 h-3.5" />
                {t.copyLink}
              </button>
            </div>
          )}
        </div>
      </div>

      <AdUnit position="bottom" />

      {/* Toast notification */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-bold px-5 py-3 rounded-full shadow-xl animate-in fade-in slide-in-from-bottom-2 duration-200">
          <Check className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
          {toast}
        </div>
      )}

      {/* Elimination Notice */}
      {eliminationName && (
        <EliminationNotice name={eliminationName} onDone={handleEliminationDone} />
      )}

      {/* Winner Modal */}
      <WinnerModal
        isOpen={isModalOpen}
        winnerName={winnerName}
        onClose={handleCloseModal}
        onRemove={handleRemoveWinner}
        isFinalWinner={isFinalWinner}
      />
    </div>
  );
}
