import { useState } from 'react';
import { Card, Button, ListGroup, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { OrdersService } from '../../services';
import formatCurrency from '../../utils/formatCurrent';
import { Order } from '../../types';
import getOrderStatus from '../../utils/getOrderStatus';

interface OrderItemProps {
  order: Order;
  setCurrentOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}

function OrderItem({ order, setCurrentOrders }: OrderItemProps) {
  const [showProducts, setShowProducts] = useState<boolean>(false);

  const handleToggleProducts = () => {
    setShowProducts((prev) => !prev);
  };

  const handleCompleteOrder = async (id: string) => {
    try {
      await OrdersService.changeOrderStatus(id);
      setCurrentOrders((prevOrders) => {
        return prevOrders.map((orderItem) =>
          orderItem.id === id ? { ...orderItem, status: 4 } : orderItem,
        );
      });
    } catch (error) {
      throw new Error(`error, ${error}`);
    }
  };

  return (
    <Card className="my-3">
      <Card.Header>Заказ №{order.id}</Card.Header>
      <Card.Body>
        <Card.Text>
          <strong>Количество товаров:</strong> {order.items.length}
        </Card.Text>
        <Card.Text>
          <strong>Стоимость заказа:</strong> {formatCurrency(order.total)}
        </Card.Text>
        <Card.Text>
          <strong>Дата создания заказа:</strong> {order.createdAt}
        </Card.Text>
        <Card.Text>
          <strong>Статус:</strong> {getOrderStatus(order.status, true)}
        </Card.Text>
        {showProducts && (
          <ListGroup className="mt-3">
            {order.items.map((item) => (
              <Nav.Link as={NavLink} to={`/${item.id}`} key={item.id}>
                <ListGroup.Item key={item.id}>{item.name}</ListGroup.Item>
              </Nav.Link>
            ))}
          </ListGroup>
        )}
        <div className="d-flex align-items-center mt-3">
          <Button variant="primary" onClick={handleToggleProducts}>
            {showProducts ? 'Скрыть товары' : 'Показать все товары'}
          </Button>

          {order.status !== 4 && (
            <Button
              className="mx-3"
              variant="success"
              onClick={() => handleCompleteOrder(order.id)}
            >
              Завершить заказ
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

export default OrderItem;
