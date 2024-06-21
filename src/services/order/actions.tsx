import { createAsyncThunk } from "@reduxjs/toolkit";
import { postOrder } from "../../utils/orders-api";
import { IOrderResponse } from "../../types/types";

export const createOrder = createAsyncThunk<IOrderResponse, string[]>(
  "orders/createOrder",
  async (ingredientIds) => {
    return await postOrder(ingredientIds);
  },
);
