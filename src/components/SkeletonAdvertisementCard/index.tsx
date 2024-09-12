import React from 'react';
import { Card, Placeholder } from 'react-bootstrap';

export default function SkeletonAdvertisementCard(): JSX.Element {
  return (
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
        style={{
          height: '180px',
          objectFit: 'cover',
          backgroundColor: '#e0e0e0',
        }}
      />
      <Card.Body className="d-flex flex-column justify-content-between p-3">
        <Placeholder as={Card.Title} animation="wave">
          <Placeholder xs={6} />
        </Placeholder>
        <Placeholder as={Card.Text} animation="wave">
          <Placeholder xs={7} />
        </Placeholder>
        <Placeholder as={Card.Text} animation="wave">
          <Placeholder xs={4} />
        </Placeholder>
        <Placeholder.Button variant="outline-primary" xs={4} />
      </Card.Body>
    </Card>
  );
}
