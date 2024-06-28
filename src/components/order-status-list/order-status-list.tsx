import React from "react";
import styles from "./order-status-list.module.css";
import { IOrderStatusList } from "../../types/types";

const OrderStatusList: React.FC<IOrderStatusList> = ({ data }) => {
  const topOrders = data.slice(0, 10);
  const leftColumn = topOrders.slice(0, 5);
  const rightColumn = topOrders.slice(5, 10);

  return (
    <section className={styles.container}>
      <p className="text text_type_main-medium">Готовы:</p>
      <div className={styles.container_status}>
        <div className={styles.column}>
          <ul className={styles.list}>
            {leftColumn.map((item) => (
              <li
                key={item._id}
                className={`text text_type_digits-medium mb-2 ${styles.order_number}`}
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
                className={`text text_type_digits-medium mb-2 ${styles.order_number}`}
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
