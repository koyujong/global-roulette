"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import AdUnit from "./AdUnit";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface BlogPostProps {
  title: string;
  description: string;
  content: React.ReactNode;
}

export default function BlogPost({ title, description, content }: BlogPostProps) {
  const { t } = useLanguage();

  return (
    <article className="max-w-4xl mx-auto py-10 px-4">
      <Link 
        href="/"
        className="inline-flex items-center gap-2 text-indigo-600 font-medium hover:text-indigo-800 transition-colors mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        {t.closeBtn}
      </Link>

      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
          {title}
        </h1>
        <p className="text-xl text-slate-500 leading-relaxed font-medium">
          {description}
        </p>
      </header>

      {/* Middle Ad Unit for high engagement */}
      <div className="my-10">
        <AdUnit position="top" />
      </div>

      <div className="prose prose-slate prose-lg max-w-none 
        prose-headings:font-black prose-headings:text-slate-900 
        prose-p:text-slate-600 prose-p:leading-loose
        prose-strong:text-indigo-600">
        {content}
      </div>

      <section className="mt-16 p-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl text-white text-center shadow-xl">
        <h2 className="text-2xl font-bold mb-4">¿Listo para probar tu suerte?</h2>
        <p className="mb-8 text-indigo-100 italic">Prueba nuestra ruleta aleatoria gratuita y personalizada hoy mismo.</p>
        <Link 
          href="/"
          className="inline-block px-8 py-4 bg-white text-indigo-600 font-black rounded-xl hover:bg-indigo-50 transition-colors shadow-lg shadow-indigo-900/20 active:scale-95"
        >
          {t.spinBtn}
        </Link>
      </section>

      <div className="mt-12">
        <AdUnit position="bottom" />
      </div>
    </article>
  );
}
