import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LocaleContext, LocaleContextType } from "../context/LocaleContext";

const HelpPage: React.FC = () => {
  const { t } = useContext(LocaleContext) as LocaleContextType;

  return (
    <div>
      <h2>{t("helpPageTitle")}</h2>
      <p>{t("helpPageContent")}</p>
      <Link to="/">{t("backButton")}</Link>
    </div>
  );
};

export default HelpPage;
