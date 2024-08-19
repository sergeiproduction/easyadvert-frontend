import React from "react";
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
        <a href="/" className={styles.logo}>
          <SvgLogo />
        </a>
        <div className={styles.search}>
            <input type="text" placeholder="Поиск..." />
            <button className={styles.searchButton}>
                <MdSearch className={styles.searchIcon} />
            </button>
        </div>
        <nav className={styles.nav}>
          <a href="/login">
            {/* Иконка входа */}
            <MdPersonOutline />
            Войти
          </a>
          <a href="/orders">
            {/* Иконка заказов */}
            <MdOutlineShoppingBag />
            Заказы
          </a>
          <a href="/favorites">
            {/* Иконка избранного */}
            <MdFavoriteBorder />
            Избранное
          </a>
          <a href="/cart">
            {/* Иконка корзины */}
            <MdOutlineShoppingBasket />
            Корзина
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
