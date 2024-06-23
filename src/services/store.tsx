import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducer";
import { socketMiddleware } from "./middleware/socket-middleware";
import {
  wsFeedClose,
  wsFeedConnecting,
  wsFeedError,
  wsFeedMessage,
  wsFeedOpen,
} from "./feed/reducer";
import { wsFeedConnect, wsFeedDisconnect } from "./feed/action";
import {
  wsProfileOrdersClose,
  wsProfileOrdersConnecting,
  wsProfileOrdersError,
  wsProfileOrdersMessage,
  wsProfileOrdersOpen,
} from "./profile-orders/reducer";
import {
  wsProfileOrdersConnect,
  wsProfileOrdersDisconnect,
} from "./profile-orders/actions";

const feedMiddleware = socketMiddleware({
  connect: wsFeedConnect,
  disconnect: wsFeedDisconnect,
  onConnecting: wsFeedConnecting,
  onOpen: wsFeedOpen,
  onClose: wsFeedClose,
  onError: wsFeedError,
  onMessage: wsFeedMessage,
});

const profileOrdersMiddleware = socketMiddleware({
  connect: wsProfileOrdersConnect,
  disconnect: wsProfileOrdersDisconnect,
  onConnecting: wsProfileOrdersConnecting,
  onOpen: wsProfileOrdersOpen,
  onClose: wsProfileOrdersClose,
  onError: wsProfileOrdersError,
  onMessage: wsProfileOrdersMessage,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      feedMiddleware,
      profileOrdersMiddleware,
    );
  },
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;
