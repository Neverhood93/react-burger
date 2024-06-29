import { combineReducers } from "@reduxjs/toolkit";
import { ingredientsSlice } from "./ingredients/reducer";
import { selectedIngredientsSlice } from "./burger-constructor/reducer";
import { ingredientDetailsSlice } from "./ingredient-details/reducer";
import { orderSlice } from "./order/reducer";
import { authSlice } from "./auth/reducer";
import { feedSlice } from "./feed/reducer";
import { profileOrdersSlice } from "./profile-orders/reducer";

export const rootReducer = combineReducers({
  ingredients: ingredientsSlice.reducer,
  selectedIngredients: selectedIngredientsSlice.reducer,
  ingredientModal: ingredientDetailsSlice.reducer,
  orders: orderSlice.reducer,
  auth: authSlice.reducer,
  feed: feedSlice.reducer,
  profileOrders: profileOrdersSlice.reducer,
});
