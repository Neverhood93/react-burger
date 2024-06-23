import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { useLocation, useParams } from "react-router-dom";
import NotFoundPage from "../../pages/not-found/not-found";
import { IOrder } from "../../types/types";
import { getFeedOrders } from "../../services/feed/selectors";
import { getProfileOrders } from "../../services/profile-orders/selectors";
import {
  getCurrentOrder,
  getOrderLoading,
  getOrderError,
} from "../../services/order/selectors";
import { fetchOrder } from "../../services/order/actions";
import Preloader from "../common/preloader/preloader";

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

  if (orderLoading) {
    return <Preloader />;
  }

  if (orderError) {
    return <div>Error: {orderError}</div>;
  }

  if (!order) {
    return <NotFoundPage />;
  }

  return <div>{order.number}</div>;
};

export default OrderDetails;
