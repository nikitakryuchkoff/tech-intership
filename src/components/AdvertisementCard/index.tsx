import { Card, Button, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import formatCurrency from '../../utils/formatCurrent';

interface AdvertisementCardProps {
  image: string | undefined;
  title: string;
  price: number;
  views: number;
  likes: number;
  cardId: string;
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
              <span className="text-muted">Стоимость: </span>
              {formatCurrency(price)}
            </Card.Text>
            <Card.Text className="text-muted" style={{ fontSize: '0.9rem' }}>
              <i className="bi bi-eye"></i> {views} &nbsp; | &nbsp;{' '}
              <i className="bi bi-heart"></i> {likes}
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
