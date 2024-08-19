import React from 'react';
import styles from './TopList.module.scss';
import topItemsData from '../../assets/topItems.json';

export const TopList = () => {
  const { title, items } = topItemsData;

  return (
    <div className={styles.topList}>
      <h2 className={styles.title}>{title}</h2>
      <ul className={styles.list}>
        {items.map((item, index) => (
          <li key={index} className={styles.listItem}>
            <span className={styles.itemNumber}>{index + 1}.</span>
            <span className={styles.itemName}>{item.name}</span>
            <span className={styles.itemMetric}>{item.metric} / 10</span>
          </li>
        ))}
      </ul>
    </div>
  );
};