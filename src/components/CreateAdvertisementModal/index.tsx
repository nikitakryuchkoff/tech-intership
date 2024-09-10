import React from 'react';
import { AdvertismentsService } from '../../services';
import { IAdvertisement, ICreateAdvertisementFormData } from '../../types';
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

    const formData = new FormData(e.currentTarget);
    const data: ICreateAdvertisementFormData = {
      title: formData.get('title') as string,
      price: Number(formData.get('price')),
      image: formData.get('title') as string,
      likes: 0,
      views: 0,
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
