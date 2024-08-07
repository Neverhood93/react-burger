import React from "react";
import styles from "./created-order-details.module.css";
import checkMark from "../../images/check-mark.png";
import { IOrderDetails } from "../../types/types";

const CreatedOrderDetails: React.FC<IOrderDetails> = ({ orderNumber }) => {
  return (
    <div className={styles.details}>
      <p className="text text_type_digits-large">{orderNumber}</p>

      <p className={`text text_type_main-medium ${styles.title_1}`}>
        идентификатор заказа
      </p>

      <img src={checkMark} alt="checkMark" />

      <p className={`text text_type_main-default ${styles.title_2}`}>
        Ваш заказ начали готовить
      </p>
      <p className={`text text_type_main-default ${styles.title_3}`}>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default CreatedOrderDetails;
