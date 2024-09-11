import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';
import { Advertisment } from '../types';
import useDebounce from '../hooks/useDebounce';
import fetchAdvertisements from '../utils/fetchSearchAdvertisement';

interface AdvertisementsContextProps {
  advertisements: Advertisment[];
  currentAdvertisements: Advertisment[];
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  limit: string;
  setLimit: Dispatch<SetStateAction<string>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  sortOrder: string;
  setSortOrder: Dispatch<SetStateAction<string>>;
  sortType: string;
  setSortType: Dispatch<SetStateAction<string>>;
  modal: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
  totalPages: number;
}

const AdvertisementsContext = createContext<
  AdvertisementsContextProps | undefined
>(undefined);

export function AdvertisementsProvider({ children }: { children: ReactNode }) {
  const [advertisements, setAdvertisements] = useState<Advertisment[]>([]);
  const [currentAdvertisements, setCurrentAdvertisements] = useState<
    Advertisment[]
  >([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const debouncedQuery = useDebounce<string>(searchQuery, 333);
  const [limit, setLimit] = useState<string>('10');
  const [page, setPage] = useState<number>(1);
  const [sortOrder, setSortOrder] = useState<string>('По возрастанию');
  const [sortType, setSortType] = useState<string>('Цена');
  const [modal, setModal] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const totalCount = useRef<number>(1);
  const totalPages = Math.ceil(totalCount.current / +limit);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    setLoading(true);
    fetchAdvertisements({
      debouncedQuery,
      limit,
      page,
      sortOrder,
      sortType,
      signal,
    }).then(({ data, itemsCount }) => {
      setAdvertisements(data);
      totalCount.current = itemsCount;
      setLoading(false);
    });

    return () => {
      controller.abort();
    };
  }, [debouncedQuery, limit, page, sortOrder, sortType]);

  useEffect(() => {
    setCurrentAdvertisements(advertisements);
  }, [advertisements]);

  return (
    <AdvertisementsContext.Provider
      value={{
        advertisements,
        currentAdvertisements,
        searchQuery,
        setSearchQuery,
        limit,
        setLimit,
        page,
        setPage,
        sortOrder,
        setSortOrder,
        sortType,
        setSortType,
        modal,
        setModal,
        loading,
        totalPages,
      }}
    >
      {children}
    </AdvertisementsContext.Provider>
  );
}

export function useAdvertisements() {
  const context = useContext(AdvertisementsContext);
  if (!context) {
    throw new Error(
      'useAdvertisements must be used within an AdvertisementsProvider',
    );
  }
  return context;
}
