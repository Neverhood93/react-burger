import styles from "./profile.module.css";
import { Link } from "react-router-dom";

function ProfileNavBar() {
  return (
    <nav className={`${styles.nav}`}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <Link
            className={`${styles.link} text text_type_main-medium text_color_inactive`}
            to={"/profile"}
          >
            Профиль
          </Link>
        </li>
        <li className={styles.item}>
          <Link
            className={`${styles.link} text text_type_main-medium text_color_inactive`}
            to={"/orders"}
          >
            История заказов
          </Link>
        </li>
        <li className={styles.item}>
          <Link
            className={`${styles.link} text text_type_main-medium text_color_inactive`}
            to={"/"}
          >
            Выход
          </Link>
        </li>
      </ul>
      <p
        className={`${styles.text} text text_type_main-default text_color_inactive mt-20`}
      >
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </nav>
  );
}

export default ProfileNavBar;
