import React from "react";

import { ArticleBanner } from "../components/ArticleBanner";
import { Recommendations } from "../components/Recommendations";
import { TopList } from "../components/TopList";
import { BlockMyAnnouncements } from "../components/BlockMyAnnouncements";

const Home = () => {
  return (
    <div className="containerColumns">
      <div className="leftColumn">
        <ArticleBanner />
        <Recommendations />
      </div>
      <div className="rightColumn">
        <BlockMyAnnouncements />
        <TopList />
      </div>
    </div>
  );
};

export default Home;