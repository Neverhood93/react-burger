import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { WebsocketStatus } from "../../types/types";
import React, { useEffect, useMemo, useState } from "react";
import OrderList from "../../components/order-list/order-list";
import styles from "./profile-orders.module.css";
import ProfileNavBar from "../profile/profile-nav-bar";
import {
  getProfileOrders,
  getProfileOrdersWebsocketStatus,
} from "../../services/profile-orders/selectors";
import {
  wsProfileOrdersConnect,
  wsProfileOrdersDisconnect,
} from "../../services/profile-orders/actions";
import { getIngredients } from "../../services/ingredients/selectors";
import { filterOrdersWithValidIngredients } from "../../utils/utils";
import { PROFILE_ORDERS_SERVER_BASE_URL } from "../../utils/constants";

function ProfileOrdersPage() {
  const [profileOrdersServerUrl, setProfileOrdersServerUrl] = useState("");

  const dispatch = useAppDispatch();
  const orders = useAppSelector(getProfileOrders);
  const ingredients = useAppSelector(getIngredients);
  const status = useAppSelector(getProfileOrdersWebsocketStatus);
  const isDisconnected = status !== WebsocketStatus.ONLINE;

  useEffect(() => {
    const accessToken = localStorage.getItem("token") || "";
    setProfileOrdersServerUrl(
      `${PROFILE_ORDERS_SERVER_BASE_URL}?token=${accessToken.split(" ")[1]}`,
    );
  }, []);

  useEffect(() => {
    if (profileOrdersServerUrl) {
      dispatch(wsProfileOrdersConnect(profileOrdersServerUrl));
      return () => {
        dispatch(wsProfileOrdersDisconnect());
      };
    }
  }, [dispatch, profileOrdersServerUrl]);

  const filteredOrders = useMemo(() => {
    return filterOrdersWithValidIngredients(orders, ingredients).sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }, [orders, ingredients]);

  if (isDisconnected) {
    return <p>Ошибка: WebSocket не подключен</p>;
  }

  return (
    <main className={styles.page}>
      <div className={styles.container_col}>
        <ProfileNavBar />
      </div>
      <div className={styles.container_col_orders}>
        <OrderList data={filteredOrders} isProfile={true} />
      </div>
    </main>
  );
}

export default ProfileOrdersPage;
