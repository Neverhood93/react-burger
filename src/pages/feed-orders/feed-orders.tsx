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
import { getIngredients } from "../../services/ingredients/selectors";

function FeedOrdersPage() {
  const FEED_SERVER_URL = "wss://norma.nomoreparties.space/orders/all";

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

  const ingredientIds = new Set(
    ingredients.map((ingredient) => ingredient._id),
  );

  const filteredOrders = orders.filter((order) =>
    order.ingredients.every((ingredientId) =>
      ingredientIds.has(ingredientId.toString()),
    ),
  );

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
