import { useEffect, useRef, useState } from 'react';
import { AdvertismentsService } from '../../services';
import { Button, Col, Row } from 'react-bootstrap';
import { SearchInput, SelectCardCount } from '..';

interface AdvertisementsNavProps {
  setSearchQuery: (query: string) => void;
  setLimit: (limit: number) => void;
  openModal: (flag: boolean) => void;
}

export default function AdvertisementsNav({
  setSearchQuery,
  setLimit,
  openModal,
}: AdvertisementsNavProps): JSX.Element {
  return (
    <>
      <Row className="my-4">
        <Col md={10}>
          <SearchInput setSearchQuery={setSearchQuery} />
        </Col>
        <Col md={2}>
          <SelectCardCount setLimit={setLimit} />
        </Col>
      </Row>
      <Row>
        <Col md={3}>
          <Button onClick={() => openModal(true)}>Добавить объявление</Button>
        </Col>
      </Row>
    </>
  );
}
