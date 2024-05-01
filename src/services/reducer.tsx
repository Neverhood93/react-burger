import { combineReducers } from "@reduxjs/toolkit";
import { ingredientsSlice } from "./ingredients/reducer";
import { selectedIngredientsSlice } from "./burger-constructor/reducer";

export const rootReducer = combineReducers({
  ingredients: ingredientsSlice.reducer,
  selectedIngredients: selectedIngredientsSlice.reducer,
});
