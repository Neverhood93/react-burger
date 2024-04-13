import ButtonHeader from '../buttons/button-header/button-header';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.css';

export default function AppHeader() {
    return (
        <header className={styles.header}>
            <div className={styles.left_container}>
                <ButtonHeader>
                    <BurgerIcon /><span className="text text_type_main-medium">Конструктор</span>
                </ButtonHeader>
                <ButtonHeader>
                    <ListIcon  /><span className="text text_type_main-medium">Лента заказов</span>
                </ButtonHeader>
            </div>
            <div className={styles.logo}>
                <Logo />
            </div>
            <div className={styles.right_container}>
                <ButtonHeader>
                    <ProfileIcon /><span className="text text_type_main-medium">Лента заказов</span>
                </ButtonHeader>
            </div>
        </header>        
    );
}