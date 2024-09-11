import OrdersList from '../../components/OrdersList';
import { Filter, Pagination } from '../../components';
import { useOrders } from '../../context/OrdersContext';
import { ORDER_SORT, ORDER_STATUSES } from '../../constants';

export default function OrdersPage(): JSX.Element {
  const {
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
  } = useOrders();

  const sortOrderOptions = sortType === 'Статус' ? ORDER_STATUSES : ORDER_SORT;

  return (
    <>
      <Filter
        sortTypesArray={['Статус', 'Сумма']}
        sortOrderArray={sortOrderOptions}
        setSortType={setSortType}
        setSortOrder={setSortOrder}
        sortType={sortType}
        sortOrder={sortOrder}
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
