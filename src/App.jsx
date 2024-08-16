import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import "./scss/app.scss";

// import MainLayout from "./layouts/MainLayout";

import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      {/* Страница не найдена */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
