import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";

import { fetchLogin } from "../../redux/slices/auth";
import { fetchUser, selectIsAuth } from "../../redux/slices/user";
import styles from "./BlockLogin.module.scss"; // Импортируем стили
import { IoCloseOutline } from "react-icons/io5";

export const BlockLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      login: "",
      password: "",
    },
    mode: "onChange",
  });

  const loginRegexes = [
    /^\+?[7-8]\d{10}$/,
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
  ];

  const isLoginValid = (value) => {
    return loginRegexes.some((regex) => regex.test(value));
  };

  const onSubmit = async (values) => {
    const formatedValues = {
      username: values.login,
      password: values.password,
    };
    const data = await dispatch(fetchLogin(formatedValues));

    if (!data.payload) {
      return alert("Неверный логин или пароль");
    }

    if ("access_token" in data.payload) {
      window.localStorage.setItem("token", data.payload.access_token);
    } else {
      return alert("Не удалось авторизоваться");
    }

    await dispatch(fetchUser());
  };

  // Загрузились ли данные
  const isUserLoading = useSelector((state) => state.user.status) === "loading"
  const isAuthLoading = useSelector((state) => state.auth.status) === "loading"
  const isLoadingData = (isUserLoading || isAuthLoading); // Получаем статус загрузки из Redux

  const isAuth = useSelector(selectIsAuth);
  if (isAuth && Boolean(window.localStorage.getItem("token"))) {
    return <Navigate to="/" />;
  }

  return (
    <div className={styles.registrationContainer}>
      <form
        className={styles.registrationForm}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={styles.formHeader}>
          <h1>
            EASY <span>ID</span>
          </h1>
          <span className={styles.closeIcon} onClick={() => navigate("/")}>
            <IoCloseOutline />
          </span>
        </div>
        <InputField
          id="login"
          label="E-mail или номер телефона"
          type="text"
          placeholder="+7 (999) 999-99-99"
          register={register("login", {
            required: "Обязательное поле",
            minLength: { value: 6, message: "Минимальная длина 6 символов" },
            maxLength: {
              value: 254,
              message: "Максимальная длина 254 символа",
            },
            validate: {
              isValid: (value) =>
                isLoginValid(value) ||
                "Введите корректный E-mail или номер телефона",
            },
          })}
          error={errors.login}
        />
        <InputField
          id="password"
          label="Пароль"
          type="password"
          placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;"
          register={register("password", {
            required: "Обязательное поле",
            minLength: { value: 8, message: "Минимальная длина 8 символов" },
            maxLength: {
              value: 256,
              message: "Максимальная длина 256 символов",
            },
          })}
          error={errors.password}
        />
        <button
          disabled={!isValid || isLoadingData}
          type="submit"
          className={styles.submitButton}
        >
          {isLoadingData ? "Загрузка..." : "Войти"}
        </button>
        {isLoadingData && (
          <div className={styles.loadingSpinner}></div>
        )}{" "}
        {/* Индикатор загрузки */}
        <p className={styles.forgotPassword}>
          <Link to="#">Забыли пароль?</Link>
        </p>
        <hr className={styles.divider} />
        <p className={styles.switchToRegisterText}>
          Нет аккаунта?{" "}
          <Link to="/register" className={styles.link}>
            Зарегистрироваться
          </Link>
        </p>
      </form>
    </div>
  );
};

const InputField = ({ id, label, type, placeholder, register, error }) => (
  <div className={styles.inputField}>
    <label htmlFor={id}>{label}</label>
    <input
      {...register}
      type={type}
      id={id}
      autoComplete="on"
      placeholder={placeholder}
      className={error ? styles.inputError : ""}
    />
    {error && <span className={styles.errorMessage}>{error.message}</span>}
  </div>
);
