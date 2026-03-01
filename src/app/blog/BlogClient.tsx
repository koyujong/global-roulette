"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import AdUnit from "@/components/AdUnit";

export default function BlogClient() {
  const { t, language } = useLanguage();

  const blogPosts = [
    {
      slug: "ruleta-decisiones-aleatorias-gratis",
      title: "Ruleta de Decisiones Aleatorias Online Gratis",
      desc: "La mejor herramienta para elegir opciones rápidamente y sin sesgos."
    },
    {
      slug: "como-hacer-sorteo-ruleta-personalizada",
      title: "Cómo Hacer un Sorteo con Ruleta Personalizada",
      desc: "Guía paso a paso para organizar rifas y sorteos profesionales."
    },
    {
      slug: "ruleta-nombres-sorteos-en-vivo",
      title: "Ruleta de Nombres para Sorteos en Vivo",
      desc: "Potencia tus streamings y eventos con interacción en tiempo real."
    },
    {
      slug: "juego-ruleta-videollamadas-amigos",
      title: "Juego de Ruleta para Videollamadas",
      desc: "Diviértete con amigos en Zoom, Google Meet o Teams con retos divertidos."
    },
    {
      slug: "generador-opciones-girar-rueda",
      title: "Generador de Opciones para Girar la Rueda",
      desc: "Versatilidad total para tomar decisiones de película, comida or estudio."
    }
  ];

  return (
    <div className="flex flex-col w-full h-full gap-8 py-10">
      <header className="mb-8">
        <h1 className="text-4xl font-black text-slate-900 mb-4">{t.blogTitle}</h1>
        <p className="text-lg text-slate-500 font-medium">
          {language === 'es' 
            ? 'Consejos, tutoriales y guías sobre el uso de la ruleta aleatoria.' 
            : language === 'ko' 
              ? '랜덤 룰렛 활용을 위한 팁, 튜토리얼 및 가이드입니다.' 
              : 'Tips, tutorials, and guides on using the random roulette.'}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <Link 
            key={post.slug}
            href={`/blog/${post.slug}`} 
            className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all group flex flex-col h-full"
          >
            <h2 className="text-xl font-black text-slate-800 group-hover:text-indigo-600 transition-colors mb-4 leading-tight">
              {post.title}
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-1">
              {post.desc}
            </p>
            <span className="text-indigo-600 font-bold text-sm inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              {language === 'es' ? 'Leer más' : language === 'ko' ? '더 보기' : 'Read more'} →
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-12">
        <AdUnit position="bottom" />
      </div>
    </div>
  );
}
