import React from "react";
import styles from "./order-status-list.module.css";
import { IOrderStatusList, OrderStatus } from "../../types/types";

const OrderStatusList: React.FC<IOrderStatusList> = ({ data, status }) => {
  const filteredOrders = data
    .filter((order) => order.status === status)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 10);

  const leftColumn = filteredOrders.slice(0, 5);
  const rightColumn = filteredOrders.slice(5, 10);

  return (
    <section className={styles.container}>
      <p className="text text_type_main-medium">
        {status === OrderStatus.DONE ? "Готовы:" : "В работе:"}
      </p>
      <div className={styles.container_status}>
        <div className={styles.column}>
          <ul className={styles.list}>
            {leftColumn.map((item) => (
              <li
                key={item._id}
                className={
                  status === OrderStatus.DONE
                    ? `text text_type_digits-medium mb-2 ${styles.order_status_done}`
                    : `text text_type_digits-medium mb-2 ${styles.order_status}`
                }
              >
                {item.number}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.column}>
          <ul className={styles.list}>
            {rightColumn.map((item) => (
              <li
                key={item._id}
                className={
                  status === OrderStatus.DONE
                    ? `text text_type_digits-medium mb-2 ${styles.order_status_done}`
                    : `text text_type_digits-medium mb-2 ${styles.order_status}`
                }
              >
                {item.number}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default OrderStatusList;
