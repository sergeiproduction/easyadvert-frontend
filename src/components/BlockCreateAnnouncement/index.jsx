import React, { useState } from "react";
import styles from "./BlockCreateAnnouncement.module.scss";
import { MdDeleteOutline } from "react-icons/md";

export const BlockCreateAnnouncement = () => {
  const [formData, setFormData] = useState({
    ownerName: "",
    ownerRole: "Рекламодатель",
    ownerSubjectType: "Физическое лицо",
    title: "",
    mainPhoto: null,
    description: "",
    price: "",
    type: { id: 0, name: "sale" },
    platform: { id: 1, name: "YouTube", mainUrl: "https://socialnetwork.com", logoUrl: "https://socialnetwork.com/logo.png" },
  });

  const [imgError, setImgError] = useState(false);
  const [imgPreview, setImgPreview] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false); // Состояние для отслеживания перетаскивания

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgPreview(reader.result);
        setFormData((prevData) => ({
          ...prevData,
          mainPhoto: file,
        }));
      };
      reader.readAsDataURL(file);
      setImgError(false);
    } else {
      setImgError(true);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false); // Сбрасываем состояние перетаскивания
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgPreview(reader.result);
        setFormData((prevData) => ({
          ...prevData,
          mainPhoto: file,
        }));
      };
      reader.readAsDataURL(file);
      setImgError(false);
    } else {
      setImgError(true);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true); // Устанавливаем состояние перетаскивания
  };

  const handleDragLeave = () => {
    setIsDragOver(false); // Сбрасываем состояние перетаскивания
  };

  const handleRemoveImage = () => {
    setImgPreview(null);
    setFormData((prevData) => ({
      ...prevData,
      mainPhoto: null,
    }));
    setImgError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const jsonOutput = JSON.stringify({ announcements: [formData] }, null, 2);
    console.log(jsonOutput);
  };

  return (
    <div className={styles.blockAnnouncement}>
      <form onSubmit={handleSubmit}>
        <div className={styles.header}>
          <h2 className={styles.title}>Создать объявление</h2>
        </div>
        
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Название объявления"
          required
          className={styles.inputField}
        />
        
        <div
          className={`${styles.imageContainer} ${isDragOver ? styles.dragOver : ''}`} // Добавляем класс при перетаскивании
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          {imgError || !imgPreview ? (
            <div className={styles.imagePlaceholder}>
              {imgError ? "Ошибка: загрузите изображение" : "Перетащите изображение сюда или нажмите для выбора"}
            </div>
          ) : (
            <img
              src={imgPreview}
              alt="Main"
              className={styles.mainPhoto}
              onError={() => setImgError(true)}
            />
          )}
        </div>
        
        <div className={styles.uploadButtonContainer}>
          <button
            type="button"
            className={styles.uploadButton}
            onClick={() => document.querySelector(`.${styles.fileInput}`).click()}
          >
            Выбрать изображение
          </button>
          {imgPreview && (
            <button
              type="button"
              className={styles.removeButton}
              onClick={handleRemoveImage}
              aria-label="Удалить изображение"
            >
              <MdDeleteOutline />
            </button>
          )}
        </div>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className={styles.fileInput}
          hidden
        />

        <h3 className={styles.subtitle}>Описание</h3>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className={styles.description}
          placeholder="Введите описание"
          required
        />

        <h3 className={styles.subtitle}>Цена</h3>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={(e) => {
            const value = Math.max(0, e.target.value);
            handleChange({ target: { name: "price", value } });
          }}
          placeholder="Введите цену"
          required
          className={styles.inputField}
        />
        
        <div className={styles.submitButtonContainer}>
          <button type="submit" className={styles.submitButton}>Создать объявление</button>
        </div>
      </form>
    </div>
  );
};