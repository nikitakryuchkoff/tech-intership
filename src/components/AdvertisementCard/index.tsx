import { Card, Button, Nav } from 'react-bootstrap';
import { NavLink, useParams } from 'react-router-dom';

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
      <Card style={{ width: '100%' }} className="mb-4">
        <Card.Img variant="top" src={image} alt={title} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>
            <strong>Стоимость:</strong> {price} руб.
            <br />
            <strong>Просмотры:</strong> {views}
            <br />
            <strong>Лайки:</strong> {likes}
          </Card.Text>
          <Button variant="danger">Купить</Button>
        </Card.Body>
      </Card>
    </Nav.Link>
  );
};

export default AdvertisementCard;
