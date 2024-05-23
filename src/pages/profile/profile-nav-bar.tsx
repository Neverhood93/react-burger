import styles from "./profile.module.css";
import { Link } from "react-router-dom";
import { logout } from "../../services/auth/action";
import { useAppDispatch } from "../../services/hooks";

function ProfileNavBar() {
  const dispatch = useAppDispatch();

  const onLogoutClickHandler = () => {
    const refreshToken = localStorage.getItem("refreshToken") || "";
    dispatch(logout(refreshToken));
  };

  return (
    <nav className={`${styles.nav}`}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <Link
            className={`${styles.link_active} text text_type_main-medium text_color_inactive`}
            to={"/profile"}
          >
            Профиль
          </Link>
        </li>
        <li className={styles.item}>
          <Link
            className={`${styles.link_inactive} text text_type_main-medium text_color_inactive`}
            to={"/orders"}
          >
            История заказов
          </Link>
        </li>
        <li className={styles.item}>
          <p
            className={`${styles.logout} text text_type_main-medium text_color_inactive`}
            onClick={onLogoutClickHandler}
          >
            Выход
          </p>
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
