import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { WebsocketStatus } from "../../types/types";
import {
  getFeedOrders,
  getFeedWebsocketStatus,
} from "../../services/feed/selectors";
import { wsFeedConnect, wsFeedDisconnect } from "../../services/feed/action";
import { useEffect } from "react";

export const LIVE_TABLE_SERVER_URL =
  "wss://norma.nomoreparties.space/orders/all";

function FeedOrdersPage() {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(getFeedOrders);
  const status = useAppSelector(getFeedWebsocketStatus);
  const isDisconnected = status !== WebsocketStatus.ONLINE;

  useEffect(() => {
    dispatch(wsFeedConnect(LIVE_TABLE_SERVER_URL));

    return () => {
      dispatch(wsFeedDisconnect());
    };
  }, [dispatch]);

  return (
    <div>
      <p>
        Connection status: <span>{status}</span>
      </p>
      <div></div>
    </div>
  );
}

export default FeedOrdersPage;
