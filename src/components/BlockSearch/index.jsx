import React, { useState, useEffect, useRef } from "react"; // Импортируем useState, useEffect и useRef
import { useLocation } from "react-router-dom"; // Импортируем useLocation
import { MdArrowDropDown } from "react-icons/md"; // Импортируем иконку
import { AnnouncementCard } from "../AnnouncementCard"; // Импортируем компонент карточки объявления
import styles from "./BlockSearch.module.scss"; // Импортируем стили
import DOMPurify from "dompurify"; // Импортируем библиотеку для санитизации
import announcementsData from "../../assets/announcements.json"; // Импортируем данные объявлений

export const BlockSearch = () => {
  const [filteredAnnouncements, setFilteredAnnouncements] = useState([]); // Состояние для хранения отфильтрованных объявлений
  const [showPriceMenu, setShowPriceMenu] = useState(false); // Состояние для отображения меню сортировки по цене
  const [showViewsMenu, setShowViewsMenu] = useState(false); // Состояние для отображения меню сортировки по просмотрам
  const [sortBy, setSortBy] = useState(""); // Состояние для хранения текущего способа сортировки
  const [sortOrder, setSortOrder] = useState(""); // Состояние для хранения порядка сортировки
  const location = useLocation(); // Получаем текущий URL
  const userRole = parseInt(localStorage.getItem("user_role")); // Получаем роль пользователя из локального хранилища
  const sortOptionsRef = useRef(null); // Ref для отслеживания элемента сортировки

  useEffect(() => {
    const params = new URLSearchParams(location.search); // Получаем параметры из URL
    const query = params.get("query"); // Извлекаем параметр query
    const { announcements } = announcementsData; // Деструктурируем массив объявлений

    if (query) {
      const sanitizedQuery = DOMPurify.sanitize(query); // Санитизируем запрос
      const relevantAnnouncements = announcements.filter(announcement =>
        announcement.title.toLowerCase().includes(sanitizedQuery.toLowerCase()) || 
        announcement.description.toLowerCase().includes(sanitizedQuery.toLowerCase())
      );

      // Фильтруем объявления по роли пользователя
      const filtered = relevantAnnouncements.filter(announcement => announcement.type.id === userRole);
      setFilteredAnnouncements(filtered);
    } else {
      // Если query пустой, отображаем все объявления, отфильтрованные по роли пользователя
      const filtered = announcements.filter(announcement => announcement.type.id === userRole);
      setFilteredAnnouncements(filtered);
    }
  }, [location.search, userRole]);

  const handleSortByPrice = (order) => {
    const sorted = [...filteredAnnouncements].sort((a, b) => {
      return order === "asc" ? a.price - b.price : b.price - a.price;
    });
    setFilteredAnnouncements(sorted);
    setSortBy("price");
    setSortOrder(order);
    setShowPriceMenu(false); // Закрываем меню после выбора
    setShowViewsMenu(false); // Закрываем меню просмотров, если открыто
  };

  const handleSortByViews = (order) => {
    const sorted = [...filteredAnnouncements].sort((a, b) => {
      return order === "asc" ? a.count_views - b.count_views : b.count_views - a.count_views;
    });
    setFilteredAnnouncements(sorted);
    setSortBy("views");
    setSortOrder(order);
    setShowViewsMenu(false); // Закрываем меню после выбора
    setShowPriceMenu(false); // Закрываем меню цены, если открыто
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortOptionsRef.current && !sortOptionsRef.current.contains(event.target)) {
        setShowPriceMenu(false);
        setShowViewsMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.searchBlock}>
      <div className={styles.header}>
        <h2 className={styles.title}>Поиск</h2>
        <div className={styles.sortOptions} ref={sortOptionsRef}>
          <div className={styles.sortButtonWrapper}>
            <button
              className={styles.sortButton}
              onClick={() => {
                setShowPriceMenu(!showPriceMenu);
                setShowViewsMenu(false); // Закрываем меню просмотров, если открыто
              }}
            >
              {sortBy === "price" ? `По цене (${sortOrder === "asc" ? "по возрастанию" : "по убыванию"})` : "По цене"}
              <MdArrowDropDown className={styles.sortIcon} />
            </button>
            {showPriceMenu && (
              <ul className={styles.sortMenu}>
                <li onClick={() => handleSortByPrice("asc")}>По возрастанию</li>
                <li onClick={() => handleSortByPrice("desc")}>По убыванию</li>
              </ul>
            )}
          </div>
          <div className={styles.sortButtonWrapper}>
            <button
              className={styles.sortButton}
              onClick={() => {
                setShowViewsMenu(!showViewsMenu);
                setShowPriceMenu(false); // Закрываем меню цены, если открыто
              }}
            >
              {sortBy === "views" ? `По просмотрам (${sortOrder === "asc" ? "по возрастанию" : "по убыванию"})` : "По просмотрам"}
              <MdArrowDropDown className={styles.sortIcon} />
            </button>
            {showViewsMenu && (
              <ul className={styles.sortMenu}>
                <li onClick={() => handleSortByViews("asc")}>По возрастанию</li>
                <li onClick={() => handleSortByViews("desc")}>По убыванию</li>
              </ul>
            )}
          </div>
        </div>
      </div>
      {/* Проверка на наличие результатов */}
      {filteredAnnouncements.length === 0 ? (
        <p className={styles.noResults}>Нет найденных результатов по вашему запросу.</p>
      ) : (
        filteredAnnouncements.map((announcement) => (
          <AnnouncementCard
            key={announcement.id}
            title={announcement.title}
            description={announcement.description}
            mainPhoto={announcement.main_photo}
            price={announcement.price}
            countViews={announcement.count_views}
          />
        ))
      )}
    </div>
  );
};