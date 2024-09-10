import React, { useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';

interface SliderProps {
  minPrice: number;
  maxPrice: number;
  setPriceRange: (min: number, max: number) => void;
}

const Slider: React.FC<SliderProps> = ({
  minPrice,
  maxPrice,
  setPriceRange,
}) => {
  const [minValue, setMinValue] = useState(minPrice);
  const [maxValue, setMaxValue] = useState(maxPrice);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setMinValue(value);
    setPriceRange(value, maxValue);
  };

  return (
    <Form className="mt-4">
      <Row>
        <Col md={6}>
          <Form.Label>Сумма заказа не должна превышать: {minValue}</Form.Label>
          <Form.Range
            min={minPrice}
            max={maxPrice}
            value={minValue}
            onChange={handleMinChange}
          />
        </Col>
      </Row>
    </Form>
  );
};

export default Slider;
