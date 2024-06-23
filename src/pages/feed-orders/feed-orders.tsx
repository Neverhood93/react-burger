import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { WebsocketStatus } from "../../types/types";
import {
  getFeedOrders,
  getFeedWebsocketStatus,
} from "../../services/feed/selectors";
import { wsFeedConnect, wsFeedDisconnect } from "../../services/feed/action";
import React, { useEffect } from "react";
import OrderList from "../../components/order-list/order-list";
import OrderDashboard from "../../components/order-dashboard/order-dashboard";
import styles from "./feed-orders.module.css";

function FeedOrdersPage() {
  const FEED_SERVER_URL = "wss://norma.nomoreparties.space/orders/all";

  const dispatch = useAppDispatch();
  const orders = useAppSelector(getFeedOrders);
  const status = useAppSelector(getFeedWebsocketStatus);
  const isDisconnected = status !== WebsocketStatus.ONLINE;

  useEffect(() => {
    dispatch(wsFeedConnect(FEED_SERVER_URL));

    return () => {
      dispatch(wsFeedDisconnect());
    };
  }, [dispatch]);

  return (
    <div className={styles.content}>
      <main className={styles.main}>
        <OrderList data={orders} isProfile={false} />
        <OrderDashboard />
      </main>
    </div>
  );
}

export default FeedOrdersPage;
