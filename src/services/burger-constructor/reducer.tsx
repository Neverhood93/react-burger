import { BurgerIngredient, SelectedBurgerIngredient } from "../../types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

interface SelectedIngredientsState {
  bun: SelectedBurgerIngredient | null;
  ingredients: SelectedBurgerIngredient[];
}

const initialState: SelectedIngredientsState = {
  bun: null,
  ingredients: [],
};

export const selectedIngredientsSlice = createSlice({
  name: "selectedIngredients",
  initialState,
  reducers: {
    addIngredient: {
      reducer(state, action: PayloadAction<SelectedBurgerIngredient>) {
        const ingredient = action.payload;
        if (ingredient.type === "bun") {
          state.bun = ingredient;
        } else {
          state.ingredients.push(ingredient);
        }
      },
      prepare(ingredient: BurgerIngredient) {
        return {
          payload: {
            ...ingredient,
            uniqueId: uuidv4(),
          } as SelectedBurgerIngredient,
        };
      },
    },
    removeIngredient(state, action: PayloadAction<string>) {
      if (state.bun && state.bun.uniqueId === action.payload) {
        state.bun = null;
      } else {
        state.ingredients = state.ingredients.filter(
          (ingredient) => ingredient.uniqueId !== action.payload,
        );
      }
    },
    clearIngredients(state) {
      state.bun = null;
      state.ingredients = [];
    },
  },
});

export const { addIngredient, removeIngredient, clearIngredients } =
  selectedIngredientsSlice.actions;
