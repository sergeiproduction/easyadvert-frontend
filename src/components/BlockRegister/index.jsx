import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";

import { fetchLogin } from "../../redux/slices/auth";
import {
  fetchRegister,
  fetchUser,
  selectIsAuth,
} from "../../redux/slices/user";
import styles from "./BlockRegister.module.scss";

export const BlockRegister = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      login: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const isLoginValid = (value) => {
    const loginRegexes = [
      /^\+?[7-8]\d{10}$/,
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
    ];
    return loginRegexes.some((regex) => regex.test(value));
  };

  const isUserNameValid = (value) => {
    const UserNameRegexes = [/^[а-яА-Яa-zA-Z]+$/];
    return UserNameRegexes.some((regex) => regex.test(value));
  };

  const onSubmit = async (values) => {
    const formatedValues = {
      name: values.username,
      email: values.login,
      password_hash: values.password,
    };

    const data = await dispatch(fetchRegister(formatedValues));
    if (!data.payload) {
      return alert("Не удалось зарегистрироваться");
    }

    const formatedData = { username: values.login, password: values.password };
    const userData = await dispatch(fetchLogin(formatedData));
    if (!userData.payload) {
      return alert("Не удалось авторизоваться");
    }

    if ("access_token" in userData.payload) {
      window.localStorage.setItem("token", userData.payload.access_token);
    }

    await dispatch(fetchUser());
  };

  // Загрузились ли данные
  const isUserLoading = useSelector((state) => state.user.status) === "loading";
  const isAuthLoading = useSelector((state) => state.auth.status) === "loading";
  const isLoadingData = isUserLoading || isAuthLoading; // Получаем статус загрузки из Redux

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
          id="username"
          label="Имя"
          type="text"
          placeholder="Иван"
          register={register("username", {
            required: "Обязательное поле",
            minLength: { value: 2, message: "Минимальная длина 2 символа" },
            maxLength: { value: 30, message: "Максимальная длина 30 символов" },
            validate: {
              isValid: (value) =>
                isUserNameValid(value) || "Введите корректное имя пользователя",
            },
          })}
          error={errors.username}
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
        <InputField
          id="confirmPassword"
          label="Повторите пароль"
          type="password"
          placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;"
          register={register("confirmPassword", {
            required: "Обязательное поле",
            validate: (value) =>
              value === watch("password") || "Пароли не совпадают",
          })}
          error={errors.confirmPassword}
        />
        <button
          disabled={!isValid || isLoadingData}
          type="submit"
          className={styles.submitButton}
        >
          {isLoadingData ? "Загрузка..." : "Зарегистрироваться"}
        </button>
        {isLoadingData && <div className={styles.loadingSpinner}></div>}{" "}
        <p className={styles.termsText}>
          Нажимая кнопку "Зарегистрироваться", Вы соглашаетесь на обработку
          данных в соответствии с{" "}
          <Link to="#" className={styles.link}>
            условиями
          </Link>
        </p>
        <hr className={styles.divider} />
        <p className={styles.switchToLoginText}>
          Есть аккаунт?{" "}
          <Link to="/login" className={styles.link}>
            Войти
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
