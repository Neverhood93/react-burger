import PropTypes from "prop-types";
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './total-price.module.css'

export default function TotalPrice({ price }) {
    return (
        <div className={style.price}>
            <span className="text text_type_digits-medium mr-3">{price}</span>
            <CurrencyIcon />
        </div>
    );
}

TotalPrice.propTypes = {
    price: PropTypes.number.isRequired,
};