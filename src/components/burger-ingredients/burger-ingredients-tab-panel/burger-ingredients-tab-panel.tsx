import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react';
import styles from './burger-ingredients-tab-panel.module.css';

export default function BurgerIngredientsTabPanel() {
    const [current, setCurrent] = React.useState('bun')
    return (
        <div className={styles.tab}>
            <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
                Булки
            </Tab>
            <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
                Соусы
            </Tab>
            <Tab value="main" active={current === 'main'} onClick={setCurrent}>
                Начинки
            </Tab>
        </div>
    );
}