import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.scss";
import { FaVk, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.links}>
          <h3>Навигация</h3>
          <ul>
            <li><Link to="/">Главная</Link></li>
            <li><Link to="/about">О нас</Link></li>
            {/* <li><Link to="/services">Услуги</Link></li>
            <li><Link to="/contact">Контакты</Link></li> */}
          </ul>
        </div>
        <div className={styles.contact}>
          <h3>Контакты</h3>
          <p>Email: <a href="mailto:sergei_9802@mail.ru">sergei_9802@mail.ru</a></p>
          <p>Телефон: <a href="tel:+79277747345">+7 (927) 774-73-45</a></p>
        </div>
        <div className={styles.social}>
          <h3>Социальные сети</h3>
          <div className={styles.socialIcons}>
            <a href="https://vk.com/public222466081" target="_blank" rel="noopener noreferrer">
              <FaVk />
            </a>
            {/* <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a> */}
          </div>
        </div>
      </div>
      <div className={styles.copyRight}>
        <p>© {new Date().getFullYear()} EasyAdvert. Все права защищены.</p>
      </div>
    </footer>
  );
}