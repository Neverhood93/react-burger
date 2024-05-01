import { combineReducers } from "@reduxjs/toolkit";
import { ingredientsSlice } from "./ingredients/reducer";
import { selectedIngredientsSlice } from "./burger-constructor/reducer";
import { ingredientModalSlice } from "./burger-ingredients-item/reducer";

export const rootReducer = combineReducers({
  ingredients: ingredientsSlice.reducer,
  selectedIngredients: selectedIngredientsSlice.reducer,
  ingredientModal: ingredientModalSlice.reducer,
});
