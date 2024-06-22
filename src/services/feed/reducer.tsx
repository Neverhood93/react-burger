import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOrder, IOrderResponse, WebsocketStatus } from "../../types/types";

export type TFeedStore = {
  status: WebsocketStatus;
  success: boolean;
  orders: IOrder[];
  total: number;
  totalToday: number;
  connectionError: string | null;
};

const initialState: TFeedStore = {
  status: WebsocketStatus.OFFLINE,
  success: false,
  orders: [],
  total: 0,
  totalToday: 0,
  connectionError: null,
};

export const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    wsFeedConnecting: (state) => {
      state.status = WebsocketStatus.CONNECTING;
    },
    wsFeedOpen: (state) => {
      state.status = WebsocketStatus.ONLINE;
      state.connectionError = null;
    },
    wsFeedClose: (state) => {
      state.status = WebsocketStatus.OFFLINE;
    },
    wsFeedError: (state, action: PayloadAction<string>) => {
      state.connectionError = action.payload;
    },
    wsFeedMessage: (state, action: PayloadAction<IOrderResponse>) => {
      state.success = action.payload.success;
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    },
  },
});

export const {
  wsFeedConnecting,
  wsFeedOpen,
  wsFeedClose,
  wsFeedError,
  wsFeedMessage,
} = feedSlice.actions;
