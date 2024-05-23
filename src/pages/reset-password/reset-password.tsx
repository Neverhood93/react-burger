import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Navigate } from "react-router-dom";
import React, { FormEvent } from "react";
import styles from "../common/form.module.css";
import { useForm } from "../../hooks/useForm";
import { ResetPasswordRequest } from "../../types/types";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import {
  getAuthError,
  getAuthLoading,
  getIsAuthModalOpen,
  getIsLoggedIn,
} from "../../services/auth/selectors";
import { closeAuthModal } from "../../services/auth/reducer";
import { resetPassword } from "../../services/auth/action";
import Modal from "../../components/modal/modal";
import Preloader from "../../components/common/preloader/preloader";

function ResetPasswordPage() {
  const { formState, handleFieldChange } = useForm<ResetPasswordRequest>({
    password: "",
    token: "",
  });

  const dispatch = useAppDispatch();
  const isAuthModalOpen = useAppSelector(getIsAuthModalOpen);
  const isAuthLoading = useAppSelector(getAuthLoading);
  const authError = useAppSelector(getAuthError);

  const isLoggedIn = useAppSelector(getIsLoggedIn);
  if (isLoggedIn) {
    return <Navigate to="/login" />;
  }

  const closeModal = () => {
    dispatch(closeAuthModal());
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(resetPassword(formState));
  };
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={"text text_type_main-medium mb-6"}>
          Восстановление пароля
        </h2>

        <div className="mb-6">
          <PasswordInput
            name={"password"}
            placeholder={"Введите новый пароль"}
            value={formState.password}
            onChange={handleFieldChange}
          />
        </div>

        <div className="mb-6">
          <Input
            type={"text"}
            name={"token"}
            placeholder={"Введите код из письма"}
            value={formState.token}
            onChange={handleFieldChange}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
        </div>

        <Button htmlType="submit" type="primary" size="large">
          Сохранить
        </Button>
      </form>
      <p className={"text text_type_main-default text_color_inactive mt-20"}>
        Вспомнили пароль?
        <Link to="/login" className={styles.link}>
          {" "}
          Войти
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

export default ResetPasswordPage;
