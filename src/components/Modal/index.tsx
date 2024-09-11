import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Modal, Button, Form, Container } from 'react-bootstrap';
import { Advertisment } from '../../types';

interface ModalAdvertisementProps {
  show: boolean;
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: (e: FormEvent<HTMLFormElement>, content: Advertisment) => void;
  content?: Advertisment;
}

export default function ModalAdvertisement({
  show,
  closeModal,
  handleSubmit,
  content = {} as Advertisment,
}: ModalAdvertisementProps): JSX.Element {
  const [formData, setFormData] = useState<Advertisment>(content);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(e, formData);
  };

  return (
    <Modal show={show} onHide={() => closeModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>
          {content?.id
            ? 'Редактировать объявление'
            : 'Добавить новое объявление'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Form.Group controlId="formTitle">
            <Form.Label>Название</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите название"
              name="name"
              value={formData.name || ''}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formImageUrl" className="mt-3">
            <Form.Label>Ссылка на картинку</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите ссылку на картинку"
              name="imageUrl"
              value={formData.imageUrl || ''}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formDescription" className="mt-3">
            <Form.Label>Описание</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Введите описание"
              name="description"
              value={formData.description || ''}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formPrice" className="mt-3">
            <Form.Label>Цена</Form.Label>
            <Form.Control
              type="number"
              placeholder="Введите цену"
              name="price"
              value={formData.price || ''}
              onChange={handleChange}
            />
          </Form.Group>

          <Container className="d-flex justify-content-end mt-4">
            <Button
              variant="secondary"
              className="me-2"
              onClick={() => closeModal(false)}
            >
              Закрыть
            </Button>
            <Button variant="primary" type="submit">
              {content?.id ? 'Сохранить изменения' : 'Добавить объявление'}
            </Button>
          </Container>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
