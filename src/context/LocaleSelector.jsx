import React, { useContext } from "react";
import { LocaleContext } from "./LocaleContext";

const LocaleSelector = () => {
  const { locale, setLocale } = useContext(LocaleContext);

  const changeLocale = (event) => {
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
