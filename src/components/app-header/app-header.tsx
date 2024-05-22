import ButtonHeader from "../buttons/button-header/button-header";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import { NavLink } from "react-router-dom";

export default function AppHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.left_container}>
        <NavLink to="/" className={styles.link_inactive}>
          {({ isActive }) => (
            <ButtonHeader>
              <BurgerIcon type={isActive ? "primary" : "secondary"} />
              <span
                className={`text text_type_main-default ${isActive ? styles.link_active : styles.link_inactive}`}
              >
                Конструктор
              </span>
            </ButtonHeader>
          )}
        </NavLink>
        <NavLink to="/orders" className={styles.link_inactive}>
          {({ isActive }) => (
            <ButtonHeader>
              <ListIcon type={isActive ? "primary" : "secondary"} />
              <span
                className={`text text_type_main-default ${isActive ? styles.link_active : styles.link_inactive}`}
              >
                Лента заказов
              </span>
            </ButtonHeader>
          )}
        </NavLink>
      </div>
      <div className={styles.logo}>
        <Logo />
      </div>
      <div className={styles.right_container}>
        <NavLink to="/profile" className={styles.link_inactive}>
          {({ isActive }) => (
            <ButtonHeader>
              <ProfileIcon type={isActive ? "primary" : "secondary"} />
              <span
                className={`text text_type_main-default ${isActive ? styles.link_active : styles.link_inactive}`}
              >
                Личный кабинет
              </span>
            </ButtonHeader>
          )}
        </NavLink>
      </div>
    </header>
  );
}
