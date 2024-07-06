import { RootState } from "../store";

export const getIsCreatedOrderDetailModalOpen = (state: RootState) =>
  state.orders.isCreatedOrderDetailModalOpen;

export const getCreatedOrder = (state: RootState) => state.orders.createdOrder;
export const getCreateOrderLoading = (state: RootState) =>
  state.orders.createOrderLoading;
export const getCreateOrderError = (state: RootState) =>
  state.orders.createOrderError;

export const getCurrentOrder = (state: RootState) => state.orders.currentOrder;
export const getOrderLoading = (state: RootState) => state.orders.orderLoading;
export const getOrderError = (state: RootState) => state.orders.orderError;
