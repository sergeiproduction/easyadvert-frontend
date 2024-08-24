import React, { useState } from 'react';
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md'; // Импортируем иконки
import { Link } from 'react-router-dom'; // Импортируем Link для навигации
import styles from './AnnouncementCard.module.scss';

export const AnnouncementCard = (props) => {
  // Деструктурируем необходимые свойства из props
  const {
    id,
    title,
    description,
    main_photo: mainPhoto,
    price,
    count_views: countViews
  } = props;

  const [imgError, setImgError] = useState(false); // Состояние для отслеживания ошибки загрузки изображения
  const [isFavorite, setIsFavorite] = useState(false); // Состояние для отслеживания избранного

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite); // Переключаем состояние избранного
  };

  // Функция для определения правильного окончания слова "просмотры"
  const getViewsLabel = (count) => {
    if (count % 10 === 1 && count % 100 !== 11) {
      return 'просмотр';
    } else if ((count % 10 >= 2 && count % 10 <= 4) && (count % 100 < 10 || count % 100 >= 20)) {
      return 'просмотра';
    } else {
      return 'просмотров';
    }
  };

  return (
    <Link to={`/announcement/${id}`} className={styles.card}>
      <div className={styles.imageContainer}>
        {imgError ? (
          <div className={styles.placeholder}>Изображение недоступно</div>
        ) : (
          <img
            src={mainPhoto}
            alt={title}
            className={styles.mainPhoto}
            onError={() => setImgError(true)} // Устанавливаем ошибку при неудачной загрузке
          />
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.titleContainer}>
          <h3 className={styles.title}>{title}</h3>
          <span 
            className={`${styles.icon} ${styles.favoriteIcon} ${isFavorite ? styles.favorited : ''}`}
            onClick={toggleFavorite}
          >
            {isFavorite ? <MdFavorite /> : <MdFavoriteBorder />}
          </span>
        </div>
        <p className={styles.description}>{description}</p>
        <div className={styles.footer}>
          <p className={styles.views}>
            {countViews} {getViewsLabel(countViews)} 
          </p>
          <p className={styles.price}>{price} ₽</p>
        </div>
      </div>
    </Link>
  );
}