import React from "react";
import styles from "./BlockAbout.module.scss";

export const BlockAbout = () => {
  return (
    <div className={styles.blockAbout}>
      <h2 className={styles.title}>О проекте</h2>
      {/* <div className={styles.legalInfo}>
        <p>Юридическая информация об организации: ИНН 6320077300.</p>
      </div>
      <div className={styles.mapContainer}>
        <h3 className={styles.mapTitle}>Наш юридический адрес:</h3>
        <div className={styles.map}>
          <iframe
            title="OpenStreetMap"
            src="https://www.openstreetmap.org/export/embed.html?bbox=49.19064044952393%2C53.544770137374734%2C49.2449712753296%2C53.56682194309726&layer=mapnik&marker=53.55579747688807%2C49.21780586242676"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div> */}
      <div className={styles.supportInfo}>
        <p>
          Проект реализован при поддержке{" "}
          <a href="https://fasie.ru" target="_blank" rel="noopener noreferrer">
            ФСИ (Фонда Содействия Инновациям)
          </a>
          , предоставленного в рамках программы «Студенческий стартап»
          федерального проекта{" "}
          <a
            href="https://univertechpred.ru"
            target="_blank"
            rel="noopener noreferrer"
          >
            «Платформа университетского технологического предпринимательства»
          </a>
          .
        </p>
      </div>
    </div>
  );
};

