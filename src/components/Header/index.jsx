import React from "react";
import { Link } from "react-router-dom"; // Импортируем Link
import styles from "./Header.module.scss";

import SvgLogo from "../../svg/SvgLogo";

import {
  MdFavoriteBorder,
  MdPersonOutline,
  MdOutlineShoppingBag,
  MdOutlineShoppingBasket,
  MdSearch,
} from "react-icons/md";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <SvgLogo />
        </Link>
        <div className={styles.search}>
          <input type="text" placeholder="Поиск..." />
          <button className={styles.searchButton}>
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