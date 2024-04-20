import React from "react";
import styles from "./burger-ingredients-list.module.css";
import BurgerIngredientsItem from "./burger-ingredients-item/burger-ingredients-item";
import { BurgerIngredientsListProps } from "../../../types/types";

const BurgerIngredientsList: React.FC<BurgerIngredientsListProps> = ({
  data,
  type,
}) => {
  const items = data.filter((item) => item.type === type);

  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <BurgerIngredientsItem key={item._id} {...item} />
      ))}
    </ul>
  );
};

export default BurgerIngredientsList;
