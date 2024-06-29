import { createAsyncThunk } from "@reduxjs/toolkit";
import { getOrder, postOrder } from "../../utils/orders-api";
import { IGetOrderResponse, IOrderResponse } from "../../types/types";

export const createOrder = createAsyncThunk<IOrderResponse, string[]>(
  "orders/createOrder",
  async (ingredientIds) => {
    return await postOrder(ingredientIds);
  },
);

export const fetchOrder = createAsyncThunk<IGetOrderResponse, number>(
  "orders/getOrder",
  async (orderNumber) => {
    return await getOrder(orderNumber);
  },
);
