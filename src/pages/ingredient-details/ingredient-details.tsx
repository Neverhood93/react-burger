import IngredientDetails from "../../components/modal/ingredient-details/ingredient-details";
import styles from "./ingredient-details.module.css";

function IngredientDetailsPage() {
  return (
    <>
      <div className={styles.page}>
        <h1 className={styles.header}>Детали ингредиента</h1>
        <IngredientDetails />
      </div>
    </>
  );
}

export default IngredientDetailsPage;
