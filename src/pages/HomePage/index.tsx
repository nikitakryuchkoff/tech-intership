import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import './HomePage.css';

export default function HomePage(): JSX.Element {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setTimeout(() => setFadeIn(true), 500);
  }, []);

  return (
    <Container className="text-center mt-5">
      <Row className="justify-content-center">
        <Col md={8} className={`fade-in ${fadeIn ? 'show' : ''}`}>
          <h1 className="display-4">Добро пожаловать!</h1>
          <p className="lead">
            Это начальная страница тестового задания на стажировку в компанию
            Avito 2024.
          </p>
          <p>
            Вы можете выбрать один из разделов сверху, чтобы продолжить работу с
            приложением.
          </p>
        </Col>
      </Row>
      <Row className="justify-content-center mt-5">
        <Col md={8}>
          <Image
            src="https://img.freepik.com/premium-photo/cute-capybara-with-hat-ready-travel-blue-suitcase-blue-natural-background_498722-893.jpg"
            alt="Welcome Illustration"
            fluid
            rounded
            className={`fade-in ${fadeIn ? 'show' : ''} shadow-lg`}
          />
        </Col>
      </Row>
    </Container>
  );
}
