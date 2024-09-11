import React, { useCallback, useState } from 'react';
import { AdvertismentsService } from '../../services';
import { ModalAdvertisement, Toaster } from '..';
import { Advertisment } from '../../types';

interface CreateAdvertisementModalProps {
  show: boolean;
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentAdvertisements: React.Dispatch<
    React.SetStateAction<Advertisment[]>
  >;
}

const CreateAdvertisementModal: React.FC<CreateAdvertisementModalProps> = ({
  show,
  closeModal,
  setCurrentAdvertisements,
}): JSX.Element => {
  const [showToast, setShowToast] = useState(false);
  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const formData = new FormData(e.currentTarget);

      const name = formData.get('name');
      const price = formData.get('price');
      const imageUrl = formData.get('imageUrl');
      const description = formData.get('description');

      console.log(description);

      if (!name || !price || !imageUrl || !description) {
        setShowToast(true);
        return;
      }

      const data: Omit<Advertisment, 'id'> = {
        name: name as string,
        price: Number(price),
        imageUrl: imageUrl as string,
        likes: 0,
        views: 0,
        createdAt: new Date().toISOString(),
        description: description as string,
      };

      try {
        const newItem = await AdvertismentsService.createAdvertisement(data);
        setCurrentAdvertisements((prev) => [newItem, ...prev]);
        closeModal(false);
      } catch (error) {
        console.error('Ошибка при создании объявления:', error);
        alert('Произошла ошибка при создании объявления.');
      }
    },
    [closeModal, setCurrentAdvertisements],
  );

  return (
    <>
      <ModalAdvertisement
        show={show}
        closeModal={closeModal}
        handleSubmit={handleSubmit}
      />
      <Toaster
        show={showToast}
        message="Введите все поля"
        onClose={setShowToast}
      />
    </>
  );
};

export default CreateAdvertisementModal;
