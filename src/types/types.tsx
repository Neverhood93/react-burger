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

export interface SelectedBurgerIngredient {
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
  uniqueId: string;
}

export interface BurgerIngredientsProps {
  data: BurgerIngredient[];
}

export interface SelectedBurgerIngredientsProps {
  data: SelectedBurgerIngredient[];
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

export interface BurgerIngredientsTabPanelProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}
