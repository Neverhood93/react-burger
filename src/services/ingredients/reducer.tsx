import { createSlice } from "@reduxjs/toolkit";
import { loadIngredients } from "./actions";
import { IBurgerIngredient } from "../../types/types";

interface IngredientsState {
  ingredients: IBurgerIngredient[];
  ingredientsLoading: boolean;
  ingredientsError: string | null;
}

const initialState: IngredientsState = {
  ingredients: [],
  ingredientsLoading: false,
  ingredientsError: null,
};

export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadIngredients.pending, (state) => {
        state.ingredientsLoading = true;
        state.ingredientsError = null;
      })
      .addCase(loadIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.ingredientsLoading = false;
      })
      .addCase(loadIngredients.rejected, (state, action) => {
        state.ingredientsLoading = false;
        state.ingredientsError = action?.error?.message as string;
      });
  },
});
