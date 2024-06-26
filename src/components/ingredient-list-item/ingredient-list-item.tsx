import React from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { IBurgerIngredient } from "../../types/types";
import styles from "./ingredient-list-item.module.css";

const IngredientListItem: React.FC<IBurgerIngredient> = ({ ...props }) => {
  return (
    <div className={styles.ingredient_item}>
      <div className={styles.ingredient_image}>
        <img src={props.image_mobile} alt={props.name} />
      </div>
      <div className={styles.title_container}>
        <span className="text text_type_main-default">{props.name}</span>
      </div>
      <div className={styles.price_container}>
        <span className="text text_type_digits-default mr-2">
          {props.price}
        </span>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  );
};

export default IngredientListItem;
