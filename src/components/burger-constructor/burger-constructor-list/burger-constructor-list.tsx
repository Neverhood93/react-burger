import React from "react";
import BurgerConstructorListItem from "./burger-constructor-list-item/burger-constructor-list-item";
import BurgerConstructorUnlockList from "./burger-constructor-unlock-list/burger-constructor-unlock-list";
import "./burger-constructor-list.module.css";
import { useAppDispatch, useAppSelector } from "../../../services/hooks";
import {
  getSelectedBun,
  getSelectedIngredients,
} from "../../../services/burger-constructor/selectors";
import { addIngredient } from "../../../services/burger-constructor/reducer";
import { useDrop } from "react-dnd";
import { BurgerIngredient } from "../../../types/types";

const BurgerConstructorList: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedIngredients = useAppSelector(getSelectedIngredients);
  const selectedBun = useAppSelector(getSelectedBun);

  const [, dropRef] = useDrop({
    accept: "ingredient",
    drop: (ingredient: BurgerIngredient) => {
      dispatch(addIngredient(ingredient));
    },
  });

  return (
    <div ref={dropRef} className="constructor-list">
      <BurgerConstructorListItem
        type="top"
        isLocked={true}
        text={selectedBun?.name ? `${selectedBun.name} (верх)` : ""}
        price={selectedBun?.price ?? 0}
        thumbnail={selectedBun?.image ?? ""}
      />
      <BurgerConstructorUnlockList data={selectedIngredients} />
      <BurgerConstructorListItem
        type="bottom"
        isLocked={true}
        text={selectedBun?.name ? `${selectedBun.name} (низ)` : ""}
        price={selectedBun?.price ?? 0}
        thumbnail={selectedBun?.image ?? ""}
      />
    </div>
  );
};

export default BurgerConstructorList;
