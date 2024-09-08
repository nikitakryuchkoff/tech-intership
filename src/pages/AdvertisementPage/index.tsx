import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AdvertismentsService } from '../../services'; // Предположим, что есть сервис для получения данных
import type { IAdvertisements } from '../../types';

const AdvertisementPage = (): JSX.Element => {
  const { id } = useParams<{ id: string }>(); // Получаем ID объявления из URL
  const [advertisement, setAdvertisement] = useState<IAdvertisements | null>(
    null,
  );

  useEffect(() => {
    // Загружаем данные объявления по ID
    AdvertismentsService.getAdvertisementById(Number(id)).then((data) => {
      setAdvertisement(data[0]);
    });
  }, [id]);

  if (!advertisement) {
    return <p>Загрузка...</p>;
  }

  console.log(advertisement);

  return (
    <Container className="mt-4">
      <Row>
        <Col md={6}>
          <Card>
            <Card.Img
              variant="top"
              src={advertisement.image}
              alt={advertisement.title}
            />
          </Card>
        </Col>

        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title className="mb-4">{advertisement.title}</Card.Title>

              <Card.Text>
                <strong>Стоимость:</strong> {advertisement.price} руб.
              </Card.Text>

              <Card.Text>
                <strong>Просмотры:</strong> {advertisement.views}
              </Card.Text>

              <Card.Text>
                <strong>Лайки:</strong> {advertisement.likes}
              </Card.Text>

              <Card.Text>
                <strong>Описание:</strong>{' '}
                {advertisement.description || 'Описание не предоставлено.'}
              </Card.Text>

              <Button variant="danger" size="lg">
                Купить сейчас
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdvertisementPage;
