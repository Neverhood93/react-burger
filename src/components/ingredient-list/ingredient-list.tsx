import { useAppSelector } from "../../services/hooks";
import { getIngredients } from "../../services/ingredients/selectors";
import IngredientListItem from "../ingredient-list-item/ingredient-list-item";
import styles from "./ingredient-list.module.css";

function IngredientList() {
  const ingredients = useAppSelector(getIngredients);

  return (
    <div className={styles.column}>
      {ingredients.map((item) => (
        <IngredientListItem key={item._id} {...item} />
      ))}
    </div>
  );
}

export default IngredientList;
