import React from "react";
import styles from "./ingredient-details.module.css";
import { BurgerIngredient } from "../../../types/types";

interface IngredientDetailsProps {
  ingredient: BurgerIngredient;
}

const IngredientDetails: React.FC<IngredientDetailsProps> = ({
  ingredient,
}) => {
  return (
    <div className={styles.details}>
      <img src={ingredient.image_large} alt={ingredient.name} />
      <p className="text text_type_main-medium mt-4">{ingredient.name}</p>
    </div>
  );
};

export default IngredientDetails;
