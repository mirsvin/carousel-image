import React, { createContext, useState, useEffect } from "react";

// Import translations
import translationsRU from "./locales/ru.json";
import translationsEN from "./locales/en.json";

export const LocaleContext = createContext();

const LocaleProvider = ({ children }) => {
  const [locale, setLocale] = useState("ru"); // Default locale is Russian

  // Select translations based on locale
  const translations = {
    ru: translationsRU,
    en: translationsEN,
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
