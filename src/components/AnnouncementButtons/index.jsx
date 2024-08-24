import React from "react";
import styles from "./AnnouncementButtons.module.scss";

export const AnnouncementButtons = () => {
  return (
    <div className={styles.buttonBlock}>
      <button className={styles.cartButton}>В корзину</button>
      <button className={styles.orderButton}>Заказ в 1 клик</button>
    </div>
  );
};