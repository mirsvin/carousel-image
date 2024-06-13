import React, { createContext, useState, useEffect } from "react";

// Import translations
import enTranslations from "../locales/en.json";
import ruTranslations from "../locales/ru.json";

export const LocaleContext = createContext();

const LocaleProvider = ({ children }) => {
  const [locale, setLocale] = useState("ru"); // Default locale is Russian

  // Select translations based on locale
  const translations = {
    ru: ruTranslations,
    en: enTranslations,
  };

  // Function to get translated text based on current locale
  const t = (key) => translations[locale][key] || key;

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}; 

export default LocaleProvider;
