import { Card, Button } from 'react-bootstrap';


interface AdvertisementCardProps {
    image: string,
    title: string,
    price: number,
    views: number,
    likes: number
}

const AdvertisementCard = ({ image, title, price, views, likes }: AdvertisementCardProps): JSX.Element => {
    return (
        <Card style={{ width: '100%' }} className="mb-4">
            <Card.Img variant="top" src={image} alt={title} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    <strong>Стоимость:</strong> {price}   руб.<br />
                    <strong>Просмотры:</strong> {views}<br />
                    <strong>Лайки:</strong> {likes}
                </Card.Text>
                <Button variant="danger">Купить</Button>
            </Card.Body>
        </Card>
    );
};

export default AdvertisementCard;
