import React, { useRef } from "react";
import { useAppDispatch } from "../../../../services/hooks";
import { useDrag, useDrop } from "react-dnd";
import { moveIngredient } from "../../../../services/burger-constructor/reducer";
import styles from "./burger-constructor-unlock-list.module.css";
import BurgerConstructorListItem from "../burger-constructor-list-item/burger-constructor-list-item";
import { IDraggableIngredient, IDragItem } from "../../../../types/types";

const DraggableIngredient: React.FC<IDraggableIngredient> = ({
  id,
  text,
  price,
  thumbnail,
  index,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const [{ isDragging }, drag] = useDrag({
    type: "move_ingredient",
    item: () => ({
      id,
      index,
    }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop<IDragItem>({
    accept: "move_ingredient",
    hover(item, monitor) {
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      dispatch(moveIngredient({ fromIndex: dragIndex, toIndex: hoverIndex }));
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={styles.item}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <BurgerConstructorListItem
        text={text}
        price={price}
        thumbnail={thumbnail}
        uniqueId={id}
      />
    </div>
  );
};

export default DraggableIngredient;
