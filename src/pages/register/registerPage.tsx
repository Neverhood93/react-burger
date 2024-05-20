import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import styles from "../common/form.module.css";
import { useAppDispatch } from "../../services/hooks";
import { register } from "../../services/auth/action";

function RegisterPage() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      register({
        email: "test234sdf234234@test.com",
        name: "test123",
        password: "123345",
      }),
    );
  }, []);

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <h2 className={"text text_type_main-medium mb-6"}>Регистрация</h2>

        <div className="mb-6">
          <Input
            type={"text"}
            name={"name"}
            placeholder={"Имя"}
            value={""}
            onChange={() => {}}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
        </div>

        <div className="mb-6">
          <Input
            type={"email"}
            name={"email"}
            placeholder={"E-mail"}
            value={""}
            onChange={() => {}}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
        </div>

        <div className="mb-6">
          <PasswordInput name={"password"} value={""} onChange={() => {}} />
        </div>

        <Button htmlType="button" type="primary" size="large">
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
    </div>
  );
}

export default RegisterPage;
