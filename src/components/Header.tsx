"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Globe } from "lucide-react";

export default function Header() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="w-full bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Logo or Title Place */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-400 to-indigo-500 animate-spin-slow shadow-md flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-full" />
          </div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-indigo-600 hidden sm:block">
            {t.title}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Globe className="w-5 h-5 text-gray-500" />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as any)}
            className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2.5 outline-none cursor-pointer transition flex-1 appearance-none pr-8 relative"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
              backgroundPosition: 'right 0.5rem center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '1.5em 1.5em',
            }}
          >
            <option value="es">Español</option>
            <option value="en">English</option>
            <option value="ko">한국어</option>
          </select>
        </div>
      </div>
    </header>
  );
}
