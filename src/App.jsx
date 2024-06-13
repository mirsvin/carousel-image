import React from "react";
import { BrowserRouter as Router, Route, Routes, RouteProps } from "react-router-dom";
import ImageCarousel from "./components/ImageCarousel";
import HelpPage from "./components/HelpPage";
import LocaleProvider from "./context/LocaleContext";
import LocaleSelector from "./context/LocaleSelector";

const App = () => {
  return (
    <LocaleProvider>
      <Router>
        <LocaleSelector />
        <Routes>
          <Route path="/" element={<ImageCarousel />} />
          <Route path="/help" element={<HelpPage />} />
        </Routes>
      </Router>
    </LocaleProvider>
  );
};

export default App;
