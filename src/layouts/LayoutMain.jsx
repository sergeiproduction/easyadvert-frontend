import React from "react";
import { Outlet } from "react-router-dom";

import Header from "../components/Header";
import Subheader from "../components/Subheader";

const LayoutMain = () => {
  return (
    <div className="wrapper">
      <Header />
      <Subheader />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutMain;
