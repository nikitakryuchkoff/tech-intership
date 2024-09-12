import React from 'react';
import { Form } from 'react-bootstrap';

interface SelectCardCountProps {
  setter: React.Dispatch<React.SetStateAction<string>>;
  options: string[];
  label: string;
  value: string;
}

export default function SelectCardCount({
  setter,
  options,
  label,
  value,
}: SelectCardCountProps): JSX.Element {
  return (
    <Form.Group controlId="selectCardCount">
      <Form.Label className="fw-bold">{label}</Form.Label>
      <Form.Control
        as="select"
        onChange={(e) => setter(e.currentTarget.value)}
        defaultValue={value}
      >
        {options.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  );
}
