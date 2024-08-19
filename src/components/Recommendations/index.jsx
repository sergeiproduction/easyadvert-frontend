import React from 'react';
import styles from './Recommendations.module.scss';
import { AnnouncementCard } from '../AnnouncementCard';
import announcementsData from "../../assets/announcements.json";

export const Recommendations = () => {
  const { announcements } = announcementsData; // Деструктурируем массив объявлений

  return (
    <div className={styles.recommendations}>
      <h2 className={styles.title}>Рекомендации</h2>
      <div className={styles.cardsContainer}>
        {announcements.map((announcement) => (
          <AnnouncementCard 
            key={announcement.id} 
            title={announcement.title} 
            description={announcement.description} 
            mainPhoto={announcement.main_photo} 
            price={announcement.price} 
            countViews={announcement.count_views} 
          />
        ))}
      </div>
    </div>
  );
};