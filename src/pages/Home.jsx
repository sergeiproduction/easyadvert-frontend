import React from "react";

import { selectIsAuth } from "../redux/slices/user";
import { useSelector } from "react-redux";

import { ArticleBanner } from "../components/ArticleBanner";
import { Recommendations } from "../components/Recommendations";
import { TopList } from "../components/TopList";
import { BlockMyAnnouncements } from "../components/BlockMyAnnouncements";

const Home = () => {
  const isAuth = useSelector(selectIsAuth);

  return (
    <div className="containerColumns">
      <div className="leftColumn">
        <ArticleBanner />
        <Recommendations />
      </div>
      <div className="rightColumn">
        {isAuth && <BlockMyAnnouncements />}
        <TopList />
      </div>
    </div>
  );
};

export default Home;
