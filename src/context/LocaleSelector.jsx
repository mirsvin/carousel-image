import React, { useContext } from "react";
import { LocaleContext } from "./LocaleContext";

const LocaleSelector = () => {
  const { locale, setLocale } = useContext(LocaleContext);

  const changeLocale = (newLocale) => {
    setLocale(newLocale);
  };

  return (
    <div>
      <button onClick={() => changeLocale("ru")}>RU</button>
      <button onClick={() => changeLocale("en")}>EN</button>
    </div>
  );
};

export default LocaleSelector;
