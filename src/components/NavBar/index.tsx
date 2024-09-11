import { memo } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

export default memo(function NavBar(): JSX.Element {
  return (
    <Navbar expand="lg" className="custom-navbar" aria-label="Main navigation">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="fw-bold text-light">
          AvitoTech
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="navbar-nav"
          className="text-light"
          aria-label="Toggle navigation"
        />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              as={NavLink}
              to="/advertisements"
              className="mx-2 text-light custom-link"
            >
              Объявления
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/orders"
              className="mx-2 text-light custom-link"
            >
              Заказы
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
});
