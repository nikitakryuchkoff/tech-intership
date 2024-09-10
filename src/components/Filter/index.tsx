import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

interface AdvertisementsFilterProps {
  setSortOrder: (value: string) => void;
  setSortType: (value: string) => void;
}

function Filter({ setSortOrder, setSortType }: AdvertisementsFilterProps) {
  const handleSortTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortType(e.target.value);
  };

  const handleSortOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
  };

  return (
    <Form className="mt-4">
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="sortType">
            <Form.Label>Сортировать по:</Form.Label>
            <Form.Select onChange={handleSortTypeChange}>
              <option value="Цена">Цена</option>
              <option value="Просмотры">Просмотры</option>
              <option value="Лайки">Лайки</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="sortOrder">
            <Form.Label>Порядок сортировки:</Form.Label>
            <Form.Select onChange={handleSortOrderChange}>
              <option value="По возрастанию">По возрастанию</option>
              <option value="По убыванию">По убыванию</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
}

export default Filter;
