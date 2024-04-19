import React from "react";
import styles from "./burger-ingredients.module.css";
import BurgerIngredientsList from "./burger-ingredients-list/burger-ingredients-list";
import BurgerIngredientsTabPanel from "./burger-ingredients-tab-panel/burger-ingredients-tab-panel";
import { BurgerIngredient, BurgerIngredientsProps } from "../../types/types";

const BurgerIngredients: React.FC<
  BurgerIngredientsProps & {
    onIngredientClick: (ingredient: BurgerIngredient) => void;
  }
> = ({ data, onIngredientClick }) => {
  return (
    <section className={styles.column}>
      <p className="text text_type_main-large">Соберите бургер</p>

      <BurgerIngredientsTabPanel />
      <div className={styles.container}></div>

      <p className="text text_type_main-medium">Булки</p>
      <BurgerIngredientsList
        data={data}
        type="bun"
        onIngredientClick={onIngredientClick}
      />

      <p className="text text_type_main-medium">Соусы</p>
      <BurgerIngredientsList
        data={data}
        type="sauce"
        onIngredientClick={onIngredientClick}
      />

      <p className="text text_type_main-medium">Начинки</p>
      <BurgerIngredientsList
        data={data}
        type="main"
        onIngredientClick={onIngredientClick}
      />
    </section>
  );
};

export default BurgerIngredients;
