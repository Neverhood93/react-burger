import { RootState } from "../store";

export const getSelectedIngredients = (state: RootState) =>
  state.selectedIngredients.ingredients;

export const getSelectedBun = (state: RootState) =>
  state.selectedIngredients.bun;

export const getAllSelectedIngredients = (state: RootState) =>
  state.selectedIngredients;
