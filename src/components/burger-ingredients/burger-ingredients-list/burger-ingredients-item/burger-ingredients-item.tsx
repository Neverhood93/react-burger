import React from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients-item.module.css";
import { IBurgerIngredient } from "../../../../types/types";
import { useDrag } from "react-dnd";
import { useAppSelector } from "../../../../services/hooks";
import {
  getSelectedBun,
  getSelectedIngredients,
} from "../../../../services/burger-constructor/selectors";
import { Link, useLocation } from "react-router-dom";

const BurgerIngredientsItem: React.FC<IBurgerIngredient> = ({ ...props }) => {
  const selectedIngredients = useAppSelector(getSelectedIngredients);
  const selectedBun = useAppSelector(getSelectedBun);
  const location = useLocation();
  const ingredientId = props._id;

  const count =
    props.type === "bun" && selectedBun?._id === props._id
      ? 2
      : selectedIngredients.filter((item) => item._id === props._id).length;

  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "ingredient",
    item: { ...props },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <Link
      key={ingredientId}
      to={`/ingredients/${ingredientId}`}
      state={{ background: location }}
      className={styles.link}
    >
      <div ref={dragRef} className={styles.ingredient}>
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
    </Link>
  );
};

export default BurgerIngredientsItem;
