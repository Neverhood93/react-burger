import { getIngredients } from "../../utils/ingredients-api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IBurgerIngredient } from "../../types/types";

export const loadIngredients = createAsyncThunk<IBurgerIngredient[]>(
  "ingredients/loadIngredients",
  async () => {
    return await getIngredients();
  },
);
