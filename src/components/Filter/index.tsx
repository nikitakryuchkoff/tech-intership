import React, { useCallback } from 'react';
import { Form, Row, Col } from 'react-bootstrap';

interface AdvertisementsFilterProps {
  setSortOrder: React.Dispatch<React.SetStateAction<string>>;
  setSortType: React.Dispatch<React.SetStateAction<string>>;
  sortTypesArray: string[];
  sortOrderArray: string[];
}

function Filter({
  setSortOrder,
  setSortType,
  sortTypesArray,
  sortOrderArray,
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
              <Form.Select onChange={handleSortOrderChange}>
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

export default Filter;
