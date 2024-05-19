import React, { useEffect } from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {
  getIngredientsError,
  getIngredientsLoading,
  getIngredients,
} from "../../services/ingredients/selectors";
import { loadIngredients } from "../../services/ingredients/actions";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const dispatch = useAppDispatch();
  const ingredients = useAppSelector(getIngredients);
  const loading = useAppSelector(getIngredientsLoading);
  const error = useAppSelector(getIngredientsError);

  useEffect(() => {
    dispatch(loadIngredients());
  }, [dispatch]);

  return (
    <>
      {loading && <p>Загрузка...</p>}
      {error && <p>Ошибка: {error}</p>}
      {ingredients.length > 0 && (
        <>
          <AppHeader />

          <div className={styles.content}>
            <main className={styles.main}>
              <DndProvider backend={HTML5Backend}>
                <BurgerIngredients />
                <BurgerConstructor />
              </DndProvider>
            </main>
          </div>
        </>
      )}
    </>
  );
}

export default App;
