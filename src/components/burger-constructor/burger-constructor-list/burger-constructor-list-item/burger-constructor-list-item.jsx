import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from "prop-types";

export default function BurgerConstructorListItem({ text, price, thumbnail, type, isLocked }) {
  return (
    <div>
      <DragIcon type={!['top', 'bottom'].includes(type) ? "primary" : "secondary" }/>
      <ConstructorElement
        text={text}
        price={price}
        thumbnail={thumbnail}
        type={type}
        isLocked={isLocked}          
      />
    </div>
  );
}

BurgerConstructorListItem.propTypes = {
  text: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
  type: PropTypes.string,
  isLocked: PropTypes.bool,
};
