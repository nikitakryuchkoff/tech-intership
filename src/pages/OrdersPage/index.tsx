import { useEffect, useRef, useState } from 'react';
import OrdersList from '../../components/OrdersList';
import { OrdersService } from '../../services';
import { IOrder } from '../../types';
import { Select } from '../../components';

function OrdersPage(): JSX.Element {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [currentOrders, setCurrentOrders] = useState<IOrder[]>(orders);

  const [statusFilter, setStatusFilter] = useState<string>('Все');
  const [page, setPage] = useState<number>(1);
  const totalCount = useRef<number>(1);
  const [sortOrder, setSortOrder] = useState<string>('');

  useEffect(() => {
    OrdersService.getAllOrders(page, 10).then(({ data, itemsCount }) => {
      setOrders(data);
      totalCount.current = itemsCount;
    });
  }, [page]);

  useEffect(() => {
    if (statusFilter === 'Все') {
      setCurrentOrders(orders);
    } else {
      OrdersService.getOrdersByStatusFilter(page, 10, statusFilter).then(
        ({ data, itemsCount }) => {
          setCurrentOrders(data);
          totalCount.current = itemsCount;
        },
      );
    }
  }, [statusFilter, orders, page]);

  useEffect(() => {
    if (sortOrder === 'По возрастанию цены') {
      const sortedOrders = [...currentOrders].sort(
        (a, b) => a.totalPrice - b.totalPrice,
      );
      setCurrentOrders(sortedOrders);
    } else if (sortOrder === 'По убыванию цены') {
      const sortedOrders = [...currentOrders].sort(
        (a, b) => b.totalPrice - a.totalPrice,
      );
      setCurrentOrders(sortedOrders);
    }
  }, [sortOrder]);

  return (
    <>
      <Select
        setLimit={setStatusFilter}
        options={['Все', 'В процессе', 'Отменен', 'Завершен']}
        label="Выберите статус заказа"
      />
      <Select
        setLimit={setSortOrder}
        options={['По убыванию цены', 'По возрастанию цены']}
        label="Сортировка по цене"
      />
      <OrdersList orders={currentOrders} setCurrentOrders={setCurrentOrders} />
    </>
  );
}

export default OrdersPage;
