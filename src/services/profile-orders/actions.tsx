import { createAction } from "@reduxjs/toolkit";

export const wsProfileOrdersConnect = createAction<
  string,
  "PROFILE_ORDERS_CONNECT"
>("PROFILE_ORDERS_CONNECT");

export const wsProfileOrdersDisconnect = createAction(
  "PROFILE_ORDERS_DISCONNECT",
);
