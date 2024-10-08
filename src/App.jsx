import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import { fetchUser } from "./redux/slices/user";

import "./scss/app.scss";

import LayoutMain from "./layouts/LayoutMain";

import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Announcement from "./pages/Announcement";
import CreateAnnouncement from "./pages/CreateAnnouncement";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Проверяем, есть ли уже роль в локальном хранилище
    if (!localStorage.getItem("user_role")) {
      // Устанавливаем роль "Рекламодатель" (0) по умолчанию
      localStorage.setItem("user_role", "0"); // 0 - рекламодатель
      window.location.reload(); // Обновляем страницу
    }

    if (localStorage.getItem("token")) {
      dispatch(fetchUser());
    }

  }, []); // Пустой массив зависимостей означает, что этот эффект выполнится только один раз при монтировании

  return (
    <Routes>
      <Route path="/" element={<LayoutMain />}>
        <Route path="" element={<Home />} />
        <Route path="search" element={<Search />} />

        <Route path="announcement">
          <Route index element={<Announcement />} />
          <Route path="create" element={<CreateAnnouncement />} />
          <Route path=":id" element={<Announcement />} />
          <Route path=":id/edit" element={<Announcement />} />
        </Route>

        <Route path="about" element={<About />} />

      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Страница не найдена */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
