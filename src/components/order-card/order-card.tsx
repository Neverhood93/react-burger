import React from "react";
import { IOrder } from "../../types/types";
import styles from "./order-card.module.css";
import { Link, useLocation } from "react-router-dom";

const OrderCard: React.FC<IOrder> = ({ ...props }) => {
  const location = useLocation();
  const orderId = props.number;
  return (
    <Link
      to={`${location.pathname}/${orderId}`}
      state={{ background: location }}
      className={styles.link}
    >
      <div className={styles.card}>
        <p>{props.number}</p>
      </div>
    </Link>
  );
};

export default OrderCard;
