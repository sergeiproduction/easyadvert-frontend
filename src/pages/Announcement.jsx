import React from "react";
import { BlockAnnouncement } from "../components/BlockAnnouncement";

const Announcement = () => {
  return (
    <div className="containerColumns">
      <div className="leftColumn">
        <BlockAnnouncement />
      </div>
      <div className="rightColumn">

      </div>
    </div>
  );
};

export default Announcement;