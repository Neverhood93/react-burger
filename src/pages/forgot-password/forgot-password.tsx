import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Navigate } from "react-router-dom";
import React, { FormEvent } from "react";
import styles from "../common/form.module.css";
import { useForm } from "../../hooks/useForm";
import { ForgotPasswordRequest } from "../../types/types";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import {
  getAuthError,
  getAuthLoading,
  getIsAuthModalOpen,
  getIsForgotPasswordSent,
} from "../../services/auth/selectors";
import { closeAuthModal } from "../../services/auth/reducer";
import { forgotPassword } from "../../services/auth/action";
import Modal from "../../components/modal/modal";
import Preloader from "../../components/common/preloader/preloader";

function ForgotPasswordPage() {
  const { formState, handleFieldChange } = useForm<ForgotPasswordRequest>({
    email: "",
  });

  const dispatch = useAppDispatch();
  const isAuthModalOpen = useAppSelector(getIsAuthModalOpen);
  const isAuthLoading = useAppSelector(getAuthLoading);
  const authError = useAppSelector(getAuthError);

  const isForgotPasswordSent = useAppSelector(getIsForgotPasswordSent);

  const closeModal = () => {
    dispatch(closeAuthModal());
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(forgotPassword(formState));
  };

  if (isForgotPasswordSent) {
    return <Navigate to="/reset-password" />;
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={"text text_type_main-medium mb-6"}>
          Восстановление пароля
        </h2>

        <div className="mb-6">
          {/* @ts-ignore */}
          <Input
            type={"email"}
            name={"email"}
            placeholder={"Укажите e-mail"}
            value={formState.email}
            onChange={handleFieldChange}
          />
        </div>

        <Button htmlType="submit" type="primary" size="large">
          Восстановить
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

export default ForgotPasswordPage;
