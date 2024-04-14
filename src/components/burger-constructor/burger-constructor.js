import styles from './burger-constructor.module.css';
import BurgerConstructorList from './burger-constructor-list/burger-constructor-list'
import data from "../../utils/data.js";
import TotalPrice from '../total-price/total-price';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'

export default function BurgerConstructor() {
    return (
        <section className={styles.column}>
            <BurgerConstructorList data={data}/>
            <div className={styles.price}>
                <TotalPrice price={610}/>
                <Button htmlType="button" type="primary" size="medium">Оформить заказ</Button>
            </div>
        </section>
    );
}