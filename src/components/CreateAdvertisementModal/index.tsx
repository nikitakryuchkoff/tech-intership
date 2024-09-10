import React from 'react';
import { AdvertismentsService } from '../../services';
import { ModalAdvertisement } from '..';
import { Advertisment } from '../../types';

interface CreateAdvertisementModalProps {
  show: boolean;
  closeModal: (flag: boolean) => void;
  setCurrentAdvertisements: React.Dispatch<
    React.SetStateAction<Advertisment[]>
  >;
}

function CreateAdvertisementModal({
  show,
  closeModal,
  setCurrentAdvertisements,
}: CreateAdvertisementModalProps): JSX.Element {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data: Omit<Advertisment, 'id'> = {
      name: formData.get('title') as string,
      price: Number(formData.get('price')),
      imageUrl: formData.get('title') as string,
      likes: 0,
      views: 0,
      createdAt: new Date().toISOString(),
    };

    const newItem = await AdvertismentsService.createAdvertisement(data);
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
