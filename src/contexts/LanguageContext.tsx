"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { translations, LanguageCode } from "@/translations";

interface LanguageContextProps {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: typeof translations.en;
  tReplace: (text: string, replacements: Record<string, string>) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<LanguageCode>("en"); // Default to English as requested
  
  // Initialize from localStorage if available (client-side only)
  useEffect(() => {
    const savedLang = localStorage.getItem("app_lang") as LanguageCode;
    if (savedLang && translations[savedLang]) {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    localStorage.setItem("app_lang", lang);
    document.documentElement.lang = lang;
  };

  const t = translations[language];

  const tReplace = (text: string, replacements: Record<string, string>) => {
    let result = text;
    for (const key in replacements) {
      result = result.replace(`{${key}}`, replacements[key]);
    }
    return result;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, tReplace }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
