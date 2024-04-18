
export interface IngredientsItemProps {
    name: string;
    price: number;
    image: string;
}

export interface BurgerConstructorItem {
    _id: string;
    image: string;
    name: string;
    price: number;
    type: string;
}

export interface BurgerConstructorListProps {
    data: BurgerConstructorItem[];
}