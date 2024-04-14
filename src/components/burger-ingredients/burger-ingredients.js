import styles from "./burger-ingredients.module.css";
import data from "../../utils/data.js";
import BurgerIngredientsList from './burger-ingredients-list/burger-ingredients-list'
import BurgerIngredientsTabPanel from './burger-ingredients-tab-panel/burger-ingredients-tab-panel'

export default function BurgerIngredients() {
  return (
    <section className={styles.column}>
      <p className="text text_type_main-large">Соберите бургер</p>      

      <BurgerIngredientsTabPanel />
      <div style={{ paddingTop: 40 }}></div>

      <p className="text text_type_main-medium">Булки</p>
      <BurgerIngredientsList data={data} type="bun"/>

      <p className="text text_type_main-medium">Соусы</p>
      <BurgerIngredientsList data={data} type="sauce"/>

      <p className="text text_type_main-medium">Начинки</p>
      <BurgerIngredientsList data={data} type="main"/>
    </section>
  );
}
