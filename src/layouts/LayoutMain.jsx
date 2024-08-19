import React from "react";
import { Outlet } from "react-router-dom";

import Header from "../components/Header";
import Subheader from "../components/Subheader";
import { Footer } from "../components/Footer";

const LayoutMain = () => {
  return (
    <div className="wrapper">
      <Header />
      <Subheader />
      <div className="content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default LayoutMain;
