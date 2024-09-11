import { Form } from 'react-bootstrap';

interface SearchInputProps {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const SearchInput = ({ setSearchQuery }: SearchInputProps): JSX.Element => {
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
};

export default SearchInput;
