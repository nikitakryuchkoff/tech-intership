import React from 'react';
import { Modal, Button, Form, Container } from 'react-bootstrap';

interface ModalAdvertisementProps {
  show: boolean;
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

function ModalAdvertisement({
  show,
  closeModal,
  handleSubmit,
}: ModalAdvertisementProps): JSX.Element {
  return (
    <Modal show={show} onHide={() => closeModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Добавить новое объявление</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formTitle">
            <Form.Label>Название</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите название"
              name="name"
            />
          </Form.Group>

          <Form.Group controlId="formImageUrl" className="mt-3">
            <Form.Label>Ссылка на картинку</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите ссылку на картинку"
              name="imageUrl"
            />
          </Form.Group>

          <Form.Group controlId="formDescription" className="mt-3">
            <Form.Label>Описание</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Введите описание"
              name="description"
            />
          </Form.Group>

          <Form.Group controlId="formPrice" className="mt-3">
            <Form.Label>Цена</Form.Label>
            <Form.Control
              type="number"
              placeholder="Введите цену"
              name="price"
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
              Добавить объявление
            </Button>
          </Container>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ModalAdvertisement;
