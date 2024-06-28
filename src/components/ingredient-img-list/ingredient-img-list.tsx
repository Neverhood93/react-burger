import { useAppSelector } from "../../services/hooks";
import { getIngredients } from "../../services/ingredients/selectors";
import styles from "./ingredient-img-list.module.css";
import React from "react";
import { IOrder } from "../../types/types";

const IngredientImgList: React.FC<IOrder> = ({ ...props }) => {
  const ingredients = useAppSelector(getIngredients);
  const maxVisible = 5;
  const hiddenCount = ingredients.length - maxVisible;

  return (
    <div className={styles.row}>
      {ingredients.slice(0, maxVisible).map((item, index) => (
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
            src={ingredients[maxVisible].image_mobile}
            alt={ingredients[maxVisible].name}
            className={styles.hidden_image}
          />
          <span className={`text text_type_main-default ${styles.hidden_text}`}>
            +{hiddenCount - 1}
          </span>
        </div>
      )}
    </div>
  );
};

export default IngredientImgList;
