import React from "react";

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

export interface IngredientDetailsProps {
  ingredient: BurgerIngredient;
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

export interface OrderDetailsProps {
  orderNumber: number;
}

export interface BurgerConstructorListItemProps {
  type?: "top" | "bottom" | undefined;
  isLocked?: boolean;
  text: string;
  price: number;
  thumbnail: string;
  uniqueId: string;
}

export interface BurgerIngredientsTabPanelProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export interface DraggableIngredientProps {
  id: string;
  text: string;
  price: number;
  thumbnail: string;
  index: number;
}

export interface DragItem {
  id: string;
  index: number;
}

export interface OrderResponse {
  name: string;
  order: {
    number: number;
  };
  success: boolean;
}

export interface IngredientsApiResponse {
  data: BurgerIngredient[];
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface User {
  email: string;
  name: string;
}

export interface CommonResponse {
  success: boolean;
  message: string;
}

export interface ResetPasswordRequest {
  password: string;
  accessToken: string;
}

export interface UserResponse {
  success: boolean;
  user: User;
}

export interface EditUserRequest {
  registerRequestData: RegisterRequest;
  accessToken: string;
}

export interface RefreshTokenResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
}

export interface ProtectedRouteProps {
  onlyUnAuth?: boolean;
  component: React.ReactNode;
}
