import React from 'react';
import { Card, Placeholder, Button } from 'react-bootstrap';

export default function SkeletonOrderItem(): JSX.Element {
  return (
    <Card className="my-3 shadow-sm">
      <Card.Header>
        <Placeholder as="h5" animation="glow">
          <Placeholder xs={6} />
        </Placeholder>
      </Card.Header>
      <Card.Body>
        <div className="d-flex flex-column">
          <Card.Text className="mb-2">
            <strong className="me-2">Количество товаров:</strong>
            <Placeholder as="span" animation="glow">
              <Placeholder xs={4} />
            </Placeholder>
          </Card.Text>
          <Card.Text className="mb-2">
            <strong className="me-2">Стоимость заказа:</strong>
            <Placeholder as="span" animation="glow">
              <Placeholder xs={5} />
            </Placeholder>
          </Card.Text>
          <Card.Text className="mb-2">
            <strong className="me-2">Дата создания заказа:</strong>
            <Placeholder as="span" animation="glow">
              <Placeholder xs={6} />
            </Placeholder>
          </Card.Text>
          <Card.Text className="mb-3">
            <strong className="me-2">Статус:</strong>
            <Placeholder as="span" animation="glow">
              <Placeholder xs={4} />
            </Placeholder>
          </Card.Text>
          <div className="d-flex">
            <Button variant="primary" disabled>
              Показать все товары
            </Button>
            <Button variant="success" disabled className="mx-4">
              Завершить заказ
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
