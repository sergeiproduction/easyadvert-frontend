import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./ContactBlock.module.scss";
import announcementData from "../../assets/announcements.json"; // Импортируем данные

export const ContactBlock = () => {
  const { id } = useParams(); // Получаем id из адресной строки
  const [contactName, setContactName] = useState(""); // Состояние для хранения имени контакта

  useEffect(() => {
    // Ищем объявление по id
    const announcement = announcementData.announcements.find(item => item.id === parseInt(id));
    if (announcement) {
      setContactName(announcement.owner.full_name); // Устанавливаем имя контакта
    }
  }, [id]);

  return (
    <div className={styles.contactBlock}>
      <h2 className={styles.contactName}>{contactName}</h2>
      <button className={styles.messageButton}>Написать сообщение</button>
    </div>
  );
};