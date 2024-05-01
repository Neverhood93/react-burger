import React from "react";
import BurgerConstructorListItem from "../burger-constructor-list-item/burger-constructor-list-item";
import styles from "./burger-constructor-unlock-list.module.css";
import { SelectedBurgerIngredientsProps } from "../../../../types/types";

const BurgerConstructorUnlockList: React.FC<SelectedBurgerIngredientsProps> = ({
  data,
}) => {
  const items = data.filter((item) => ["sauce", "main"].includes(item.type));

  return (
    <div className={styles.column}>
      {items.map((item) => (
        <div className={styles.item} key={item.uniqueId}>
          <BurgerConstructorListItem
            text={item.name}
            price={item.price}
            thumbnail={item.image}
          />
        </div>
      ))}
    </div>
  );
};

export default BurgerConstructorUnlockList;
