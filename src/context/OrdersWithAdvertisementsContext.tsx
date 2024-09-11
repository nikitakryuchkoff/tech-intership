import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { useParams } from 'react-router-dom';
import { OrdersService } from '../services';
import { Order } from '../types';

interface OrdersWithAdvertisementsContextProps {
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  loading: boolean;
}

const OrdersWithAdvertisementsContext = createContext<
  OrdersWithAdvertisementsContextProps | undefined
>(undefined);

export function OrdersWithAdvertisementsProvider({
  children,
}: {
  children: ReactNode;
}) {
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
    <OrdersWithAdvertisementsContext.Provider
      value={{
        orders,
        setOrders,
        loading,
      }}
    >
      {children}
    </OrdersWithAdvertisementsContext.Provider>
  );
}

export function useOrdersWithAdvertisements() {
  const context = useContext(OrdersWithAdvertisementsContext);
  if (!context) {
    throw new Error(
      'useOrdersWithAdvertisements must be used within a OrdersWithAdvertisementsProvider',
    );
  }
  return context;
}
