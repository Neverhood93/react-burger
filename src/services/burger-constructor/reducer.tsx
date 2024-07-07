import {
  IBurgerIngredient,
  ISelectedBurgerIngredient,
} from "../../types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

interface SelectedIngredientsState {
  bun: ISelectedBurgerIngredient | null;
  ingredients: ISelectedBurgerIngredient[];
}

export const initialState: SelectedIngredientsState = {
  bun: null,
  ingredients: [],
};

export const selectedIngredientsSlice = createSlice({
  name: "selectedIngredients",
  initialState,
  reducers: {
    addIngredient: {
      reducer(state, action: PayloadAction<ISelectedBurgerIngredient>) {
        const ingredient = action.payload;
        if (ingredient.type === "bun") {
          state.bun = ingredient;
        } else if (state.bun) {
          state.ingredients.push(ingredient);
        }
      },
      prepare(ingredient: IBurgerIngredient) {
        return {
          payload: {
            ...ingredient,
            uniqueId: uuidv4(),
          } as ISelectedBurgerIngredient,
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
    moveIngredient(
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>,
    ) {
      const { fromIndex, toIndex } = action.payload;
      const ingredient = state.ingredients.splice(fromIndex, 1)[0];
      state.ingredients.splice(toIndex, 0, ingredient);
    },
  },
});

export const {
  addIngredient,
  removeIngredient,
  clearIngredients,
  moveIngredient,
} = selectedIngredientsSlice.actions;
