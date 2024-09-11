import React, { memo } from 'react';
import { Order } from '../../types';
import OrderItem from '../OrderItem';
import { Card, Alert } from 'react-bootstrap';
import { SkeletonOrderItem } from '..';

interface OrdersListProps {
  orders: Order[];
  setCurrentOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  loading: boolean;
}

export default memo(function OrdersList({
  orders,
  setCurrentOrders,
  loading,
}: OrdersListProps): JSX.Element {
  if (loading) {
    return (
      <>
        <SkeletonOrderItem />
        <SkeletonOrderItem />
        <SkeletonOrderItem />
      </>
    );
  }
  return (
    <>
      {orders.map((order) => (
        <OrderItem order={order} key={order.id} setOrders={setCurrentOrders} />
      ))}
      {orders.length === 0 && (
        <Card className="my-3 p-4">
          <Alert variant="info">Список заказов пуст.</Alert>
        </Card>
      )}
    </>
  );
});
