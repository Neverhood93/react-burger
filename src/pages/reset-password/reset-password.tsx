import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import React from "react";
import styles from "../common/form.module.css";

function ResetPasswordPage() {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <h2 className={"text text_type_main-medium mb-6"}>
          Восстановление пароля
        </h2>

        <div className="mb-6">
          <PasswordInput
            name={"password"}
            placeholder={"Введите новый пароль"}
            value={""}
            onChange={() => {}}
          />
        </div>

        <div className="mb-6">
          <Input
            type={"text"}
            name={"token"}
            placeholder={"Введите код из письма"}
            value={""}
            onChange={() => {}}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
        </div>

        <Button htmlType="button" type="primary" size="large">
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
    </div>
  );
}

export default ResetPasswordPage;
