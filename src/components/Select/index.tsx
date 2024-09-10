import { Form } from 'react-bootstrap';

interface SelectCardCountProps {
  setLimit: React.Dispatch<React.SetStateAction<string>>;
  options: string[];
  label: string;
}

const SelectCardCount = ({
  setLimit,
  options,
  label,
}: SelectCardCountProps): JSX.Element => {
  return (
    <Form.Group controlId="selectCardCount">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        as="select"
        onChange={(e) => setLimit(e.currentTarget.value)}
      >
        {options.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  );
};

export default SelectCardCount;
