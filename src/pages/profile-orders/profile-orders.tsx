import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { WebsocketStatus } from "../../types/types";
import React, { useEffect } from "react";
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

function ProfileOrdersPage() {
  const accessToken = localStorage.getItem("token") || "";
  const PROFILE_ORDERS_SERVER_URL = `wss://norma.nomoreparties.space/orders?token=${accessToken.split(" ")[1]}`;

  const dispatch = useAppDispatch();
  const orders = useAppSelector(getProfileOrders);
  const status = useAppSelector(getProfileOrdersWebsocketStatus);
  const isDisconnected = status !== WebsocketStatus.ONLINE;

  useEffect(() => {
    dispatch(wsProfileOrdersConnect(PROFILE_ORDERS_SERVER_URL));

    return () => {
      dispatch(wsProfileOrdersDisconnect());
    };
  }, [dispatch]);

  return (
    <main className={styles.page}>
      <div className={styles.container_col}>
        <ProfileNavBar />
      </div>
      <div className={styles.container_col_orders}>
        <OrderList data={orders} />
      </div>
    </main>
  );
}

export default ProfileOrdersPage;
