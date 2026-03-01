"use client";

import { useState } from "react";
import AdUnit from "@/components/AdUnit";
import InputArea from "@/components/InputArea";
import { useLanguage } from "@/contexts/LanguageContext";
import Roulette from "@/components/Roulette";
import WinnerModal from "@/components/WinnerModal";

export default function HomeClient() {
  const { t } = useLanguage();
  
  const [rawText, setRawText] = useState("Alice\nBob\nCharlie\nDavid\nEve\nFrank");
  const [items, setItems] = useState<string[]>(["Alice", "Bob", "Charlie", "David", "Eve", "Frank"]);
  
  // Winner Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [winnerName, setWinnerName] = useState("");

  const handleWinner = (winner: string) => {
    setWinnerName(winner);
    setIsModalOpen(true);
  };

  const handleRemoveWinner = () => {
    const newItems = items.filter(item => item !== winnerName);
    setItems(newItems);
    setRawText(newItems.join("\n"));
  };

  return (
    <div className="flex flex-col w-full h-full gap-6 pb-12">
      {/* Top Ad Unit */}
      <AdUnit position="top" />

      {/* Main App Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch w-full flex-1 min-h-[600px]">
        
        {/* Left Side: Roulette (Takes up 7 or 8 columns on large screens) */}
        <div className="lg:col-span-8 flex flex-col items-center justify-center bg-white rounded-3xl shadow-sm border border-gray-100 p-4 md:p-8 relative min-h-[400px]">
          <Roulette items={items} onWinner={handleWinner} />
        </div>

        {/* Right Side: Input Area (Takes up 4 or 5 columns on large screens) */}
        <div className="lg:col-span-4 h-[500px] lg:h-auto">
          <InputArea 
            items={items} 
            setItems={setItems}
            rawText={rawText}
            setRawText={setRawText}
          />
        </div>
      </div>

      {/* Bottom Ad Unit */}
      <AdUnit position="bottom" />

      {/* Confetti Winner Modal */}
      <WinnerModal 
        isOpen={isModalOpen}
        winnerName={winnerName}
        onClose={() => setIsModalOpen(false)}
        onRemove={handleRemoveWinner}
      />
    </div>
  );
}
