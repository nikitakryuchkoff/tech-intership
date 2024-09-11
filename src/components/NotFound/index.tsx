import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NotFound(): JSX.Element {
  return (
    <Container className="text-center" style={{ marginTop: '100px' }}>
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

export default NotFound;
