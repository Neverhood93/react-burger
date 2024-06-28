import styles from "./order-dashboard.module.css";
import OrderStatusList from "../order-status-list/order-status-list";
import { useAppSelector } from "../../services/hooks";
import { getFeedOrders } from "../../services/feed/selectors";

function OrderDashboard() {
  const orders = useAppSelector(getFeedOrders);
  return (
    <div className={styles.column}>
      <div className={styles.order_status_container}>
        <OrderStatusList data={orders} />
        <OrderStatusList data={orders} />
      </div>
    </div>
  );
}

export default OrderDashboard;
