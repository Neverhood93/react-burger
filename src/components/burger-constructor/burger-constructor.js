import styles from './burger-constructor.module.css';
import BurgerConstructorList from './burger-constructor-list/burger-constructor-list'
import data from "../../utils/data.js";

export default function BurgerConstructor() {
    return (
        <section className={styles.column}>
            <BurgerConstructorList data={data}/>
        </section>
    );
}