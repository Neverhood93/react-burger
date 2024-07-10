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
import { IBurgerIngredient } from "../../../types/types";

const BurgerConstructorList: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedIngredients = useAppSelector(getSelectedIngredients);
  const selectedBun = useAppSelector(getSelectedBun);

  const [, dropRef] = useDrop({
    accept: "ingredient",
    drop: (ingredient: IBurgerIngredient) => {
      dispatch(addIngredient(ingredient));
    },
  });

  return (
    <div data-test-id="constructor" ref={dropRef} className="constructor-list">
      {!selectedBun ? (
        <div>
          <p className="text text_type_main-large">
            Выберете булочку и перенесите ее сюда
          </p>
        </div>
      ) : (
        <>
          <BurgerConstructorListItem
            type="top"
            isLocked={true}
            text={selectedBun?.name ? `${selectedBun.name} (верх)` : ""}
            price={selectedBun?.price ?? 0}
            thumbnail={selectedBun?.image ?? ""}
            uniqueId={selectedBun.uniqueId}
          />
          <BurgerConstructorUnlockList data={selectedIngredients} />
          <BurgerConstructorListItem
            type="bottom"
            isLocked={true}
            text={selectedBun?.name ? `${selectedBun.name} (низ)` : ""}
            price={selectedBun?.price ?? 0}
            thumbnail={selectedBun?.image ?? ""}
            uniqueId={selectedBun.uniqueId}
          />
        </>
      )}
    </div>
  );
};

export default BurgerConstructorList;
