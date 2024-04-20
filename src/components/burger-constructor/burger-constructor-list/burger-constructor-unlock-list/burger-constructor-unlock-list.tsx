import React from "react";
import BurgerConstructorListItem from "../burger-constructor-list-item/burger-constructor-list-item";
import styles from "./burger-constructor-unlock-list.module.css";
import { BurgerIngredientsProps } from "../../../../types/types";

const BurgerConstructorUnlockList: React.FC<BurgerIngredientsProps> = ({
  data,
}) => {
  const items = data.filter((item) => ["sauce", "main"].includes(item.type));

  return (
    <div className={styles.column}>
      {items.map((item) => (
        <div className={styles.item} key={item._id}>
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