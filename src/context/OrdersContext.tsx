import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from 'react';
import { OrdersService } from '../services';
import { LIMIT } from '../constants';
import { Order } from '../types';

interface OrdersContextProps {
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  sortOrder: string;
  setSortOrder: React.Dispatch<React.SetStateAction<string>>;
  sortType: string;
  setSortType: React.Dispatch<React.SetStateAction<string>>;
  totalPages: number;
  loading: boolean;
}

const OrdersContext = createContext<OrdersContextProps | undefined>(undefined);

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [page, setPage] = useState<number>(() => {
    return parseInt(localStorage.getItem('page') || '1', 10);
  });
  const [sortOrder, setSortOrder] = useState<string>(() => {
    return localStorage.getItem('sortOrder') || 'Все';
  });
  const [sortType, setSortType] = useState<string>(() => {
    return localStorage.getItem('sortType') || 'Статус';
  });

  const totalCount = useRef<number>(1);
  const totalPages = Math.ceil(totalCount.current / LIMIT);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data, itemsCount } = await OrdersService.getAllOrders(
          page,
          LIMIT,
          sortType,
          sortOrder,
        );
        setOrders(data);
        totalCount.current = itemsCount;
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    };

    fetchOrders();
  }, [page, sortType, sortOrder]);

  useEffect(() => {
    localStorage.setItem('page', page.toString());
  }, [page]);

  useEffect(() => {
    localStorage.setItem('sortOrder', sortOrder);
  }, [sortOrder]);

  useEffect(() => {
    localStorage.setItem('sortType', sortType);
  }, [sortType]);

  return (
    <OrdersContext.Provider
      value={{
        orders,
        setOrders,
        page,
        setPage,
        sortOrder,
        setSortOrder,
        sortType,
        setSortType,
        totalPages,
        loading,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrdersProvider');
  }
  return context;
}
