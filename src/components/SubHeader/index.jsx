import React from "react";
import styles from "./Subheader.module.scss";
import { MdLocationOn } from "react-icons/md";

const Subheader = () => {
  return (
    <div className={styles.subheader}>
      <div className={styles.container}>
        <div className={styles.block}>
          <a href="#" className={styles.link}>
            Исполнителям
          </a>
          <span className={styles.separator}></span>
          <a href="#" className={styles.link}>
            Рекламодателям
          </a>
        </div>
        <div className={styles.block}>
          <a href="#" className={styles.link}>
            YouTube
          </a>
          <span className={styles.separator}></span>
          <a href="#" className={styles.link}>
            VK
          </a>
          <span className={styles.separator}></span>
          <a href="#" className={styles.link}>
            Telegram
          </a>
          <span className={styles.separator}></span>
          <a href="#" className={styles.link}>
            Twitch
          </a>
          <span className={styles.separator}></span>
          <a href="#" className={styles.link}>
            Rutube
          </a>
          <span className={styles.separator}></span>
          <a href="#" className={styles.link}>
            Яндекс.Дзен
          </a>
        </div>
        <div className={styles.block}>
          <button className={styles.locationButton}>
            <MdLocationOn className={styles.locationIcon} />
            Москва
          </button>
        </div>
      </div>
    </div>
  );
};

export default Subheader;
