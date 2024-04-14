import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from "./burger-ingredients-item.module.css";

interface IngredientsItemProps {
  name: string;
  price: number;
  image: string;
}

export default function BurgerIngredientsItem({
  name,
  price,
  image,
}: IngredientsItemProps) {
  return (
    <div className={styles.ingredient}>
      <img src={image} />
      <span className="text text_type_digits-default mr-3">
        {price}<CurrencyIcon type="primary" />
      </span>
      <span className="text text_type_main-default">{name}</span>
    </div>
  );
}
