import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { WebsocketStatus } from "../../types/types";
import {
  getFeedOrders,
  getFeedWebsocketStatus,
} from "../../services/feed/selectors";
import { wsFeedConnect, wsFeedDisconnect } from "../../services/feed/action";
import React, { useEffect, useMemo } from "react";
import OrderList from "../../components/order-list/order-list";
import OrderDashboard from "../../components/order-dashboard/order-dashboard";
import styles from "./feed-orders.module.css";
import { getIngredients } from "../../services/ingredients/selectors";
import { filterOrdersWithValidIngredients } from "../../utils/utils";
import { FEED_SERVER_URL } from "../../utils/constants";

function FeedOrdersPage() {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(getFeedOrders);
  const ingredients = useAppSelector(getIngredients);
  const status = useAppSelector(getFeedWebsocketStatus);
  const isDisconnected = status !== WebsocketStatus.ONLINE;

  useEffect(() => {
    dispatch(wsFeedConnect(FEED_SERVER_URL));

    return () => {
      dispatch(wsFeedDisconnect());
    };
  }, [dispatch]);

  const filteredOrders = useMemo(() => {
    return filterOrdersWithValidIngredients(orders, ingredients);
  }, [orders, ingredients]);

  if (isDisconnected) {
    return <p>Ошибка: WebSocket не подключен</p>;
  }

  return (
    <div className={styles.content}>
      <main className={styles.main}>
        <OrderList data={filteredOrders} isProfile={false} />
        <OrderDashboard />
      </main>
    </div>
  );
}

export default FeedOrdersPage;
