import React, { useState } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients-item.module.css";
import { BurgerIngredient } from "../../../../types/types";
import Modal from "../../../modal/modal";
import IngredientDetails from "../../../modal/ingredient-details/ingredient-details";
import { useDrag } from "react-dnd";
import { useAppSelector } from "../../../../services/hooks";
import {
  getSelectedBun,
  getSelectedIngredients,
} from "../../../../services/burger-constructor/selectors";

const BurgerIngredientsItem: React.FC<BurgerIngredient> = ({ ...props }) => {
  const [isIngredientModalOpen, setIngredientModalOpen] = useState(false);
  const [selectedIngredient, setSelectedIngredient] =
    useState<BurgerIngredient | null>(null);

  const selectedIngredients = useAppSelector(getSelectedIngredients);
  const selectedBun = useAppSelector(getSelectedBun);

  const count =
    props.type === "bun" && selectedBun?._id === props._id
      ? 2
      : selectedIngredients.filter((item) => item._id === props._id).length;

  const openIngredientModal = (ingredient: BurgerIngredient) => {
    setSelectedIngredient(ingredient);
    setIngredientModalOpen(true);
  };

  const closeIngredientModal = () => {
    setIngredientModalOpen(false);
  };

  const handleClick = () => {
    openIngredientModal(props);
  };

  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "ingredient",
    item: { ...props },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <>
      <div ref={dragRef} className={styles.ingredient} onClick={handleClick}>
        <img src={props.image} alt={props.name} />
        <span className={styles.price}>
          <span className="text text_type_digits-default mr-3">
            {props.price}
          </span>
          <CurrencyIcon type="primary" />
        </span>
        <span className="text text_type_main-default">{props.name}</span>
        {count > 0 && (
          <div className={`text text_type_digits-default ${styles.count}`}>
            {count}
          </div>
        )}
      </div>
      {isIngredientModalOpen && selectedIngredient && (
        <Modal title="Детали ингредиента" onClose={closeIngredientModal}>
          <IngredientDetails ingredient={selectedIngredient} />
        </Modal>
      )}
    </>
  );
};

export default BurgerIngredientsItem;
