import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BurgerIngredient } from "../../types/types";

interface IngredientModalState {
  selectedIngredient: BurgerIngredient | null;
}

const initialState: IngredientModalState = {
  selectedIngredient: null,
};

export const ingredientDetailsSlice = createSlice({
  name: "ingredientModal",
  initialState,
  reducers: {
    openIngredientModal: (state, action: PayloadAction<BurgerIngredient>) => {
      state.selectedIngredient = action.payload;
    },
    closeIngredientModal: (state) => {
      state.selectedIngredient = null;
    },
  },
});

export const { openIngredientModal, closeIngredientModal } =
  ingredientDetailsSlice.actions;
