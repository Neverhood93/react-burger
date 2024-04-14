import styles from "./burger-ingredients-list.module.css";
import BurgerIngredientsItem from "./burger-ingredients-item/burger-ingredients-item";
import PropTypes from 'prop-types';


export default function BurgerIngredientsList({ data, type }) {
  const items = data.filter((item) => item.type === type);

  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <BurgerIngredientsItem
          key={item._id}
          name={item.name}
          price={item.price}
          image={item.image}
        />
      ))}
    </ul>
  );
}

const burgerIngredientsItem = PropTypes.shape({
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired
});

BurgerIngredientsList.propTypes = {
  data: PropTypes.arrayOf(burgerIngredientsItem).isRequired,
  type: PropTypes.string.isRequired 
}