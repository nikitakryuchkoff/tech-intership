import { IOrder } from '../../types';
import OrderItem from '../OrderItem';

interface OrdersListProps {
  orders: IOrder[];
  setCurrentOrders: React.Dispatch<React.SetStateAction<IOrder[]>>;
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
