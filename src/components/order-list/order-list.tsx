import OrderCard from "../order-card/order-card";
import React from "react";
import styles from "./order-list.module.css";

function OrderList() {
  let content = [];
  for (let i = 0; i < 10; i++) {
    content.push(
      <li key={i}>
        <OrderCard />
      </li>,
    );
  }

  return (
    <section>
      <p className="text text_type_main-large">Лента заказов</p>
      <div className={styles.column}>
        <ul className={styles.list}>
          {content.map((item, index) => (
            <OrderCard key={index} />
          ))}
        </ul>
      </div>
    </section>
  );
}

export default OrderList;
