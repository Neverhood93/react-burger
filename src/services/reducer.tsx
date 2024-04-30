import { combineReducers } from "@reduxjs/toolkit";
import { ingredientsSlice } from "./ingredients/reducer";

export const rootReducer = combineReducers({
  ingredients: ingredientsSlice.reducer,
});
