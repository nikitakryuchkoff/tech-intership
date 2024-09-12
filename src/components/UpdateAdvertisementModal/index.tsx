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

    const formDataObj: Record<string, FormDataEntryValue> = {};
    const formData = new FormData(e.currentTarget);

    formData.forEach((value, key) => {
      formDataObj[key] = value;
    });

    const filteredFormData = checkEmptyValues(formDataObj);

    const newItem = await AdvertismentsService.updateAdvertisement(
      filteredFormData,
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
