import ButtonHeader from '../buttons/button-header/button-header';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.css';

export default function AppHeader() {
    return (
        <header className={styles.header}>
            <div className={styles.left_container}>
                <ButtonHeader>
                    <BurgerIcon type="primary" /><span className="text text_type_main-default">Конструктор</span>
                </ButtonHeader>
                <ButtonHeader>
                    <ListIcon type="primary" /><span className="text text_type_main-default">Лента заказов</span>
                </ButtonHeader>
            </div>
            <div className={styles.logo}>
                <Logo />
            </div>
            <div className={styles.right_container}>
                <ButtonHeader>
                    <ProfileIcon type="primary" /><span className="text text_type_main-default">Личный кабинет</span>
                </ButtonHeader>
            </div>
        </header>        
    );
}