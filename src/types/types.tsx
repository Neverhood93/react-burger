import { ReactNode } from "react";

export interface IBurgerIngredient {
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

export interface ISelectedBurgerIngredient extends IBurgerIngredient {
  uniqueId: string;
}

export interface ISelectedBurgerIngredients {
  data: ISelectedBurgerIngredient[];
}

export interface IBurgerIngredientsList {
  data: IBurgerIngredient[];
  type: string;
}

export interface IOrderDetails {
  orderNumber: number;
}

export interface IBurgerConstructorListItem {
  type?: "top" | "bottom" | undefined;
  isLocked?: boolean;
  text: string;
  price: number;
  thumbnail: string;
  uniqueId: string;
}

export interface IBurgerIngredientsTabPanel {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export interface IDraggableIngredient {
  id: string;
  text: string;
  price: number;
  thumbnail: string;
  index: number;
}

export interface IDragItem {
  id: string;
  index: number;
}

export interface IOrderResponse {
  name: string;
  order: {
    number: number;
  };
  success: boolean;
}

export interface IIngredientsApiResponse {
  data: IBurgerIngredient[];
}

export interface IRegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResponse {
  success: boolean;
  user: IUser;
  accessToken: string;
  refreshToken: string;
}

export interface IForgotPasswordRequest {
  email: string;
}

export interface IUser {
  email: string;
  name: string;
}

export interface ICommonResponse {
  success: boolean;
  message: string;
}

export interface IResetPasswordRequest {
  password: string;
  token: string;
}

export interface IUserResponse {
  success: boolean;
  user: IUser;
}

export interface IEditUserRequest {
  registerRequestData: IRegisterRequest;
  accessToken: string;
}

export interface IRefreshTokenResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
}

export interface IProtectedRoute {
  onlyUnAuth?: boolean;
  component: ReactNode;
}

export enum WebsocketStatus {
  CONNECTING = "CONNECTING...",
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
}

export enum OrderStatus {
  CREATED = "created",
  PENDING = "pending",
  DONE = "done",
}

export interface IOrder {
  _id: string;
  number: number;
  name: string;
  ingredients: Array<number>;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

export interface IOrderResponse {
  success: boolean;
  orders: IOrder[];
  total: number;
  totalToday: number;
}

export interface IOrderList {
  data: IOrder[];
  isProfile: boolean;
}

export interface IGetOrderResponse {
  success: boolean;
  orders: IOrder[];
}

export interface IOrderStatusList {
  data: IOrder[];
  status: OrderStatus;
}

export interface IIngredientListProps {
  ingredients: IBurgerIngredient[];
}

export interface IIngredientListItemProps {
  ingredient: IBurgerIngredient;
  count: number;
}

export interface IIngredientMap {
  [key: string]: {
    ingredient: IBurgerIngredient;
    count: number;
  };
}
