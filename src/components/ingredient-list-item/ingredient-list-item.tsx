import React from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { IIngredientListItemProps } from "../../types/types";
import styles from "./ingredient-list-item.module.css";

const IngredientListItem: React.FC<IIngredientListItemProps> = ({
  ingredient,
  count,
}) => {
  return (
    <div className={styles.ingredient_item}>
      <div className={styles.ingredient_image}>
        <img src={ingredient.image_mobile} alt={ingredient.name} />
      </div>
      <div className={styles.title_container}>
        <span className="text text_type_main-default">{ingredient.name}</span>
      </div>
      <div className={styles.price_container}>
        <span className="text text_type_digits-default mr-2">
          {count} x {ingredient.price}
        </span>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  );
};

export default IngredientListItem;
