import styles from "./profile.module.css";
import { NavLink } from "react-router-dom";
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
          <NavLink
            to="/profile"
            end
            className={({ isActive }) =>
              `text text_type_main-medium ${isActive ? styles.link_active : styles.link_inactive}`
            }
          >
            Профиль
          </NavLink>
        </li>
        <li className={styles.item}>
          <NavLink
            to="/profile/orders"
            className={({ isActive }) =>
              `text text_type_main-medium ${isActive ? styles.link_active : styles.link_inactive}`
            }
          >
            История заказов
          </NavLink>
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
