import PropTypes from "prop-types";
import BurgerConstructorListItem from '../burger-constructor-list-item/burger-constructor-list-item'
import styles from "./burger-constructor-unlock-list.module.css";

export default function BurgerConstructorUnlockList({ data }) {
    const items = data.filter((item) => ["sauce", "main"].includes(item.type));

    return (
        <div className={styles.column}>
            {items.map((item) => (
                <div className={styles.item} key={item._id}>
                    <BurgerConstructorListItem
                        text={item.name}
                        price={item.price}
                        thumbnail={item.image}
                    />
                </div>                
            ))}
        </div>
    );
}

const burgerConstructorItem = PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
});

BurgerConstructorUnlockList.propTypes = {
    data: PropTypes.arrayOf(burgerConstructorItem).isRequired,
};
