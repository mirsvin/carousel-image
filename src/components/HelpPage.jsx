import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LocaleContext } from "./LocaleContext";

const HelpPage = () => {
  const { t } = useContext(LocaleContext);

  return (
    <div>
      <h2>{t("helpPageTitle")}</h2>
      <p>{t("helpPageContent")}</p>
      <Link to="/">{t("backButton")}</Link>
    </div>
  );
};

export default HelpPage;
