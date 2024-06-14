import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ImageCarousel from "./components/ImageCarousel";
import HelpPage from "./components/HelpPage";
import LocaleProvider from "./context/LocaleContext";

const App = () => {
  return (
    <LocaleProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ImageCarousel />} />
          <Route path="/help" element={<HelpPage />} />
        </Routes>
      </Router>
    </LocaleProvider>
  );
};

export default App;
