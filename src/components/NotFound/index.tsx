import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function NotFound(): JSX.Element {
  return (
    <Container className="text-center mt-5">
      <Row>
        <Col>
          <h1>404 - Страница не найдена</h1>
          <p>К сожалению, страница, которую вы ищете, не существует.</p>
          <Link to="/advertisements">
            <Button variant="primary">Вернуться на главную страницу</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}
