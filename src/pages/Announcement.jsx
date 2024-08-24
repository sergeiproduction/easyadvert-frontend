import React from "react";
import { BlockAnnouncement } from "../components/BlockAnnouncement";
import { AnnouncementButtons } from "../components/AnnouncementButtons";
import { ContactBlock } from "../components/ContactBlock";

const Announcement = () => {
  return (
    <div className="containerColumns">
      <div className="leftColumn">
        <BlockAnnouncement />
      </div>
      <div className="rightColumn">
        <AnnouncementButtons />
        <ContactBlock />
      </div>
    </div>
  );
};

export default Announcement;