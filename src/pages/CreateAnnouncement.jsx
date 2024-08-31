import React from "react";
import { BlockCreateAnnouncement } from "../components/BlockCreateAnnouncement";

import { selectIsAuth } from "../redux/slices/user";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const CreateAnnouncement = () => {
  // Проверка авторизован ли пользователь
  const isAuth = useSelector(selectIsAuth);
  if (!isAuth && !Boolean(window.localStorage.getItem("token"))) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="containerColumns">
      <div className="leftColumn">
        <BlockCreateAnnouncement />
      </div>
      <div className="rightColumn"></div>
    </div>
  );
};

export default CreateAnnouncement;
