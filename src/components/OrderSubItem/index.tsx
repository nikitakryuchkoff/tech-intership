import React from 'react';
import { ListGroup, Nav, NavLink } from 'react-bootstrap';
import formatCurrency from '../../utils/formatCurrent';
import { Order } from '../../types';

interface OrderSubItemProps {
  order: Order;
}

export default function OrderSubItem({
  order,
}: OrderSubItemProps): JSX.Element {
  return (
    <ListGroup className="mt-3">
      {order.items.map((item) => (
        <ListGroup.Item
          key={item.id}
          className="d-flex justify-content-between align-items-center"
        >
          <div>
            <Nav.Link
              as={NavLink}
              to={`/advertisements/${item.id}`}
              className="text-decoration-none"
            >
              {item.name}
            </Nav.Link>
            <small className="text-muted">{item.description}</small>
          </div>
          <div className="text-end">
            <span className="d-block">
              <strong>{item.count}</strong> шт.
            </span>
            <span className="d-block">
              <strong>{formatCurrency(item.price)}</strong>
            </span>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
