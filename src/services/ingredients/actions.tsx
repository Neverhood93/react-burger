import { getIngredients } from "../../utils/ingredients-api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { BurgerIngredient } from "../../types/types";

export const loadIngredients = createAsyncThunk<
  BurgerIngredient[],
  void,
  { rejectValue: string }
>("ingredients/loadIngredients", async (_, { rejectWithValue }) => {
  try {
    return await getIngredients();
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});
