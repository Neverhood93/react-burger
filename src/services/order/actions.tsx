import { createAsyncThunk } from "@reduxjs/toolkit";
import { postOrder } from "../../utils/orders-api";
import { OrderResponse } from "../../types/types";

export const createOrder = createAsyncThunk<
  OrderResponse,
  string[],
  { rejectValue: string }
>("orders/createOrder", async (ingredientIds, { rejectWithValue }) => {
  try {
    return await postOrder(ingredientIds);
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});
