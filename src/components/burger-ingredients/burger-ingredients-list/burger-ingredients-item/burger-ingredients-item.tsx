import React from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients-item.module.css";
import { BurgerIngredient } from "../../../../types/types";

const BurgerIngredientsItem: React.FC<
  BurgerIngredient & {
    onIngredientClick: (ingredient: BurgerIngredient) => void;
  }
> = ({ onIngredientClick, ...props }) => {
  const handleClick = () => {
    onIngredientClick(props);
  };

  return (
    <div className={styles.ingredient} onClick={handleClick}>
      <img src={props.image} alt={props.name} />
      <span className={styles.price}>
        <span className="text text_type_digits-default mr-3">
          {props.price}
        </span>
        <CurrencyIcon type="primary" />
      </span>
      <span className="text text_type_main-default">{props.name}</span>
    </div>
  );
};

export default BurgerIngredientsItem;
