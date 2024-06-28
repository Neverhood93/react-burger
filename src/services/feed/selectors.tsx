import { RootState } from "../store";

export const getFeedOrders = (state: RootState) => state.feed.orders;
export const getFeedWebsocketStatus = (state: RootState) => state.feed.status;

export const getTotalCountOrders = (state: RootState) => state.feed.total;
export const getTotalTodayCountOrders = (state: RootState) =>
  state.feed.totalToday;
