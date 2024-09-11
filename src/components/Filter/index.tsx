import React, { useCallback } from 'react';
import { Form, Row, Col } from 'react-bootstrap';

interface AdvertisementsFilterProps {
  setSortOrder: React.Dispatch<React.SetStateAction<string>>;
  setSortType: React.Dispatch<React.SetStateAction<string>>;
  sortTypesArray: string[];
  sortOrderArray: string[];
  sortType: string;
  sortOrder: string;
}

export default function Filter({
  setSortOrder,
  setSortType,
  sortTypesArray,
  sortOrderArray,
  sortType,
  sortOrder,
}: AdvertisementsFilterProps): JSX.Element {
  const handleSortTypeChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSortType(e.target.value);
    },
    [setSortType],
  );

  const handleSortOrderChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSortOrder(e.target.value);
    },
    [setSortOrder],
  );

  return (
    <Form className="mt-4">
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="sortType">
            <Form.Label className="fw-bold">Сортировать по:</Form.Label>
            {sortTypesArray.length > 1 ? (
              <Form.Select
                onChange={handleSortTypeChange}
                defaultValue={sortType}
              >
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
                value={sortTypesArray[0]}
                className="border rounded px-2"
              />
            )}
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="sortOrder">
            <Form.Label className="fw-bold">Порядок сортировки:</Form.Label>
            {sortOrderArray.length > 1 ? (
              <Form.Select
                onChange={handleSortOrderChange}
                defaultValue={sortOrder}
              >
                {sortOrderArray.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </Form.Select>
            ) : (
              <Form.Control
                plaintext
                readOnly
                value={sortOrderArray[0]}
                className="border rounded px-2"
              />
            )}
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
}
