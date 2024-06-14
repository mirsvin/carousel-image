import React, { useContext, ChangeEvent } from "react";
import { LocaleContext, LocaleContextType } from "./LocaleContext";

const LocaleSelector: React.FC = () => {
  const { locale, setLocale } = useContext(LocaleContext) as LocaleContextType;

  const changeLocale = (event: ChangeEvent<HTMLSelectElement>) => {
    setLocale(event.target.value);
  };

  return (
    <select value={locale} onChange={changeLocale}>
      <option value="ru">RU</option>
      <option value="en">EN</option>
    </select>
  );
};

export default LocaleSelector;
