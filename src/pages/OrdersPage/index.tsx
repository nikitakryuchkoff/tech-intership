import { useEffect, useRef, useState } from 'react';
import OrdersList from '../../components/OrdersList';
import { OrdersService } from '../../services';
import { IOrder } from '../../types';

function OrdersPage(): JSX.Element {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const totalCount = useRef<number>(1);
  useEffect(() => {
    OrdersService.getAllOrders(page, limit).then(({ data, itemsCount }) => {
      setOrders(data);
      totalCount.current = itemsCount;
    });
  }, []);
  const totalPages = totalCount && Math.ceil(totalCount.current / limit);

  return <OrdersList />;
}

export default OrdersPage;
