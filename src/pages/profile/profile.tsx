import styles from "./profile.module.css";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import ProfileNavBar from "./profile-nav-bar";

function ProfilePage() {
  return (
    <main className={styles.page}>
      <div className={styles.container_col}>
        <ProfileNavBar />
      </div>
      <div className={styles.container_col}>
        <form className={styles.form}>
          <div className="mb-6">
            <Input
              type={"text"}
              name={"name"}
              placeholder={"Имя"}
              value={""}
              onChange={() => {}}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              icon={"EditIcon"}
            />
          </div>

          <div className="mb-6">
            <Input
              type={"email"}
              name={"email"}
              placeholder={"Логин"}
              value={""}
              onChange={() => {}}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              icon={"EditIcon"}
            />
          </div>

          <div className="mb-6">
            <PasswordInput name={"password"} value={""} onChange={() => {}} />
          </div>

          <div className="mb-6">
            <Button htmlType="button" type="primary" size="large">
              Сохранить
            </Button>
          </div>
          <div className="mb-6">
            <Button htmlType="button" type="primary" size="large">
              Отмена
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default ProfilePage;
