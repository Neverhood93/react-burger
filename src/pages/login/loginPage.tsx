import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { FormEvent } from "react";
import { Link } from "react-router-dom";
import styles from "../common/form.module.css";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { login } from "../../services/auth/action";
import { ILoginRequest } from "../../types/types";
import { useForm } from "../../hooks/useForm";
import {
  getAuthError,
  getAuthLoading,
  getIsAuthModalOpen,
} from "../../services/auth/selectors";
import Modal from "../../components/modal/modal";
import Preloader from "../../components/common/preloader/preloader";
import { closeAuthModal } from "../../services/auth/reducer";

function LoginPage() {
  const { formState, handleFieldChange } = useForm<ILoginRequest>({
    email: "",
    password: "",
  });

  const dispatch = useAppDispatch();
  const isAuthModalOpen = useAppSelector(getIsAuthModalOpen);
  const isAuthLoading = useAppSelector(getAuthLoading);
  const authError = useAppSelector(getAuthError);

  const closeModal = () => {
    dispatch(closeAuthModal());
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(login(formState));
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={"text text_type_main-medium mb-6"}>Вход</h2>

        <div className="mb-6">
          {/* @ts-ignore */}
          <Input
            type={"email"}
            name={"email"}
            placeholder={"E-mail"}
            value={formState.email}
            onChange={handleFieldChange}
          />
        </div>

        <div className="mb-6">
          <PasswordInput
            name={"password"}
            value={formState.password}
            onChange={handleFieldChange}
            autoComplete={formState.password}
          />
        </div>

        <Button htmlType="submit" type="primary" size="large">
          Войти
        </Button>
      </form>
      <p className={"text text_type_main-default text_color_inactive mt-20"}>
        Вы - новый пользователь?
        <Link to="/register" className={styles.link}>
          {" "}
          Зарегистрироваться
        </Link>
      </p>
      <p className={"text text_type_main-default text_color_inactive mt-4"}>
        Забыли пароль?
        <Link to="/forgot-password" className={styles.link}>
          {" "}
          Восстановить пароль
        </Link>
      </p>
      {isAuthModalOpen && (
        <Modal title="" onClose={closeModal}>
          <>
            {isAuthLoading && <Preloader />}
            {authError && <p>Ошибка: {authError}</p>}
          </>
        </Modal>
      )}
    </div>
  );
}

export default LoginPage;
