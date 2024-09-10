import React from 'react';
import { AdvertismentsService } from '../../services';
import { ModalAdvertisement } from '..';
import checkEmptyValues from '../../utils/checkEmptyValues';
import { Advertisment } from '../../types';

interface UpdateAdvertisementModalProps {
  show: boolean;
  closeModal: (flag: boolean) => void;
  setCurrentAdvertisement: (advertisement: Advertisment | undefined) => void;
  id: number;
}

function UpdateAdvertisementModal({
  show,
  closeModal,
  setCurrentAdvertisement,
  id,
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

    setCurrentAdvertisement(newItem);
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

export default UpdateAdvertisementModal;
