import { Col, Container, Row } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import NavBar from '../NavBar';

export default function Layout(): JSX.Element {
  return (
    <>
      <Row>
        <Col>
          <NavBar />
        </Col>
      </Row>
      <Row>
        <Col>
          <Container>
            <Outlet />
          </Container>
        </Col>
      </Row>
    </>
  );
}
