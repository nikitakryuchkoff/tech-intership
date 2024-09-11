import { Row, Col, Card, Button, Badge, Alert } from 'react-bootstrap';
import UpdateAdvertisementModal from '../../components/UpdateAdvertisementModal';
import AdvertisementPageSkeleton from '../../components/AdvertisementPageSkeleton';
import { useAdvertisement } from '../../context/AdvertisementContext';
import { useState } from 'react';
import formatDate from '../../utils/formatDate';
import './AdvertisementPage.css';

export default function AdvertisementPage(): JSX.Element {
  const {
    advertisement,
    loading,
    modal,
    showMore,
    setModal,
    setShowMore,
    deleteAdvertisement,
    setAdvertisement,
  } = useAdvertisement();

  const [showAlert, setShowAlert] = useState(false);

  const handleToggleText = () => setShowMore((prev) => !prev);
  const description = advertisement?.description || '';

  const handleDelete = () => {
    if (advertisement?.id) {
      deleteAdvertisement(advertisement.id);
      setShowAlert(true);
    }
  };

  if (loading) return <AdvertisementPageSkeleton />;

  return (
    <>
      {advertisement ? (
        <>
          {showAlert && (
            <Alert
              variant="success"
              onClose={() => setShowAlert(false)}
              dismissible
              className="mt-3"
            >
              Объявление успешно удалено!
            </Alert>
          )}
          <Row className="mt-4">
            <Col xs={12} md={6}>
              <Card className="shadow-lg">
                <Card.Img
                  src={advertisement.imageUrl}
                  alt={advertisement.name}
                  className="card-img"
                  style={{
                    transition: 'transform 0.3s',
                    transform: showMore ? 'scale(1.05)' : 'scale(1)',
                  }}
                />
              </Card>
            </Col>
            <Col xs={12} md={6}>
              <Card className="shadow-lg p-4">
                <Card.Body>
                  <Card.Title className="mb-4 card-title">
                    {advertisement.name} <Badge bg="info">Новинка</Badge>
                  </Card.Title>
                  <Card.Text className="card-text-price">
                    <strong>Стоимость:</strong> {advertisement.price} руб.
                  </Card.Text>
                  <Card.Text>
                    <strong>Просмотры:</strong> {advertisement.views}
                  </Card.Text>
                  <Card.Text>
                    <strong>Лайки:</strong> {advertisement.likes}
                  </Card.Text>
                  <Card.Text>
                    <strong>Дата публикации:</strong>{' '}
                    {formatDate(advertisement.createdAt)}
                  </Card.Text>
                  <div className="mb-3">
                    <strong>Описание:</strong>
                    <br />
                    <Card.Text>
                      {showMore || description.length <= 80
                        ? description
                        : `${description.substring(0, 80)}...`}
                      {description.length > 80 && (
                        <Button
                          variant="link"
                          onClick={handleToggleText}
                          className="text-decoration-none"
                        >
                          {showMore ? 'Скрыть' : 'Читать далее'}
                        </Button>
                      )}
                    </Card.Text>
                  </div>
                  <div className="button-group">
                    <Button
                      variant="warning"
                      size="lg"
                      onClick={() => setModal(true)}
                    >
                      Редактировать
                    </Button>
                    <Button
                      variant="danger"
                      size="lg"
                      onClick={handleDelete}
                      className="me-3"
                    >
                      Удалить объявление
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <UpdateAdvertisementModal
            show={modal}
            closeModal={() => setModal(false)}
            setAdvertisement={setAdvertisement}
            id={advertisement.id}
            content={advertisement}
          />
        </>
      ) : (
        <div className="text-center mt-5">
          <h3>Объявление не найдено</h3>
          <p>Проверьте, существует ли оно или удалено</p>
        </div>
      )}
    </>
  );
}
