import React from "react";
import styles from "./burger-ingredients-list.module.css";
import BurgerIngredientsItem from "./burger-ingredients-item/burger-ingredients-item";
import {
  BurgerIngredient,
  BurgerIngredientsListProps,
} from "../../../types/types";

const BurgerIngredientsList: React.FC<
  BurgerIngredientsListProps & {
    onIngredientClick: (ingredient: BurgerIngredient) => void;
  }
> = ({ data, type, onIngredientClick }) => {
  const items = data.filter((item) => item.type === type);

  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <BurgerIngredientsItem
          {...item}
          onIngredientClick={onIngredientClick}
        />
      ))}
    </ul>
  );
};

export default BurgerIngredientsList;
