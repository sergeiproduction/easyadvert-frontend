import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectIsAuth, logout } from "../../redux/slices/user";
import styles from "./Header.module.scss";
import SvgLogo from "../../svg/SvgLogo";
import {
  MdFavoriteBorder,
  MdPersonOutline,
  MdOutlineShoppingBag,
  MdOutlineShoppingBasket,
  MdSearch,
} from "react-icons/md";
import DOMPurify from 'dompurify';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  // const userName = useSelector((state) => state.user.data?.name); // Получаем имя пользователя из Redux
  const userName = "Выйти";
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false); // Состояние для модального окна

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("query");
    if (query) {
      setSearchQuery(DOMPurify.sanitize(query));
    }
  }, [location.search]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate('/search');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Обработчик выхода из аккаунта
  const handleLogout = () => {
    setShowLogoutConfirmation(true); // Показываем модальное окно
  };

  // Обработчик подтверждения выхода
  const handleConfirmLogout = () => {
    setShowLogoutConfirmation(false);
    dispatch(logout()); // Вызываем действие logout из Redux
    navigate('/'); // Перенаправляем на главную страницу после выхода
  };

  // Обработчик клика вне модального окна
  const handleClickOutside = (e) => {
    if (e.target.classList.contains(styles.logoutModal)) {
      setShowLogoutConfirmation(false);
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button 
            className={styles.searchButton} 
            onClick={handleSearch}
          >
            <MdSearch className={styles.searchIcon} />
          </button>
        </div>
        <nav className={styles.nav}>
          {!isAuth && (
            <Link to="/login">
              <MdPersonOutline />
              Войти
            </Link>
          )}
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
          {isAuth && (
            <div className={styles.userName} onClick={handleLogout}>
              {userName}
            </div>
          )}
        </nav>
      </div>
      {/* Модальное окно для подтверждения выхода */}
      {showLogoutConfirmation && (
        <div className={styles.logoutModal} onClick={handleClickOutside}>
          <div className={styles.logoutModalContent}>
            <h3>Вы уверены, что хотите выйти?</h3>
            <div className={styles.logoutModalButtons}>
              <button className={styles.yesButton} onClick={handleConfirmLogout}>Да</button>
              <button className={styles.noButton} onClick={() => setShowLogoutConfirmation(false)}>Нет</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;