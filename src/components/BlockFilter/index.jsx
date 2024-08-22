import React, { useState, useEffect } from "react"; // Импортируем useState и useEffect
import { useLocation, useNavigate } from "react-router-dom"; // Импортируем useLocation и useNavigate
import styles from "./BlockFilter.module.scss"; // Импортируем стили
import announcementsData from "../../assets/announcements.json"; // Импортируем данные объявлений

export const BlockFilter = () => {
  const [selectedPlatforms, setSelectedPlatforms] = useState([]); // Состояние для выбранных площадок
  const [minViews, setMinViews] = useState(""); // Состояние для минимального количества просмотров
  const [maxViews, setMaxViews] = useState(""); // Состояние для максимального количества просмотров
  const [minPrice, setMinPrice] = useState(""); // Состояние для минимальной стоимости
  const [maxPrice, setMaxPrice] = useState(""); // Состояние для максимальной стоимости
  const location = useLocation(); // Получаем текущий URL
  const navigate = useNavigate(); // Хук для навигации

  // Получаем уникальные платформы из данных объявлений
  const platforms = [...new Set(announcementsData.announcements.map(announcement => announcement.platform.name))];

  useEffect(() => {
    const params = new URLSearchParams(location.search); // Получаем параметры из URL

    // Инициализируем значения фильтров из URL
    const platformsFromUrl = params.get("platform") ? params.get("platform").toLowerCase().split(",") : [];
    const minViewsFromUrl = params.get("minViews") || "";
    const maxViewsFromUrl = params.get("maxViews") || "";
    const minPriceFromUrl = params.get("minPrice") || "";
    const maxPriceFromUrl = params.get("maxPrice") || "";

    setSelectedPlatforms(platformsFromUrl);
    setMinViews(minViewsFromUrl);
    setMaxViews(maxViewsFromUrl);
    setMinPrice(minPriceFromUrl);
    setMaxPrice(maxPriceFromUrl);
  }, [location.search]);

  const handlePlatformChange = (platform) => {
    setSelectedPlatforms((prev) => 
      prev.includes(platform.toLowerCase()) ? prev.filter(p => p !== platform.toLowerCase()) : [...prev, platform.toLowerCase()]
    );
  };

  const handleShowAnnouncements = () => {
    const params = new URLSearchParams(location.search);

    // Устанавливаем параметры фильтрации в URL
    if (selectedPlatforms.length) {
      params.set("platform", selectedPlatforms.join(","));
    } else {
      params.delete("platform"); // Удаляем параметр, если нет выбранных платформ
    }

    // Устанавливаем минимальные и максимальные значения
    if (minViews) {
      params.set("minViews", minViews);
    } else {
      params.delete("minViews"); // Удаляем параметр, если значение пустое
    }

    if (maxViews) {
      params.set("maxViews", maxViews);
    } else {
      params.delete("maxViews"); // Удаляем параметр, если значение пустое
    }

    if (minPrice) {
      params.set("minPrice", minPrice);
    } else {
      params.delete("minPrice"); // Удаляем параметр, если значение пустое
    }

    if (maxPrice) {
      params.set("maxPrice", maxPrice);
    } else {
      params.delete("maxPrice"); // Удаляем параметр, если значение пустое
    }

    navigate(`/search?${params.toString()}`); // Переход к странице с параметрами фильтров
  };

  const handleResetFilters = () => {
    // Сбрасываем все фильтры
    setSelectedPlatforms([]);
    setMinViews("");
    setMaxViews("");
    setMinPrice("");
    setMaxPrice("");
    
    // Удаляем все параметры из URL
    const params = new URLSearchParams(location.search);
    params.delete("platform");
    params.delete("minViews");
    params.delete("maxViews");
    params.delete("minPrice");
    params.delete("maxPrice");
    
    navigate(`/search?${params.toString()}`); // Переход к странице без параметров фильтров
  };

  return (
    <div className={styles.blockFilter}>
      <h2 className={styles.title}>Фильтры</h2>
      <div className={styles.filterGroup}>
        <h3>Площадка</h3>
        {platforms.map((platform) => (
          <label key={platform} className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={selectedPlatforms.includes(platform.toLowerCase())}
              onChange={() => handlePlatformChange(platform)}
            />
            {platform}
          </label>
        ))}
      </div>
      <div className={styles.filterGroup}>
        <h3>Количество просмотров</h3>
        <div className={styles.rangeInputGroup}>
          <input
            type="number"
            min="0" // Запрет на отрицательные значения
            placeholder="От"
            value={minViews}
            onChange={(e) => setMinViews(e.target.value)} // Установка значения
            className={styles.input}
          />
          <input
            type="number"
            min="0" // Запрет на отрицательные значения
            placeholder="До"
            value={maxViews}
            onChange={(e) => setMaxViews(e.target.value)} // Установка значения
            className={styles.input}
          />
        </div>
      </div>
      <div className={styles.filterGroup}>
        <h3>Стоимость</h3>
        <div className={styles.rangeInputGroup}>
          <input
            type="number"
            min="0" // Запрет на отрицательные значения
            placeholder="От"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)} // Установка значения
            className={styles.input}
          />
          <input
            type="number"
            min="0" // Запрет на отрицательные значения
            placeholder="До"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)} // Установка значения
            className={styles.input}
          />
        </div>
      </div>
      <button className={styles.showAnnouncementsButton} onClick={handleShowAnnouncements}>
        Показать предложения
      </button>
      <button className={styles.resetFiltersButton} onClick={handleResetFilters}>
        Сбросить фильтры
      </button>
    </div>
  );
};