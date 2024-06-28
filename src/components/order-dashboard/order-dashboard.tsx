import styles from "./order-dashboard.module.css";
import OrderStatusList from "../order-status-list/order-status-list";
import { useAppSelector } from "../../services/hooks";
import {
  getFeedOrders,
  getTotalCountOrders,
  getTotalTodayCountOrders,
} from "../../services/feed/selectors";
import React from "react";
import { OrderStatus } from "../../types/types";

function OrderDashboard() {
  const orders = useAppSelector(getFeedOrders);
  const total = useAppSelector(getTotalCountOrders);
  const totalToday = useAppSelector(getTotalTodayCountOrders);

  return (
    <div className={styles.column}>
      <div className={styles.order_status_container}>
        <OrderStatusList data={orders} status={OrderStatus.DONE} />
        <OrderStatusList data={orders} status={OrderStatus.PENDING} />
      </div>
      <div className={styles.total_count_container}>
        <p className="text text_type_main-medium">Выполнено за все время:</p>
        <p className={`text text_type_digits-large ${styles.order_number}`}>
          {total}
        </p>
      </div>
      <div className={styles.total_count_container}>
        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
        <p className={`text text_type_digits-large ${styles.order_number}`}>
          {totalToday}
        </p>
      </div>
    </div>
  );
}

export default OrderDashboard;
