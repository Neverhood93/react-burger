import React from "react";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerConstructorListItemProps } from "../../../../types/types";

const BurgerConstructorListItem: React.FC<BurgerConstructorListItemProps> = ({
  text,
  price,
  thumbnail,
  type,
  isLocked = false,
}) => {
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
      />
    </div>
  );
};

export default BurgerConstructorListItem;
