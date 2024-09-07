import { Form } from 'react-bootstrap';

const SearchInput = () => {
  return (
    <Form.Group controlId="textInput">
      <Form.Label className="text-bold">Поиск объявлений</Form.Label>
      <Form.Control type="text" placeholder="Введите текст" />
    </Form.Group>
  );
};

export default SearchInput;
