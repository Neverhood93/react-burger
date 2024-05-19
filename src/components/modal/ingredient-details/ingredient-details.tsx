import React from "react";
import styles from "./ingredient-details.module.css";
import { useAppDispatch, useAppSelector } from "../../../services/hooks";
import { getIngredientModal } from "../../../services/ingredient-details/selectors";
import { getIngredients } from "../../../services/ingredients/selectors";
import { useParams } from "react-router-dom";
import NotFoundPage from "../../../pages/not-found/not-found";
import { BurgerIngredient } from "../../../types/types";
import { openIngredientModal } from "../../../services/ingredient-details/reducer";

const IngredientDetails: React.FC = () => {
  const dispatch = useAppDispatch();

  const { selectedIngredientModal } = useAppSelector(getIngredientModal);
  const ingredients = useAppSelector(getIngredients);
  const { id } = useParams<{ id?: string }>();

  React.useEffect(() => {
    if (!selectedIngredientModal && id && ingredients) {
      const ingredient = ingredients.find(
        (ingredient: BurgerIngredient) => ingredient._id === id,
      );
      if (ingredient) {
        dispatch(openIngredientModal(ingredient));
      }
    }
  }, [selectedIngredientModal, id, ingredients, dispatch]);

  if (!selectedIngredientModal) {
    return <NotFoundPage />;
  }

  return (
    <div className={styles.details}>
      <img
        src={selectedIngredientModal.image_large}
        alt={selectedIngredientModal.name}
      />
      <p className="text text_type_main-medium mt-4">
        {selectedIngredientModal.name}
      </p>
      <div className={styles.parameters}>
        <div className={styles.parameter_block}>
          <span className="text text_type_main-default">Калории,ккал</span>
          <span
            className={`text text_type_main-default ${styles.parameter_value}`}
          >
            {selectedIngredientModal.calories}
          </span>
        </div>
        <div className={styles.parameter_block}>
          <span className="text text_type_main-default">Белки, г</span>
          <span
            className={`text text_type_main-default ${styles.parameter_value}`}
          >
            {selectedIngredientModal.proteins}
          </span>
        </div>
        <div className={styles.parameter_block}>
          <span className="text text_type_main-default">Жиры, г</span>
          <span
            className={`text text_type_main-default ${styles.parameter_value}`}
          >
            {selectedIngredientModal.fat}
          </span>
        </div>
        <div className={styles.parameter_block}>
          <span className="text text_type_main-default">Углеводы, г</span>
          <span
            className={`text text_type_main-default ${styles.parameter_value}`}
          >
            {selectedIngredientModal.carbohydrates}
          </span>
        </div>
      </div>
    </div>
  );
};

export default IngredientDetails;
