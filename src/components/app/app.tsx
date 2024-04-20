import React, { useEffect, useState } from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { BurgerIngredient } from "../../types/types";
import Modal from "../modal/modal";
import IngredientDetails from "../modal/ingredient-details/ingredient-details";
import OrderDetails from "../modal/order-details/order-details";

const API_URL = "https://norma.nomoreparties.space/api/ingredients";

function App() {
  const [ingredients, setIngredients] = useState<BurgerIngredient[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isIngredientModalOpen, setIngredientModalOpen] = useState(false);
  const [isOrderModalOpen, setOrderModalOpen] = useState(false);
  const [selectedIngredient, setSelectedIngredient] =
    useState<BurgerIngredient | null>(null);

  const openIngredientModal = (ingredient: BurgerIngredient) => {
    setSelectedIngredient(ingredient);
    setIngredientModalOpen(true);
  };

  const closeIngredientModal = () => {
    setIngredientModalOpen(false);
  };

  const openOrderModal = () => {
    setOrderModalOpen(true);
  };

  const closeOrderModal = () => {
    setOrderModalOpen(false);
  };

  const getIngredients = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`Ошибка HTTP запроса: ${response.status}`);
      }

      const data = await response.json();

      return data;
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    setLoading(true);
    getIngredients()
      .then((data) => {
        setIngredients(data.data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading && <p>Загрузка...</p>}
      {error && <p>Ошибка: {error}</p>}
      {ingredients.length > 0 && (
        <>
          <AppHeader />

          <div className={styles.content}>
            <main className={styles.main}>
              <BurgerIngredients
                data={ingredients}
                onIngredientClick={openIngredientModal}
              />
              <BurgerConstructor
                data={ingredients}
                onOrderClick={openOrderModal}
              />
            </main>
          </div>
        </>
      )}

      {isIngredientModalOpen && selectedIngredient && (
        <Modal title="Детали ингредиента" onClose={closeIngredientModal}>
          <IngredientDetails ingredient={selectedIngredient} />
        </Modal>
      )}

      {isOrderModalOpen && (
        <Modal title="" onClose={closeOrderModal}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
}

export default App;
