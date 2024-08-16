import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './BlockNotFound.module.scss';

export const BlockNotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.title}>Страница не найдена :(</h2>
        <p className={styles.message}>Извините, но запрашиваемая страница не существует.</p>
        <button className={styles.button} onClick={handleGoBack}>
          Вернуться назад
        </button>
      </div>
    </div>
  );
};