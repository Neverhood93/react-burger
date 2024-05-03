import React, { useMemo } from "react";
import styles from "./burger-constructor.module.css";
import BurgerConstructorList from "./burger-constructor-list/burger-constructor-list";
import TotalPrice from "../total-price/total-price";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../modal/order-details/order-details";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { getAllSelectedIngredients } from "../../services/burger-constructor/selectors";
import {
  getCurrentOrder,
  getIsOrderDetailModalOpen,
  getOrderError,
  getOrderLoading,
} from "../../services/order/selectors";
import { createOrder } from "../../services/order/actions";
import { closeOrderDetailModal } from "../../services/order/reducer";
import { clearIngredients } from "../../services/burger-constructor/reducer";

const BurgerConstructor: React.FC = () => {
  const dispatch = useAppDispatch();
  const isOrderDetailModalOpen = useAppSelector(getIsOrderDetailModalOpen);
  const currentOrder = useAppSelector(getCurrentOrder);
  const loading = useAppSelector(getOrderLoading);
  const error = useAppSelector(getOrderError);

  const burgersData = useAppSelector(getAllSelectedIngredients);

  const createOrderHandler = () => {
    if (!burgersData.bun) {
      alert(
        "Пожалуйста, добавьте булку в ваш бургер перед оформлением заказа.",
      );
      return;
    }

    const ingredientIds = [
      burgersData.bun._id,
      ...burgersData.ingredients.map((ingredient) => ingredient._id),
      burgersData.bun._id,
    ];

    dispatch(createOrder(ingredientIds)).then((response) => {
      dispatch(clearIngredients());
    });
  };

  const closeOrderModal = () => {
    dispatch(closeOrderDetailModal());
  };

  const totalPrice = useMemo(() => {
    const totalIngredientsPrice = burgersData.ingredients.reduce(
      (sum, ingredient) => sum + ingredient.price,
      0,
    );
    const totalBunPrice = burgersData.bun ? burgersData.bun.price * 2 : 0;
    return totalIngredientsPrice + totalBunPrice;
  }, [burgersData]);

  return (
    <section className={styles.column}>
      <BurgerConstructorList />
      <div className={styles.price}>
        <TotalPrice price={totalPrice} />
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          onClick={createOrderHandler}
        >
          Оформить заказ
        </Button>
        {isOrderDetailModalOpen && (
          <Modal title="" onClose={closeOrderModal}>
            <>
              {loading && <p>Загрузка...</p>}
              {error && <p>Ошибка: {error}</p>}
              {currentOrder && (
                <OrderDetails orderNumber={currentOrder.order.number} />
              )}
            </>
          </Modal>
        )}
      </div>
    </section>
  );
};

export default BurgerConstructor;
