import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';

export default function NavBar(): JSX.Element {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Nav className="d-flex align-items-center justify-content-between w-100">
          <div className="d-flex">
            <Nav.Link as={NavLink} to="/">
              Объявления
            </Nav.Link>
            <Nav.Link as={NavLink} to="/orders">
              Заказы
            </Nav.Link>
          </div>
        </Nav>
      </Container>
    </Navbar>
  );
}
