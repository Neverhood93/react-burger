import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useAppDispatch } from "../../../../services/hooks";
import { moveIngredient } from "../../../../services/burger-constructor/reducer";
import BurgerConstructorListItem from "../burger-constructor-list-item/burger-constructor-list-item";
import styles from "./burger-constructor-unlock-list.module.css";
import { SelectedBurgerIngredientsProps } from "../../../../types/types";

interface DraggableIngredientProps {
  id: string;
  text: string;
  price: number;
  thumbnail: string;
  index: number;
}

interface DragItem {
  id: string;
  index: number;
  type: string;
}

interface DragCollectedProps {
  handlerId: string | symbol | null;
}

const BurgerConstructorUnlockList: React.FC<SelectedBurgerIngredientsProps> = ({
  data,
}) => {
  return (
    <div className={styles.column}>
      {data.map((item, index) => (
        <DraggableIngredient
          key={item.uniqueId}
          id={item.uniqueId}
          text={item.name}
          price={item.price}
          thumbnail={item.image}
          index={index}
        />
      ))}
    </div>
  );
};

const DraggableIngredient: React.FC<DraggableIngredientProps> = ({
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
      type: "move_ingredient",
    }),
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop<DragItem, void, DragCollectedProps>({
    accept: "move_ingredient",
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
    }),
    hover(item, monitor) {
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
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

export default BurgerConstructorUnlockList;
