import { combineReducers } from "@reduxjs/toolkit";
import { ingredientsSlice } from "./ingredients/reducer";
import { selectedIngredientsSlice } from "./burger-constructor/reducer";
import { ingredientModalSlice } from "./ingredient-details/reducer";
import { orderSlice } from "./order/reducer";

export const rootReducer = combineReducers({
  ingredients: ingredientsSlice.reducer,
  selectedIngredients: selectedIngredientsSlice.reducer,
  ingredientModal: ingredientModalSlice.reducer,
  orders: orderSlice.reducer,
});
