import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { OrdersService } from '../../services';
import { OrderItem, SkeletonOrderItem } from '../../components';
import { Order } from '../../types';
import './OrdersWithAdvertisementsPage.css';

export default function OrdersWithAdvertisementsPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      OrdersService.fetchOrdersByAdvertisementId(id)
        .then(({ data }) => {
          setOrders(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching orders:', error);
          setLoading(false);
        });
    }
  }, [id]);

  return (
    <>
      <h2 className="page-title mt-4">Заказы, содержащие объявление: №{id}</h2>
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
            <OrderItem
              key={order.id}
              order={order}
              setCurrentOrders={setOrders}
            />
          ))}
        </div>
      ) : (
        <p className="no-orders-message">Заказов не найдено.</p>
      )}
    </>
  );
}
