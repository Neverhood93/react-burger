import { createSlice } from "@reduxjs/toolkit";
import { createOrder } from "./actions";
import { IOrderResponse } from "../../types/types";

interface OrderState {
  currentOrder: IOrderResponse | null;
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
        state.currentOrder = null;
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
        state.currentOrder = null;
        state.orderLoading = false;
        state.orderError = action?.error?.message as string;
        state.isOrderDetailModalOpen = true;
      });
  },
});

export const { closeOrderDetailModal } = orderSlice.actions;
