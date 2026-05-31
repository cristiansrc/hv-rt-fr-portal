"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "es";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // Siempre empezar con "en" para asegurar que el componente se renderice
  const [language, setLanguageState] = useState<Language>("en");

  // Inicializar el idioma después del primer render
  useEffect(() => {
    try {
      // Intentar cargar desde localStorage
      if (typeof window !== "undefined" && window.localStorage) {
        const savedLanguage = localStorage.getItem("language") as Language;
        if (savedLanguage === "en" || savedLanguage === "es") {
          setLanguageState(savedLanguage);
          return;
        }
      }
    } catch (e) {
      // Si hay error, continuar
    }

    try {
      // Detectar idioma del navegador
      if (typeof navigator !== "undefined" && navigator.language) {
        const browserLang = navigator.language.split("-")[0].toLowerCase();
        const detectedLang = browserLang === "es" ? "es" : "en";
        setLanguageState(detectedLang);
      }
    } catch (e) {
      // Si hay error, mantener "en"
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem("language", lang);
      }
    } catch (error) {
      // Ignorar errores de localStorage
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
