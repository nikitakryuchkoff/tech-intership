import { OrderItem, SkeletonOrderItem } from '../../components';
import { useOrdersWithAdvertisements } from '../../context/OrdersWithAdvertisementsContext';
import './OrdersWithAdvertisementsPage.css';

export default function OrdersWithAdvertisementsPage(): JSX.Element {
  const { orders, loading, setOrders } = useOrdersWithAdvertisements();

  return (
    <>
      <h2 className="page-title mt-4">Заказы, содержащие объявление</h2>
      {loading && (
        <>
          <SkeletonOrderItem />
          <SkeletonOrderItem />
          <SkeletonOrderItem />
        </>
      )}
      {orders.length > 0 ? (
        <div className="orders-list">
          {orders.map((order) => (
            <OrderItem key={order.id} order={order} setOrders={setOrders} />
          ))}
        </div>
      ) : (
        <p className="no-orders-message">Заказов не найдено.</p>
      )}
    </>
  );
}
