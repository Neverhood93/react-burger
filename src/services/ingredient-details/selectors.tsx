import { RootState } from "../store";

export const getSelectedIngredient = (state: RootState) =>
  state.ingredientModal;
