import { RootState } from "../store";

export const getSelectedIngredients = (state: RootState) =>
  state.selectedIngredients.ingredients;
