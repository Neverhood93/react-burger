import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBurgerIngredient } from "../../types/types";

interface IngredientModalState {
  selectedIngredient: IBurgerIngredient | null;
}

const initialState: IngredientModalState = {
  selectedIngredient: null,
};

export const ingredientDetailsSlice = createSlice({
  name: "ingredientModal",
  initialState,
  reducers: {
    openIngredientModal: (state, action: PayloadAction<IBurgerIngredient>) => {
      state.selectedIngredient = action.payload;
    },
    closeIngredientModal: (state) => {
      state.selectedIngredient = null;
    },
  },
});

export const { openIngredientModal, closeIngredientModal } =
  ingredientDetailsSlice.actions;
