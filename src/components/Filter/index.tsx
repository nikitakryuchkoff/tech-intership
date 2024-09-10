import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

interface AdvertisementsFilterProps {
  setSortOrder: (value: string) => void;
  setSortType: (value: string) => void;
  sortTypesArray: string[];
  sortOrderArray: string[];
}

function Filter({
  setSortOrder,
  setSortType,
  sortTypesArray,
  sortOrderArray,
}: AdvertisementsFilterProps) {
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
            {sortTypesArray.length > 1 ? (
              <Form.Select onChange={handleSortTypeChange}>
                {sortTypesArray.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </Form.Select>
            ) : (
              <Form.Control
                plaintext
                readOnly
                defaultValue={sortTypesArray[0]}
                className="border rounded px-2"
              />
            )}
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="sortOrder">
            <Form.Label>Порядок сортировки:</Form.Label>
            <Form.Select onChange={handleSortOrderChange}>
              {sortOrderArray.map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
}

export default Filter;
