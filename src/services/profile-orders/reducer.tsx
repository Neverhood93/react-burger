import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOrder, IOrderResponse, WebsocketStatus } from "../../types/types";

export type TProfileOrdersStore = {
  status: WebsocketStatus;
  success: boolean;
  orders: IOrder[];
  total: number;
  totalToday: number;
  connectionError: string | null;
};

export const initialState: TProfileOrdersStore = {
  status: WebsocketStatus.OFFLINE,
  success: false,
  orders: [],
  total: 0,
  totalToday: 0,
  connectionError: null,
};

export const profileOrdersSlice = createSlice({
  name: "profileOrders",
  initialState,
  reducers: {
    wsProfileOrdersConnecting: (state) => {
      state.status = WebsocketStatus.CONNECTING;
    },
    wsProfileOrdersOpen: (state) => {
      state.status = WebsocketStatus.ONLINE;
      state.connectionError = null;
    },
    wsProfileOrdersClose: (state) => {
      state.status = WebsocketStatus.OFFLINE;
    },
    wsProfileOrdersError: (state, action: PayloadAction<string>) => {
      state.connectionError = action.payload;
    },
    wsProfileOrdersMessage: (state, action: PayloadAction<IOrderResponse>) => {
      state.success = action.payload.success;
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    },
  },
});

export const {
  wsProfileOrdersConnecting,
  wsProfileOrdersOpen,
  wsProfileOrdersClose,
  wsProfileOrdersError,
  wsProfileOrdersMessage,
} = profileOrdersSlice.actions;
