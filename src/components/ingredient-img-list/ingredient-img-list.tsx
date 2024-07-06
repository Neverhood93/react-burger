import { useAppSelector } from "../../services/hooks";
import { getIngredients } from "../../services/ingredients/selectors";
import styles from "./ingredient-img-list.module.css";
import React from "react";
import { IOrder, IBurgerIngredient } from "../../types/types";

const IngredientImgList: React.FC<IOrder> = ({
  ingredients: orderIngredients,
}) => {
  const ingredients = useAppSelector(getIngredients);

  const filteredIngredients = orderIngredients
    .map((ingredientId) =>
      ingredients.find(
        (ingredient) => ingredient._id === ingredientId.toString(),
      ),
    )
    .filter(
      (ingredient): ingredient is IBurgerIngredient => ingredient !== undefined,
    );

  const maxVisible = 5;
  const visibleIngredients = filteredIngredients.slice(0, maxVisible);
  const hiddenCount = filteredIngredients.length - maxVisible;

  return (
    <div className={styles.row}>
      {visibleIngredients.map((item, index) => (
        <div
          key={index}
          className={styles.ingredient_image}
          style={{ zIndex: maxVisible - index }}
        >
          <img src={item.image_mobile} alt={item.name} />
        </div>
      ))}
      {hiddenCount > 0 && (
        <div
          className={`${styles.ingredient_image} ${styles.hidden_ingredient}`}
          style={{ zIndex: 0 }}
        >
          <img
            src={filteredIngredients[maxVisible].image_mobile}
            alt={filteredIngredients[maxVisible].name}
            className={styles.hidden_image}
          />
          {hiddenCount - 1 > 0 && (
            <span
              className={`text text_type_main-default ${styles.hidden_text}`}
            >
              +{hiddenCount - 1}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default IngredientImgList;
