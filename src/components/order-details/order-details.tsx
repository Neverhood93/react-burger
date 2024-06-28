import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { useLocation, useParams } from "react-router-dom";
import NotFoundPage from "../../pages/not-found/not-found";
import { IOrder, IBurgerIngredient } from "../../types/types";
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
import { useOrderTotalPrice } from "../../utils/utils";
import { getIngredients } from "../../services/ingredients/selectors";

const OrderDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentOrderResponse = useAppSelector(getCurrentOrder);
  const orderLoading = useAppSelector(getOrderLoading);
  const orderError = useAppSelector(getOrderError);

  const feedOrders = useAppSelector(getFeedOrders);
  const profileOrders = useAppSelector(getProfileOrders);
  const allIngredients = useAppSelector(getIngredients);
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

  const orderIngredients: IBurgerIngredient[] = order
    ? order.ingredients
        .map((id) =>
          allIngredients.find((ingredient) => ingredient._id === id.toString()),
        )
        .filter(
          (ingredient): ingredient is IBurgerIngredient =>
            ingredient !== undefined,
        )
    : [];

  const totalPrice = useOrderTotalPrice(order?.ingredients || []);

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
              : "Выполнен"}
        </p>

        <p className="text text_type_main-medium mb-6">Состав:</p>

        <IngredientList ingredients={orderIngredients} />

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
