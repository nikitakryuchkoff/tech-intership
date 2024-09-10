import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AdvertismentsService } from '../../services';
import UpdateAdvertisementModal from '../../components/UpdateAdvertisementModal';
import { Advertisment } from '../../types';

function AdvertisementPage(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [advertisement, setAdvertisement] = useState<
    Advertisment | undefined
  >();
  const [modal, setModal] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      AdvertismentsService.getAdvertisementById(Number(id)).then((data) => {
        setAdvertisement(data[0]);
      });
    }
  }, [id]);

  const deleteHandler = async (id: string) => {
    await AdvertismentsService.deleteAdvertisement(id);
    navigate('/');
  };

  if (!advertisement) return <div>Loading...</div>;

  return (
    <Container className="mt-4">
      <Row>
        <Col md={6}>
          <Card>
            <Card.Img
              variant="top"
              src={advertisement.imageUrl}
              alt={advertisement.name}
            />
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title className="mb-4">{advertisement.name}</Card.Title>
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
              <Button
                variant="danger"
                size="lg"
                onClick={() => deleteHandler(advertisement.id)}
              >
                Удалить объявление
              </Button>
              <Button
                variant="warning"
                size="lg"
                className="mx-5"
                onClick={() => setModal(true)}
              >
                Редактировать
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <UpdateAdvertisementModal
        show={modal}
        closeModal={() => setModal(false)}
        setCurrentAdvertisement={setAdvertisement}
        id={Number(id)}
      />
    </Container>
  );
}

export default AdvertisementPage;
