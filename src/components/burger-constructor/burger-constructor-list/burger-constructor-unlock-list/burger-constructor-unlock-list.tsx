import React from "react";
import styles from "./burger-constructor-unlock-list.module.css";
import { ISelectedBurgerIngredients } from "../../../../types/types";
import DraggableIngredient from "./draggable-ingredient";

const BurgerConstructorUnlockList: React.FC<ISelectedBurgerIngredients> = ({
  data,
}) => {
  return (
    <div className={styles.column}>
      {data.map((item, index) => (
        <DraggableIngredient
          key={item.uniqueId}
          id={item.uniqueId}
          text={item.name}
          price={item.price}
          thumbnail={item.image}
          index={index}
        />
      ))}
    </div>
  );
};

export default BurgerConstructorUnlockList;
