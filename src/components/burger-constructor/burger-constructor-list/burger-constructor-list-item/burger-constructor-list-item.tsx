import React, { useMemo } from "react";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerConstructorListItemProps } from "../../../../types/types";
import { useAppDispatch } from "../../../../services/hooks";
import { removeIngredient } from "../../../../services/burger-constructor/reducer";
import styles from "./burger-constructor-list-item.module.css";

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

  const isBun = useMemo(() => {
    return ["top", "bottom"].includes(type ?? "");
  }, [type]);

  return (
    <div>
      {!isBun && <DragIcon type={"primary"} />}

      <ConstructorElement
        text={text}
        price={price}
        thumbnail={thumbnail}
        type={type}
        isLocked={isLocked}
        handleClose={handleRemoveIngredient}
        extraClass={isBun ? styles.bun : ""}
      />
    </div>
  );
};

export default BurgerConstructorListItem;
