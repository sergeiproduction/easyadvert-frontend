import React from "react";
import { Link } from "react-router-dom";
import styles from "./ArticleBanner.module.scss";

export const ArticleBanner = () => {
    return (
        <div className={styles.banner}>
            <div className={styles.overlay}>
                <h2 className={styles.title}>Иллюстрации для блогов</h2>
                <p className={styles.description}>
                    Немного о принципах, инструментах и авторском праве
                </p>
                <div className={styles.linkContainer}>
                    <Link to="#" className={styles.readLink}>Читать</Link>
                </div>
            </div>
        </div>
    );
};