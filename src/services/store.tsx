import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducer";
import { socketMiddleware } from "./middleware/socket-middleware";
import {
  wsClose,
  wsConnecting,
  wsError,
  wsMessage,
  wsOpen,
} from "./feed/reducer";
import { wsFeedConnect, wsFeedDisconnect } from "./feed/action";

const feedMiddleware = socketMiddleware({
  connect: wsFeedConnect,
  disconnect: wsFeedDisconnect,
  onConnecting: wsConnecting,
  onOpen: wsOpen,
  onClose: wsClose,
  onError: wsError,
  onMessage: wsMessage,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(feedMiddleware);
  },
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;
