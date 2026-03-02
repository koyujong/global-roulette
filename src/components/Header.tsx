"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Globe } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const pathname = usePathname();

  return (
    <header className="w-full bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-gray-100 dark:border-zinc-800 sticky top-0 z-50 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 group">
            {/* Logo or Title Place */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-400 to-indigo-500 animate-spin-slow shadow-md flex items-center justify-center group-hover:scale-110 transition-transform">
              <div className="w-3 h-3 bg-white dark:bg-zinc-950 rounded-full transition-colors duration-300" />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-indigo-600 hidden md:block">
              {t.title}
            </h1>
          </Link>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <Link 
              href="/" 
              className={`px-3 py-2 rounded-xl text-sm font-bold transition-all ${
                pathname === "/" 
                ? "bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400" 
                : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-gray-50 dark:hover:bg-zinc-800/50"
              }`}
            >
              {t.navHome}
            </Link>
            <Link 
              href="/blog" 
              className={`px-3 py-2 rounded-xl text-sm font-bold transition-all ${
                pathname.startsWith("/blog") 
                ? "bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400" 
                : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-gray-50 dark:hover:bg-zinc-800/50"
              }`}
            >
              {t.navBlog}
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <div className="flex items-center gap-2 sm:gap-3 ml-2 border-l pl-3 sm:pl-4 border-gray-200 dark:border-zinc-800 transition-colors duration-300">
            <Globe className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as any)}
              className="bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-gray-200 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2 outline-none cursor-pointer transition flex-1 appearance-none pr-8 relative min-w-[100px]"
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
      </div>
    </header>
  );
}
