import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import React, { FormEvent } from "react";
import styles from "../common/form.module.css";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { register } from "../../services/auth/action";
import { RegisterRequest } from "../../types/types";
import { useForm } from "../../hooks/useForm";
import {
  getAuthError,
  getAuthLoading,
  getIsAuthModalOpen,
} from "../../services/auth/selectors";
import Modal from "../../components/modal/modal";
import Preloader from "../../components/common/preloader/preloader";
import { closeAuthModal } from "../../services/auth/reducer";

function RegisterPage() {
  const { formState, handleFieldChange } = useForm<RegisterRequest>({
    name: "",
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
    dispatch(register(formState));
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={"text text_type_main-medium mb-6"}>Регистрация</h2>

        <div className="mb-6">
          <Input
            type={"text"}
            name={"name"}
            placeholder={"Имя"}
            value={formState.name}
            onChange={handleFieldChange}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
        </div>

        <div className="mb-6">
          <Input
            type={"email"}
            name={"email"}
            placeholder={"E-mail"}
            value={formState.email}
            onChange={handleFieldChange}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
        </div>

        <div className="mb-6">
          <PasswordInput
            name={"password"}
            value={formState.password}
            onChange={handleFieldChange}
          />
        </div>

        <Button htmlType="submit" type="primary" size="large">
          Зарегистрироваться
        </Button>
      </form>
      <p className={"text text_type_main-default text_color_inactive mt-20"}>
        Уже зарегистрированы?
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

export default RegisterPage;
