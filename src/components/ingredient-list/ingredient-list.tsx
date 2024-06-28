import React from "react";
import { IBurgerIngredient } from "../../types/types";
import IngredientListItem from "../ingredient-list-item/ingredient-list-item";
import styles from "./ingredient-list.module.css";

interface IngredientListProps {
  ingredients: IBurgerIngredient[];
}

const IngredientList: React.FC<IngredientListProps> = ({ ingredients }) => {
  return (
    <div className={styles.column}>
      {ingredients.map((item, index) => (
        <IngredientListItem key={`${item._id}${index}`} {...item} />
      ))}
    </div>
  );
};

export default IngredientList;
