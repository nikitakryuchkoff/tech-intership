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
    <Nav.Link as={NavLink} to={`/${cardId}`}>
      <Card
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
        className="mb-4"
      >
        <Card.Img
          variant="top"
          src={image}
          alt={title}
          style={{ height: '200px', objectFit: 'cover' }}
        />
        <Card.Body className="d-flex flex-column justify-content-between">
          <div>
            <Card.Title>{title}</Card.Title>
            <Card.Text>
              <strong>Стоимость:</strong> {price} руб.
              <br />
              <strong>Просмотры:</strong> {views}
              <br />
              <strong>Лайки:</strong> {likes}
            </Card.Text>
          </div>
          <Button variant="danger" className="mt-auto">
            Купить
          </Button>
        </Card.Body>
      </Card>
    </Nav.Link>
  );
};

export default AdvertisementCard;
