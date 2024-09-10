import { Order } from '../../types';
import OrderItem from '../OrderItem';

interface OrdersListProps {
  orders: Order[];
  setCurrentOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}

function OrdersList({ orders, setCurrentOrders }: OrdersListProps) {
  return (
    <>
      {orders.map((order) => (
        <OrderItem
          order={order}
          key={order.id}
          setCurrentOrders={setCurrentOrders}
        />
      ))}
    </>
  );
}

export default OrdersList;
