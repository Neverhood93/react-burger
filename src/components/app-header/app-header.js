import ButtonHeader from '../buttons/button-header/button-header';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

export default function AppHeader() {
    return (
        <header>
            <ButtonHeader>
                <BurgerIcon /><span>Конструктор</span>
            </ButtonHeader>
            <ButtonHeader>
                <ListIcon  /><span>Лента заказов</span>
            </ButtonHeader>
            <Logo />
            <ButtonHeader>
                <ProfileIcon /><span>Лента заказов</span>
            </ButtonHeader>
        </header>        
    );
}