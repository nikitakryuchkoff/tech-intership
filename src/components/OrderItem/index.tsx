import { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { OrdersService } from '../../services';
import formatCurrency from '../../utils/formatCurrent';
import { Order } from '../../types';
import getOrderStatus from '../../utils/getOrderStatus';
import { OrderSubItem } from '..';
import formatDate from '../../utils/formatDate';

interface OrderItemProps {
  order: Order;
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}

export default function OrderItem({ order, setOrders }: OrderItemProps) {
  const [showProducts, setShowProducts] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const toggleProductsVisibility = () => {
    setShowProducts((prev) => !prev);
  };

  const completeOrder = async (id: string) => {
    setIsProcessing(true);
    try {
      await OrdersService.changeOrderStatus(id);
      console.log(id);

      setOrders((prevOrders) =>
        prevOrders.map((orderItem) =>
          orderItem.id === id
            ? { ...orderItem, status: 4, finishedAt: new Date().toISOString() }
            : orderItem,
        ),
      );
    } catch (error) {
      throw new Error(`Error completing order: ${error}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="my-3 shadow-sm">
      <Card.Header>Заказ №{order.id}</Card.Header>
      <Card.Body>
        <Card.Text>
          <strong>Количество товаров:</strong> {order.items.length}
        </Card.Text>
        <Card.Text>
          <strong>Стоимость заказа:</strong> {formatCurrency(order.total)}
        </Card.Text>
        <Card.Text>
          <strong>Дата создания заказа:</strong> {formatDate(order.createdAt)}
        </Card.Text>
        {order.finishedAt && (
          <Card.Text>
            <strong>Дата получения заказа:</strong>
            {formatDate(order.finishedAt)}
          </Card.Text>
        )}
        <Card.Text>
          <strong>Статус:</strong> {getOrderStatus(order.status, true)}
        </Card.Text>

        {showProducts && <OrderSubItem order={order} />}

        <div className="d-flex align-items-center mt-3">
          <Button variant="primary" onClick={toggleProductsVisibility}>
            {showProducts ? 'Скрыть товары' : 'Показать все товары'}
          </Button>

          {order.status !== 4 && (
            <Button
              className="mx-3"
              variant="success"
              onClick={() => completeOrder(order.id)}
              disabled={isProcessing}
            >
              {isProcessing ? 'Обработка...' : 'Завершить заказ'}
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
