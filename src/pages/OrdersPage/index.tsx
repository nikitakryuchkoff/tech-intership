import { useEffect, useRef, useState } from 'react';
import OrdersList from '../../components/OrdersList';
import { OrdersService } from '../../services';
import { IOrder } from '../../types';
import { Filter, Pagination, Slider } from '../../components';
import { LIMIT } from '../../constants';

function OrdersPage(): JSX.Element {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [currentOrders, setCurrentOrders] = useState<IOrder[]>(orders);

  const [page, setPage] = useState<number>(1);
  const totalCount = useRef<number>(1);

  const [sortOrder, setSortOrder] = useState<string>('Все');
  const [sortType, setSortType] = useState<string>('Статус');

  const totalPages = Math.ceil(totalCount.current / LIMIT);

  useEffect(() => {
    OrdersService.getAllOrders(page, LIMIT, sortType, sortOrder).then(
      ({ data, itemsCount }) => {
        setOrders(data);
        totalCount.current = itemsCount;
      },
    );
  }, [page, sortOrder]);

  useEffect(() => {
    setCurrentOrders(orders);
  }, [orders, page]);

  return (
    <>
      <Filter
        sortTypesArray={['Статус заказа']}
        sortOrderArray={['Все', 'В процессе', 'Завершен', 'Отменен']}
        setSortType={setSortType}
        setSortOrder={setSortOrder}
      />
      <Slider minPrice={0} maxPrice={10000} setPriceRange={() => 1} />
      <OrdersList orders={currentOrders} setCurrentOrders={setCurrentOrders} />
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
