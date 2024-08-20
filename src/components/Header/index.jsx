import React, { useState, useEffect } from "react"; // Импортируем useState и useEffect
import { Link, useNavigate, useLocation } from "react-router-dom"; // Импортируем Link, useNavigate и useLocation
import styles from "./Header.module.scss";
import SvgLogo from "../../svg/SvgLogo";
import {
  MdFavoriteBorder,
  MdPersonOutline,
  MdOutlineShoppingBag,
  MdOutlineShoppingBasket,
  MdSearch,
} from "react-icons/md";
import DOMPurify from 'dompurify'; // Импортируем библиотеку для санитизации

const Header = () => {
  const [searchQuery, setSearchQuery] = useState(""); // Состояние для хранения запроса поиска
  const navigate = useNavigate(); // Хук для навигации
  const location = useLocation(); // Хук для получения текущего URL

  // Эффект для инициализации строки поиска из URL
  useEffect(() => {
    const params = new URLSearchParams(location.search); // Получаем параметры из URL
    const query = params.get("query"); // Извлекаем параметр query
    if (query) {
      setSearchQuery(DOMPurify.sanitize(query)); // Санитизируем и устанавливаем значение
    }
  }, [location.search]); // Запускаем эффект при изменении URL

  // Функция для обработки нажатия кнопки поиска
  const handleSearch = () => {
    if (searchQuery.trim()) { // Проверяем, что запрос не пустой
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`); // Перенаправляем на страницу поиска с запросом
    } else {
      navigate('/search'); // Переход на страницу поиска без параметров
    }
  };

  // Обработчик нажатия клавиш
  const handleKeyDown = (e) => {
    if (e.key === "Enter") { // Проверяем, нажата ли клавиша Enter
      handleSearch(); // Вызываем функцию поиска
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <SvgLogo />
        </Link>
        <div className={styles.search}>
          <input 
            type="text" 
            placeholder="Поиск..." 
            value={searchQuery} // Устанавливаем значение input
            onChange={(e) => setSearchQuery(e.target.value)} // Обновляем состояние при вводе
            onKeyDown={handleKeyDown} // Обработчик нажатия клавиш
          />
          <button 
            className={styles.searchButton} 
            onClick={handleSearch} // Обработчик нажатия кнопки
          >
            <MdSearch className={styles.searchIcon} />
          </button>
        </div>
        <nav className={styles.nav}>
          <Link to="/login">
            <MdPersonOutline />
            Войти
          </Link>
          <Link to="/orders">
            <MdOutlineShoppingBag />
            Заказы
          </Link>
          <Link to="/favorites">
            <MdFavoriteBorder />
            Избранное
          </Link>
          <Link to="/cart">
            <MdOutlineShoppingBasket />
            Корзина
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;