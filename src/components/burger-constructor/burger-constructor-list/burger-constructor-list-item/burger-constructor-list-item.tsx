import React from "react";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerConstructorListItemProps } from "../../../../types/types";
import { useAppDispatch } from "../../../../services/hooks";
import { removeIngredient } from "../../../../services/burger-constructor/reducer";

const BurgerConstructorListItem: React.FC<BurgerConstructorListItemProps> = ({
  text,
  price,
  thumbnail,
  type,
  isLocked = false,
  uniqueId,
}) => {
  const dispatch = useAppDispatch();
  const handleRemoveIngredient = () => {
    dispatch(removeIngredient(uniqueId));
  };
  return (
    <div>
      <DragIcon
        type={!["top", "bottom"].includes(type ?? "") ? "primary" : "secondary"}
      />
      <ConstructorElement
        text={text}
        price={price}
        thumbnail={thumbnail}
        type={type}
        isLocked={isLocked}
        handleClose={handleRemoveIngredient}
      />
    </div>
  );
};

export default BurgerConstructorListItem;
