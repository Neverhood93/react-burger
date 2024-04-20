export interface BurgerIngredient {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

export interface BurgerIngredientsProps {
  data: BurgerIngredient[];
}

export interface BurgerIngredientsListProps {
  data: BurgerIngredient[];
  type: string;
}

export interface BurgerConstructorListItemProps {
  type?: "top" | "bottom" | undefined;
  isLocked?: boolean;
  text: string;
  price: number;
  thumbnail: string;
}