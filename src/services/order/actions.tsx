import { createAsyncThunk } from "@reduxjs/toolkit";
import { postOrder } from "../../utils/orders-api";
import { OrderResponse } from "../../types/types";

export const createOrder = createAsyncThunk<OrderResponse, string[]>(
  "orders/createOrder",
  async (ingredientIds) => {
    return await postOrder(ingredientIds);
  },
);
