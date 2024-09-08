import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { AdvertismentsService } from '../../services';

interface CreateAdvertisementModalProps {
  show: boolean;
  closeModal: (flag: boolean) => void;
  setCurrentAdvertisements: (items: []) => void;
}

function CreateAdvertisementModal({
  show,
  closeModal,
  setCurrentAdvertisements,
}: CreateAdvertisementModalProps): JSX.Element {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget));

    const newItem = await AdvertismentsService.createAdvertisement(formData);
    setCurrentAdvertisements((prev) => [newItem, ...prev]);
    closeModal(false);
  };

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
              name="title"
            />
          </Form.Group>

          <Form.Group controlId="formImageUrl" className="mt-3">
            <Form.Label>Ссылка на картинку</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите ссылку на картинку"
              name="image"
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

          {/* Flex container for buttons */}
          <div className="d-flex justify-content-end mt-4">
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
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default CreateAdvertisementModal;
