import OrderCard from "../order-card/order-card";
import React from "react";
import styles from "./order-list.module.css";
import { IOrderList } from "../../types/types";

const OrderList: React.FC<IOrderList> = ({ data, isProfile }) => {
  return (
    <section>
      {!isProfile && <p className="text text_type_main-large">Лента заказов</p>}
      <div className={styles.column}>
        <ul className={styles.list}>
          {data.map((item, index) => (
            <OrderCard key={item._id} {...item} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default OrderList;
