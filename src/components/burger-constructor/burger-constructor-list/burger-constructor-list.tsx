import React, { useEffect } from "react";
import BurgerConstructorListItem from "./burger-constructor-list-item/burger-constructor-list-item";
import BurgerConstructorUnlockList from "./burger-constructor-unlock-list/burger-constructor-unlock-list";
import "./burger-constructor-list.module.css";
import { useAppDispatch, useAppSelector } from "../../../services/hooks";
import { getSelectedIngredients } from "../../../services/burger-constructor/selectors";
import { addIngredient } from "../../../services/burger-constructor/reducer";

const BurgerConstructorList: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedIngredients = useAppSelector(getSelectedIngredients);

  useEffect(() => {
    dispatch(
      addIngredient({
        _id: "643d69a5c3f7b9001cfa0941",
        name: "Биокотлета из марсианской Магнолии",
        type: "main",
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: "https://code.s3.yandex.net/react/code/meat-01.png",
        image_mobile:
          "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
        __v: 0,
      }),
    );
  }, [dispatch]);

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
      <BurgerConstructorUnlockList data={selectedIngredients} />
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
