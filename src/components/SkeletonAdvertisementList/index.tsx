import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { AdvertisementCard, SkeletonAdvertisementCard } from '..';
import { Advertisment } from '../../types';

interface AdvertisementsListProps {
  currentAdvertisements: Advertisment[] | undefined;
}

export default function AdvertisementsList({
  currentAdvertisements,
}: AdvertisementsListProps): JSX.Element {
  const isLoading =
    !currentAdvertisements || currentAdvertisements.length === 0;

  return (
    <Row className="mt-4">
      {isLoading
        ? Array.from({ length: 6 }).map((_, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={4}>
              <SkeletonAdvertisementCard />
            </Col>
          ))
        : currentAdvertisements.map((item) => (
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
  );
}
