import { createSlice } from "@reduxjs/toolkit";
import { createOrder, fetchOrder } from "./actions";
import { IGetOrderResponse, IOrderResponse } from "../../types/types";

interface OrderState {
  createdOrder: IOrderResponse | null;
  createOrderLoading: boolean;
  createOrderError: string | null;
  isCreatedOrderDetailModalOpen: boolean;

  currentOrder: IGetOrderResponse | null;
  orderLoading: boolean;
  orderError: string | null;
  isOrderDetailModalOpen: boolean;
}

const initialState: OrderState = {
  createdOrder: null,
  createOrderLoading: false,
  createOrderError: null,
  isCreatedOrderDetailModalOpen: false,

  currentOrder: null,
  orderLoading: false,
  orderError: null,
  isOrderDetailModalOpen: false,
};

export const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    closeCreatedOrderDetailModal: (state) => {
      state.isCreatedOrderDetailModalOpen = false;
    },
    closeOrderDetailModal: (state) => {
      state.isOrderDetailModalOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.createdOrder = null;
        state.createOrderLoading = true;
        state.createOrderError = null;
        state.isCreatedOrderDetailModalOpen = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.createdOrder = action.payload;
        state.createOrderLoading = false;
        state.isCreatedOrderDetailModalOpen = true;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.createdOrder = null;
        state.createOrderLoading = false;
        state.createOrderError = action?.error?.message as string;
        state.isCreatedOrderDetailModalOpen = true;
      })

      .addCase(fetchOrder.pending, (state) => {
        state.currentOrder = null;
        state.orderLoading = true;
        state.orderError = null;
        state.isOrderDetailModalOpen = true;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.currentOrder = action.payload;
        state.orderLoading = false;
        state.isOrderDetailModalOpen = true;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.currentOrder = null;
        state.orderLoading = false;
        state.orderError = action?.error?.message as string;
        state.isOrderDetailModalOpen = true;
      });
  },
});

export const { closeCreatedOrderDetailModal, closeOrderDetailModal } =
  orderSlice.actions;
