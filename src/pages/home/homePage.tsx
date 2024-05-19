import React, { useEffect } from "react";
import styles from "./home.module.css";
import {
  getIngredientsError,
  getIngredientsLoading,
  getIngredients,
} from "../../services/ingredients/selectors";
import { loadIngredients } from "../../services/ingredients/actions";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import Preloader from "../../components/common/preloader/preloader";

function HomePage() {
  const dispatch = useAppDispatch();
  const ingredients = useAppSelector(getIngredients);
  const loading = useAppSelector(getIngredientsLoading);
  const error = useAppSelector(getIngredientsError);

  useEffect(() => {
    dispatch(loadIngredients());
  }, [dispatch]);

  return (
    <>
      {loading && <Preloader />}
      {error && <p>Ошибка: {error}</p>}
      {ingredients?.length > 0 && (
        <div className={styles.content}>
          <main className={styles.main}>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor />
            </DndProvider>
          </main>
        </div>
      )}
    </>
  );
}

export default HomePage;
