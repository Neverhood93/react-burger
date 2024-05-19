import { getIngredients } from "../../utils/ingredients-api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { BurgerIngredient } from "../../types/types";

export const loadIngredients = createAsyncThunk<BurgerIngredient[]>(
  "ingredients/loadIngredients",
  async () => {
    return await getIngredients();
  },
);
