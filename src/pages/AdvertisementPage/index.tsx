import { Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AdvertismentsService } from '../../services';
import UpdateAdvertisementModal from '../../components/UpdateAdvertisementModal';
import AdvertisementPageSkeleton from '../../components/AdvertisementPageSkeleton';
import { Advertisment } from '../../types';
import './AdvertisementPage.css';

function AdvertisementPage(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const [advertisement, setAdvertisement] = useState<
    Advertisment | undefined
  >();
  const [modal, setModal] = useState<boolean>(false);
  const [showMore, setShowMore] = useState<boolean>(false);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    if (id) {
      AdvertismentsService.getAdvertisementById(id, signal)
        .then((data) => {
          setAdvertisement(data);
          setLoading(false);
        })
        .catch((error) => {
          if (error.name !== 'AbortError') {
            setLoading(false);
          }
        });

      return () => {
        controller.abort();
      };
    }
  }, [id]);

  const deleteHandler = async (id: string) => {
    if (id) {
      await AdvertismentsService.deleteAdvertisement(id);
      navigate('/');
    }
  };
  const handleToggleText = () => setShowMore((prev) => !prev);

  const description = advertisement?.description || '';

  if (loading) return <AdvertisementPageSkeleton />;

  return (
    <>
      {advertisement ? (
        <>
          <Row className="mt-4">
            <Col md={6}>
              <Card className="shadow-sm">
                <Card.Img
                  variant="top"
                  src={advertisement.imageUrl}
                  alt={advertisement.name}
                  className="card-img"
                />
              </Card>
            </Col>
            <Col md={6}>
              <Card className="shadow-sm p-4">
                <Card.Body>
                  <Card.Title className="mb-4 card-title">
                    {advertisement.name}
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
                      variant="danger"
                      size="lg"
                      onClick={() =>
                        advertisement.id && deleteHandler(advertisement.id)
                      }
                    >
                      Удалить объявление
                    </Button>
                    <Button
                      variant="warning"
                      size="lg"
                      onClick={() => setModal(true)}
                    >
                      Редактировать
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <UpdateAdvertisementModal
            show={modal}
            closeModal={() => setModal(false)}
            setCurrentAdvertisement={setAdvertisement}
            id={id || ''}
          />
        </>
      ) : (
        <div>Объявление не найдено</div>
      )}
    </>
  );
}

export default AdvertisementPage;
