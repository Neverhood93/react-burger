import { RootState } from "../store";

export const getIsOrderDetailModalOpen = (state: RootState) =>
  state.orders.isOrderDetailModalOpen;

export const getCurrentOrder = (state: RootState) => state.orders.currentOrder;
export const getOrderLoading = (state: RootState) => state.orders.orderLoading;
export const getOrderError = (state: RootState) => state.orders.orderError;
