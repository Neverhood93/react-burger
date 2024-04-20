import React from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./total-price.module.css";

interface TotalPriceProps {
  price: number;
}

const TotalPrice: React.FC<TotalPriceProps> = ({ price }) => {
  return (
    <div className={style.price}>
      <span className="text text_type_digits-medium mr-3">{price}</span>
      <CurrencyIcon type="primary" />
    </div>
  );
};

export default TotalPrice;
