"use client";

import { useState } from "react";
import Link from "next/link";
import AdUnit from "@/components/AdUnit";
import InputArea from "@/components/InputArea";
import { useLanguage } from "@/contexts/LanguageContext";
import Roulette from "@/components/Roulette";
import WinnerModal from "@/components/WinnerModal";

export default function Home() {
  const { t, language } = useLanguage();
  
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

      {/* Blog / Internal Links Section for SEO */}
      <section className="mt-12 py-12 border-t border-gray-100">
        <h3 className="text-2xl font-bold text-slate-800 mb-8 px-2">
          {language === 'es' ? 'Recursos y Guías' : language === 'ko' ? '추천 가이드' : 'Resources & Guides'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link href="/blog/ruleta-decisiones-aleatorias-gratis" className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all group">
            <h4 className="font-bold text-slate-700 group-hover:text-indigo-600 transition-colors">Ruleta de Decisiones Aleatorias Online Gratis</h4>
            <p className="text-sm text-slate-400 mt-2">La mejor herramienta para elegir opciones rápidamente y sin sesgos.</p>
          </Link>
          <Link href="/blog/como-hacer-sorteo-ruleta-personalizada" className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all group">
            <h4 className="font-bold text-slate-700 group-hover:text-indigo-600 transition-colors">Cómo Hacer un Sorteo con Ruleta Personalizada</h4>
            <p className="text-sm text-slate-400 mt-2">Guía paso a paso para organizar rifas y sorteos profesionales.</p>
          </Link>
          <Link href="/blog/ruleta-nombres-sorteos-en-vivo" className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all group">
            <h4 className="font-bold text-slate-700 group-hover:text-indigo-600 transition-colors">Ruleta de Nombres para Sorteos en Vivo</h4>
            <p className="text-sm text-slate-400 mt-2">Potencia tus streamings y eventos con interacción en tiempo real.</p>
          </Link>
          <Link href="/blog/juego-ruleta-videollamadas-amigos" className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all group">
            <h4 className="font-bold text-slate-700 group-hover:text-indigo-600 transition-colors">Juego de Ruleta para Videollamadas</h4>
            <p className="text-sm text-slate-400 mt-2">Diviértete con amigos en Zoom, Google Meet o Teams con retos divertidos.</p>
          </Link>
          <Link href="/blog/generador-opciones-girar-rueda" className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all group">
            <h4 className="font-bold text-slate-700 group-hover:text-indigo-600 transition-colors">Generador de Opciones para Girar la Rueda</h4>
            <p className="text-sm text-slate-400 mt-2">Versatilidad total para tomar decisiones de película, comida o estudio.</p>
          </Link>
        </div>
      </section>

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
