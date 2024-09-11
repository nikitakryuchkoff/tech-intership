import { useEffect, useRef, useState } from 'react';
import OrdersList from '../../components/OrdersList';
import { OrdersService } from '../../services';
import { Filter, Pagination } from '../../components';
import { LIMIT } from '../../constants';
import { Order } from '../../types';

function OrdersPage(): JSX.Element {
  const [orders, setOrders] = useState<Order[]>([]);
  const [page, setPage] = useState<number>(1);
  const [sortOrder, setSortOrder] = useState<string>('Все');
  const [sortType, setSortType] = useState<string>('Статус');
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

  const sortOrderOptions =
    sortType === 'Статус'
      ? [
          'Создан',
          'Оплачен',
          'В транспорте',
          'Доставлен в пункт',
          'Получен',
          'Архивирован',
          'Возврат',
        ]
      : ['По возрастанию', 'По убыванию'];

  return (
    <>
      <Filter
        sortTypesArray={['Статус', 'Сумма']}
        sortOrderArray={sortOrderOptions}
        setSortType={setSortType}
        setSortOrder={setSortOrder}
      />
      <OrdersList
        orders={orders}
        setCurrentOrders={setOrders}
        loading={loading}
      />
      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </>
  );
}

export default OrdersPage;
