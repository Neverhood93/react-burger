import { RootState } from "../store";

export const getProfileOrdersOrders = (state: RootState) =>
  state.profileOrders.orders;
export const getProfileOrdersWebsocketStatus = (state: RootState) =>
  state.profileOrders.status;
