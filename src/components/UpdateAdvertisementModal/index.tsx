import React from 'react';
import { AdvertismentsService } from '../../services';
import { ModalAdvertisement } from '..';
import checkEmptyValues from '../../utils/checkEmptyValues';
import { Advertisment } from '../../types';

interface UpdateAdvertisementModalProps {
  show: boolean;
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
  setAdvertisement: React.Dispatch<
    React.SetStateAction<Advertisment | undefined>
  >;
  id: string;
  content: Advertisment;
}

export default function UpdateAdvertisementModal({
  show,
  closeModal,
  setAdvertisement,
  id,
  content,
}: UpdateAdvertisementModalProps): JSX.Element {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = checkEmptyValues(
      Object.fromEntries(new FormData(e.currentTarget)) as Record<
        string,
        FormDataEntryValue
      >,
    );

    const newItem = await AdvertismentsService.updateAdvertisement(
      formData,
      id,
    );

    setAdvertisement(newItem);
    closeModal(false);
  };

  return (
    <ModalAdvertisement
      show={show}
      closeModal={closeModal}
      handleSubmit={handleSubmit}
      content={content}
    />
  );
}
