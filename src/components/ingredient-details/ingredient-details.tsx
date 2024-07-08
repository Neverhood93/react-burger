import React, { useEffect } from "react";
import styles from "./ingredient-details.module.css";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { getSelectedIngredient } from "../../services/ingredient-details/selectors";
import { getIngredients } from "../../services/ingredients/selectors";
import { useParams } from "react-router-dom";
import NotFoundPage from "../../pages/not-found/not-found";
import { IBurgerIngredient } from "../../types/types";
import { openIngredientModal } from "../../services/ingredient-details/reducer";

const IngredientDetails: React.FC = () => {
  const dispatch = useAppDispatch();

  const { selectedIngredient } = useAppSelector(getSelectedIngredient);
  const ingredients = useAppSelector(getIngredients);
  const { id } = useParams<{ id?: string }>();

  useEffect(() => {
    if (!selectedIngredient && id && ingredients) {
      const ingredient = ingredients.find(
        (ingredient: IBurgerIngredient) => ingredient._id === id,
      );
      if (ingredient) {
        dispatch(openIngredientModal(ingredient));
      }
    }
  }, [selectedIngredient, id, ingredients, dispatch]);

  if (!selectedIngredient) {
    return <NotFoundPage />;
  }

  return (
    <div className={styles.details}>
      <img src={selectedIngredient.image_large} alt={selectedIngredient.name} />
      <p
        data-test-id="ingredient_name"
        className="text text_type_main-medium mt-4"
      >
        {selectedIngredient.name}
      </p>
      <div className={styles.parameters}>
        <div className={styles.parameter_block}>
          <span className="text text_type_main-default">Калории,ккал</span>
          <span
            data-test-id="ingredient_calories"
            className={`text text_type_main-default ${styles.parameter_value}`}
          >
            {selectedIngredient.calories}
          </span>
        </div>
        <div className={styles.parameter_block}>
          <span className="text text_type_main-default">Белки, г</span>
          <span
            data-test-id="ingredient_proteins"
            className={`text text_type_main-default ${styles.parameter_value}`}
          >
            {selectedIngredient.proteins}
          </span>
        </div>
        <div className={styles.parameter_block}>
          <span className="text text_type_main-default">Жиры, г</span>
          <span
            data-test-id="ingredient_fat"
            className={`text text_type_main-default ${styles.parameter_value}`}
          >
            {selectedIngredient.fat}
          </span>
        </div>
        <div className={styles.parameter_block}>
          <span className="text text_type_main-default">Углеводы, г</span>
          <span
            data-test-id="ingredient_carbohydrates"
            className={`text text_type_main-default ${styles.parameter_value}`}
          >
            {selectedIngredient.carbohydrates}
          </span>
        </div>
      </div>
    </div>
  );
};

export default IngredientDetails;
