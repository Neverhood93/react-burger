import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { WebsocketStatus } from "../../types/types";
import {
  getFeedOrders,
  getFeedWebsocketStatus,
} from "../../services/feed/selectors";
import { wsFeedConnect, wsFeedDisconnect } from "../../services/feed/action";

export const LIVE_TABLE_SERVER_URL =
  "wss://norma.nomoreparties.space/orders/all";

function FeedOrdersPage() {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(getFeedOrders);
  const status = useAppSelector(getFeedWebsocketStatus);
  const isDisconnected = status !== WebsocketStatus.ONLINE;
  const connect = () => dispatch(wsFeedConnect(LIVE_TABLE_SERVER_URL));
  const disconnect = () => dispatch(wsFeedDisconnect());
  return (
    <div>
      <p>
        Connection status: <span>{status}</span>
      </p>
      <div>
        <button disabled={!isDisconnected} onClick={connect}>
          Connect
        </button>
        <button disabled={isDisconnected} onClick={disconnect}>
          Disconnect
        </button>
      </div>
    </div>
  );
}

export default FeedOrdersPage;
