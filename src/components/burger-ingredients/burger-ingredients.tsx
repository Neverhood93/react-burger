import React from "react";
import styles from "./burger-ingredients.module.css";
import BurgerIngredientsList from "./burger-ingredients-list/burger-ingredients-list";
import BurgerIngredientsTabPanel from "./burger-ingredients-tab-panel/burger-ingredients-tab-panel";
import { BurgerIngredientsProps } from "../../types/types";

const BurgerIngredients: React.FC<BurgerIngredientsProps> = ({ data }) => {
  return (
    <section className={styles.column}>
      <p className="text text_type_main-large">Соберите бургер</p>

      <BurgerIngredientsTabPanel />
      <div className={styles.container}></div>

      <p className="text text_type_main-medium">Булки</p>
      <BurgerIngredientsList data={data} type="bun" />

      <p className="text text_type_main-medium">Соусы</p>
      <BurgerIngredientsList data={data} type="sauce" />

      <p className="text text_type_main-medium">Начинки</p>
      <BurgerIngredientsList data={data} type="main" />
    </section>
  );
};

export default BurgerIngredients;
