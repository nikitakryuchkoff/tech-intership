import { Card, Button, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

interface AdvertisementCardProps {
  image: string;
  title: string;
  price: number;
  views: number;
  likes: number;
  cardId: number;
}

const AdvertisementCard = ({
  image,
  title,
  price,
  views,
  likes,
  cardId,
}: AdvertisementCardProps): JSX.Element => {
  return (
    <Nav.Link as={NavLink} to={`/${cardId}`} className="p-0">
      <Card
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
        className="mb-3 shadow-sm"
      >
        <Card.Img
          variant="top"
          src={image}
          alt={title}
          style={{
            height: '180px',
            objectFit: 'cover',
            borderTopLeftRadius: '5px',
            borderTopRightRadius: '5px',
          }}
        />
        <Card.Body className="d-flex flex-column justify-content-between p-3">
          <div>
            <Card.Title
              className="mb-2 text-truncate"
              style={{ fontSize: '1.1rem' }}
            >
              {title}
            </Card.Title>
            <Card.Text className="mb-2">
              <span className="text-muted">Стоимость:</span> {price} руб.
            </Card.Text>
            <Card.Text className="text-muted" style={{ fontSize: '0.9rem' }}>
              <span>Просмотры: {views}</span> &nbsp; | &nbsp;{' '}
              <span>Лайки: {likes}</span>
            </Card.Text>
          </div>
          <Button variant="outline-primary" size="sm" className="mt-2">
            Заказы
          </Button>
        </Card.Body>
      </Card>
    </Nav.Link>
  );
};

export default AdvertisementCard;
