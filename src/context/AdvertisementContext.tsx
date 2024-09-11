import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AdvertismentsService } from '../services';
import { Advertisment } from '../types';

interface AdvertisementContextProps {
  advertisement: Advertisment | undefined;
  loading: boolean;
  modal: boolean;
  showMore: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowMore: React.Dispatch<React.SetStateAction<boolean>>;
  deleteAdvertisement: (id: string) => Promise<void>;
  setAdvertisement: React.Dispatch<
    React.SetStateAction<Advertisment | undefined>
  >;
}

const AdvertisementContext = createContext<
  AdvertisementContextProps | undefined
>(undefined);

export const AdvertisementProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { id } = useParams<{ id: string }>();
  const [advertisement, setAdvertisement] = useState<Advertisment | undefined>(
    undefined,
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [modal, setModal] = useState<boolean>(false);
  const [showMore, setShowMore] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    if (id) {
      AdvertismentsService.getAdvertisementById(id, signal)
        .then((data) => {
          setAdvertisement(data);
          setLoading(false);
        })
        .catch((error) => {
          if (error.name !== 'AbortError') {
            setLoading(false);
          }
        });

      return () => {
        controller.abort();
      };
    }
  }, [id]);

  const deleteAdvertisement = async (id: string) => {
    if (id) {
      await AdvertismentsService.deleteAdvertisement(id);
      navigate('/');
    }
  };

  return (
    <AdvertisementContext.Provider
      value={{
        advertisement,
        loading,
        modal,
        showMore,
        setModal,
        setShowMore,
        deleteAdvertisement,
        setAdvertisement,
      }}
    >
      {children}
    </AdvertisementContext.Provider>
  );
};

export const useAdvertisement = () => {
  const context = useContext(AdvertisementContext);
  if (!context) {
    throw new Error(
      'useAdvertisement must be used within an AdvertisementProvider',
    );
  }
  return context;
};
