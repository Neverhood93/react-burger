import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { WebsocketStatus } from "../../types/types";
import {
  getFeedOrders,
  getFeedWebsocketStatus,
} from "../../services/feed/selectors";
import { wsFeedConnect, wsFeedDisconnect } from "../../services/feed/action";
import React, { useEffect } from "react";
import OrderList from "../../components/order-list/order-list";
import styles from "./profile-orders.module.css";
import ProfileNavBar from "../profile/profile-nav-bar";

export const LIVE_TABLE_SERVER_URL =
  "wss://norma.nomoreparties.space/orders/all";

function ProfileOrdersPage() {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(getFeedOrders);
  const status = useAppSelector(getFeedWebsocketStatus);
  const isDisconnected = status !== WebsocketStatus.ONLINE;

  useEffect(() => {
    dispatch(wsFeedConnect(LIVE_TABLE_SERVER_URL));

    return () => {
      dispatch(wsFeedDisconnect());
    };
  }, [dispatch]);

  return (
    <main className={styles.page}>
      <div className={styles.container_col}>
        <ProfileNavBar />
      </div>
      <div className={styles.container_col_orders}>
        <OrderList />
      </div>
    </main>
  );
}

export default ProfileOrdersPage;
