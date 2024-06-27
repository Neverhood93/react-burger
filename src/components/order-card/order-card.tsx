import React from "react";
import { IOrder } from "../../types/types";
import styles from "./order-card.module.css";
import { Link, useLocation } from "react-router-dom";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientImgList from "../ingredient-img-list/ingredient-img-list";

const OrderCard: React.FC<IOrder> = ({ ...props }) => {
  const location = useLocation();
  const orderId = props.number;
  return (
    <Link
      to={`${location.pathname}/${orderId}`}
      state={{ background: location }}
      className={styles.link}
    >
      <div className={styles.card_container}>
        <div className={styles.card}>
          <div className={styles.header_container}>
            <div className={styles.order_number_container}>
              <span
                className={`text text_type_digits-medium ${styles.order_number}`}
              >
                #{props.number}
              </span>
            </div>
            <p className="text text_type_main-default text_color_inactive">
              <FormattedDate date={new Date(props.createdAt)} />
            </p>
          </div>

          <p className="text text_type_main-medium mt-6">{props.name}</p>

          <div className={styles.bottom_container}>
            <IngredientImgList />

            <div className={styles.total_price_container}>
              <span className="text text_type_digits-default mr-2">{123}</span>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default OrderCard;
