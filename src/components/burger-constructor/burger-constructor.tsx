import React from "react";
import styles from "./burger-constructor.module.css";
import BurgerConstructorList from "./burger-constructor-list/burger-constructor-list";
import TotalPrice from "../total-price/total-price";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerIngredientsProps } from "../../types/types";

const BurgerConstructor: React.FC<
  BurgerIngredientsProps & { onOrderClick: () => void }
> = ({ data, onOrderClick }) => {
  return (
    <section className={styles.column}>
      <BurgerConstructorList data={data} />
      <div className={styles.price}>
        <TotalPrice price={610} />
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          onClick={onOrderClick}
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

export default BurgerConstructor;
