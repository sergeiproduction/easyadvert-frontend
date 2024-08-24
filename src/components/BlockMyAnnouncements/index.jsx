import React from "react";
import announcements from "../../assets/announcements.json";
import styles from "./BlockMyAnnouncements.module.scss";
import { Link } from "react-router-dom";

export const BlockMyAnnouncements = () => {
  return (
    <div className={styles.block}>
      <h2 className={styles.title}>Мои объявления</h2>
      <div className={styles.announcementList}>
        {announcements.announcements.slice(0, 2).map((announcement) => (
          <Link 
            key={announcement.id} 
            to={`/announcement/${announcement.id}`} 
            className={styles.announcementCard}
          >
            <img
              src={announcement.main_photo}
              alt={announcement.title}
              className={styles.photo}
            />
            <div className={styles.info}>
              <h3 className={styles.name}>{announcement.title}</h3>
              <p className={styles.price}>{announcement.price} руб.</p>
            </div>
          </Link>
        ))}
      </div>
      <Link to="/announcement/create" className={styles.button}>
        Разместить объявление
      </Link>
    </div>
  );
};