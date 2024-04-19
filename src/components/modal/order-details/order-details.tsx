import React from "react";
import styles from "./order-details.module.css";
import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";

interface OrderDetailsProps {}

const OrderDetails: React.FC<OrderDetailsProps> = () => {
  const orderNumber = "034536";
  return (
    <div className={styles.details}>
      <p className="text text_type_digits-large">{orderNumber}</p>
      <p className="text text_type_main-medium">идентификатор заказа</p>
      <CheckMarkIcon type="primary" />
      <p className="text text_type_main-medium">Ваш заказ начали готовить</p>
      <p className="text text_type_main-medium">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetails;
