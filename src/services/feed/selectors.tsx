import { RootState } from "../store";

export const getFeedOrders = (state: RootState) => state.feed.orders;
export const getFeedWebsocketStatus = (state: RootState) => state.feed.status;
