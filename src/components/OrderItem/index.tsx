import { useState } from 'react';
import { Card, Button, ListGroup, Nav } from 'react-bootstrap';
import { IOrder } from '../../types';
import { NavLink } from 'react-router-dom';
import { OrdersService } from '../../services';

interface OrderItemProps {
  order: IOrder;
  setCurrentOrders: React.Dispatch<React.SetStateAction<IOrder[]>>;
}

function OrderItem({ order, setCurrentOrders }: OrderItemProps) {
  const [showProducts, setShowProducts] = useState<boolean>(false);

  const handleToggleProducts = () => {
    setShowProducts((prev) => !prev);
  };

  const handleCompleteOrder = async (id: number) => {
    try {
      console.log(`Заказ №${order.orderNumber} завершен`);
      await OrdersService.changeOrderStatus(id);
      setCurrentOrders((prevOrders: IOrder[]) => {
        return prevOrders.map((orderItem) =>
          orderItem.id === id
            ? { ...orderItem, status: 'Завершен' }
            : orderItem,
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className="my-3">
      <Card.Header>Заказ №{order.orderNumber}</Card.Header>
      <Card.Body>
        <Card.Text>
          <strong>Количество товаров:</strong> {order.items.length}
        </Card.Text>
        <Card.Text>
          <strong>Стоимость заказа:</strong> {order.totalPrice} ₽
        </Card.Text>
        <Card.Text>
          <strong>Дата создания заказа:</strong> {order.creationDate}
        </Card.Text>
        <Card.Text>
          <strong>Статус:</strong> {order.status}
        </Card.Text>
        {showProducts && (
          <ListGroup className="mt-3">
            {order.items.map((item, index) => (
              <Nav.Link as={NavLink} to={`/${item.id}`}>
                <ListGroup.Item key={index}>{item.title}</ListGroup.Item>
              </Nav.Link>
            ))}
          </ListGroup>
        )}
        <div className="d-flex align-items-center mt-3">
          <Button variant="primary" onClick={handleToggleProducts}>
            {showProducts ? 'Скрыть товары' : 'Показать все товары'}
          </Button>

          {order.status !== 'Завершен' && (
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
