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
      <div className={styles.parameters}>
        <div className={styles.parameter_block}>
          <span className="text text_type_main-default">Калории,ккал</span>
          <span
            className={`text text_type_main-default ${styles.parameter_value}`}
          >
            {ingredient.calories}
          </span>
        </div>
        <div className={styles.parameter_block}>
          <span className="text text_type_main-default">Белки, г</span>
          <span
            className={`text text_type_main-default ${styles.parameter_value}`}
          >
            {ingredient.proteins}
          </span>
        </div>
        <div className={styles.parameter_block}>
          <span className="text text_type_main-default">Жиры, г</span>
          <span
            className={`text text_type_main-default ${styles.parameter_value}`}
          >
            {ingredient.fat}
          </span>
        </div>
        <div className={styles.parameter_block}>
          <span className="text text_type_main-default">Углеводы, г</span>
          <span
            className={`text text_type_main-default ${styles.parameter_value}`}
          >
            {ingredient.carbohydrates}
          </span>
        </div>
      </div>
    </div>
  );
};

export default IngredientDetails;
