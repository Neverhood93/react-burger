import React, { useMemo } from "react";
import styles from "./burger-ingredients-list.module.css";
import BurgerIngredientsItem from "./burger-ingredients-item/burger-ingredients-item";
import { IBurgerIngredientsList } from "../../../types/types";

const BurgerIngredientsList: React.FC<IBurgerIngredientsList> = ({
  data,
  type,
}) => {
  const items = useMemo(() => {
    return data.filter((item) => item.type === type);
  }, [data, type]);

  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <li>
          <BurgerIngredientsItem key={item._id} {...item} />
        </li>
      ))}
    </ul>
  );
};

export default BurgerIngredientsList;
