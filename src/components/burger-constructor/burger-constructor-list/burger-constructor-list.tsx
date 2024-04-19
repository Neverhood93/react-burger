import React from "react";
import { BurgerIngredientsProps } from "../../../types/types";
import BurgerConstructorListItem from "./burger-constructor-list-item/burger-constructor-list-item";
import BurgerConstructorUnlockList from "./burger-constructor-unlock-list/burger-constructor-unlock-list";
import "./burger-constructor-list.module.css";

const BurgerConstructorList: React.FC<BurgerIngredientsProps> = ({ data }) => {
  const items = data.filter((item) => ["sauce", "main"].includes(item.type));

  return (
    <div className="constructor-list">
      {/* Пока захардкожено, для проверки */}
      <BurgerConstructorListItem
        type="top"
        isLocked={true}
        text="Краторная булка N-200i (верх)"
        price={200}
        thumbnail="https://code.s3.yandex.net/react/code/meat-01.png"
      />
      <BurgerConstructorUnlockList data={items} />
      <BurgerConstructorListItem
        type="bottom"
        isLocked={true}
        text="Краторная булка N-200i (низ)"
        price={200}
        thumbnail="https://code.s3.yandex.net/react/code/meat-01.png"
      />
    </div>
  );
};

export default BurgerConstructorList;
