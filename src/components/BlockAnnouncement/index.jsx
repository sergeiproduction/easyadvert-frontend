import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./BlockAnnouncement.module.scss";
import announcementData from "../../assets/announcements.json"; // Изменили путь к файлу JSON

export const BlockAnnouncement = () => {
  const { id } = useParams(); // Получаем id из адресной строки
  const announcement = announcementData.announcements.find(item => item.id === parseInt(id)); // Ищем объявление по id

  // Состояние для отслеживания загрузки изображения
  const [imgError, setImgError] = useState(false);

  // Проверяем наличие объявления после извлечения данных
  if (!announcement) {
    return <div className={styles.error}>Объявление не найдено</div>;
  }

  const { title, date_publish, count_views, main_photo, description } = announcement;

  // Функция для форматирования даты с правильным склонением слов
  const formatDate = (dateString) => {
    const publishDate = new Date(dateString);
    const now = new Date();

    // Устанавливаем время в 00:00 для сравнения только по дате
    publishDate.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);

    const diffTime = now - publishDate; // Разница в миллисекундах
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); // Разница в днях
    const diffMonths = now.getMonth() - publishDate.getMonth() + (12 * (now.getFullYear() - publishDate.getFullYear())); // Разница в месяцах

    if (diffDays === 0) return "Сегодня";
    if (diffDays === 1) return "Вчера";
    if (diffDays < 30) {
      const dayWord = (diffDays % 10 === 1 && diffDays % 100 !== 11) ? "день" :
                      (diffDays % 10 >= 2 && diffDays % 10 <= 4 && (diffDays % 100 < 10 || diffDays % 100 >= 20)) ? "дня" : "дней";
      return `${diffDays} ${dayWord} назад`;
    }
    if (diffMonths === 1) {
      return "1 месяц назад";
    }
    if (diffMonths < 12) {
      const monthWord = (diffMonths % 10 === 1 && diffMonths % 100 !== 11) ? "месяц" :
                        (diffMonths % 10 >= 2 && diffMonths % 10 <= 4 && (diffMonths % 100 < 10 || diffMonths % 100 >= 20)) ? "месяца" : "месяцев";
      return `${diffMonths} ${monthWord} назад`;
    }
    const years = Math.floor(diffMonths / 12);
    const yearWord = (years % 10 === 1 && years % 100 !== 11) ? "год" :
                     (years % 10 >= 2 && years % 10 <= 4 && (years % 100 < 10 || years % 100 >= 20)) ? "года" : "лет";
    return `${years} ${yearWord} назад`;
  };

  return (
    <div className={styles.blockAnnouncement}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.dateTime}>
          <span className={styles.date}>{formatDate(date_publish)}</span>
          <span className={styles.views}>{count_views} просмотров</span>
        </div>
      </div>
      <div className={styles.imageContainer}>
        {imgError ? (
          <div className={styles.imagePlaceholder}>Изображение недоступно</div>
        ) : (
          <img
            src={main_photo}
            alt="Main"
            className={styles.mainPhoto}
            onError={() => setImgError(true)}
          />
        )}
      </div>
      <h3 className={styles.subtitle}>Описание</h3>
      <p className={styles.description}>{description}</p>
    </div>
  );
}