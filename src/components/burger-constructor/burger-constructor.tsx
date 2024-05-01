import React, { useMemo, useState } from "react";
import styles from "./burger-constructor.module.css";
import BurgerConstructorList from "./burger-constructor-list/burger-constructor-list";
import TotalPrice from "../total-price/total-price";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../modal/order-details/order-details";
import { useAppSelector } from "../../services/hooks";
import { getAllSelectedIngredients } from "../../services/burger-constructor/selectors";

const BurgerConstructor: React.FC = () => {
  const [isOrderModalOpen, setOrderModalOpen] = useState(false);

  const openOrderModal = () => {
    setOrderModalOpen(true);
  };

  const closeOrderModal = () => {
    setOrderModalOpen(false);
  };

  const burgersData = useAppSelector(getAllSelectedIngredients);

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
          onClick={openOrderModal}
        >
          Оформить заказ
        </Button>
        {isOrderModalOpen && (
          <Modal title="" onClose={closeOrderModal}>
            <OrderDetails />
          </Modal>
        )}
      </div>
    </section>
  );
};

export default BurgerConstructor;
