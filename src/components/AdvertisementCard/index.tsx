import { Card, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import formatCurrency from '../../utils/formatCurrent';
import './AdvertisementCard.css';

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
    <Card className="mb-3 advertisement-card shadow-sm">
      <NavLink to={`/advertisements/${cardId}`} className="p-0" target="_blank">
        <Card.Img
          variant="top"
          src={image}
          alt={title}
          className="advertisement-card-img"
        />
      </NavLink>
      <Card.Body className="advertisement-card-body">
        <NavLink to={`/${cardId}`} className="text-decoration-none">
          <Card.Title className="advertisement-card-title">{title}</Card.Title>
        </NavLink>
        <Card.Text className="advertisement-card-price">
          <span className="text-muted">Стоимость: </span>
          {formatCurrency(price)}
        </Card.Text>
        <Card.Text className="advertisement-card-stats text-muted">
          <i className="bi bi-eye"></i> {views} &nbsp; | &nbsp;{' '}
          <i className="bi bi-heart"></i> {likes}
        </Card.Text>
        <NavLink to={`/orders/${cardId}`} target="_blank">
          <Button variant="outline-primary" className="mt-3 w-100">
            Заказы
          </Button>
        </NavLink>
      </Card.Body>
    </Card>
  );
};

export default AdvertisementCard;
