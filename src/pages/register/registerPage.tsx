import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import React, { ChangeEvent, FormEvent, useState } from "react";
import styles from "../common/form.module.css";
import { useAppDispatch } from "../../services/hooks";
import { register } from "../../services/auth/action";
import { RegisterRequest } from "../../types/types";

function RegisterPage() {
  const [formState, setFormState] = useState<RegisterRequest>({
    email: "",
    password: "",
    name: "",
  });

  const dispatch = useAppDispatch();

  const handleFieldValueChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
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
            onChange={handleFieldValueChanged}
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
            onChange={handleFieldValueChanged}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
        </div>

        <div className="mb-6">
          <PasswordInput
            name={"password"}
            value={formState.password}
            onChange={handleFieldValueChanged}
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
    </div>
  );
}

export default RegisterPage;
