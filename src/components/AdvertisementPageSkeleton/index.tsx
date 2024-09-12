import React from 'react';
import { Row, Col, Card, Placeholder, Button } from 'react-bootstrap';

export default function AdvertisementPageSkeleton(): JSX.Element {
  return (
    <Row className="mt-4">
      <Col md={6}>
        <Card className="shadow-sm">
          <Placeholder
            as={Card.Img}
            variant="top"
            animation="wave"
            style={{ height: '400px', borderRadius: '10px' }}
          />
        </Card>
      </Col>
      <Col md={6}>
        <Card className="shadow-sm p-4" style={{ borderRadius: '10px' }}>
          <Card.Body>
            <Placeholder as={Card.Title} animation="wave" className="mb-4">
              <Placeholder xs={8} />
            </Placeholder>

            <Placeholder as={Card.Text} animation="wave" className="mb-2">
              <Placeholder xs={6} />
            </Placeholder>

            <Placeholder as={Card.Text} animation="wave" className="mb-2">
              <Placeholder xs={5} />
            </Placeholder>

            <Placeholder as={Card.Text} animation="wave" className="mb-3">
              <Placeholder xs={7} />
            </Placeholder>
            <div className="d-flex">
              <div className="flex-grow-1">
                <Placeholder
                  as={Button}
                  variant="outline-danger"
                  size="lg"
                  style={{ width: '100%' }}
                />
              </div>
              <div className="ms-3 flex-grow-1">
                <Placeholder
                  as={Button}
                  variant="outline-warning"
                  size="lg"
                  style={{ width: '100%' }}
                />
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
