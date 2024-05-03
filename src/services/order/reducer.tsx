import { createSlice } from "@reduxjs/toolkit";
import { createOrder } from "./actions";
import { OrderResponse } from "../../types/types";

interface OrderState {
  currentOrder: OrderResponse | null;
  orderLoading: boolean;
  orderError: string | null;
  isOrderDetailModalOpen: boolean;
}

const initialState: OrderState = {
  currentOrder: null,
  orderLoading: false,
  orderError: null,
  isOrderDetailModalOpen: false,
};

export const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    closeOrderDetailModal: (state) => {
      state.isOrderDetailModalOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderLoading = true;
        state.orderError = null;
        state.isOrderDetailModalOpen = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.currentOrder = action.payload;
        state.orderLoading = false;
        state.isOrderDetailModalOpen = true;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderLoading = false;
        state.orderError = action.payload as string;
        state.isOrderDetailModalOpen = true;
      });
  },
});

export const { closeOrderDetailModal } = orderSlice.actions;
