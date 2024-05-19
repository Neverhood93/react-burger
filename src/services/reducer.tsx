import { combineReducers } from "@reduxjs/toolkit";
import { ingredientsSlice } from "./ingredients/reducer";
import { selectedIngredientsSlice } from "./burger-constructor/reducer";
import { ingredientDetailsSlice } from "./ingredient-details/reducer";
import { orderSlice } from "./order/reducer";

export const rootReducer = combineReducers({
  ingredients: ingredientsSlice.reducer,
  selectedIngredients: selectedIngredientsSlice.reducer,
  ingredientModal: ingredientDetailsSlice.reducer,
  orders: orderSlice.reducer,
});
