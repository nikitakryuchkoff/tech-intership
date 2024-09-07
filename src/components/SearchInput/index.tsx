import { Form } from 'react-bootstrap';

interface SearchInputProps {
  setSearchQuery: (value: string) => void;
}

const SearchInput = ({ setSearchQuery }: SearchInputProps): JSX.Element => {
  const onChangeSearch = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    setSearchQuery(e.currentTarget.value);
  };

  return (
    <Form>
      <Form.Group controlId="textInput">
        <Form.Label className="text-bold">Поиск объявлений</Form.Label>
        <Form.Control
          type="text"
          placeholder="Введите текст"
          onChange={(e) => onChangeSearch(e)}
        />
      </Form.Group>
    </Form>
  );
};

export default SearchInput;
