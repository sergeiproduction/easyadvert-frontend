import React from "react";
import { Link } from "react-router-dom";
import styles from "./Subheader.module.scss";
import { MdLocationOn } from "react-icons/md";

const Subheader = () => {
  return (
    <div className={styles.subheader}>
      <div className={styles.container}>
        <div className={styles.block}>
          <Link to="/performers" className={styles.link}>
            Исполнителям
          </Link>
          <span className={styles.separator}></span>
          <Link to="/advertisers" className={styles.link}>
            Рекламодателям
          </Link>
        </div>
        <div className={styles.block}>
          <Link to="/search?platform=youtube" className={styles.link}>
            YouTube
          </Link>
          <span className={styles.separator}></span>
          <Link to="/search?platform=vk" className={styles.link}>
            VK
          </Link>
          <span className={styles.separator}></span>
          <Link to="/search?platform=telegram" className={styles.link}>
            Telegram
          </Link>
          <span className={styles.separator}></span>
          <Link to="/search?platform=twitch" className={styles.link}>
            Twitch
          </Link>
          <span className={styles.separator}></span>
          <Link to="/search?platform=rutube" className={styles.link}>
            Rutube
          </Link>
          <span className={styles.separator}></span>
          <Link to="/search?platform=yandex-dzen" className={styles.link}>
            Яндекс.Дзен
          </Link>
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