import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BurgerIngredient } from "../../types/types";

interface IngredientModalState {
  selectedIngredientModal: BurgerIngredient | null;
  isIngredientModalOpen: boolean;
}

const initialState: IngredientModalState = {
  selectedIngredientModal: null,
  isIngredientModalOpen: false,
};

export const ingredientModalSlice = createSlice({
  name: "ingredientModal",
  initialState,
  reducers: {
    openIngredientModal: (state, action: PayloadAction<BurgerIngredient>) => {
      state.selectedIngredientModal = action.payload;
      state.isIngredientModalOpen = true;
    },
    closeIngredientModal: (state) => {
      state.selectedIngredientModal = null;
      state.isIngredientModalOpen = false;
    },
  },
});

export const { openIngredientModal, closeIngredientModal } =
  ingredientModalSlice.actions;
