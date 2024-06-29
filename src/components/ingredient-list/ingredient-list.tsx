import React from "react";
import { IIngredientListProps, IIngredientMap } from "../../types/types";
import IngredientListItem from "../ingredient-list-item/ingredient-list-item";
import styles from "./ingredient-list.module.css";

const IngredientList: React.FC<IIngredientListProps> = ({ ingredients }) => {
  const ingredientMap: IIngredientMap = {};

  ingredients.forEach((ingredient) => {
    if (ingredientMap[ingredient._id]) {
      ingredientMap[ingredient._id].count += 1;
    } else {
      ingredientMap[ingredient._id] = { ingredient, count: 1 };
    }
  });

  const groupedIngredients = Object.values(ingredientMap);

  return (
    <div className={styles.column}>
      {groupedIngredients.map(({ ingredient, count }) => (
        <IngredientListItem
          key={ingredient._id}
          ingredient={ingredient}
          count={count}
        />
      ))}
    </div>
  );
};

export default IngredientList;
