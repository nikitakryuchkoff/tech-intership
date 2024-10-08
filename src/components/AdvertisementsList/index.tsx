import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { AdvertisementCard } from '..';
import { Advertisment } from '../../types';

interface AdvertisementsListProps {
  currentAdvertisements: Advertisment[];
}

export default function AdvertisementsList({
  currentAdvertisements,
}: AdvertisementsListProps): JSX.Element {
  return (
    <>
      <Row className="mt-4">
        {currentAdvertisements.map((item) => (
          <Col key={item.id} xs={12} sm={6} md={4} lg={4}>
            <AdvertisementCard
              title={item.name}
              price={item.price}
              views={item.views}
              image={item.imageUrl}
              likes={item.likes}
              cardId={item.id}
            />
          </Col>
        ))}
      </Row>
    </>
  );
}
