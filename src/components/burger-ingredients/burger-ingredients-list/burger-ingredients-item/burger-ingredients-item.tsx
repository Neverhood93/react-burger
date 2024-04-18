import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from "./burger-ingredients-item.module.css";
import {IngredientsItemProps} from "../../../../types/types";

export default function BurgerIngredientsItem({ name, price, image }: IngredientsItemProps) {
  return (
    <div className={styles.ingredient}>
      <img src={image}  alt={name}/>
      <span className={styles.price}>
        <span className="text text_type_digits-default mr-3">{price}</span>
        <CurrencyIcon type="primary" />
      </span>
      <span className="text text_type_main-default">{name}</span>
    </div>
  );
}
