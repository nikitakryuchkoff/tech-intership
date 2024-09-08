import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { AdvertismentsService } from '../../services';
import { IAdvertisement } from '../../types';
import { ModalAdvertisement } from '..';

interface CreateAdvertisementModalProps {
  show: boolean;
  closeModal: (flag: boolean) => void;
  setCurrentAdvertisements: React.Dispatch<
    React.SetStateAction<IAdvertisement[]>
  >;
}

function CreateAdvertisementModal({
  show,
  closeModal,
  setCurrentAdvertisements,
}: CreateAdvertisementModalProps): JSX.Element {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = Object.fromEntries(
      new FormData(e.currentTarget),
    ) as Record<string, FormDataEntryValue>;

    const newItem = await AdvertismentsService.createAdvertisement({
      ...formData,
      likes: '0',
      views: '0',
    });

    setCurrentAdvertisements((prev) => [newItem, ...prev]);
    closeModal(false);
  };

  return (
    <ModalAdvertisement
      show={show}
      closeModal={closeModal}
      handleSubmit={handleSubmit}
    />
  );
}

export default CreateAdvertisementModal;
