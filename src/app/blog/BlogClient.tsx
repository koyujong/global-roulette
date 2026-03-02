"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import AdUnit from "@/components/AdUnit";
import { blogData } from "@/data/blogData";

export default function BlogClient() {
  const { t, language } = useLanguage();

  const blogPosts = Object.entries(blogData).map(([slug, translations]) => {
    const data = translations[language] || translations['es'];
    return {
      slug,
      title: data.title,
      desc: data.excerpt
    };
  });

  return (
    <div className="flex flex-col w-full h-full gap-8 py-10">
      <header className="mb-8">
        <h1 className="text-4xl font-black text-slate-900 dark:text-slate-50 mb-4 transition-colors">{t.blogTitle}</h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 font-medium transition-colors">
          {language === 'es' 
            ? 'Consejos, tutoriales y guías sobre el uso de la ruleta aleatoria.' 
            : language === 'ko' 
              ? '랜덤 룰렛 활용을 위한 팁, 튜토리얼 및 가이드입니다.' 
              : 'Tips, tutorials, and guides on using the random roulette.'}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post, idx) => (
          <div key={post.slug} className="contents">
            <Link 
              href={`/blog/${post.slug}`} 
              className="p-8 bg-white dark:bg-zinc-950 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:border-indigo-200 dark:hover:border-indigo-800 transition-all group flex flex-col h-full"
            >
              <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-4 leading-tight">
                {post.title}
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6 flex-1 transition-colors">
                {post.desc}
              </p>
              <span className="text-indigo-600 dark:text-indigo-400 font-bold text-sm inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                {language === 'es' ? 'Leer más' : language === 'ko' ? '더 보기' : 'Read more'} →
              </span>
            </Link>

            {/* Mid ad after the 4th post (index 3) */}
            {idx === 3 && (
              <div className="col-span-1 md:col-span-2 lg:col-span-3">
                <AdUnit position="bottom" />
              </div>
            )}
          </div>
        ))}
      </div>


      <div className="mt-12">
        <AdUnit position="bottom" />
      </div>
    </div>
  );
}
