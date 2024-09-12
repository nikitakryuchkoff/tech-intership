import React from 'react';
import { Form } from 'react-bootstrap';

interface SearchInputProps {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchInput({
  setSearchQuery,
}: SearchInputProps): JSX.Element {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
  };

  return (
    <Form>
      <Form.Group controlId="searchInput">
        <Form.Label className="fw-bold">Поиск объявлений</Form.Label>
        <Form.Control
          type="text"
          placeholder="Введите текст"
          onChange={handleChange}
          aria-label="Поиск объявлений"
        />
      </Form.Group>
    </Form>
  );
}
