import PropTypes from "prop-types";
import BurgerConstructorListItem from './burger-constructor-list-item/burger-constructor-list-item'
import BurgerConstructorUnlockList from './burger-constructor-unlock-list/burger-constructor-unlock-list'

export default function BurgerConstructorList({ data }) {
    const items = data.filter((item) => ["sauce", "main"].includes(item.type));

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {/* Пока захардкожено, для проверки */}
            <BurgerConstructorListItem
                type="top"
                isLocked={true}
                text="Краторная булка N-200i (верх)"
                price={200}
                thumbnail="https://code.s3.yandex.net/react/code/meat-01.png"
            />
            <BurgerConstructorUnlockList data={items}/>
            <BurgerConstructorListItem
                type="bottom"
                isLocked={true}
                text="Краторная булка N-200i (низ)"
                price={200}
                thumbnail="https://code.s3.yandex.net/react/code/meat-01.png"
            />
        </div>
    );
}

const burgerConstructorItem = PropTypes.shape({
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
});

BurgerConstructorList.propTypes = {
  data: PropTypes.arrayOf(burgerConstructorItem).isRequired,
};
