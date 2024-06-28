import React, { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { useLocation, useParams } from "react-router-dom";
import NotFoundPage from "../../pages/not-found/not-found";
import { IBurgerIngredient, IOrder } from "../../types/types";
import { getFeedOrders } from "../../services/feed/selectors";
import { getProfileOrders } from "../../services/profile-orders/selectors";
import {
  getCurrentOrder,
  getOrderLoading,
  getOrderError,
} from "../../services/order/selectors";
import { fetchOrder } from "../../services/order/actions";
import Preloader from "../common/preloader/preloader";
import styles from "./order-details.module.css";
import IngredientList from "../ingredient-list/ingredient-list";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { getIngredients } from "../../services/ingredients/selectors";

const OrderDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentOrderResponse = useAppSelector(getCurrentOrder);
  const orderLoading = useAppSelector(getOrderLoading);
  const orderError = useAppSelector(getOrderError);

  const feedOrders = useAppSelector(getFeedOrders);
  const profileOrders = useAppSelector(getProfileOrders);
  const location = useLocation();
  const { number } = useParams<{ number?: string }>();
  const orderNumber = parseInt(number || "", 10);

  const [order, setOrder] = useState<IOrder | null>(null);

  useEffect(() => {
    if (number) {
      let foundOrder: IOrder | null = null;
      if (location.pathname.indexOf("profile") !== -1) {
        foundOrder =
          profileOrders.find((item: IOrder) => item.number === orderNumber) ??
          null;
      } else {
        foundOrder =
          feedOrders.find((item: IOrder) => item.number === orderNumber) ??
          null;
      }
      setOrder(foundOrder);

      if (!foundOrder) {
        dispatch(fetchOrder(orderNumber));
      }
    }
  }, [
    number,
    profileOrders,
    feedOrders,
    location.pathname,
    orderNumber,
    dispatch,
  ]);

  useEffect(() => {
    if (currentOrderResponse && currentOrderResponse.success) {
      const fetchedOrder = currentOrderResponse.orders.find(
        (order) => order.number === orderNumber,
      );
      if (fetchedOrder) {
        setOrder(fetchedOrder);
      }
    }
  }, [currentOrderResponse, orderNumber]);

  const ingredients = useAppSelector(getIngredients);

  const totalPrice = useMemo(() => {
    return order?.ingredients.reduce((acc, ingredientId) => {
      const ingredient = ingredients.find(
        (ingredient: IBurgerIngredient) =>
          ingredient._id === ingredientId.toString(),
      );
      return ingredient ? acc + ingredient.price : acc;
    }, 0);
  }, [order, ingredients]);

  if (orderLoading) {
    return <Preloader />;
  }

  if (orderError) {
    return <div>Error: {orderError}</div>;
  }

  if (!order) {
    return <NotFoundPage />;
  }

  return (
    <div className={styles.details_container}>
      <div className={styles.details}>
        <div className={styles.order_number_container}>
          <span
            className={`text text_type_digits-medium mb-10 ${styles.order_number}`}
          >
            #{order.number}
          </span>
        </div>
        <p className="text text_type_main-medium mb-3">{order.name}</p>

        <p
          className={
            order.status === "done"
              ? `text text_type_main-medium ${styles.order_status_done}`
              : `text text_type_main-medium ${styles.order_status}`
          }
        >
          {order.status === "created"
            ? "Создан"
            : order.status === "pending"
              ? "Готовится"
              : "Вополнен"}
        </p>

        <p className="text text_type_main-medium mb-6">Состав:</p>

        <IngredientList />

        <div className={styles.bottom_container}>
          <p className="text text_type_main-default text_color_inactive">
            <FormattedDate date={new Date(order.createdAt)} />
          </p>
          <div className={styles.total_price_container}>
            <span className="text text_type_digits-default mr-2">
              {totalPrice}
            </span>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
