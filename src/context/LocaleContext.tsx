import React, { createContext, useState, useEffect, ReactNode } from "react";

// Import translations
import enTranslations from "../locales/en.json";
import ruTranslations from "../locales/ru.json";

export interface LocaleContextType {
  locale: string;
  setLocale: (locale: string) => void;
  t: (key: string) => string;
}

export const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

const LocaleProvider: React.FC<Props> = ({ children }: Props) => {
  const [locale, setLocale] = useState<string>("ru");

  const translations: { [key: string]: any } = {
    ru: ruTranslations,
    en: enTranslations,
  };

  const t = (key: string): string => translations[locale][key] || key;

  useEffect(() => {
    const storedLocale = localStorage.getItem("locale");
    if (storedLocale && (storedLocale === "ru" || storedLocale === "en")) {
      setLocale(storedLocale);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("locale", locale);
  }, [locale]);

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
};

export default LocaleProvider;
