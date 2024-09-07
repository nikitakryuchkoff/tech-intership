import { Form } from 'react-bootstrap';

interface SelectCardCountProps {
  setLimit: (value: number) => void;
}

const SelectCardCount = ({ setLimit }: SelectCardCountProps): JSX.Element => {
  return (
    <Form.Group controlId="selectCardCount">
      <Form.Label>Количество карточек:</Form.Label>
      <Form.Control
        as="select"
        onChange={(e) => setLimit(Number(e.currentTarget.value))}
      >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="50">50</option>
      </Form.Control>
    </Form.Group>
  );
};

export default SelectCardCount;
