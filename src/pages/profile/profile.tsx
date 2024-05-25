import styles from "./profile.module.css";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { FormEvent, useMemo } from "react";
import ProfileNavBar from "./profile-nav-bar";
import { useForm } from "../../hooks/useForm";
import { RegisterRequest } from "../../types/types";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import {
  getAuthError,
  getAuthLoading,
  getCurrentUser,
  getIsAuthModalOpen,
} from "../../services/auth/selectors";
import { closeAuthModal } from "../../services/auth/reducer";
import { editUser } from "../../services/auth/action";
import Modal from "../../components/modal/modal";
import Preloader from "../../components/common/preloader/preloader";

function ProfilePage() {
  const initName = useAppSelector(getCurrentUser)?.name || "";
  const initEmail = useAppSelector(getCurrentUser)?.email || "";
  const initPassword = "";

  const { formState, handleFieldChange, setFormState } =
    useForm<RegisterRequest>({
      name: initName,
      email: initEmail,
      password: initPassword,
    });

  const isButtonVisible = useMemo(() => {
    return (
      formState.name !== initName ||
      formState.email !== initEmail ||
      formState.password !== initPassword
    );
  }, [formState, initName, initEmail]);

  const handleCancelClick = () => {
    setFormState({
      ...formState,
      name: initName,
      email: initEmail,
      password: initPassword,
    });
  };

  const dispatch = useAppDispatch();
  const isAuthModalOpen = useAppSelector(getIsAuthModalOpen);
  const isAuthLoading = useAppSelector(getAuthLoading);
  const authError = useAppSelector(getAuthError);

  const closeModal = () => {
    dispatch(closeAuthModal());
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(
      editUser({
        registerRequestData: formState,
        accessToken: localStorage.getItem("token") || "",
      }),
    );
  };

  return (
    <main className={styles.page}>
      <div className={styles.container_col}>
        <ProfileNavBar />
      </div>
      <div className={styles.container_col}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className="mb-6">
            {/* @ts-ignore */}
            <Input
              type={"text"}
              name={"name"}
              placeholder={"Имя"}
              value={formState.name}
              onChange={handleFieldChange}
              icon={"EditIcon"}
            />
          </div>
          <div className="mb-6">
            {/* @ts-ignore */}
            <Input
              type={"email"}
              name={"email"}
              placeholder={"Логин"}
              value={formState.email}
              onChange={handleFieldChange}
              icon={"EditIcon"}
            />
          </div>
          <div className="mb-6">
            <PasswordInput
              name={"password"}
              placeholder={"Введите новый пароль"}
              value={formState.password}
              onChange={handleFieldChange}
              icon={"EditIcon"}
              autoComplete={formState.password}
            />
          </div>
          {isButtonVisible && (
            <>
              <div className="mb-6">
                <Button htmlType="submit" type="primary" size="large">
                  Сохранить
                </Button>
              </div>
              <div className="mb-6">
                <Button
                  htmlType="button"
                  type="primary"
                  size="large"
                  onClick={handleCancelClick}
                >
                  Отмена
                </Button>
              </div>
            </>
          )}
        </form>
      </div>
      {isAuthModalOpen && (
        <Modal title="" onClose={closeModal}>
          <>
            {isAuthLoading && <Preloader />}
            {authError && <p>Ошибка: {authError}</p>}
          </>
        </Modal>
      )}
    </main>
  );
}

export default ProfilePage;
